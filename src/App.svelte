<script lang="ts">
    import { Svelvet, Minimap, Controls } from 'svelvet'
    import AndGate from './lib/AndGate.svelte'
    import { circuitStore, type Circuit } from './lib/stores/circuitStore'
    import { HeadlessCircuit } from 'custom_digitaljs'

    // import type { CSSColorString } from 'svelvet'
    // import { readable, type Readable } from 'svelte/store'
    // const blackColor: Readable<CSSColorString> = Readable<CSSColorString>("red");

    // in order to implement dragging circuits from the side menu into the main window
    // we need app.svelte to maintain an array or a global store of the elements currently on the canvas
    // this store already exists I guess
    // the list should then be iterated over in an {each} block.
    // <svelte:component this={component}> or we could make a generic component that took params to become a specific type of circuit
    // This pattern is known as a "Factory Pattern" where a component is dynamically instantiated based on parameters or conditions
    // you would probably need a "key'd" each block for one of these options, not sure which tbh

    // $inspect(lastLinked_0).with(console.log)
    // $inspect(lastLinked_1).with(console.log)
    let testJson = {
        devices: {
            And_864: { celltype: '$and', label: 'And_864', bits: 40 },
            And_865: { celltype: '$and', label: 'And_865', bits: 0 },
            And_866: { celltype: '$and', label: 'And_866', bits: 0 },
        },
        connectors: [],
        subcircuits: {},
    }
    let currentCircuit = new HeadlessCircuit(testJson)
    circuitStore.subscribe((value: Circuit) => {
        // console.log(value.connectors)
        console.log(JSON.stringify(currentCircuit))
    })
</script>

<div id="app_bar"></div>
<div id=""></div>
<main>
    <div class="side_menu"></div>
    <Svelvet theme="LogiCap" TD controls edgeStyle="step" editable={false}>
        <Minimap width={100} corner="NE" slot="minimap" />
        <AndGate nodeStartPos={20} width={80} height={50} />
        <AndGate nodeStartPos={200} width={80} height={50} />
        <AndGate nodeStartPos={200} width={80} height={50} />
    </Svelvet>
</main>

<style>
    :root {
        --app-bar-height: 50px;
        --main-app-flex-height: calc(100vh - var(--app-bar-height));
    }
    main {
        display: flex;
        flex-direction: row;
        width: 100vw;
        max-width: 100vw;
        height: 100vw;
        height: var(--main-app-flex-height);
        padding-inline: calc(1.5vw);
        justify-content: center;
        align-items: center;
        /* max-height: 100vh; */
    }

    :global(.svelvet-node) {
        background: none !important;
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
        width: auto !important;
        height: auto !important;
    }
    :global(.svelvet-wrapper) {
        max-height: calc(100% - 5vh);
        /* Take up the rest of the space in the flex container*/
        flex: 1;
    }
    .side_menu {
        /* width: 30%; */
        flex: 0 0 22.5%;
        height: 100%;
        background-color: plum;
        margin-right: 1.5vw;
        /* In order for the main canvas to render centered when the menu goes
         * away, the main container must have a padding-inline property set
         * when you set this, the padding will cause the side menu to render
         * 1.5vw units away from the left edge of the screen, this offests that
         Probably the only other alternative would be to use javascript to take
         away some css after the menu goes away
         */
        margin-left: -1.5vw;
    }
    #app_bar {
        height: var(--app-bar-height);
        width: 100%;
        background-color: cornflowerblue;
    }
</style>
