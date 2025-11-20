// src/lib/constants.ts
import type { FermentTemplate } from './types';

/**
 * Master list of predefined fermentation templates.
 * Used to populate the "Add Ferment" wizard.
 * Keys and values are in English for i18n compatibility.
 */
export const PREDEFINED_TEMPLATES: FermentTemplate[] = [
  {
    name: "Kombucha",
    category: "Drinks",
    columns: ["1st Ferment (F1)", "Flavoring (F2)", "Carbonating", "Ready (Fridge)"]
  },
  {
    name: "Water Kefir",
    category: "Drinks",
    columns: ["1st Ferment (Grains)", "Flavoring (F2)", "Carbonating", "Ready (Fridge)"]
  },
  {
    name: "Milk Kefir",
    category: "Dairy",
    columns: ["Fermenting (24h)", "Straining", "Ready (Fridge)", "2nd Ferment (Optional)"]
  },
  {
    name: "Yogurt (Thermophilic)",
    description: "Greek, Bulgarian, Commercial styles. Requires heat.",
    category: "Dairy",
    columns: ["Heating/Cooling Milk", "Incubating (Heat)", "Setting", "Straining", "Ready"]
  },
  {
    name: "Yogurt (Mesophilic)",
    description: "Viili, Piima, Matsoni, Filmjolk. Room temperature.",
    category: "Dairy",
    columns: ["Fermenting (Room Temp)", "Setting", "Ready (Fridge)", "Reserve Mother"]
  },
  {
    name: "Cheese (Generic)",
    description: "Valid for fresh, semi-hard, and hard cheeses.",
    category: "Dairy",
    columns: ["Coagulating", "Draining & Pressing", "Drying", "Salting", "Aging"]
  },
  {
    name: "Sourdough Starter",
    category: "Breads & Doughs",
    columns: ["Just Fed", "Peak Activity", "Discard/Hungry", "Dormant (Fridge)"]
  },
  {
    name: "Sourdough Bread",
    category: "Breads & Doughs",
    columns: ["Autolyse/Mix", "Bulk Fermentation", "Shaping", "Proofing", "Baking"]
  },
  {
    name: "Sauerkraut",
    category: "Vegetables",
    columns: ["Salting/Massaging", "Active Ferment", "Aging", "Ready (Fridge)"]
  },
  {
    name: "Kimchi",
    category: "Vegetables",
    columns: ["Salting/Brining", "Fermenting (Room Temp)", "Slow Ferment (Fridge)", "Ready"]
  },
  {
    name: "Olives",
    category: "Vegetables",
    columns: ["De-bittering (Water changes)", "Brining", "Curing", "Ready to Eat"]
  },
  {
    name: "Pickles (General)",
    category: "Vegetables",
    columns: ["Prep/Brining", "Active Ferment", "Cold Storage", "Ready"]
  },
  {
    name: "Mead",
    category: "Drinks",
    columns: ["Must/Inoculation", "Primary Ferment", "Racking/Clearing", "Aging", "Bottling"]
  },
  {
    name: "Ginger Bug",
    category: "Drinks",
    columns: ["Feeding (Daily)", "Active (Bubbly)", "Dormant (Fridge)", "Reviving"]
  },
  {
    name: "Tepache",
    category: "Drinks",
    columns: ["Fermenting", "Bottling", "Ready (Fridge)"]
  },
  {
    name: "Miso",
    category: "Grains & Legumes",
    columns: ["Prep/Mixing", "Fermenting", "Turning (Optional)", "Aging", "Ready"]
  },
  {
    name: "Tempeh",
    category: "Grains & Legumes",
    columns: ["Soaking/Cooking", "Drying/Inoculating", "Incubating", "Ready"]
  },
  {
    name: "Koji (Rice/Barley)",
    category: "Grains & Legumes",
    columns: ["Soaking/Steaming", "Inoculating", "Incubating (Humidity)", "Harvesting"]
  },
  {
    name: "Natto",
    category: "Grains & Legumes",
    columns: ["Soaking/Cooking", "Inoculating", "Incubating (40°C)", "Aging (Fridge)"]
  },
  {
    name: "Vinegar",
    category: "Others",
    columns: ["Alcohol Ferment", "Acetic Ferment (Mother)", "Aging", "Bottling"]
  },
  {
    "name": "Hot Sauce",
    "category": "Others",
    "columns": ["Mash/Brine Ferment", "Blending", "Pasteurizing (Optional)", "Bottling"]
  },
  {
    "name": "Garum / Amino Sauce",
    "category": "Others",
    "columns": ["Autolysis (Heat/Salt)", "Fermenting", "Filtering", "Aging"]
  },
  {
    "name": "Honey Garlic",
    "category": "Vegetables",
    "columns": ["Active (Daily Turn)", "Aging", "Ready"]
  }
];