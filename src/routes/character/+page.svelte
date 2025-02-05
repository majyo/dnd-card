<script lang="ts">
	import { Card, Navbar } from 'flowbite-svelte';
	
	// 添加能力值响应式变量
	let abilities = {
		STR: 10,
		DEX: 10,
		CON: 10,
		INT: 10,
		WIS: 10,
		CHA: 10
	};

	// 添加响应式声明
	$: modifiers = {
		STR: getModifier(abilities.STR),
		DEX: getModifier(abilities.DEX),
		CON: getModifier(abilities.CON),
		INT: getModifier(abilities.INT),
		WIS: getModifier(abilities.WIS),
		CHA: getModifier(abilities.CHA)
	};

	// 能力加值计算函数
	function getModifier(score: number) {
		const mod = Math.floor((score - 10) / 2);
		return mod > 0 ? `+${mod}` : mod === 0 ? '±0' : mod;
	}
</script>
<div class="bg-background">
   	<!-- Basic Info Row -->
	<Navbar class="bg-surface text-content shadow-lg">
		<div class="grid grid-cols-4 gap-4 w-full p-4">
			<!-- Character Avatar -->
			<div class="col-span-1">
				<div class="h-32 w-32 rounded-full bg-background-lighter"></div>
			</div>
			<!-- Basic Stats -->
			<div class="col-span-3 space-y-2">
				<h2 class="text-2xl font-bold">Character Name</h2>
				<div class="grid grid-cols-3 gap-4">
					<div class="rounded bg-background-lighter p-3">
						<p class="text-content-muted">Level</p>
						<p class="text-xl">5</p>
					</div>
					<div class="rounded bg-background-lighter p-3">
						<p class="text-content-muted">Class</p>
						<p class="text-xl">Warrior</p>
					</div>
					<div class="rounded bg-background-lighter p-3">
						<p class="text-content-muted">Race</p>
						<p class="text-xl">Human</p>
					</div>
				</div>
			</div>
		</div>
	</Navbar>
    <div class="min-h-screen p-6">
    	<!-- Detailed Info Row -->
    	<div class="grid grid-cols-3 gap-6">
    		<!-- Ability Panel -->
    		<Card class="bg-surface text-content">
    			<h3 class="mb-4 text-xl font-semibold">Abilities</h3>
    			<div class="space-y-2">
    				{#each Object.entries(abilities) as [ability, score]}
    					<div class="flex justify-between items-center rounded bg-background-lighter p-2">
    						<span class="text-content-muted">{ability}</span>
    						<div class="flex gap-4 items-center">
    							<input
    								type="number"
    								class="w-16 text-center bg-background rounded px-2 py-1 text-content"
    								bind:value={abilities[ability as keyof typeof abilities]}
    							/>
    							<span class="text-accent w-8 text-right">
    								{modifiers[ability as keyof typeof modifiers]}
    							</span>
    						</div>
    					</div>
    				{/each}
    			</div>
    		</Card>

    		<!-- Status Panel -->
    		<Card class="bg-surface text-content">
    			<h3 class="mb-4 text-xl font-semibold">Status</h3>
    			<div class="h-64 rounded bg-background-lighter p-4">
    				<p class="text-content-muted">Status placeholder</p>
    			</div>
    		</Card>

    		<!-- Equipment Panel -->
    		<Card class="bg-surface text-content">
    			<h3 class="mb-4 text-xl font-semibold">Equipment</h3>
    			<div class="h-64 rounded bg-background-lighter p-4">
    				<p class="text-content-muted">Equipment placeholder</p>
    			</div>
    		</Card>
    	</div>
    </div>
	<div class="min-h-screen p-6">
		<div class="grid grid-cols-3 gap-6">
			<Card class="bg-surface text-content">
				<h3 class="mb-4 text-xl font-semibold">Skills</h3>
				<div class="h-64 rounded bg-background-lighter p-4">
					<p class="text-content-muted">Skills placeholder</p>
				</div>

			</Card>
		</div>
	</div>

</div>
