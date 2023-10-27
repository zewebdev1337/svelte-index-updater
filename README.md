# Svelte Index Updater

This npm package is a utility script for Svelte projects that automatically updates `index.js` files in each subdirectory of the `./src` directory. It scans through the `./src` directory recursively and for each subdirectory, it checks for Svelte files.

For each Svelte file, it updates the corresponding `index.js` file in the same directory to include an export statement for each file.

If the `index.js` file does not exist, it creates one. This allows for easier importing of components from a directory, enabling syntax like `import { Component1, Component2 } from './directory'` instead of having to write an import statement for each file.

### How to use:

Install globally ``npm install @zewebdev/svelte-index-updater --global``

Run from the root of your project: ``svelte-index-updater``

Please note that this script script does not handle the removal of non-existent components from the index file. This is a vestigial limitation from the original React version, I might implement this functionality but I can't make promises.
