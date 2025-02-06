<script lang="ts">
	import { Card, Navbar, Checkbox } from 'flowbite-svelte';
	
	// --- Type Definitions ---
	type AbilityKey = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

	interface Skill {
		name: string;
		proficient: boolean;
	}

	type SkillsMap = {
		[key in AbilityKey]: Skill[];
	};

	// --- Ability State ---
	let abilities = $state({
		STR: 10,
		DEX: 10,
		CON: 10,
		INT: 10,
		WIS: 10,
		CHA: 10
	});

	// Derive ability bonus for each ability
	let abilitiesBonus = $derived({
		STR: getAbilityBonus(abilities.STR),
		DEX: getAbilityBonus(abilities.DEX),
		CON: getAbilityBonus(abilities.CON),
		INT: getAbilityBonus(abilities.INT),
		WIS: getAbilityBonus(abilities.WIS),
		CHA: getAbilityBonus(abilities.CHA)
	});

	// Calculate ability bonus (as a number)
	function getAbilityBonus(score: number): number {
		const mod = Math.floor((score - 10) / 2);
		return mod;
	}

	// Format bonus with sign
	function getBonusString(bonus: number): string {
		return bonus > 0 ? `+${bonus}` : bonus === 0 ? '+0' : String(bonus);
	}

	// --- Skill State ---
	// Each ability key maps to a list of skills (with an initial proficient state).
	let skillsByAbility: SkillsMap = $state({
		STR: [{ name: 'Athletics', proficient: false }],
		DEX: [
			{ name: 'Acrobatics', proficient: false },
			{ name: 'Sleight of Hand', proficient: false },
			{ name: 'Stealth', proficient: false }
		],
		CON: [],
		INT: [
			{ name: 'Arcana', proficient: false },
			{ name: 'History', proficient: false },
			{ name: 'Investigation', proficient: false },
			{ name: 'Nature', proficient: false },
			{ name: 'Religion', proficient: false }
		],
		WIS: [
			{ name: 'Animal Handling', proficient: false },
			{ name: 'Insight', proficient: false },
			{ name: 'Medicine', proficient: false },
			{ name: 'Perception', proficient: false },
			{ name: 'Survival', proficient: false }
		],
		CHA: [
			{ name: 'Deception', proficient: false },
			{ name: 'Intimidation', proficient: false },
			{ name: 'Performance', proficient: false },
			{ name: 'Persuasion', proficient: false }
		]
	});

	let proficiencyBonus = $state(2); // 熟练加值

	// --- Hit Points State ---
	let maxHitPoints = $state(25);
	let currentHitPoints = $state(25);
	
	// --- Hit Dice State ---
	interface HitDice {
	    current: number;
	    max: number;
	    size: 6 | 8 | 10 | 12;
	}
	let hitDice: HitDice = $state({
	    current: 1,
	    max: 1,
	    size: 10
	});

	let tempHp = $state(0);

	// --- Saving Throws State ---
	let savingThrows = $state({
		STR: false,
		DEX: false,
		CON: false,
		INT: false,
		WIS: false,
		CHA: false
	});

	// --- Death Saves State ---
	let deathSaves = $state({
		successes: [false, false, false],
		failures: [false, false, false]
	});
</script>

