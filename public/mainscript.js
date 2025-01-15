    'use strict';

    // Add Bootstrap CSS to the document head
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    document.head.appendChild(bootstrapCSS);

    // Add custom CSS for styling, animations, and the navbar button
    const customCSS = document.createElement('style');
    customCSS.innerHTML = `
        nav.navbar {
            background-color: rgb(43, 48, 53) !important;
            color: white;
            position: relative;
        }
        .btn-shine {
            position: absolute;
            top: 50%;
            left: 9.5rem;
            transform: translate(-50%, -50%);
            padding: 12px 48px;
            color: #fff;
            background: linear-gradient(to right, #9f9f9f 0, #fff 10%, #868686 20%);
            background-position: 0;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shine 3s infinite linear;
            animation-fill-mode: forwards;
            font-weight: 600;
            font-size: 16px;
            text-decoration: none;
            white-space: nowrap;
            font-family: "Poppins", sans-serif;
        }
        @keyframes shine {
            0% {
                background-position: 0;
            }
            60% {
                background-position: 180px;
            }
            100% {
                background-position: 230px;
            }
        }
        .search-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            flex-grow: 1;
            padding-right: 15px;
        }
        .input {
            border: 2px solid transparent;
            width: 25em;
            height: 3.5em;
            padding-left: 0.8em;
            outline: none;
            overflow: hidden;
            background-color: #1d2024;
            color: white;
            border-radius: 10px;
            transition: all 0.5s;
        }
        .input:hover,
        .input:focus {
            border: 2px solid #4A9DEC !important;
            box-shadow: 0px 0px 0px 7px rgb(74, 157, 236, 20%) !important;
            background-color: #1d2024 !important;
        }
        #mySkinsContainer {
            display: flex;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 20px; /* Adds spacing between items */
            padding: 20px; /* Adds padding around the grid */
            width: 100%; /* Makes the container take the full width */
            height: calc(100vh - 200px);
            overflow-y: auto; /* Enables vertical scrolling if needed */
            overflow-x: hidden; /* Prevents horizontal scrolling */
            margin: 0 auto; /* Centers the grid in the available space */
        }
        #favoritesContainer {
            display: flex;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 20px; /* Adds spacing between items */
            padding: 20px; /* Adds padding around the grid */
            width: 100%; /* Makes the container take the full width */
            height: calc(100vh - 200px);
            overflow-y: auto; /* Enables vertical scrolling if needed */
            overflow-x: hidden; /* Prevents horizontal scrolling */
            margin: 0 auto; /* Centers the grid in the available space */
        }
        #skinsContainer {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 20px; /* Adds spacing between items */
            padding: 20px; /* Adds padding around the grid */
            width: 100%; /* Makes the container take the full width */
            height: calc(100vh - 200px);
            overflow-y: auto; /* Enables vertical scrolling if needed */
            overflow-x: hidden; /* Prevents horizontal scrolling */
            margin: 0 auto; /* Centers the grid in the available space */
        }
        #skinsContainer::-webkit-scrollbar {
            width: 8px;
        }
        #skinsContainer::-webkit-scrollbar-thumb {
            background-color: #6c757d !important;
            border-radius: 10px !important;
        }
        #skinsContainer::-webkit-scrollbar-track {
            background-color: #1d2024 !important;
        }
        .skinItem {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: scale(0.9);
            filter: blur(10px);
            transition: all 0.5s ease-in-out;
        }
        .skinItem.loaded {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
        }
        .skinItem > img {
            width: 130px; /* Slightly larger for better visibility */
            height: 130px;
            border-radius: 50%;
            border: 3px solid white !important; /* More prominent border */
            object-fit: cover !important;
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .skinItem img:hover {
            transform: scale(1.1);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.5); /* Added hover shadow for better feedback */
        }
        .badge {
            margin-top: 10px;
            font-size: 0.9rem;
            text-align: center;
            background-color: #6c757d !important;
            color: white !important;
            padding: 5px 10px;
            border-radius: 10px;
        }
        .profile-image {
            margin-left: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid white;
        }
        .dropdown-menu.custom-dropdown-menu {
            min-width: 10rem;
            padding: 0.5rem 0;
            font-size: 1.5rem;
            color: var(--bs-body-color);
            background-color: #1d2024 !important;
            border: 1px solid #4A9DEC !important;
            border-radius: 10px !important;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .dropdown-menu.custom-dropdown-menu>li>a {
            display: block;
            padding: 3px 20px !important;
            clear: both;
            font-weight: 400 !important;
            line-height: 1.42857143 !important;
            color: #fafafa !important;
            white-space: nowrap !important;
        }
        .dropdown-menu.custom-dropdown-menu>li>a:hover {
            background-color: #4A9DEC !important;
            color: white !important;
        }
        .dropdown-menu.custom-dropdown-menu .dropdown-item.disabled {
            color: #6c757d !important;
            cursor: not-allowed !important;
        }
        .multi-button {
            display: flex;
            justify-content: center;
            margin: 1rem auto;
            width: fit-content;
        }
        .multi-button > button {
            font-size: 1.2rem;
            padding: 0.5em 1em;
            background: #fff;
            color: #4A5568;
            border: 0px solid #A0AEC0;
            margin: 0.1em;
            transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
            box-shadow: 0 0 0 #BEE3F8;
            transform: translateY(0);
            cursor: pointer;
        }
        .multi-button > button:first-of-type {
            border-radius: 0.5em 0 0 0.5em;
        }
        .multi-button > button:last-of-type {
            border-radius: 0 0.5em 0.5em 0;
        }
        .multi-button > button:hover {
            background: #D53F8C;
            color: #fff;
            box-shadow: 0 0 0.8em 0 rgba(213, 63, 140, 0.8);
            transform: translateY(-0.2em);
        }
        .multi-button > button.active {
            background: #D53F8C !important;
            color: white !important;
            box-shadow: 0 0 0.8em 0 rgba(213, 63, 140, 0.8) !important;
            transform: translateY(-0.2em);
        }
    `;
    document.head.appendChild(customCSS);

    // JavaScript for Tab Switching
