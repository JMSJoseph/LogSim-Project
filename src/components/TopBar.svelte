<script lang="ts">
    import { onMount } from 'svelte';
    
    let imageUrl = '';
    onMount(() => {
        const handleFileClicked = (event: CustomEvent<{ file: { image: string } }>) => {
            imageUrl = event.detail.file.image;
        };

        window.addEventListener('file-clicked', handleFileClicked as EventListener);

        return () => {
            window.removeEventListener('file-clicked', handleFileClicked as EventListener);
        };
    });
</script>

<style>
    .topbar {
        position: fixed; 
        top: 0;
        left: 0;
        right: 0;
        height: 3rem;
        display: flex;
        border-bottom : 1px solid black;
    }

    .topbar button {
        color: black;
    }

</style>

<main>
    <div class="topbar">
        <button>File</button>
        <button>Edit</button>
        <button>Run</button>
        <button>Save</button>
        <button>Recent</button>
        {#if imageUrl}
            <img src={imageUrl} alt="File icon" />
        {/if}
    </div>
</main>

