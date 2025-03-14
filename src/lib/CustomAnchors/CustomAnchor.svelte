<script lang="ts">
    import {
        handleLinkAnchorConnection,
        handleUnlinkAnchorConnection,
    } from '../circuitStore'
    import CustomWire from './CustomWire.svelte'

    let {
        linked,
        hovering,
        connecting,
        portName,
        nodeId,
        wireName = $bindable(),
        anchorId,
        io = 'input',
    }: {
        linked: boolean
        hovering: boolean
        connecting: boolean
        portName: string
        nodeId: string
        anchorId: string
        wireName: string
        io?: string
    } = $props()

    function createConnectionJson(
        nodeId: string,
        port: string
    ): ConnectorPiece {
        const connection = {
            id: nodeId,
            port: port,
        }

        // IMPORTANT part of the code for creating the connection.
        if (port.startsWith('in')) {
            return { to: connection } as ConnectorTo
        } else {
            return { from: connection } as ConnectorFrom
        }
    }

    // ASSUMPTION: Input can only ever have 1 thing connected to it, but an output can be outputting to multiple inputs
    // I will NOT make this assumption in the handling of unlinking below; but this change is maybe needed.
    // using derived here would be great if that worked. $derived.by()
    // function link(nodeId: string, portName: string) {
    //     const triggeredAnchor = createConnectionJson(nodeId, portName)
    //     return handleLinkAnchorConnection(triggeredAnchor)
    // }
    function unlink(nodeId: string, portName: string) {
        const triggeredAnchor = createConnectionJson(nodeId, portName)
        return handleUnlinkAnchorConnection(triggeredAnchor)
    }

    function findAnchorTargetClassName(
        targetClassList: string[]
    ): string | null {
        const classListArray: string[] = Array.from(targetClassList)

        // Check if any class name matches the patterns
        const matchingClasses = classListArray.filter((className) => {
            return /^(in\d+|in_|out_)/.test(className)
        })
        if (matchingClasses.length === 0) {
            return null
        } else if (matchingClasses.length === 1) {
            return matchingClasses[0]
        } else {
            console.log(
                'Impossible, 2 or more classes in the target anchor are matched'
            )
            return matchingClasses[0]
        }
    }

    function checkIOMatch(anchor1: string, anchor2: string): string {
        if (
            anchor1.substring(0, 2) === 'in' &&
            anchor2.substring(0, 2) == 'in'
        ) {
            return 'bad_dual_input'
        } else if (
            anchor1.substring(0, 3) === 'out' &&
            anchor2.substring(0, 3) == 'out'
        ) {
            return 'bad_dual_output'
        } else {
            return 'good'
        }
    }

    function createGlobalConnection(sourceClass: string, destClass: string) {
        const [port, nodeType, uuid] = sourceClass.split('_')
        const [portD, nodeTypeD, uuidD] = destClass.split('_')

        // side effects
        const sourceConnectionJson: any = createConnectionJson(
            `${nodeType}_${uuid}`,
            port
        )
        const destConnectionJson: any = createConnectionJson(
            `${nodeTypeD}_${uuidD}`,
            portD
        )

        // make sure that it is in the right order, From -> to
        let wireId: string | null = null
        let connector: any = null
        if (port.startsWith('in')) {
            wireId = destClass + '-' + sourceClass
            connector = {
                ...destConnectionJson,
                ...sourceConnectionJson,
                name: `${wireId}`,
            }
        } else {
            wireId = sourceClass + '-' + destClass
            connector = {
                ...sourceConnectionJson,
                ...destConnectionJson,
                name: `${wireId}`,
            }
        }
        // nodeMap[nodeName] = connectionMap[outputAnchorName]
        handleLinkAnchorConnection(connector)
        // side effect
        wireName = wireId
    }

    function checkDestLinked(
        eventClassList: string[],
        sourceClassName: string | null
    ) {
        const destClassName: string | null =
            findAnchorTargetClassName(eventClassList)
        // @ts-ignore
        const destAnchorLinked = eventClassList.contains('linked')

        console.log(
            sourceClassName === null
                ? 'Source Class is null'
                : destClassName === null
                  ? 'DestClass Is null'
                  : 'both are not null'
        )
        if (sourceClassName !== null && destClassName !== null) {
            const validLinking = checkIOMatch(sourceClassName, destClassName)
            if (destAnchorLinked) {
                // fires when destination is already linked
                if (destClassName.substring(0, 2) === 'in') {
                    console.warn(
                        `trying to connect to an input that has already been connected to: bad_input_already_linked`
                    )
                    return 'bad_input_already_linked'
                } else if (destClassName.substring(0, 3) === 'out') {
                    console.log(
                        `valid linking from ${sourceClassName} to ${destClassName}`
                    )
                    createGlobalConnection(sourceClassName, destClassName)
                    return 'good_dual_output'
                }
            } else if (validLinking === 'good') {
                // fires on valid linking
                console.log(
                    `valid linking from ${sourceClassName} to ${destClassName}`
                )
                createGlobalConnection(sourceClassName, destClassName)

                return 'good'
            } else if (validLinking !== 'good') {
                // fires when both are input or both are output
                console.warn(
                    `attempted to link two anchors of the same type: linking invalid: ${validLinking}`
                )
                return validLinking
            } else {
                console.warn('LJDLKFDJFLKDSJFKLD')
            }
        } else {
            console.warn('dropped edge on canvas most likely')
            return 'bad_invalid_drop'
        }
    }
    const makeStickyConnectHandler = (anchorClass: string) => {
        function handleStickyConnect(event: any) {
            event.preventDefault()
            event.stopPropagation()
            console.log('Click After sticky edge')

            const validateLinking = checkDestLinked(
                event.target.classList,
                anchorClass
            )

            document.removeEventListener('mousedown', handleStickyConnect, true)
        }
        return handleStickyConnect
    }
    $effect(() => {
        // Create event listener for mouse down with useCapture
        if (connecting) {
            if (io === 'input') {
                console.log('Started connecting an input')
            }
            const handleMouseUp = (e: any) => {
                // anchor dropped on source.
                // create a click listener
                const sourceAnchorClass: string | null =
                    findAnchorTargetClassName(e.target.classList)
                // source is the same as destination, handle sticky.
                if (
                    sourceAnchorClass != null &&
                    sourceAnchorClass === anchorId
                ) {
                    console.log('dropped on source sticky edge')

                    const handleStickyConnect: (event: any) => void =
                        makeStickyConnectHandler(sourceAnchorClass)

                    document.addEventListener(
                        'mousedown',
                        handleStickyConnect,
                        true
                    ) // create a on click useCapture click listener, on that listener, run findAnchorTargetClass(e.target.classList) name on the click target
                } else if (sourceAnchorClass !== null) {
                    const validateLinking = checkDestLinked(
                        e.target.classList, // where mouse up happened
                        anchorId // the node that created these listeners.
                    )
                } else {
                    // not dropped on an anchor, probably the canvas
                    console.warn('invalid drop location, no linking created.')
                }

                document.removeEventListener('mouseup', handleMouseUp, true)
                return sourceAnchorClass
            }
            document.addEventListener('mouseup', handleMouseUp, true)
        }

        // if (linked && (io === 'input' || io === 'output')) {
        //     link(nodeId, portName)
        if (connecting && io === 'output') {
            // also check the variable in the global store, to see if the disconnection is pending or not.
            // I am not sure yet how we should do disconnection when the output node cannot fire 'connecting'
            // i.e it has multiple connections to it.
            // restructuring the connections array could fix this issue.
            // console.log('disconnecting output from input')
        }
    })

    // TODO, may need to listen to onUnmount
    // I think on disconnect has a default event from svelvet, try that out also this effect may set state to false many times, but honestly nah.
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="custom_anchor {io === 'input' ? 'input' : 'output'} {anchorId}"
    class:linked
    class:hovering
    class:connecting
></div>

<!-- onmousedowncapture={() => {
        // if (linked && io === 'input') {
        //     // unlink(nodeId, portName)
        // }
    }} -->

<style>
    .custom_anchor {
        border: 2px solid black;
        border-radius: 50%;
        height: 10px;
        width: 10px;
    }
    .linked {
        background-color: black !important;
    }
    .input.connecting {
        background-color: var(--lime-red) !important;
        border: 2px solid black;
    }
    .output.connecting {
        background-color: var(--lime-green);
        border: 2px solid black;
    }
    .input.linked {
        border: 1px solid var(--red);
    }
    .output.linked {
        border: 1px solid green;
    }

    .input {
        background-color: red;
        background-color: var(--red);
    }
    .output {
        background-color: green;
    }
</style>
