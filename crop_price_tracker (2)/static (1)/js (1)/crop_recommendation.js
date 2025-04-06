document.addEventListener('DOMContentLoaded', function() {
    // Update range input value badges
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
        const valueDisplay = document.getElementById(`${input.id}-value`);
        
        // Initialize with current value
        if (valueDisplay) {
            valueDisplay.textContent = input.value;
        }
        
        // Update on change
        input.addEventListener('input', function() {
            if (valueDisplay) {
                valueDisplay.textContent = this.value;
            }
        });
    });
    
    // Handle form submission
    const cropForm = document.getElementById('cropRecommendationForm');
    if (cropForm) {
        cropForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loader
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.display = 'block';
            }
            
            // Hide previous result
            const resultCard = document.getElementById('resultCard');
            if (resultCard) {
                resultCard.style.display = 'none';
            }
            
            // Collect form data
            const formData = new FormData(cropForm);
            const params = new URLSearchParams();
            
            for (const [key, value] of formData.entries()) {
                params.append(key, value);
            }
            
            // Make API request
            fetch(`/predict?${params.toString()}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Hide loader
                    if (loader) {
                        loader.style.display = 'none';
                    }
                    
                    // Display results
                    displayResult(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                    
                    // Hide loader
                    if (loader) {
                        loader.style.display = 'none';
                    }
                    
                    alert('Error getting recommendation. Please try again.');
                });
        });
    }
    
    // Function to display crop recommendation results
    function displayResult(data) {
        const resultCard = document.getElementById('resultCard');
        const cropName = data.crop.toLowerCase();
        const cropImage = document.getElementById('cropImage');
        const cropNameElement = document.getElementById('cropName');
        const benefitsElement = document.getElementById('benefits');
        const conditionsElement = document.getElementById('conditions');
        const seasonElement = document.getElementById('season');
        
        if (resultCard && data && data.crop) {
            // Update crop name
            cropNameElement.textContent = capitalizeFirstLetter(data.crop);
            
            // Set default image first
            cropImage.src = '/static/images/default-crop.jpg';
            
            // Then try to load specific crop image
            const specificImage = new Image();
            specificImage.onload = function() {
                cropImage.src = this.src;
            };
            specificImage.src = `/static/images/crops/${cropName}.jpg`;
            
            // Update other elements
            benefitsElement.innerHTML = getCropBenefits(cropName);
            conditionsElement.innerHTML = getGrowingConditions(cropName, data.parameters);
            seasonElement.textContent = getGrowingSeason(cropName);
            
            // Show result card with animation
            resultCard.style.display = 'block';
            resultCard.style.opacity = '0';
            setTimeout(() => {
                resultCard.style.opacity = '1';
            }, 100);
        }
    }
    
    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    
    // Function to get crop benefits (simplified data)
    function getCropBenefits(crop) {
        const benefitsMap = {
            'rice': 'Rich in carbohydrates, essential for energy. Contains vitamins B1, B2, B3, and B6, as well as minerals like manganese and phosphorus.',
            'maize': 'Good source of dietary fiber, vitamins, and minerals. Contains antioxidants beneficial for eye health.',
            'chickpea': 'Excellent source of plant-based protein and fiber. Contains essential nutrients like iron, phosphorus, and B vitamins.',
            'kidneybeans': 'High in protein and fiber, helps maintain healthy blood sugar levels. Rich in folate, iron, and magnesium.',
            'pigeonpeas': 'Great source of protein, dietary fiber, and minerals. Helps improve soil fertility by fixing nitrogen.',
            'mothbeans': 'High in protein and fiber, with low fat content. Drought-resistant crop that is good for sustainable farming.',
            'mungbean': 'Rich in protein, fiber, antioxidants, and phytonutrients. Promotes digestive health and supports heart health.',
            'blackgram': 'High in protein, folate, and B vitamins. Helps in improving soil fertility and sustainable agriculture.',
            'lentil': 'Excellent source of protein and fiber. Rich in folate, iron, and potassium, supporting heart health.',
            'pomegranate': 'Rich in antioxidants, vitamins C and K, and potassium. Supports heart health and has anti-inflammatory properties.',
            'banana': 'Good source of potassium, vitamin B6, and vitamin C. Provides energy and supports heart health.',
            'mango': 'Rich in vitamins A and C, potassium, and antioxidants. Supports eye and immune health.',
            'grapes': 'Contains antioxidants like resveratrol. Supports heart health and has anti-inflammatory properties.',
            'watermelon': 'High water content helps with hydration. Contains vitamins A and C, and the antioxidant lycopene.',
            'muskmelon': 'Good source of vitamins A and C. High water content helps with hydration.',
            'apple': 'Rich in fiber, vitamin C, and antioxidants. Supports heart health and digestive function.',
            'orange': 'Excellent source of vitamin C. Contains fiber and antioxidants supporting immune health.',
            'papaya': 'Rich in vitamins A, C, and E, as well as folate and potassium. Contains papain, which aids digestion.',
            'coconut': 'Contains healthy fats, fiber, and minerals. Versatile crop with multiple uses from food to cosmetics.',
            'cotton': 'Important cash crop providing fiber for textiles. Seeds can be processed for oil and animal feed.',
            'jute': 'Natural fiber used for making eco-friendly packaging and textiles. Contributes to sustainable agriculture.',
            'coffee': 'Contains antioxidants and caffeine. Supports cognitive function and alertness.'
        };
        
        return benefitsMap[crop.toLowerCase()] || 'Nutritional and economic benefits vary based on regional growing conditions and market demand.';
    }
    
    // Function to get growing conditions
    function getGrowingConditions(crop, parameters) {
        let conditions = '';
        
        // General conditions based on the crop
        const generalConditions = {
            'rice': 'Thrives in warm, wet environments with standing water. Requires consistent irrigation.',
            'maize': 'Needs full sun exposure and well-drained soil. Moderate water requirements.',
            'chickpea': 'Grows well in dry, cool climates. Drought-tolerant once established.',
            'kidneybeans': 'Requires warm soil and consistent moisture. Sensitive to frost.',
            'pigeonpeas': 'Drought-tolerant crop that grows in a wide range of soils. Prefers warm climates.',
            'mothbeans': 'Extremely drought-tolerant. Grows in poor soil conditions where other crops fail.',
            'mungbean': 'Requires warm temperatures and moderate rainfall. Short growing season.',
            'blackgram': 'Tolerates high temperatures and moderate drought. Grows in various soil types.',
            'lentil': 'Cool-season crop that prefers well-drained soil. Moderate moisture requirements.',
            'pomegranate': 'Thrives in hot, dry climates. Drought-tolerant once established.',
            'banana': 'Requires consistent warmth and moisture. Sensitive to frost and wind.',
            'mango': 'Needs tropical climate with distinct wet and dry seasons. Drought-tolerant when mature.',
            'grapes': 'Grows best in temperate climates with warm, dry summers and cool winters.',
            'watermelon': 'Requires warm soil, full sun, and consistent moisture. Long growing season.',
            'muskmelon': 'Needs warm soil, full sun, and moderate water. Sensitive to frost.',
            'apple': 'Requires cold winter period for proper dormancy. Prefers well-drained soil.',
            'orange': 'Thrives in subtropical climates with mild winters. Sensitive to frost.',
            'papaya': 'Needs consistent warmth and moisture. Cannot tolerate frost.',
            'coconut': 'Grows in tropical coastal areas with high humidity and rainfall.',
            'cotton': 'Requires long, hot growing season with plenty of sunshine and water.',
            'jute': 'Needs warm, humid conditions with moderate rainfall. Sensitive to drought.',
            'coffee': 'Grows best in shaded, high-altitude tropical areas with moderate temperatures.'
        };
        
        // Get soil and climate recommendations
        conditions = `<li>${generalConditions[crop.toLowerCase()] || 'Specific growing conditions depend on local climate and soil type.'}</li>`;
        
        // Add specific parameter recommendations based on the crop
        if (parameters) {
            conditions += `<li><strong>Soil NPK:</strong> Nitrogen (${parameters.N}), Phosphorus (${parameters.P}), Potassium (${parameters.K})</li>`;
            conditions += `<li><strong>Climate:</strong> Temperature around ${parameters.temperature}°C, Humidity ${parameters.humidity}%, Rainfall ${parameters.rainfall}mm</li>`;
            conditions += `<li><strong>Soil pH:</strong> ${parameters.ph}</li>`;
        }
        
        return conditions;
    }
    
    // Function to get growing season information
    function getGrowingSeason(crop) {
        const seasonMap = {
            'rice': 'Main growing seasons are Kharif (monsoon: June-November) and Rabi (winter: November-May).',
            'maize': 'Can be grown year-round in some regions. Main seasons are Kharif (monsoon) and spring.',
            'chickpea': 'Mainly a Rabi (winter) crop, planted in October-November and harvested in March-April.',
            'kidneybeans': 'Grows best during warm season. Plant after all danger of frost has passed.',
            'pigeonpeas': 'Mainly grown during Kharif season. Long duration crop (6-9 months).',
            'mothbeans': 'Kharif season crop, sown with the onset of monsoon and harvested in 2-3 months.',
            'mungbean': 'Short duration crop (60-90 days). Can be grown in Kharif, Rabi and summer seasons.',
            'blackgram': 'Mainly grown in Kharif season. Short duration crop (70-90 days).',
            'lentil': 'Rabi season crop, sown in October-November and harvested in February-March.',
            'pomegranate': 'Perennial crop with main fruiting seasons in February-March, June-July, and September-October.',
            'banana': 'Perennial crop that produces year-round in tropical conditions.',
            'mango': 'Perennial tree with seasonal fruiting. Main season is April to July depending on variety.',
            'grapes': 'Deciduous perennial vine. Harvesting typically occurs 15-18 months after planting.',
            'watermelon': 'Warm-season annual crop. Requires 80-110 days from sowing to harvest.',
            'muskmelon': 'Warm-season crop requiring 70-90 days from sowing to harvest.',
            'apple': 'Deciduous perennial tree. Fruiting typically occurs in autumn, 4-5 years after planting.',
            'orange': 'Perennial tree with main fruiting season in winter months.',
            'papaya': 'Perennial crop that can produce fruit year-round in optimal conditions.',
            'coconut': 'Perennial crop. Trees begin fruiting 6-10 years after planting and continue for decades.',
            'cotton': 'Mainly Kharif crop. Takes about 150-180 days from sowing to harvest.',
            'jute': 'Mainly grown during March-June. Requires about 120 days from sowing to harvest.',
            'coffee': 'Perennial crop. Trees start producing 3-4 years after planting, with main harvesting seasons varying by region.'
        };
        
        return seasonMap[crop.toLowerCase()] || 'Growing season depends on local climate conditions and specific crop varieties.';
    }
});