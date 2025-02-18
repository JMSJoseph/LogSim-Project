<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'

	let show = true;
  
	function toggleItem(n){
		let item = document.getElementById("menu_cat_"+n);
		if(item.style.display !== "block"){
			item.style.display = "block";
		} else {
			item.style.display = "none";
  	}

	}

  const gates = [
		["NOT Gate", 	()=>console.log("NOT Gate")],
		["Buffer", 		()=>console.log("Buffer")],
		["AND", 			()=>console.log("AND Gate")],
		["OR Gate",  	()=>console.log("OR Gate")],
		["NAND Gate", ()=>console.log("NAND Gate")],
		["NOR Gate", 	()=>console.log("NOR Gate")],
		["XOR Gate", 	()=>console.log("XOR Gate")],
		["NXOR Gate", ()=>console.log("NXOR Gate")],
		// Optional
		["Odd Parity", ()=>console.log("Odd Parity")],
		["Even Parity", ()=>console.log("Even Parity")],
		["Controlled Buffer", ()=>console.log("Controlled Buffer")],
		["Controlled Inverter", ()=>console.log("Controlled Inverter")]
		]; 

	

</script>

<main>
  <div 
		id = "main_menu" 
		class = "main_menu" 
		style = {show ? "left: 0%": "left: -20%"}
		>
		 
		{#snippet menuItem(itemName, itemLinkingFunction)}
			<div 
				class = "menu_item"
				>
				<!-- Image Files should be named acouring to this format ./src/assets/itemName.png-->
				
				<button 
					class = "menu_item_button"
					onclick = {()=>itemLinkingFunction()}
					>
					<img 
					src={"./src/assets/Place Holder.png"} 
					alt = {itemName + " Circut Pictogram"}
					class = "menu_item_image"
					/>
					{itemName}
				</button>
			</div>
		{/snippet}

		<!-- items is expected to be a 2d array with the inner array of this format
			{itemName, itemLinkingFunction} 
			labels must be unique per cat
		-->
		{#snippet menuCat(label, items)}
			<button 
				onclick={()=>{toggleItem(label)}}
				class = "menu_cat_button"
				> 
				{label}
			</button>
			
			<div 
				id = {"menu_cat_"+label}
				class = "menu_cat" 
				>
				{#each items as item}
					{@render menuItem(item[0], item[1])}
				{/each}
			</div>
			<br>
		{/snippet}
		
		
		{@render menuCat("Basic", gates)}
		
		{@render menuCat("Basic2", gates)}

		
		
	
	</div>
		
  <button onclick={()=>{show=!show}} >collapse menu</button>



</main>

<style>
	.main_menu{
		height: 400%;
		width: 20%;
		background-color:cornflowerblue;
		position: absolute;
    left: 0;
    top: 0;
    transition: left 0.3s ease; /* Smooth transition */
		text-align: left;
	}
	.menu_cat{
		text-indent: 50px;
		display: none;


	}
	.menu_item {
		
		
	}
	.menu_item_image {
		max-width: 40%; /** consider other bounds*/
		max-height: 25px;
		display: inline;
	}
	.menu_item_button {
		align-items: left;
		min-width: 60%;
		text-align: left;
		display: inline-block;
  	vertical-align: middle;
		
	}

	.menu_item_button, .menu_cat_button{

	}

</style>