function setupTabSwitching() {
    const publicSkinsTab = document.getElementById('publicSkinsTab');
    const mySkinsTab = document.getElementById('mySkinsTab');
    const favoritesTab = document.getElementById('favoritesTab');
    const skinsContainer = document.getElementById('skinsContainer');
    const mySkinsContainer = document.getElementById('mySkinsContainer');
    const favoritesContainer = document.getElementById('favoritesContainer');

    // Function to update tab content
    function switchTab(tabKey) {
        // Hide all containers by default
        skinsContainer.style.display = 'none';
        mySkinsContainer.style.display = 'none';
        favoritesContainer.style.display = 'none';

        if (tabKey === 'public') {
            // Show the skins container for PUBLIC SKINS
            skinsContainer.style.display = 'grid';
            skinsContainer.innerHTML = `
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>`;
            // Fetch and refresh skins when switching to PUBLIC SKINS
            fetchImages()
                .then((images) => {
                    renderImagesLazy(images, skinsContainer);
                    console.log("Public skins refreshed successfully!");
                })
                .catch((error) => {
                    skinsContainer.innerHTML = '<p style="color: red;">Failed to refresh skins. Please try again later.</p>';
                    console.error("Failed to refresh skins:", error);
                });
        } else if (tabKey === 'mySkins') {
            // Display custom content for MY SKINS tab
            mySkinsContainer.style.display = 'flex';
            mySkinsContainer.style.justifyContent = 'center';
            mySkinsContainer.style.alignItems = 'center';
            mySkinsContainer.innerHTML = `
                <div style="text-align: center;">
                    <img src="https://media.tenor.com/hB9OTbewrikAAAAi/work-work-in-progress.gif"
                         alt="Work in Progress"
                         style="max-width: 100%; height: auto; border-radius: 10px;">
                    <p style="color: white; margin-top: 10px;">My Skins Content Coming Soon</p>
                </div>`;
        } else if (tabKey === 'favorites') {
            // Display custom content for FAVORITES tab
            favoritesContainer.style.display = 'flex';
            favoritesContainer.style.justifyContent = 'center';
            favoritesContainer.style.alignItems = 'center';
            favoritesContainer.innerHTML = `
                <div style="text-align: center;">
                    <img src="https://media.tenor.com/hB9OTbewrikAAAAi/work-work-in-progress.gif"
                         alt="Work in Progress"
                         style="max-width: 100%; height: auto; border-radius: 10px;">
                    <p style="color: white; margin-top: 10px;">Favorites Content Coming Soon</p>
                </div>`;
        }

        // Update the active tab button styles
        publicSkinsTab.classList.remove('active');
        mySkinsTab.classList.remove('active');
        favoritesTab.classList.remove('active');

        if (tabKey === 'public') publicSkinsTab.classList.add('active');
        else if (tabKey === 'mySkins') mySkinsTab.classList.add('active');
        else if (tabKey === 'favorites') favoritesTab.classList.add('active');
    }

    // Add event listeners to each tab button
    publicSkinsTab.addEventListener('click', () => switchTab('public'));
    mySkinsTab.addEventListener('click', () => switchTab('mySkins'));
    favoritesTab.addEventListener('click', () => switchTab('favorites'));

    // Set PUBLIC SKINS as the default tab
    switchTab('public');
}


    // URL of the JSON file hosted on GitHub
    const JSON_URL = 'https://raw.githubusercontent.com/GravityGYT/SnayLib/refs/heads/main/images.json';

    // Fetch images from the JSON file
    async function fetchImages() {
        try {
            const response = await fetch(`${JSON_URL}?_=${new Date().getTime()}`);
            if (!response.ok) throw new Error(`Failed to fetch JSON: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching images:', error);
            throw error;
        }
    }

function renderImagesLazy(images, container) {
    container.innerHTML = ''; // Clear previous content

    if (images.length === 0) {
        container.innerHTML = '<p style="color: white;">No skins found.</p>';
        return;
    }

    // Keep track of the currently open dropdown
    let openDropdown = null;

    images.forEach((image, index) => {
        const skinDiv = document.createElement('div');
        skinDiv.className = 'skinItem';
        skinDiv.style.position = 'relative'; // To position the dropdown over the skin

        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.name;

        const badge = document.createElement('span');
        badge.className = 'badge text-bg-secondary';
        badge.textContent = image.name;

        // Create dropdown container
        const dropdownContainer = document.createElement('ul');
        dropdownContainer.className = 'dropdown-menu custom-dropdown-menu dropdown-menu-end';
        dropdownContainer.style.cssText = `
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -200%);
            z-index: 1000;
        `;

        const dropdownItem = document.createElement('li');
        const dropdownLink = document.createElement('a');
        dropdownLink.className = 'dropdown-item';
        dropdownLink.href = '#';

        // Add an image to the left of the "Vip Skin" text
        const badgeImage = document.createElement('img');
        badgeImage.src = './assets/badges/badge4.png';
        badgeImage.alt = 'Badge';
        badgeImage.className = 'badge-image'; // Custom class for badge image
        badgeImage.style.cssText = `
            width: 20px;
            height: 20px;
            margin-right: 8px;
            vertical-align: middle;
            border-radius: 0; /* Prevent any inherited rounding */
            border: none;
            object-fit: contain;
            transition: none !important;
        `;

        dropdownLink.appendChild(badgeImage);
        dropdownLink.appendChild(document.createTextNode('Vip Skin'));

        dropdownLink.addEventListener('click', (event) => {
            event.preventDefault();

            let modifiedUrl = image.url;

            // Replace .jpeg with .png if applicable
            if (modifiedUrl.endsWith('.jpeg')) {
                modifiedUrl = modifiedUrl.replace('.jpeg', '.png');
            }

            // Set modified URL in the input field
            const vipSkinInput = document.getElementById('addVipSkin');
            if (vipSkinInput) {
                vipSkinInput.value = modifiedUrl;
            } else {
                console.warn('Input element with id="addVipSkin" not found.');
            }

            // Run openSkinsList function
            if (typeof openSkinsList === 'function') {
                openSkinsList();
            } else {
                console.warn('Function openSkinsList() not found.');
            }

            // Hide the dropdown menu after action
            dropdownContainer.style.display = 'none';
            openDropdown = null; // Reset the open dropdown tracker
        });

        dropdownItem.appendChild(dropdownLink);
        dropdownContainer.appendChild(dropdownItem);

        skinDiv.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click event from propagating

            // Hide any other open dropdown
            if (openDropdown && openDropdown !== dropdownContainer) {
                openDropdown.style.display = 'none';
            }

            // Toggle the visibility of the clicked skin's dropdown
            const isVisible = dropdownContainer.style.display === 'block';
            dropdownContainer.style.display = isVisible ? 'none' : 'block';
            openDropdown = isVisible ? null : dropdownContainer; // Update the open dropdown tracker
        });

        skinDiv.appendChild(img);
        skinDiv.appendChild(badge);
        skinDiv.appendChild(dropdownContainer);
        container.appendChild(skinDiv);

        // Apply lazy-loading animation with delay
        setTimeout(() => {
            skinDiv.classList.add('loaded');
        }, index * 100); // 100ms delay between each skin
    });

    // Global click listener to hide dropdowns when clicking outside
    document.addEventListener('click', () => {
        if (openDropdown) {
            openDropdown.style.display = 'none';
            openDropdown = null; // Reset the open dropdown tracker
        }
    });
}

    // Main Function
    async function main() {
        const sideButtons = document.querySelector('#main-menu .side-buttons') || await waitForElement('#main-menu .side-buttons');

        // Create the "Public Skins" button
        const button = document.createElement('button');
        //button.textContent = 'Public Skins';
        button.className = 'btn side-btn';
        button.id = 'PublicSkins';
        button.style.cssText = `
            background-color: rgb(139 92 246 / 0%);
            color: white;
            border-radius: 0px;
            padding: 16px 40px;
            font-size: 1.2rem;
            background-image: url(https://i.postimg.cc/wBhr5Ftc/SlF1SEF.png);
        `;

        sideButtons.style.display = 'flex';
        sideButtons.style.flexDirection = 'column';
        sideButtons.style.alignItems = 'center';
        sideButtons.prepend(button);

        // Create the drawer
        const drawer = document.createElement('div');
        drawer.className = 'offcanvas offcanvas-bottom';
        drawer.tabIndex = -1;
        drawer.id = 'publicSkinsDrawer';
        drawer.style.height = '90%';
        drawer.style.backgroundColor = '#1d2024';
        drawer.innerHTML = `
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <div class="search-container">
                <input id="customInputField" class="input" placeholder="Search skins...">
                <div class="dropdown profile-container">
                    <img src="https://i.imgur.com/V4RclNb.png" alt="Profile" class="profile-image dropdown-toggle" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <ul class="dropdown-menu custom-dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <li><a class="dropdown-item" href="#" data-action="logout" style="display: none;">Logout</a></li>
                        <li><a class="dropdown-item" href="#" id="myskins">My Skins</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" id="refreshSkins">Refresh Skins</a></li>
                    </ul>
                </div>
            </div>
            <a href="#" class="btn-shine">PUBLIC Skin library</a>
        </div>
    </nav>
    <div class="multi-button">
        <button id="publicSkinsTab">PUBLIC SKINS</button>
        <button id="mySkinsTab">MY SKINS</button>
        <button id="favoritesTab">❤️</button>
    </div>
    <div class="offcanvas-body">
        <div id="skinsContainer" style="display: none;"></div>
        <div id="mySkinsContainer" style="display: none;"></div>
        <div id="favoritesContainer" style="display: none;"></div>
    </div>
`;

        document.body.appendChild(drawer);


        button.setAttribute('data-bs-toggle', 'offcanvas');
        button.setAttribute('data-bs-target', '#publicSkinsDrawer');

        const skinsContainer = document.getElementById('skinsContainer');
        const customInputField = document.getElementById('customInputField');

        // Tooltip Initialization
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        setupTabSwitching();

                // Refresh Skins Functionality
        document.getElementById('refreshSkins').addEventListener('click', async () => {
            skinsContainer.innerHTML = `
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>`;
            try {
                const images = await fetchImages();
                renderImagesLazy(images, skinsContainer);
                console.log("Skins refreshed successfully!");

                // Update profile picture after refreshing skins
                updateProfilePicture();
            } catch (error) {
                console.log("Failed to refresh skins.");
            }
        });

        try {
            const images = await fetchImages();
            renderImagesLazy(images, skinsContainer);

            // Add search functionality
            customInputField.addEventListener('input', () => {
                const searchTerm = customInputField.value.toLowerCase();
                const filteredImages = images.filter(image => image.name.toLowerCase().includes(searchTerm));
                renderImagesLazy(filteredImages, skinsContainer);
            });
        } catch (error) {
            skinsContainer.innerHTML = '<p style="color: white;">Failed to load skins. Please try again later.</p>';
        }

        // Function to determine the profile picture path
        function getProfilePicturePath(skin) {
            if (!skin) {
                console.warn('Skin value is undefined or null.');
                return 'https://via.placeholder.com/150'; // Default fallback image
            }

            if (skin.startsWith('http')) {
                return skin;
            }

            const skinMappings = {
                Premium: './assets/skins/Premium/',
                Creators: './assets/skins/Creators/',
                Flags: './assets/skins/Flags/',
                Free: './assets/skins/Free/',
                Level: './assets/skins/Level/'
            };

            if (skin.startsWith('YT(')) {
                return `${skinMappings.Creators}${skin}.png`;
            } else if (skin.startsWith('FREE')) {
                return `${skinMappings.Free}${skin}.png`;
            } else if (skin.startsWith('LVL')) {
                return `${skinMappings.Level}${skin}.png`;
            } else if (skin.length === 2) {
                return `${skinMappings.Flags}${skin.toLowerCase()}.png`;
            } else {
                return `${skinMappings.Premium}${skin}.png`;
            }
        }

        // Function to update the profile picture
        function updateProfilePicture() {
            try {
                const skin = protoService?.userInfo?.skin;
                if (!skin) {
                    console.warn('protoService.userInfo.skin is undefined.');
                    return;
                }

                const profilePicturePath = getProfilePicturePath(skin);
                const profileImageElement = document.getElementById('profileDropdown');
                if (profileImageElement) {
                    profileImageElement.src = profilePicturePath;
                    console.log('Profile picture updated successfully:', profilePicturePath);
                } else {
                    console.error('Element with id="profileDropdown" not found.');
                }
            } catch (error) {
                console.error('Error updating profile picture:', error);
            }
        }

        // Call updateProfilePicture every 5 seconds
        setInterval(updateProfilePicture, 5000);

    }

    main();
})();
