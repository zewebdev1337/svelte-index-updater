#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function scanDirectory(directory) {
    fs.readdir(directory, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err}`);
            return;
        }

        files.forEach(file => {
            const fullPath = path.join(directory, file.name);

            if (file.isDirectory()) {
                scanDirectory(fullPath);
            } else if (file.isFile() && file.name.endsWith('.svelte')) {
                updateIndexFile(fullPath, file.name);
            }
        });
    });
}

function updateIndexFile(filePath, fileName) {
    const directory = path.dirname(filePath);
    const indexFilePath = path.join(directory, `index.js`);

    const componentName = fileName.replace('.svelte', '');

    let indexData;
    try {
        indexData = fs.readFileSync(indexFilePath, 'utf8');
    } catch (err) {
        indexData = '';
    }

    const exportLine = `export { default as ${componentName} } from './${fileName}';\n`;

    if (!indexData.includes(exportLine)) {
        indexData += exportLine;
    }

    try {
        fs.writeFileSync(indexFilePath, indexData, 'utf8');
    } catch (err) {
        console.error(`Error writing file: ${err}`);
    }
}

scanDirectory('./src');