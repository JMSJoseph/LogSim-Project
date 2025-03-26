<script lang="ts">
    import UpdateGatesNextIcon from '~icons/streamline/button-fast-forward-2'
    import PlayTickIcon from '~icons/streamline/button-play'
    import ResetStateIcon from '~icons/streamline/interface-arrows-synchronize-arrows-loading-load-sync-synchronize-arrow-reload'
    import PauseTickIcon from '~icons/streamline/button-pause-2'
    import UpdateGatesIcon from '~icons/streamline/entertainment-control-button-next-button-television-buttons-movies-skip-next-video-controls'
    import SaveIcon from '~icons/lucide/save'
    import TrashIcon from '~icons/material-symbols/delete-outline'

    import {
        toggleSimulation,
        updateNext,
        updateTick,
        getRunning,
        getCurrTick,
        resetCircuit,
        circuitEngine,
    } from './circuitEngine.svelte'
    import {
        circuitStore,
        resetCircuitStore,
        saveCircuit,
		downloadCiruit,
    } from './circuitStore'
    import { CustomHeadlessCircuit } from './CustomHeadlessCircuit'

    let { clearCanvas }: { clearCanvas: Function } = $props()

    function runSimulation(
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) {
        toggleSimulation(10)
    }

    function updateGatesNext(
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) {
        updateNext()
    }
    function updateGates(
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) {
        updateTick()
    }

    // don't lose the circuit when reloading the page.
    // this will save the camera position too.

    // save circuit on page reload.
    // works greatish
    window.addEventListener('beforeunload', () => {
        saveCircuit()
    })

    function backupDelete() {
        // what if they clear an empty canvas.
        saveCircuit()
        // save previously deleted.

        const saveDeleted = localStorage.getItem('circuitStoreSave')
        if (!saveDeleted) {
            console.warn(
                'we saved before deleting so this should not be possible'
            )
        } else if (
            // only save non empty circuits to previousCircuitStore.
            saveDeleted === '{"devices":{},"connectors":[],"subcircuits":{}}'
        ) {
            console.warn(
                'EMPTY on delete, do not set prevCircuitStore just empty stores.'
            )
        } else {
            localStorage.setItem('prevCircuitStore', saveDeleted)
        }
        localStorage.removeItem('circuitStoreSave')
        // localStorage.removeItem('state')
    }

    function onTrash() {
        backupDelete()

        resetCircuitStore()

        // clears the currentDevicesData variable in app.svelte
        clearCanvas()
    }
</script>

<div class="menuRunButtons">
    <button
        onclick={runSimulation}
        style="display:flex;align-items: center;padding-block:1px;"
    >
        <div style="margin-left: -8px">
            {#if getRunning()}
                <!-- content here -->
                <PauseTickIcon style="transform:scale(1.8);" width={40} />
            {:else}
                <PlayTickIcon style="transform:scale(1.8);" width={40} />
            {/if}
        </div>
        <p
            style={getRunning() ? 'border-color:green' : 'border-color:red'}
            id="tickNumber"
        >
            {getCurrTick()}
        </p>
    </button>
    <span class="vl"></span>
    <button onclick={updateGates}>
        <UpdateGatesIcon style="transform:scale(2);" width={40} />
    </button>
    <span class="vl"></span>
    <button onclick={updateGatesNext}>
        <UpdateGatesNextIcon style="transform:scale(2.3);" width={50} />
    </button>

    <span class="vl"></span>
    <button onclick={resetCircuit}>
        <ResetStateIcon style="transform:scale(2);" width={40} />
    </button>
    <span class="vl" style="margin-right: 7px"></span>
    <button onclick={() => saveCircuit()}>
        <SaveIcon
            style="transform:scale(2.4); margin-right: -9px;"
            width={40}
        />
    </button>
    <button onclick={onTrash}>
        <TrashIcon
            style="transform:scale(2.69);margin-right: -9px;"
            width={40}
        />
    </button>

	<button onclick={() => downloadCiruit()}>
		SaveToPC
		<!-- This should be an Icon-->
	</button>



</div>

<style>
    .menuRunButtons {
        position: absolute;
        /*    the side menu width should be 22.5% of the main app flexbox */
        transform: scale(0.75);
        left: calc(22.5% - 38px);
        top: 2px;
        z-index: 300;
        display: flex;
        align-items: stretch;
        padding-inline: 5px;
        padding-block: 0px;
        justify-content: space-evenly;
        background-color: lightblue;
        border-radius: 5px;
        border: 3px solid black;
    }

    .vl {
        border: 1px solid black;
        border-radius: 4px;
        background-color: lightblue;
        width: 5px;
        margin-block: 4px;
    }
    .menuRunButtons p {
        background-color: white;
        text-align: right;
        border: 3px solid black;
        border-radius: 5px;
        font-size: 1.8rem;
        padding-inline: 5px;
        min-width: 80px;
        margin-block: 4px;
    }
    .menuRunButtons button {
        padding: 8px;
        margin-inline: 0px;
        max-height: 70px;
        border: none;
        background-color: lightblue;
    }
    :global(.menuRunButtons button:hover svg) {
        color: red;
    }
</style>
