# System Architecture

This document details the technical decisions behind Microzoe's "Offline-First" and "Nostr-Native" architecture.

## 1. The "Offline-First" Philosophy

Microzoe is designed to be fully functional without an internet connection. Unlike traditional web apps that treat the client as a display for a server database, Microzoe treats the **client (browser) as the primary source of truth**.

* **Storage:** We use **IndexedDB** (via the `idb` library) to store all application state.
* **Sync (Future):** Synchronization is treated as a background process that happens only when the network is available, pushing local changes to Nostr Relays.

## 2. Data Model: Event Sourcing over Nostr

Instead of storing the current state of a fermentation batch as a simple database row (CRUD), we store the **history of events** that led to that state. This allows for perfect auditability and traceability.

We adhere to the **Nostr Protocol** data structure (NIP-01) even for local storage.

### Event Kinds Strategy

| Entity | Kind | Usage |
| :--- | :--- | :--- |
| **Ferment Board** | `37733` | **NIP-CB (Kanban)**. Defines the board metadata (Name, Category) and the list of Columns (Stages). |
| **Batch Origin** | `30000` | **Immutable**. Created when a batch starts. Contains the recipe ID and initial parameters. |
| **Batch Transition** | `30001` | **Immutable**. Created every time a batch moves columns, receives a note, or is modified. Contains the change delta. |
| **Batch Snapshot** | `30002` | **Replaceable**. Represents the *computed* current state of a batch. The UI reads this event for fast rendering. |

## 3. State Management: XState

Fermentation is a biological process with strict rules. To prevent invalid states (e.g., bottling before fermenting), we use **Finite State Machines (FSM)** via `XState`.

* **One Machine per Batch:** Every batch is an instance of an XState machine.
* **Transitions:** Moving a card in the Kanban board triggers a state transition in the machine.
* **Side Effects:** A successful transition triggers the creation of a signed `Kind 30001` Nostr event and updates the local DB.

## 4. Security & Cryptography

* **Keys:** The user's `nsec` (private key) never leaves the device.
* **Signing:** All events are signed locally using `nostr-tools`.
* **Encryption:** In the future, private batch data will be encrypted (NIP-04 or NIP-44) before being stored or synced, ensuring that only the user can read their lab data.