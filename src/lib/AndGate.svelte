<script lang="ts">
    import { Node, Anchor, generateOutput } from 'svelvet'
    // export let width: number = 80
    // export let height: number = 50
    import LogicGateAnchor from './LogicGateAnchor.svelte'
    import { circuitStore } from './stores/circuitStore'
    import type { Device } from './stores/circuitStore'
    import image from './svg/andgate.svg'

    let {
        width = 80,
        height = 50,
        nodeStartPos,
    }: {
        width: number
        height: number
        nodeStartPos: number
    } = $props()

    // Define a new device

    // If a node is deleted, the number will continue to increment
    // the purpose of this is just so all of them have a semi-recognizable unique ID
    // So this code will be important but not in this current format I think
    // Probably should sync with a svelte global store as well.
    // this code is temporary and also tweaking
    const lastID_num: string | null = localStorage.getItem('and_node_num')
    let nextNum: number = 0
    if (lastID_num === null) {
        localStorage.setItem('and_node_num', '1')
    } else {
        nextNum = parseInt(lastID_num, 10) + 1
        localStorage.setItem('and_node_num', nextNum.toString())
    }
    const nodeId = `And_${nextNum}`
    localStorage.setItem(`And_Gate_${nextNum}`, nextNum.toString())
    // console.log(storedValue)
    // const store = readable(storedValue ? JSON.parse(storedValue) : initialValue)
    const newDevice: Device = {
        celltype: '$and',
        label: nodeId,
        bits: 0,
    }
    // Update the store when this circuit is generated.
    circuitStore.update((currentCircuit) => {
        // Add the new device with a unique ID, e.g., 'newDeviceId'
        currentCircuit.devices[nodeId] = newDevice
        // Add the new connector
        // currentCircuit.connectors.push(newConnector)

        // Return the updated circuit
        return currentCircuit
    })
</script>

<!-- cursor = drop -->
<Node drop="cursor" id={nodeId} center={true}>
    <img src={image} alt="AND Gate" {width} {height} />
    <LogicGateAnchor location={['left', 'bot']} id={nodeId} io="input" />
    <LogicGateAnchor location={['left', 'top']} id={nodeId} io="input" />
    <LogicGateAnchor location={['right', 'mid']} id={nodeId} io="output" />
</Node>
