<script lang="ts">
    // import Graph from './lib/Graph.svelte';
    import { Svelvet, Node, Anchor, Minimap } from 'svelvet'
    import AndGate from './lib/AndGate.svelte'
    import type { CSSColorString } from 'svelvet'
    // import the type and the actual object
    import { readable, type Readable } from 'svelte/store'
    // const blackColor: Readable<CSSColorString> = Readable<CSSColorString>("red");
    const blackColor: Readable<CSSColorString> = readable('red')
</script>

<div id="AppBar"></div>
<div id=""></div>
<main>
    <div class="side_menu"></div>
    <div id="svelvet_canvas">
        <Svelvet theme="LogiCap">
            <Minimap width={100} corner="NE" slot="minimap" />
            <AndGate width={80} height={50} />
            <AndGate width={80} height={50} />
        </Svelvet>
    </div>
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
        /* padding-top: 2vh; */
        /* padding-bottom: 2vh; */
        /* padding-block: 2vh; */
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
    #AppBar {
        height: var(--app-bar-height);
        width: 100%;
        background-color: cornflowerblue;
    }
    #svelvet_canvas {
        height: calc(100% - 5vh);
        /* width: max-content; */
        /* Take up the rest of the space in the flex container*/
        flex: 1;
        /* height: calc(100vh - var(--app-bar-height) - 40px); */
    }

    /* .input-1 { */
    /*     position: absolute; */
    /*     top: 14.5%; */
    /*     left: 7.5%; */
    /* } */
    /* .input-2 { */
    /*     position: absolute; */
    /*     top: 51.5%; */
    /*     left: 7.5%; */
    /* } */
    /* .output-1 { */
    /*     position: absolute; */
    /*     top: 35%; */
    /*     right: 10%; */
    /* } */
</style>
