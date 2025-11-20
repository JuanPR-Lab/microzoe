// src/lib/types.ts

/**
 * Standard Categories for Fermentation types.
 * Used for filtering the Laboratorium view.
 */
export type FermentCategory = 
    | 'Drinks' 
    | 'Dairy' 
    | 'Vegetables' 
    | 'Breads & Doughs' 
    | 'Grains & Legumes' 
    | 'Others';

/**
 * Structure for the Predefined Templates used in the Creation Wizard.
 * This is purely for UI configuration, not stored in DB.
 */
export interface FermentTemplate {
    name: string;
    category: FermentCategory;
    columns: string[];
    description?: string;
}

/**
 * NOSTR EVENT INTERFACE (NIP-01)
 * This represents the raw data structure as defined by the protocol.
 * We use this interface when signing/verifying data.
 */
export interface NostrEvent {
    id: string;
    pubkey: string;
    created_at: number;
    kind: number;
    tags: string[][];
    content: string;
    sig: string;
}

/**
 * DOMAIN ENTITY: FERMENT (The Board)
 * Represents a 'Kind 37733' Event (NIP-CB) decoded into a usable object.
 */
export interface Ferment {
    id: string;          // Corresponds to the 'd' tag in the Nostr Event
    name: string;        // Extracted from 'title' or 'name' tag
    category: string;    // Custom tag 'category'
    columns: string[];   // Extracted from 'col' tags
    created_at: number;  
    status?: 'active' | 'archived';
    // We keep the raw event reference for syncing later
    _rawEvent?: NostrEvent; 
}

/**
 * DOMAIN ENTITY: BATCH (The Card)
 * Represents the current state (Snapshot) of a batch.
 * Corresponds to 'Kind 30002' Event.
 */
export interface Batch {
    id: string;          // Unique ID
    fermentId: string;   // The ID of the board it belongs to
    name: string;
    column: string;      // Current stage/column ID
    timerEnd?: number;   // Timestamp (ms) for the alarm
    notes: string;
    parentId?: string;   // For lineage/traceability (e.g. Cheese from Kefir)
    created_at: number;
    logs: BatchLog[];    // Array of historical actions
    // We keep the raw event reference for syncing later
    _rawEvent?: NostrEvent;
}

/**
 * History Log Entry
 * Represents the specific action taken (Transition).
 * Derived from 'Kind 30001' Events.
 */
export interface BatchLog {
    timestamp: number;
    action: 'CREATED' | 'MOVED' | 'NOTE' | 'DUPLICATED' | 'ALERT';
    details: string;
    fromColumn?: string;
    toColumn?: string;
}