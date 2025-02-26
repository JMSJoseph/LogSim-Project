import { writable } from 'svelte/store'

// Explains the json representation
// https://github.com/tilk/digitaljs
export type Device = {
    celltype: string
    label: string
    bits?: number
}

export type LinkData = {
    id: string
    port: string
}

export type ConnectorFrom = Record<'from', LinkData>
export type ConnectorTo = Record<'to', LinkData>
export type ConnectorPiece = ConnectorTo | ConnectorFrom


export type Connector = ConnectorFrom & ConnectorTo

type Subcircuit = {
    devices: Record<string, Device>
    connectors: Connector[]
}

// Device manifest
// Connection manifest
export type Circuit = {
    devices: Record<string, Device>
    connectors: Connector[]
    subcircuits: Record<string, Subcircuit>
}
// NOTE, I changed connectors to a map of "{ nodeId }" : "Connections[]"
// In order to fi


const initialCircuit: Circuit = {
    devices: {},
    connectors: [],
    subcircuits: {},
}

let pendingConnection: ConnectorPiece | null = null
// lol 1550 kinda. The first two people are not allowed in the line and then everybody else is allowed.

function createGlobalTimeoutManager() {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    return {
        start: (callback: () => void, millis: number) => {
            if (timeoutId !== null) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => {
                timeoutId = null
                callback()
            }, millis)
        },
        cancel: () => {
            if (timeoutId !== null) {
                clearTimeout(timeoutId)
                timeoutId = null
            }
        },
    }
}

export let circuitStore = writable<Circuit>(initialCircuit)

// potential problem, if 2 connections are received before timeout ends
// (fixed by canceling timer) there is another implementation where you wait
// for the second one asynchronously instead of being time dependent
// this needs to be tested under extreme lag and/or bad network conditions
// I feel like it will always be instant. But if you assume that and get it
// wrong is it worst than timing it and being able to check ?
function handleAnchorConnection(
    connection: ConnectorPiece,
    updateJsonLinking: (connector: Connector) => void,
) {
    // if there are no pending anchor connections to handle
    // either because an input or output timeout before recieving its
    // counterpart because you recieved 2 inputs our outputs in a connection
    // event if a pair is made in the UI but not in the global store its a big
    // problem
    if (pendingConnection === null) {
        pendingConnection = connection
        // meaning the one that gets false will not update the final store.
        return false
    } else {
        // pendingConnection === null, that means there is already a node
        // connection event sent which is now waiting
        if ('from' in connection === 'from' in pendingConnection) {
            // we received 2 "from" or 2 "to"
            // I hope not because this means there is a big fundamental issue
            console.warn(
                'both parts of connection are the same, ie: 2 inputs or 2 outputs'
            )
        }
        const from = ('from' in connection ? connection : pendingConnection) as ConnectorFrom
        const to = ('to' in connection ? connection : pendingConnection) as ConnectorTo
        // from and to are unique types basically this is XOR case
        const connector: Connector = {
            ...from,
            ...to,
        }
        updateJsonLinking(connector)
        pendingConnection = null
        return true
    }
}

// this logic is kinda weird but I did it to satisfy the single responsibility principal
// as well as the DRY (don't repeat yourself)
// I don't want handleAnchorConnection to have to take a param to specify connect or disconnect
// but that's essentially what this does without making the handleAnchorConnection do more than 1 thing
// by making 2 separate functions and passing in a function for what to do once both nodes send events.
export function handleLinkAnchorConnection(connection: ConnectorPiece) {
    const pushNewLinking = (connector: Connector) => {
        circuitStore.update((currentCircuit) => {
            // Add the new device with a unique ID, e.g., 'newDeviceId'
            currentCircuit.connectors.push(connector)
            // Add the new connector
            // currentCircuit.connectors.push(newConnector)

            // Return the updated circuit
            return currentCircuit
        })
    }
    handleAnchorConnection(connection, pushNewLinking)
}

// TODO: there is a way to restructure the map so that we can search by device and not have to spend all of this time with searching and inserting + shifting
export function handleUnlinkAnchorConnection(connection: ConnectorPiece) {
    const pushNewLinking = (connector: Connector) => {
        circuitStore.update((currentCircuit) => {
            const matchedIndex = currentCircuit.connectors.findIndex(
                (conn) => JSON.stringify(conn) === JSON.stringify(connector)
            )
            // const matchedIndex = currentCircuit.connectors.fi(conn => { console.log(JSON.stringify(connector)); console.log(JSON.stringify(conn)); return JSON.stringify(conn) == JSON.stringify(connection) });
            if (matchedIndex !== -1) {
                // remove 1 element starting from 'matchedIndex'
                currentCircuit.connectors.splice(matchedIndex, 1)
            }
            return currentCircuit
        })
    }
    handleAnchorConnection(connection, pushNewLinking)
}
