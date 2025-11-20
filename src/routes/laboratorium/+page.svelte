<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllFerments } from '$lib/services/db';
  import type { Ferment, FermentCategory } from '$lib/types';
  import Fab from '$lib/components/Fab.svelte';
  import CreateFermentModal from '$lib/components/CreateFermentModal.svelte';
  
  // Icons
  import { 
    Search, Filter, Archive, HelpCircle, MoreVertical, 
    FlaskConical, 
    CupSoda, // Drinks
    Milk,       // Dairy
    Carrot,      // Vegetables 
    Croissant,   // Breads 
    Sprout,     // Grains 
    Soup        // Others
  } from 'lucide-svelte';

  // STATE
  let ferments: Ferment[] = [];
  let isLoading = true;
  let selectedCategory: FermentCategory | 'All' = 'All';
  
  // MODAL STATE
  let isCreateModalOpen = false;

  // CATEGORIES FOR FILTER BAR
  const categories: (FermentCategory | 'All')[] = [
    'All', 'Drinks', 'Dairy', 'Vegetables', 'Breads & Doughs', 'Grains & Legumes', 'Others'
  ];

  // LOAD DATA
  onMount(async () => {
    await loadFerments();
  });

  async function loadFerments() {
    isLoading = true;
    ferments = await getAllFerments();
    isLoading = false;
  }

  // REACTIVE FILTERING
  $: filteredFerments = selectedCategory === 'All' 
    ? ferments 
    : ferments.filter(f => f.category === selectedCategory);

  // HANDLERS
  function handleFabClick() {
    isCreateModalOpen = true;
  }

  function handleFermentCreated() {
    loadFerments(); 
    isCreateModalOpen = false;
  }
</script>

<div class="pb-24"> 

  <div class="bg-white shadow-sm sticky top-16 z-30 border-b border-gray-100">
    <div class="px-4 py-3 flex items-center justify-between">
      <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
        Your Ferments
        <span class="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {filteredFerments.length}
        </span>
      </h2>
      <button class="p-2 text-gray-500 hover:bg-gray-50 rounded-full">
        <MoreVertical size={20} />
      </button>
    </div>

    <div class="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
      {#each categories as category}
        <button
          class="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors
          {selectedCategory === category 
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
            : 'bg-gray-100 text-gray-600 border border-transparent hover:bg-gray-200'}"
          on:click={() => selectedCategory = category}
        >
          {category}
        </button>
      {/each}
    </div>
  </div>

  <div class="p-4">
    
    {#if isLoading}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
        <div class="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>

    {:else if ferments.length === 0}
      <div class="flex flex-col items-center justify-center py-12 text-center space-y-4 opacity-80">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2">
          <FlaskConical size={40} class="text-gray-400" strokeWidth={1.5} />
        </div>
        <h3 class="text-xl font-semibold text-gray-700">Laboratorium is Empty</h3>
        <p class="text-gray-500 max-w-xs">
          You haven't started any ferment yet. Tap the button below to create your first batch!
        </p>
      </div>

    {:else if filteredFerments.length === 0}
      <div class="text-center py-12 text-gray-400">
        <p>No ferments found in this category.</p>
        <button 
          class="text-emerald-600 font-medium mt-2 hover:underline"
          on:click={() => selectedCategory = 'All'}
        >
          Clear filters
        </button>
      </div>

    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each filteredFerments as ferment (ferment.id)}
          <a href="/laboratorium/{ferment.id}" class="block bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all group relative">
            <div class="flex justify-between items-start mb-2">
              <div class="flex items-center gap-3">
                
                <div class="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  {#if ferment.category === 'Drinks'} <CupSoda size={20} />
                  {:else if ferment.category === 'Dairy'} <Milk size={20} />
                  {:else if ferment.category === 'Vegetables'} <Carrot size={20} />
                  {:else if ferment.category === 'Breads & Doughs'} <Croissant size={20} />
                  {:else if ferment.category === 'Grains & Legumes'} <Sprout size={20} />
                  {:else} <Soup size={20} /> {/if}
                </div>

                <div>
                  <h3 class="font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">
                    {ferment.name}
                  </h3>
                  <span class="text-xs text-gray-500">{ferment.category}</span>
                </div>
              </div>
              <button 
                on:click|preventDefault|stopPropagation={() => alert('Menu for ' + ferment.name)}
                class="text-gray-400 hover:text-gray-600 p-1"
              >
                <MoreVertical size={18} />
              </button>
            </div>
            <div class="mt-4 flex items-center gap-4 text-xs text-gray-500">
              <span class="flex items-center gap-1">
                <div class="w-2 h-2 rounded-full bg-gray-300"></div>
                0 Batches
              </span>
              <span class="flex items-center gap-1">
                <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                Active
              </span>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>

  <Fab on:click={handleFabClick} />

  {#if isCreateModalOpen}
    <CreateFermentModal 
      on:close={() => isCreateModalOpen = false} 
      on:created={handleFermentCreated}
    />
  {/if}

</div>