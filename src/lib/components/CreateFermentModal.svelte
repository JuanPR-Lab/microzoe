<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { PREDEFINED_TEMPLATES } from '$lib/constants';
  import { saveFerment } from '$lib/services/db';
  import type { Ferment, FermentTemplate, FermentCategory } from '$lib/types';
  import Modal from './Modal.svelte';
  
  // Icons
  import { Search, ChevronRight, LayoutTemplate, Square, FileInput,
    CupSoda,    // Drinks
    Milk,       // Dairy
    Carrot,     // Veggies
    Croissant,  // Breads
    Sprout,     // Grains
    Soup        // Others
  } from 'lucide-svelte';

  const dispatch = createEventDispatcher();

  // STATE
  let step = 1; // 1: Name/Search, 2: Category (Conditional), 3: Structure
  let name = '';
  let selectedCategory: FermentCategory | null = null;
  let selectedTemplate: FermentTemplate | null = null;

  // Categories for Step 2
  const CATEGORIES: FermentCategory[] = ['Drinks', 'Dairy', 'Vegetables', 'Breads & Doughs', 'Grains & Legumes', 'Others'];

  // DERIVED STATE: Filter suggestions based on input
  $: suggestions = name.length > 0 
    ? PREDEFINED_TEMPLATES.filter(t => t.name.toLowerCase().includes(name.toLowerCase()))
    : [];

  // --- HANDLERS ---

  // Step 1A: User selects a predefined template (Fast Track)
  function selectSuggestion(template: FermentTemplate) {
    name = template.name;
    selectedCategory = template.category;
    selectedTemplate = template;
    step = 3; // Skip category selection, jump to structure
  }

  // Step 1B: User creates a custom name (Long Track)
  function createCustom() {
    if (!name.trim()) return;
    selectedTemplate = null;
    step = 2; // Go to category selection
  }

  // Step 2: User selects category manually
  function selectCategory(cat: FermentCategory) {
    selectedCategory = cat;
    step = 3;
  }

  // Step 3: Final Creation
  async function finishCreation(useTemplate: boolean) {
    if (!name || !selectedCategory) return;

    const columns = useTemplate && selectedTemplate 
      ? selectedTemplate.columns 
      : ['Pending', 'Active', 'Done']; // Default generic columns if empty

    const newFerment: Ferment = {
      id: crypto.randomUUID(), // Generate unique ID
      name: name,
      category: selectedCategory,
      columns: columns,
      created_at: Date.now(),
      status: 'active'
    };

    await saveFerment(newFerment);
    dispatch('created'); // Tell parent to refresh list
    dispatch('close');   // Close modal
  }
</script>

<Modal on:close={() => dispatch('close')}>
  <span slot="header" class="text-lg font-bold text-emerald-800">
    {#if step === 1} New Ferment
    {:else if step === 2} Choose Category
    {:else} Setup Board {/if}
  </span>

  {#if step === 1}
    <div class="space-y-4">
      <div class="relative">
        <Search class="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="text" 
          bind:value={name}
          placeholder="e.g. Kombucha, Kimchi..." 
          class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          autofocus
        />
      </div>

      <div class="space-y-2">
        {#each suggestions as template}
          <button 
            on:click={() => selectSuggestion(template)}
            class="w-full flex items-center justify-between p-3 hover:bg-emerald-50 rounded-lg text-left group transition-colors"
          >
            <div>
              <span class="font-medium text-gray-800 block">{template.name}</span>
              <span class="text-xs text-gray-500">{template.category}</span>
            </div>
            <ChevronRight size={18} class="text-gray-300 group-hover:text-emerald-600" />
          </button>
        {/each}

        {#if name.trim().length > 0 && !suggestions.find(s => s.name.toLowerCase() === name.toLowerCase())}
          <button 
            on:click={createCustom}
            class="w-full p-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 mt-4"
          >
            <span>Create new: <strong>"{name}"</strong></span>
          </button>
        {/if}
      </div>
    </div>

  {:else if step === 2}
    <div class="grid grid-cols-2 gap-3">
      {#each CATEGORIES as cat}
        <button 
          on:click={() => selectCategory(cat)}
          class="p-4 border border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-center flex flex-col items-center gap-2 group"
        >
          <div class="p-3 bg-emerald-100 rounded-full text-emerald-600 mb-1 group-hover:bg-emerald-200 transition-colors">
            {#if cat === 'Drinks'}
              <CupSoda size={28} strokeWidth={1.5} />
            {:else if cat === 'Dairy'}
              <Milk size={28} strokeWidth={1.5} />
            {:else if cat === 'Vegetables'}
              <Carrot size={28} strokeWidth={1.5} /> {:else if cat === 'Breads & Doughs'}
              <Croissant size={28} strokeWidth={1.5} /> {:else if cat === 'Grains & Legumes'}
              <Sprout size={28} strokeWidth={1.5} /> {:else}
              <Soup size={28} strokeWidth={1.5} />
            {/if}
          </div>
          
          <span class="text-sm font-medium text-gray-700 group-hover:text-emerald-800">
            {cat}
          </span>
        </button>
      {/each}
    </div>

  {:else if step === 3}
    <div class="space-y-4">
      <p class="text-sm text-gray-600 mb-4">
        How do you want to start your <strong>{name}</strong> board?
      </p>

      <button 
        on:click={() => finishCreation(true)}
        class="w-full p-4 border-2 border-emerald-100 bg-emerald-50 rounded-xl flex items-center gap-4 hover:border-emerald-500 transition-all text-left"
      >
        <div class="bg-emerald-200 p-2 rounded-lg text-emerald-800">
          <LayoutTemplate size={24} />
        </div>
        <div>
          <h4 class="font-bold text-gray-800">Use Example Columns</h4>
          <p class="text-xs text-gray-500">
            {#if selectedTemplate}
              Includes: {selectedTemplate.columns.slice(0, 2).join(', ')}...
            {:else}
              Standard workflow (Pending, Active, Done)
            {/if}
          </p>
        </div>
      </button>

      <button 
        on:click={() => finishCreation(false)}
        class="w-full p-4 border border-gray-200 rounded-xl flex items-center gap-4 hover:border-gray-400 transition-all text-left"
      >
        <div class="bg-gray-100 p-2 rounded-lg text-gray-600">
          <Square size={24} />
        </div>
        <div>
          <h4 class="font-bold text-gray-800">Empty Board</h4>
          <p class="text-xs text-gray-500">Start from scratch</p>
        </div>
      </button>

      <div class="pt-4 text-center">
        <button class="text-sm text-emerald-600 hover:underline flex items-center justify-center gap-2 mx-auto">
          <FileInput size={16} />
          Import template from file
        </button>
      </div>
    </div>
  {/if}
</Modal>