# 🤝 Contributing to Microzoe

Welcome to the lab! Microzoe is an Open Source project dedicated to fermenting a free and symbiotic world. We welcome all contributions.

## Prerequisites

Before you start, ensure you have the following installed:
* **Node.js** (v18 or higher)
* **npm** (comes with Node.js)
* **Git**

## getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JuanPR-Lab/microzoe.git
    cd microzoe
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## Project Structure

* `src/lib/`: Contains the core logic, types, and constants.
    * `components/`: Reusable UI components (Buttons, Modals, Cards).
    * `services/`: Logic for Database (IndexedDB) and Nostr interactions.
    * `types.ts`: TypeScript interfaces.
* `src/routes/`: The pages of the application (SvelteKit routing).
    * `laboratorium/`: The main Kanban board logic.

## Code Style

* We use **TypeScript** for type safety. Please define types for your components props.
* We use **Tailwind CSS** for styling. Avoid writing custom CSS in `<style>` tags unless necessary.
* **English Only:** All code (variables, functions, comments) must be in English.

## How to Contribute

1.  Create a new branch for your feature (`git checkout -b feature/amazing-new-thing`).
2.  Commit your changes (`git commit -m 'feat: Add amazing new thing'`).
3.  Push to the branch (`git push origin feature/amazing-new-thing`).
4.  Open a **Pull Request**.

Happy Fermenting! 