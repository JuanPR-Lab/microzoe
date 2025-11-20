<script lang="ts">
  import { Plus } from 'lucide-svelte';
</script>

<button
  on:click
  class="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
  aria-label="Add new"
>
  <Plus size={32} strokeWidth={2.5} />
</button>