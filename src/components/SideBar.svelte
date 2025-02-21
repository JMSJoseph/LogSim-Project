<script lang="ts">
  
  type Folder = {
    name: string;
    files: {name: string; image: string;}[];
    expanded: boolean;
  };

  let folders: Folder[] = [
    {
      name: 'Wiring',
      files: [
      { name: 'File 1', image: 'path/to/image1.png' },
      { name: 'File 2', image: 'path/to/image2.png' },
    ],
      expanded: false
    },
    {
      name: 'Gates',
      files: [
      { name: 'AND Gate', image: 'https://media.geeksforgeeks.org/wp-content/uploads/20220607100724/andgate.jpg' },
      { name: 'OR Gate', image: 'path/to/image2.png' },
    ],
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
      top: 3.15rem;
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

    .file-item {
    display: flex;
    align-items: center;
  }
    .file-item img {
    width: 45px;
    height: 45px;
    margin-right: 2px;
  }

  .file-item a {
    font-size: 13px;
  }

  </style>
  
  <div class="sidebar">
    {#each folders as folder, index}
    <div class="folder">
      <button on:click={() => toggleFolder(index)}>{folder.name}</button>
      {#if folder.expanded}
        <div class="folder-content">
          {#each folder.files as file}
          <div class="file-item">
            <img src={file.image} alt="File icon">
            <a href="hi">{file.name}</a>
          </div>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
  </div>
  