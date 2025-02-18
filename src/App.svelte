<script lang="ts">
    import SideBar from './components/SideBar.svelte';
    import { asDraggable } from 'svelte-drag-and-drop-actions'

    // this should be made reusable for circuits of different sizes
    // 1/2 of the screen - Half of the dragable item length = perfect center
    let DraggableX = window.innerWidth / 2 - 400 / 2,
        DraggableY = window.innerHeight / 4 - 188 / 2,
        DraggableWidth = 400,
        DraggableHeight = 188

    let ArenaWidth = window.innerWidth,
        ArenaHeight = window.innerHeight

    function onDragMove(x: number, y: number, dx: number, dy: number) {
        DraggableX = x
        DraggableY = y
    }
    function onDragEnd(x: number, y: number, dx: number, dy: number) {
        DraggableX = x
        DraggableY = y
    }

    let andGate: string =
        'https://media.geeksforgeeks.org/wp-content/uploads/20220607100724/andgate.jpg'
</script>

<SideBar />

<main>
    <!-- Dragable Box. It should be its own componenet -->
    <div
        style="
    display:block; position:absolute;
    left:{DraggableX}px; top:{DraggableY}px; width:{DraggableWidth}px; height:{DraggableHeight}px;
    background:forestgreen; color:white; line-height:30px; text-align:center; cursor:move;
  "
        use:asDraggable={{
            minX: 0,
            minY: 0,
            maxX: ArenaWidth - DraggableWidth,
            maxY: ArenaHeight - DraggableHeight,
            onDragStart: { x: DraggableX, y: DraggableY },
            onDragMove,
            onDragEnd,
        }}
    >
        <img
            src={andGate}
            width="400px"
            style="cursor:crosshair"
            alt="and gate"
        />
    </div>
</main>

<style>
    
</style>
