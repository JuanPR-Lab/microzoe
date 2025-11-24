# 🧬 Microzoe

**Version:** 1.0 | **Status:** In Development (MVP)

## 1. Vision & Philosophy

Microzoe is not just an app; it is a **node of consciousness in a symbiotic planet**. Inspired by Lynn Margulis' biological vision, we understand fermentation as an act of interspecies collaboration.

Our goal is to create a digital tool that respects **user sovereignty** (The Holobiont) while facilitating **community connection** (The Mycelium).

### Core Principles

1.  **Local-First & Offline:** Data belongs to the user and lives on their device. The app must be fully functional without the internet.
2.  **Radical Privacy:** No central servers, no tracking, no corporate accounts.
3.  **Nostr-Native Architecture:** Even when working offline, internal data structures strictly follow the **Nostr** protocol. This allows for future decentralized, censorship-resistant synchronization without rewriting the core.
4.  **Open Source (FOSS):** Knowledge, like life, must be free to evolve.

---

## 2. Technical Architecture

### Tech Stack

* **Frontend:** SvelteKit (TypeScript) + Tailwind CSS.
* **Iconography:** Lucide-Svelte (SVG).
* **State Management (Business Logic):** **XState**. Every fermentation batch is a Finite State Machine to ensure process integrity.
* **Persistence:** IndexedDB (via `idb` library).
* **Cryptography:** `nostr-tools` (signing events locally with `nsec`/`npub` keys).

### Data Model: "Event Sourcing" on Nostr

Instead of a relational database (SQL), we use an immutable event model. This guarantees full traceability and recipe replicability.

* **Ferment (Board)** — `Kind 37733` (NIP-CB)
    * Defines the type (e.g., "Kombucha") and the Kanban column structure.
* **Batch / Origin** — `Kind 30000`
    * The "birth certificate" of a batch. Immutable event containing creation data.
* **Batch / Transition** — `Kind 30001`
    * History log. Every change (moving a column, adding a note, splitting a batch) creates a new event.
* **Batch / Snapshot** — `Kind 30002`
    * Current state. A replaceable event allowing fast UI loading without replaying the whole history.

---

## 3. Application Modules

### A. Dashboard (The Command Center)
The intelligent home screen.

* **Empty State:** Displays the **Manifesto** and a welcome message explaining the project's philosophy.
* **Active State (Customizable Widget Grid):** Once the user starts creating, this screen becomes a customizable dashboard. The user can toggle different widgets:
    * **Urgent Tasks (Default):** Red alerts for batches where the timer has expired.
    * **Active Batches:** List of ongoing fermentations sorted by remaining time.
    * **Finished Batches:** Log of recently completed items.
    * **ZoeRelay Feed (Future):** Latest posts, tips, or crop exchange offers from the community (requires connection).

### B. Laboratorium (The Core)
The personal workspace. Manages processes via **Kanban Boards**.

* **Organization:** Card list representing Ferment Types (Kefir, Sourdough, Sauerkraut).
* **Filters:** Category system (Drinks, Dairy, Veggies, etc.) to organize the lab.
* **Smart Creation:** A modal wizard that allows:
    * Using predefined templates (based on real processes).
    * Creating custom ferments.
    * Importing structures from other users.

### C. Kanban Board (Process Management)
Each ferment type has its own board.

* **Columns (Stages):** Represent the culture's state (e.g., `F1`, `Flavoring`, `Fridge`). Editable.
* **Cards (Batches):** Represent a specific production lot.
    * **Functionality:** Drag & Drop between columns.
    * **Traceability:** Ability to **Duplicate/Split** batches while maintaining a link to the "Parent" batch (e.g., Creating Cheese from a Kefir batch -> The Cheese card shows `Source: #ID_Kefir`).
    * **Logbook:** Each card stores a detailed history of changes and user notes to ensure success can be replicated.

### D. ZoeRelay (Future / Community)
The P2P (Peer-to-Peer) connection module.

* **Exchange:** A decentralized marketplace to offer and request live cultures (Scobys, grains).
* **Knowledge:** A space to share recipes and techniques using the Nostr protocol.

---

## 4. UI/UX Design

### Visual Philosophy
* **Mobile-First:** Designed to be used in the kitchen with one hand. Large buttons (FAB), legible text.
* **Aesthetics:** Clean, scientific yet organic. Uses **Emerald Green** as the primary color.
* **Dark Mode:** Full native support.

### Navigation
* **Top Level (Home):** Hamburger Menu (Slide-over) accessing: Manifesto, Laboratorium, ZoeRelay, Settings.
* **Deep Levels:** The hamburger disappears and is replaced by a smart **Back Arrow** to facilitate quick navigation.

---

## 5. Project Status (Roadmap)

- [x] **Phase 0:** Architecture definition and Visual Design.
- [x] **Phase 1 (In Progress):** Offline MVP Development.
    - [x] SvelteKit + Tailwind implementation.
    - [x] Database Service (IndexedDB).
    - [x] Laboratorium & Kanban Interface.
- [ ] **Phase 2:** Batch Logic implementation (XState) and Local Notification system.
- [ ] **Phase 3:** ZoeRelay integration and Nostr Synchronization.

---

**Repository:** [https://github.com/JuanPR-Lab/microzoe.git]
**Technical Documentation:** See `/docs` folder.
