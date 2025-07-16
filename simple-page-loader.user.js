// ==UserScript==
// @name         Simple Page Loader
// @namespace    http://tampermonkey.net/
// @version      2025-07-16
// @description  A simple script with a button and an input field to open multiple tabs of a specific page.
// @author       You
// @match        https://www.ivacbd.com/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // --- 1. Define the appearance of the control panel ---
    // This uses GM_addStyle to add CSS to the page safely.
    GM_addStyle(`
        #simple-loader-panel {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #ffffff;
            border: 1px solid #cccccc;
            padding: 15px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-family: sans-serif;
        }
        #simple-loader-panel h3 {
            margin: 0 0 5px 0;
            font-size: 16px;
            color: #333;
            text-align: center;
        }
        #loader-input {
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            width: 150px;
            text-align: center;
        }
        #loader-button {
            padding: 10px 15px;
            cursor: pointer;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            color: white;
            background-color: #007bff;
            transition: background-color 0.2s ease;
        }
        #loader-button:hover {
            background-color: #0056b3;
        }
    `);

    // --- 2. Create the HTML for the control panel ---
    // A simple div that will contain our input field and button.
    const panelContainer = document.createElement('div');
    panelContainer.id = 'simple-loader-panel';
    panelContainer.innerHTML = `
        <h3>Page Loader</h3>
        <input type="number" id="loader-input" placeholder="Number of tabs" value="5">
        <button id="loader-button">Load Pages</button>
    `;

    // Add the panel to the page's body once the page has loaded.
    document.body.appendChild(panelContainer);

    // --- 3. Define the function that performs the action ---
    function openPagesInNewTabs() {
        // Find the input field in the document
        const numTabsInput = document.getElementById('loader-input');
        // Get the number from the input, or default to 5 if it's empty/invalid
        const numberOfTabs = parseInt(numTabsInput.value, 10) || 5;
        // **IMPORTANT**: Set the URL you want to open here
        const targetUrl = 'https://www.ivacbd.com/';

        console.log(`Attempting to open ${numberOfTabs} tabs for the URL: ${targetUrl}`);

        // Loop to open the specified number of tabs
        for (let i = 0; i < numberOfTabs; i++) {
            // window.open() opens a new tab. It returns null if a popup blocker stops it.
            const newTab = window.open(targetUrl, '_blank');

            // Check if the tab was blocked by a popup blocker
            if (!newTab) {
                alert('Popup blocked! Please allow popups for this site and then click the button again.');
                // Stop the loop if popups are blocked
                break;
            }
        }
    }

    // --- 4. Attach the function to the button's click event ---
    // Get the button from the document and tell it to run our function when clicked.
    const loadButton = document.getElementById('loader-button');
    loadButton.addEventListener('click', openPagesInNewTabs);

})();
