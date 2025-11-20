<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { X } from 'lucide-svelte';
  import { fade, scale } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  // Cerrar al pulsar tecla ESC
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div 
  class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  transition:fade={{ duration: 200 }}
  on:click|self={close}
  role="dialog"
  aria-modal="true"
>
  <div 
    class="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
    transition:scale={{ duration: 200, start: 0.95 }}
  >
    <div class="flex justify-between items-center p-4 border-b border-gray-100">
      <slot name="header">
        <h3 class="text-lg font-bold text-gray-800">Microzoe</h3>
      </slot>
      <button on:click={close} class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
        <X size={20} />
      </button>
    </div>

    <div class="p-6 overflow-y-auto">
      <slot />
    </div>
  </div>
</div>