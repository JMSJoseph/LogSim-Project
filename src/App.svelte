<script lang="ts">
    import Circuit from './lib/Circuit.svelte'

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
    let cutePumpkinCat: string =
        'https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b'
</script>

<main>
    <Circuit />
    <!-- <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} class="logo" alt="Vite Logo" />
        </a>
        <a href="https://svelte.dev" target="_blank" rel="noreferrer">
            <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
        </a>
    </div>

    <!-- Dragable Box. It should be its own componenet -->
</main>

<style>
    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.svelte:hover {
        filter: drop-shadow(0 0 2em #ff3e00aa);
    }
    .read-the-docs {
        color: #888;
    }
</style>
