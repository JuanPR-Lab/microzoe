<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllFerments } from '$lib/services/db';
  // Only import the Pencil icon for the customize button
  import { Pencil } from 'lucide-svelte'; 
  
  // STATE MANAGEMENT
  let isLoading = true;
  let hasFerments = false; 

  onMount(async () => {
    // REAL DB CHECK
    // This checks if real ferments exist. If so, it removes the welcome screen.
    const ferments = await getAllFerments();
    
    // Simulate a small aesthetic delay to prevent UI flickering
    setTimeout(() => {
      hasFerments = ferments.length > 0; 
      isLoading = false;
    }, 300);
  });
</script>

<div class="max-w-md mx-auto px-4 py-6 space-y-6">
  
  <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300">
    
    {#if isLoading}
      <div class="animate-pulse space-y-4" aria-busy="true">
        <div class="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-100 rounded w-full"></div>
          <div class="h-4 bg-gray-100 rounded w-5/6"></div>
          <div class="h-4 bg-gray-100 rounded w-4/6"></div>
        </div>
      </div>

    {:else if !hasFerments}
      <div class="text-center space-y-5">
        
        <h2 class="text-2xl font-bold text-gray-800 tracking-tight">
          This is Microzoe
        </h2>
        
        <p class="text-gray-600 leading-relaxed">
          A space to manage your ferments and share experiences.
        </p>
        
        <div class="text-left bg-emerald-50 p-4 rounded-xl text-sm text-emerald-900 space-y-3 border border-emerald-100">
          <p>
            Manage every process in your <strong>Laboratorium</strong> boards and get ready to connect with the community via <strong>ZoeRelay</strong>.
          </p>
          <p>
            To learn about our privacy and open source philosophy, we invite you to read the 
            <a href="/manifesto" class="underline font-semibold hover:text-emerald-600 transition-colors">
              Manifesto
            </a>.
          </p>
        </div>

        <p class="text-xs text-gray-500 italic pt-3 border-t border-gray-100">
          This is your dashboard. Once you start creating, you will see your upcoming tasks here. You can customize it later!
        </p>
      </div>

    {:else}
      <div class="space-y-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">Agenda</h2>
          <span class="text-xs font-medium bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
            Active
          </span>
        </div>
        
        <div class="p-4 border border-dashed border-gray-300 rounded-lg text-center text-gray-400 text-sm">
          No pending tasks... yet.
        </div>
      </div>
    {/if}
  </div>

  {#if !isLoading}
    <div class="flex justify-center opacity-0 animate-fade-in" style="animation-delay: 200ms; opacity: 1;">
      <button class="group flex items-center gap-2 text-gray-400 text-xs hover:text-gray-600 transition-all px-4 py-2 rounded-full hover:bg-gray-100 border border-transparent hover:border-gray-200">
        <Pencil size={14} class="group-hover:scale-110 transition-transform" />
        <span>Customize Dashboard</span>
      </button>
    </div>
  {/if}

</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
</style>
