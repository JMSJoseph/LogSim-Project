<script>
    import { onMount } from 'svelte'
    import {
        HeadlessCircuit,
        getCellType,
        cells,
        tools,
        engines,
        transform,
        Circuit,
        MonitorView,
        Monitor,
        IOPanelView,
    } from 'custom_digitalJS'

    let paper
    let circuit
    let monitor
    let monitorview
    let iopanel

    const circuitJson = {
        devices: {
            dev0: { type: 'NumEntry', label: 'a', net: 'a', bits: 4 },
            dev1: { type: 'NumDisplay', label: 'o', net: 'o', bits: 4 },
            dev2: {
                type: 'AdditionConst',
                label: 'op',
                bits: { in: 4, out: 4 },
                constant: 1,
            },
            dev3: { type: 'Lamp', label: 'o2', net: 'o2' },
            dev4: {
                type: 'LtConst',
                label: 'op',
                bits: { in: 4 },
                constant: 1,
            },
        },
        connectors: [
            {
                to: { id: 'dev2', port: 'in' },
                from: { id: 'dev0', port: 'out' },
                name: 'a',
            },
            {
                to: { id: 'dev1', port: 'in' },
                from: { id: 'dev2', port: 'out' },
                name: 'o',
            },
            {
                to: { id: 'dev4', port: 'in' },
                from: { id: 'dev0', port: 'out' },
                name: 'a',
            },
            {
                to: { id: 'dev3', port: 'in' },
                from: { id: 'dev4', port: 'out' },
                name: 'o2',
            },
        ],
        subcircuits: [],
    }

    let monitorEle
    let paperEle
    let iopanelEle

    onMount(() => {
        circuit = new Circuit(circuitJson)
        monitor = new Monitor(circuit)
        monitorview = new MonitorView({
            model: monitor,
            el: monitorEle,
        })
        iopanel = new IOPanelView({
            model: circuit,
            el: paperEle,
        })

        circuit.on('new:paper', (p) => {
            p.fixed(false)
        })

        paper = circuit.displayOn(paperEle)
        circuit.start()
    })

    function startSimulation() {
        circuit.start()
    }

    function stopSimulation() {
        circuit.stop()
    }
</script>

<div>
    <button on:click={startSimulation}>▶️ Start</button>
    <button on:click={stopSimulation}>⏹️ Stop</button>
</div>
<div bind:this={paperEle} id="paper"></div>
<div bind:this={monitorEle} id="monitor"></div>
<div bind:this={iopanelEle} id="iopanel"></div>

<style>
    #paper {
        width: 100%;
        height: 500px;
        border: 1px solid black;
    }
</style>