<div class="bg-background">
	<!-- Basic Info Section -->
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

	<!-- Detailed Panels (Abilities, Status, Equipment) -->
	<div class="p-6">
		<div class="grid grid-cols-3 gap-6">
			<!-- Abilities Panel -->
			<Card class="bg-surface text-content">
				<h3 class="mb-4 text-xl font-semibold">Abilities</h3>
				<div class="space-y-3">
					{#each Object.entries(abilities) as [ability, score]}
						<div class="rounded bg-background-lighter p-2">
							<div class="flex justify-between items-center">
								<span class="text-content-muted">{ability}</span>
								<div class="flex gap-4 items-center">
									<input
										type="number"
										class="w-16 text-center bg-background rounded px-2 py-1 text-content"
										bind:value={abilities[ability as AbilityKey]}
									/>
									<span class="text-accent w-8 text-right">
										{getBonusString(abilitiesBonus[ability as AbilityKey])}
									</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</Card>

			<!-- Status Panel -->
			<Card class="bg-surface text-content">
				<h3 class="mb-4 text-xl font-semibold">Status</h3>
				<div class="space-y-4 rounded bg-background-lighter p-4">
					<div class="flex justify-between items-center">
						<span class="font-semibold">Hit Points:</span>
						<div class="flex items-center">
							<input
								type="number"
								class="w-16 text-center bg-background rounded px-2 py-1 text-content"
								bind:value={currentHitPoints}
							/>
							<span class="mx-1">/</span>
							<input
								type="number"
								class="w-16 text-center bg-background rounded px-2 py-1 text-content"
								bind:value={maxHitPoints}
							/>
						</div>
					</div>
					<div class="flex justify-between items-center">
						<span class="font-semibold">Hit Dice:</span>
						<div class="flex items-center gap-1">
							<input
								type="number"
								class="w-8 text-center bg-background rounded px-2 py-1 text-content"
								bind:value={hitDice.current}
								min="0"
							/>
							<span>/</span>
							<input
								type="number"
								class="w-8 text-center bg-background rounded px-2 py-1 text-content"
								bind:value={hitDice.max}
								min="0"
							/>
							<span class="ml-2">d</span>
							<select
								bind:value={hitDice.size}
								class="w-16 text-center bg-background rounded px-2 py-1 text-content"
							>
								<option value="6">6</option>
								<option value="8">8</option>
								<option value="10">10</option>
								<option value="12">12</option>
							</select>
						</div>
					</div>
					<div class="flex justify-between">
						<span class="font-semibold">Temp HP:</span>
						<span>{tempHp}</span>
					</div>
					<hr class="my-2"/>
					<h4 class="font-semibold">Death Saves</h4>
					<div class="space-y-2">
						<div class="flex items-center space-x-2">
							<span class="w-24">Successes:</span>
							{#each deathSaves.successes as success, index}
								<Checkbox 
									bind:checked={deathSaves.successes[index]}
									id={"death-save-success-" + index}
									class="w-6 h-6 text-green-500 hide-check" />
							{/each}
						</div>
						<div class="flex items-center space-x-2">
							<span class="w-24">Failures:</span>
							{#each deathSaves.failures as failure, index}
								<Checkbox 
									bind:checked={deathSaves.failures[index]}
									id={"death-save-failure-" + index}
									class="w-6 h-6 text-red-500 hide-check" />
							{/each}
						</div>
					</div>
				</div>
			</Card>

			<!-- Equipment Panel -->
			<Card class="bg-surface text-content">
				<h3 class="mb-4 text-xl font-semibold">Basic Info</h3>
				<div class="h-64 rounded bg-background-lighter p-4">
					<p class="text-content-muted">Basic Info placeholder</p>
				</div>
			</Card>
		</div>
	</div>

	<!-- Skills Panel -->
	<div class="min-h-screen p-6">
		<div class="grid grid-cols-3 gap-6">
			<Card class="bg-surface text-content">
				<h3 class="mb-4 text-xl font-semibold">Skills</h3>
				<div class="space-y-3">
					{#each Object.entries(skillsByAbility) as [ability, skills]}
						<div class="rounded bg-background-lighter p-2">
							<div class="flex justify-between items-center mb-2">
								<span class="text-content-muted">{ability}</span>
								<span class="text-accent">
									{getBonusString(abilitiesBonus[ability as AbilityKey])}
								</span>
							</div>
							<div class="ml-4 space-y-1">
								{#each skills as skill}
									<div class="flex justify-between items-center text-sm">
										<div class="flex items-center gap-2">
											<input
												type="checkbox"
												class="w-4 h-4 text-accent rounded bg-background border-surface"
												bind:checked={skill.proficient}
											/>
											<span class="text-content-muted">{skill.name}</span>
										</div>
										<span class="flex gap-4">
											<span class="text-content-subtle">
												{getBonusString(abilitiesBonus[ability as AbilityKey])}
											</span>
											<span class="text-accent">
												{getBonusString(
													abilitiesBonus[ability as AbilityKey] +
														(skill.proficient ? proficiencyBonus : 0)
												)}
											</span>
										</span>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</Card>
		</div>
	</div>
</div>

<style>
	:global(.hide-check:checked) {
		/* Hide the default check mark */
		background-image: none !important;
	}
</style>
