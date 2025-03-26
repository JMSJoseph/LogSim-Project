import { writable, get } from 'svelte/store'

// Explains the json representation
// https://github.com/tilk/digitaljs

const initialCircuit: Circuit = {
    devices: {},
    connectors: {},
    subcircuits: {},
}

export let circuitStore = writable<Circuit>(initialCircuit)

// reasonable because there is only 1 'connecting' at a time
export let connectingEdge = writable<boolean>(false)

export function resetCircuitStore() {
    circuitStore.update((currentCircuit) => {
        currentCircuit = {
            devices: {},
            connectors: {},
            subcircuits: {},
        }
        return currentCircuit
    })
}

// Link anchor used in customAnchor.svelte mainly
// we could make it $circuitStore.addLinking -> I would preferthat TBH
export function addConnection(fromAnchorId: outputAnchorName, toAnchorId: inputAnchorName) {
    const toNodeId: inputGateName = toAnchorId.substring(toAnchorId.indexOf('_') + 1) as inputGateName

    // instead of push try de-structuring
    circuitStore.update((currCircuit) => {
        if (!(fromAnchorId in currCircuit.connectors)) {
            currCircuit.connectors[fromAnchorId] = new Array()
        }
        // I wanna check if the full array copy is needed here, I think it is tbh
        currCircuit.connectors[fromAnchorId] = [...currCircuit.connectors[fromAnchorId], [toNodeId, toAnchorId]]
        console.log(currCircuit.connectors);
        return currCircuit
    })
}

export function removeConnection(inputAnchorId: string) {
    circuitStore.update((currCircuit) => {
        const newConnectors: SvelvetConnectors = {}
        for (const fromAnchorId in currCircuit.connectors) {

            // Filter out any connections that match the `toAnchorId`
            // This logic would also remove duplicates, could be good or bad.
            newConnectors[fromAnchorId as outputAnchorName] = [...currCircuit.connectors[fromAnchorId as outputAnchorName].filter(
                ([, anchorId]) => { return anchorId !== inputAnchorId }
            )]

        }
        // console.log(newConnectors);
        currCircuit.connectors = newConnectors
        return currCircuit;
    });
}


// the info that we will extract from the svelvet save.
type NodeInfoList = {
    nodeType: string
    uuid: string
    position: { x: number; y: number }
}[]

// SAVE RELATED CODE //

// filters the svelvet library store for the data that we need.
function filterSvelvetSave(saveJsonText: string) {
    const saveJson: SvelvetSave = JSON.parse(saveJsonText)

    if (saveJson.nodes.length === 0) {
        console.warn('save json exists but there are no nodes')
        return null
    }

    const savedNodeNames: NodeInfoList = saveJson.nodes.map(
        (node: SvelvetNode) => {
            let [nodeType, uuid] = node.id.substring(2).split('_')
            return { nodeType, uuid, position: node.position }
        }
    )
    return savedNodeNames
}

function getLsItem(lsKey: string): string | null {
    return localStorage.getItem(lsKey) || (console.warn(`No saved "${lsKey}" found in localStorage.`), null)
}


// saves positions from svelvet save to circuitStore, in memory
function savePositionsToCircuitStore() {
    // this is an arrow function because this function kinda loads -> and saves
    // and it could be a separate function, I want it to be at least named getSvelvetSave
    // so im wrapping for the naming.
    const getSvelvetSave = () => getLsItem("state")
    const saveJsonText = getSvelvetSave()

    // early return, state not found in localStorage
    if (saveJsonText === null) return null

    const savedNodeNames: NodeInfoList | null = filterSvelvetSave(saveJsonText)

    // state exists but there are no nodes.
    if (savedNodeNames === null) return null

    // create saved nodes on canvas.
    circuitStore.update((currCircuit) => {
        savedNodeNames.forEach(({ nodeType, uuid, position }) => {
            const nodeName = `${nodeType}_${uuid}`
            currCircuit.devices[nodeName].position = position
        })
        return currCircuit
    })
}

// save the current circuit store to localStorage
function saveCircuitStoreToLS() {
    const circuitStoreSave: string | null = getLsItem("circuitStoreSave")

    // getLsItem might warn that circuitStoreSave does not exist, in this case
    // we are creating it for the first time, thats okay

    localStorage.setItem('circuitStoreSave', JSON.stringify(get(circuitStore)))
}


export function clickSvelvetSave() {

    const svelvetSaveButton = document.querySelector('.save-button')
    const mouseEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
    })
    // const mouseEventUp = new MouseEvent('mouseup', { bubbles: true })
    svelvetSaveButton?.dispatchEvent(mouseEvent)
    // some error handling?
}

// this is essentially a sync with localStorage.
// Sync svelvet by clicking its button through clickListener, (I could probably find the function they use on this button lol, sounds like a good idea)
// 
export async function saveCircuit() {
    // click on the hidden svelvet button, the button is in "theme toggle" but I set it to display: none,
    // and now we trigger it with css, after it triggers we use the svelvet json positions to set our digitial js positions
    // the digitalJS save is the main save and we are just piggybacking off the svelvet save a bit
    // the svelvet save does save our camera position and stuff though.
    clickSvelvetSave()

    savePositionsToCircuitStore()

    saveCircuitStoreToLS()

}

type NodeId = string
type InputAnchorId = string
type OutputAnchorId = string
type ConnectionTuple = [NodeId, InputAnchorId]
type SvelvetConnection = Array<ConnectionTuple | NodeId>
// AnchorId will always be anchorId's for output nodes. all input linkings are dependent on output ones
// the anchor id's in the generated html are A-{ourId} or B-{ourId}, maybe this
// is causing issues with reloading output anchors that have multiple edges/wires.
// Maybe the linking issues could also be solved by passing {connections} directly into anchors.
type SvelvetConnections = Map<OutputAnchorId, SvelvetConnection>

// I tried out a global solution below, maybe if I could get the links to be null after loading all of the nodes
// Then set the links, it might trigger a re-render
// export let savedConnections: Writable<SvelvetConnections | {default: }> = writable({})



// I think the saveas button needs to be made spereralty but this might require a server i cant find any sources
export function downloadCiruit(){
	saveCircuit();
	// => Turn the current Circuuit into a file ...
	
	const circuitBlob = new Blob([localStorage.getItem('circuitStoreSave')], {type: 'text/plain'});
	const jsonObjectUrl = URL.createObjectURL(circuitBlob);
	const defaultFilename = "Circuit.logicap";


	// Creates the elemet to do the dowload
	const anchorEl = document.createElement("a");
	anchorEl.href = jsonObjectUrl;
	anchorEl.download = defaultFilename;

	// Trigger's the download
	anchorEl.click();

	// Clean up
	URL.revokeObjectURL(jsonObjectUrl);


}