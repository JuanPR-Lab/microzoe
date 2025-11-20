<script lang="ts">
  import "../app.css"; // Import Tailwind styles
  import { page } from '$app/stores'; // To know which URL we are on
  import { onMount } from 'svelte';
  import Logo from '$lib/components/Logo.svelte';
  
  // Icons from Lucide
  import { 
    Menu, 
    ArrowLeft, 
    FlaskConical, 
    Share2, 
    ScrollText, 
    Settings, 
    Info,
    X 
  } from 'lucide-svelte';

  // State for the Sidebar (Drawer)
  let isSidebarOpen = false;

  // Function to toggle sidebar
  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  // Function to close sidebar (used when clicking a link)
  function closeSidebar() {
    isSidebarOpen = false;
  }

  // Reactive statement: Check if we are on the Home page (Dashboard)
  // If pathname is '/', we show Hamburger. Otherwise, Back Arrow.
  $: isHome = $page.url.pathname === '/';

  // Function to go back
  function goBack() {
    window.history.back();
  }
</script>

<div class="min-h-screen bg-gray-50 text-gray-900 font-sans relative overflow-x-hidden">

  <header class="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 z-40">
    
    <div class="flex items-center gap-3">
      {#if isHome}
        <button 
          on:click={toggleSidebar} 
          class="p-2 rounded-md hover:bg-gray-100 text-gray-700"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
        <h1 class="text-xl font-bold text-gray-800 tracking-tight">Microzoe</h1>
      {:else}
        <button 
          on:click={goBack} 
          class="p-2 rounded-md hover:bg-gray-100 text-gray-700"
          aria-label="Go Back"
        >
          <ArrowLeft size={24} />
        </button>
        {/if}
    </div>

    <div id="header-actions">
      </div>
  </header>

  {#if isSidebarOpen}
    <div 
      class="fixed inset-0 bg-black/50 z-50 transition-opacity"
      on:click={closeSidebar}
    ></div>
  {/if}

  <aside 
    class="fixed top-0 left-0 h-full w-[75%] max-w-xs bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out"
    class:translate-x-0={isSidebarOpen}
    class:translate-x-[-100%]={!isSidebarOpen}
  >
    <div class="h-16 flex items-center justify-between px-4 border-b border-gray-100">
      <div class="flex items-center gap-3">
        <Logo />
        <span class="font-bold text-lg text-emerald-900">Microzoe</span>
      </div>
      <button on:click={closeSidebar} class="text-gray-500 hover:text-red-500">
        <X size={24} />
      </button>
    </div>

    <nav class="p-4 space-y-2">
      
      <a href="/manifesto" on:click={closeSidebar} class="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium transition-colors">
        <ScrollText size={20} class="text-emerald-600" />
        <span>Manifesto</span>
      </a>

      <a href="/laboratorium" on:click={closeSidebar} class="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium transition-colors">
        <FlaskConical size={20} class="text-purple-600" />
        <span>Laboratorium</span>
      </a>

      <a href="/zoerelay" on:click={closeSidebar} class="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 text-gray-700 font-medium transition-colors">
        <Share2 size={20} class="text-green-600" />
        <span>ZoeRelay</span>
      </a>

      <div class="border-t border-gray-100 my-2"></div>

      <a href="/settings" on:click={closeSidebar} class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
        <Settings size={20} />
        <span>Settings</span>
      </a>

      <a href="/about" on:click={closeSidebar} class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
        <Info size={20} />
        <span>About</span>
      </a>

    </nav>
  </aside>

  <main class="pt-16 min-h-[calc(100vh-4rem)]">
    <slot />
  </main>

</div>