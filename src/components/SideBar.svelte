<script lang="ts">
  type Folder = {
    name: string;
    files: string[];
    expanded: boolean;
  };

  let folders: Folder[] = [
    {
      name: 'Folder 1',
      files: [ 'File 1', 'File 2'],
      expanded: false
    },
    {
      name: 'Folder 2',
      files: [ 'File 1', 'File 2'],
      expanded: false
    },
    {
      name: 'Folder 3',
      files: [ 'File 1', 'File 2'],
      expanded: false
    },
  ];

  function toggleFolder(index: number) {
    folders = folders.map((folder, i) => {
      if (i === index) {
        folder.expanded = !folder.expanded;
      }
      return folder;
    });
  }
</script>

<style>
    .sidebar {
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: white;
      padding-top: 20px;
      border-right: black 1px solid;
    }
  
    .sidebar a, .folder button  {
      padding: 15px 20px;
      text-decoration: none;
      font-size: 18px;
      color: black;
      display: block;
    }
  
    .sidebar a:hover, .folder button:hover {
      background-color: #575757;
    }

    .folder-content {
    padding-left: 20px;
  }
  </style>
  
  <div class="sidebar">
    {#each folders as folder, index}
    <div class="folder">
      <button on:click={() => toggleFolder(index)}>{folder.name}</button>
      {#if folder.expanded}
        <div class="folder-content">
          {#each folder.files as file}
            <a href="hi">{file}</a>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
  </div>
  