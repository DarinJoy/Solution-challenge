const API_URL = '/api';
let schemes = [];

// DOM Elements
const schemesContainer = document.getElementById('schemesContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const modal = document.getElementById('schemeModal');
const closeBtn = document.querySelector('.close');
const schemeDetails = document.getElementById('schemeDetails');

// Fetch schemes from the API
async function fetchSchemes() {
    try {
        const response = await fetch(`${API_URL}/schemes`);
        schemes = await response.json();
        displaySchemes(schemes);
    } catch (error) {
        console.error('Error fetching schemes:', error);
        schemesContainer.innerHTML = '<p>Error loading schemes. Please try again later.</p>';
    }
}

// Display schemes in the container
function displaySchemes(schemesToDisplay) {
    schemesContainer.innerHTML = '';
    schemesToDisplay.forEach(scheme => {
        const card = document.createElement('div');
        card.className = 'scheme-card';
        card.innerHTML = `
            <h3>${scheme.name}</h3>
            <p>${scheme.description}</p>
            <span class="category-tag">${scheme.category}</span>
        `;
        card.addEventListener('click', () => showSchemeDetails(scheme));
        schemesContainer.appendChild(card);
    });
}

// Show scheme details in modal
function showSchemeDetails(scheme) {
    schemeDetails.innerHTML = `
        <h2>${scheme.name}</h2>
        <p><strong>Description:</strong> ${scheme.description}</p>
        <p><strong>Eligibility:</strong> ${scheme.eligibility}</p>
        <p><strong>Benefits:</strong> ${scheme.benefits}</p>
        <p><strong>Category:</strong> ${scheme.category}</p>
        <p><strong>Official Website:</strong> <a href="${scheme.link}" target="_blank" class="scheme-link">Visit Website</a></p>
    `;
    modal.style.display = 'block';
}

// Filter schemes based on search and category
function filterSchemes() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredSchemes = schemes.filter(scheme => {
        const matchesSearch = scheme.name.toLowerCase().includes(searchTerm) ||
                            scheme.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || scheme.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    displaySchemes(filteredSchemes);
}

// Event Listeners
searchInput.addEventListener('input', filterSchemes);
searchBtn.addEventListener('click', filterSchemes);
categoryFilter.addEventListener('change', filterSchemes);
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize the application
fetchSchemes(); 