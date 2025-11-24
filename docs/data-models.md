# 📊 Data Models & Templates

This document outlines the **TypeScript interfaces** used in the application and the **predefined templates** available for users.

---

## 1. TypeScript Interfaces

These interfaces act as an **adapter layer** between the raw **Nostr events** and the **Svelte UI**.

### The Ferment (Board)

```typescript
export interface Ferment {
    id: string;          // Nostr 'd' tag
    name: string;
    category: 'Drinks' | 'Dairy' | 'Vegetables' | 'Breads & Doughs' | 'Grains & Legumes' | 'Others';
    columns: string[];   // List of stage names
    created_at: number;
    status: 'active' | 'archived';
    _rawEvent?: NostrEvent; // Original signed event
}
```

### The Batch (Card)

```typescript
export interface Batch {
    id: string;
    fermentId: string;   // Parent Board ID
    name: string;
    column: string;      // Current Stage
    timerEnd?: number;   // Unix Timestamp (ms)
    notes: string;
    parentId?: string;   // ID of the parent batch (for traceability)
    created_at: number;
    logs: BatchLog[];    // History reconstruction
}
```

---

## 2. Predefined Ferment Templates

These are the default configurations provided in `src/lib/constants.ts`.

### Drinks 🍹

* **Kombucha:** 1st Ferment (F1) -> Flavoring (F2) -> Carbonating -> Ready
* **Water Kefir:** 1st Ferment -> Flavoring -> Carbonating -> Ready
* **Mead:** Must/Inoculation -> Primary Ferment -> Racking -> Aging -> Bottling
* **Tepache:** Fermenting -> Bottling -> Ready
* **Ginger Bug:** Feeding -> Active -> Dormant -> Reviving

### Dairy 🧀

* **Milk Kefir:** Fermenting (24h) -> Straining -> Ready -> 2nd Ferment
* **Yogurt (Thermophilic):** Heating -> Incubating -> Setting -> Straining -> Ready
* **Yogurt (Mesophilic):** Fermenting -> Setting -> Ready -> Reserve Mother
* **Cheese (Generic):** Coagulating -> Draining/Pressing -> Drying -> Salting -> Aging

### Vegetables 🥬

* **Sauerkraut:** Salting -> Active Ferment -> Aging -> Ready
* **Kimchi:** Salting -> Fermenting -> Slow Ferment -> Ready
* **Olives:** De-bittering -> Brining -> Curing -> Ready
* **Pickles:** Prep -> Active Ferment -> Cold Storage -> Ready

### Breads & Doughs 🥐

* **Sourdough Starter:** Just Fed -> Peak Activity -> Discard -> Dormant
* **Sourdough Bread:** Autolyse -> Bulk Fermentation -> Shaping -> Proofing -> Baking

### Grains & Legumes 🌱

* **Miso:** Prep -> Fermenting -> Turning -> Aging -> Ready
* **Tempeh:** Soaking -> Drying -> Incubating -> Ready
* **Koji:** Soaking -> Inoculating -> Incubating -> Harvesting
* **Natto:** Soaking -> Inoculating -> Incubating -> Aging

### Others 🥣

* **Vinegar:** Alcohol Ferment -> Acetic Ferment -> Aging -> Bottling
* **Hot Sauce:** Mash Ferment -> Blending -> Pasteurizing -> Bottling
* **Garum:** Autolysis -> Fermenting -> Filtering -> Aging