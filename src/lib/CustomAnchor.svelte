<script lang="ts">
    // import type { Anchor } from 'svelvet'
    import { Anchor } from 'svelvet'
    type LocationY = 'top' | 'bot' | 'mid'
    type LocationX = 'left' | 'right' | 'center'
    type LocationTuple = [LocationX, LocationY]
    export let location: LocationTuple = ['left', 'top']
    export let id
    export let io: 'input' | 'output'
</script>

<div class="{location[0]} {location[1]}">
    <Anchor
        let:linked
        let:hovering
        let:connecting
        id={`${id}_${io}_${location[0]}_${location[1]}`}
        direction={location[0] === 'left' ? 'west' : 'east'}
        input={io === 'input'}
        output={io === 'output'}
        multiple={false}
    >
        <div
            class:linked
            class:hovering
            class:connecting
            class="custom_anchor"
            style="background-color: {io === 'input' ? 'red' : 'green'};"
        ></div>
    </Anchor>
</div>

<style>
    .custom_anchor {
        border-radius: 50%;
        height: 10px;
        width: 10px;
    }
    .top {
        position: absolute;
        top: 21.5%;
    }
    .bot {
        position: absolute;
        top: 58%;
    }
    .mid {
        position: absolute;
        top: 40%;
    }
    .left {
        position: absolute;
        left: 7.5%;
    }
    .right {
        position: absolute;
        right: 10%;
    }
    .center {
        left: calc((100% / 2) - 10px);
    }
</style>
