// Multi-language support
// Default language
let currentLanguage = "en";

// Translations for multiple languages
const translations = {
  en: {
    // English
    selectState: "State",
    selectDistrict: "District",
    selectMarket: "Market",
    selectCommodity: "Commodity",
    selectVariety: "Variety",
    selectGrade: "Grade",
    date: "Date",
    getPrices: "Get Prices",
    loadingData: "Fetching latest price data...",
    noResultsFound:
      "No price data found for your selection. Please try different criteria.",
    errorFetching: "Error fetching price data",
    tryAgainLater: "Please try again later",
    minPrice: "Minimum Price",
    modalPrice: "Modal Price",
    maxPrice: "Maximum Price",
    perQuintal: "per Quintal",
    priceTrends: "Price Trends",
    trendDescription: "See how prices have changed over time",
    nearbyMarkets: "Nearby Market Prices",
    compareRegion: "Compare prices across different markets in your region",
    noNearbyMarkets: "No nearby market data available for this selection.",
    market: "Market",
    district: "District",
    difference: "Difference",
  },
  hi: {
    // Hindi
    selectState: "राज्य",
    selectDistrict: "जिला",
    selectMarket: "मंडी",
    selectCommodity: "फसल",
    selectVariety: "किस्म",
    selectGrade: "ग्रेड",
    date: "तारीख",
    getPrices: "मूल्य जानें",
    loadingData: "नवीनतम मूल्य डेटा प्राप्त कर रहा है...",
    noResultsFound:
      "आपके चयन के लिए कोई मूल्य डेटा नहीं मिला। कृपया अलग मापदंड आजमाएं।",
    errorFetching: "मूल्य डेटा प्राप्त करने में त्रुटि",
    tryAgainLater: "कृपया बाद में पुन: प्रयास करें",
    minPrice: "न्यूनतम मूल्य",
    modalPrice: "सामान्य मूल्य",
    maxPrice: "अधिकतम मूल्य",
    perQuintal: "प्रति क्विंटल",
    priceTrends: "मूल्य प्रवृत्तियां",
    trendDescription: "देखें कि समय के साथ कीमतों में कैसे बदलाव आया है",
    nearbyMarkets: "आस-पास की मंडियों के मूल्य",
    compareRegion: "अपने क्षेत्र की विभिन्न मंडियों में कीमतों की तुलना करें",
    noNearbyMarkets: "इस चयन के लिए कोई आस-पास की मंडी डेटा उपलब्ध नहीं है।",
    market: "मंडी",
    district: "जिला",
    difference: "अंतर",
  },
  ta: {
    // Tamil
    selectState: "மாநிலம்",
    selectDistrict: "மாவட்டம்",
    selectMarket: "சந்தை",
    selectCommodity: "பயிர்",
    selectVariety: "வகை",
    selectGrade: "தரம்",
    date: "தேதி",
    getPrices: "விலைகளைப் பெறுக",
    loadingData: "சமீபத்திய விலை தரவைப் பெறுகிறது...",
    noResultsFound:
      "உங்கள் தேர்வுக்கு விலை தரவு எதுவும் இல்லை. வேறு அளவுகோல்களை முயற்சிக்கவும்.",
    errorFetching: "விலை தரவைப் பெறுவதில் பிழை",
    tryAgainLater: "பின்னர் மீண்டும் முயற்சிக்கவும்",
    minPrice: "குறைந்தபட்ச விலை",
    modalPrice: "சாதாரண விலை",
    maxPrice: "அதிகபட்ச விலை",
    perQuintal: "குவிண்டால் ஒன்றுக்கு",
    priceTrends: "விலை போக்குகள்",
    trendDescription:
      "காலப்போக்கில் விலைகள் எவ்வாறு மாறியுள்ளன என்பதைப் பார்க்கவும்",
    nearbyMarkets: "அருகிலுள்ள சந்தை விலைகள்",
    compareRegion:
      "உங்கள் பகுதியில் உள்ள வெவ்வேறு சந்தைகளில் விலைகளை ஒப்பிடுங்கள்",
    noNearbyMarkets: "இந்த தேர்வுக்கு அருகிலுள்ள சந்தை தரவு எதுவும் இல்லை.",
    market: "சந்தை",
    district: "மாவட்டம்",
    difference: "வேறுபாடு",
  },
  te: {
    // Telugu
    selectState: "రాష్ట్రం",
    selectDistrict: "జిల్లా",
    selectMarket: "మార్కెట్",
    selectCommodity: "పంట",
    selectVariety: "రకం",
    selectGrade: "గ్రేడ్",
    date: "తేదీ",
    getPrices: "ధరలు తెలుసుకోండి",
    loadingData: "తాజా ధర డేటాను పొందుతోంది...",
    noResultsFound:
      "మీ ఎంపిక కోసం ధర డేటా కనుగొనబడలేదు. దయచేసి వేరే ప్రమాణాలను ప్రయత్నించండి.",
    errorFetching: "ధర డేటాను పొందడంలో లోపం",
    tryAgainLater: "దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి",
    minPrice: "కనిష్ట ధర",
    modalPrice: "సాధారణ ధర",
    maxPrice: "గరిష్ట ధర",
    perQuintal: "క్విన్టాల్ ఒక్కింటికి",
    priceTrends: "ధర ధోరణులు",
    trendDescription: "కాలక్రమేణా ధరలు ఎలా మారాయో చూడండి",
    nearbyMarkets: "సమీప మార్కెట్ ధరలు",
    compareRegion: "మీ ప్రాంతంలోని వివిధ మార్కెట్లలో ధరలను పోల్చండి",
    noNearbyMarkets: "ఈ ఎంపిక కోసం సమీప మార్కెట్ డేటా అందుబాటులో లేదు.",
    market: "మార్కెట్",
    district: "జిల్లా",
    difference: "తేడా",
  },
};

// Function to update UI text based on selected language
function updateUILanguage() {
  // Update form labels
  document.querySelector('label[for="state"]').textContent =
    translations[currentLanguage].selectState;
  document.querySelector('label[for="district"]').textContent =
    translations[currentLanguage].selectDistrict;
  document.querySelector('label[for="market"]').textContent =
    translations[currentLanguage].selectMarket;
  document.querySelector('label[for="commodity"]').textContent =
    translations[currentLanguage].selectCommodity;
  document.querySelector('label[for="variety"]').textContent =
    translations[currentLanguage].selectVariety;
  document.querySelector('label[for="grade"]').textContent =
    translations[currentLanguage].selectGrade;
  document.querySelector('label[for="arrival_date"]').textContent =
    translations[currentLanguage].date;

  // Update button text
  document.querySelector('#priceForm button[type="submit"] span').textContent =
    translations[currentLanguage].getPrices;

  // Update loading text
  document.querySelector("#loading p").textContent =
    translations[currentLanguage].loadingData;

  // Update results section text if it exists
  const minPriceLabel = document.querySelector(".min-price h5");
  const modalPriceLabel = document.querySelector(".modal-price h5");
  const maxPriceLabel = document.querySelector(".max-price h5");
  const perQuintalText = document.querySelectorAll(".price-box p");

  if (minPriceLabel)
    minPriceLabel.textContent = translations[currentLanguage].minPrice;
  if (modalPriceLabel)
    modalPriceLabel.textContent = translations[currentLanguage].modalPrice;
  if (maxPriceLabel)
    maxPriceLabel.textContent = translations[currentLanguage].maxPrice;

  perQuintalText.forEach((element) => {
    element.textContent = translations[currentLanguage].perQuintal;
  });

  // Update trends section
  const trendHeader = document.querySelector(".trend-header h3");
  const trendDesc = document.querySelector(".trend-header p");

  if (trendHeader)
    trendHeader.textContent = translations[currentLanguage].priceTrends;
  if (trendDesc)
    trendDesc.textContent = translations[currentLanguage].trendDescription;

  // Update nearby markets section
  const nearbyHeader = document.querySelector(".nearby-header h3");
  const nearbyDesc = document.querySelector(".nearby-header p");
  const noNearbyText = document.querySelector("#no-nearby-markets p");

  if (nearbyHeader)
    nearbyHeader.textContent = translations[currentLanguage].nearbyMarkets;
  if (nearbyDesc)
    nearbyDesc.textContent = translations[currentLanguage].compareRegion;
  if (noNearbyText)
    noNearbyText.textContent = translations[currentLanguage].noNearbyMarkets;

  // Update table headers
  const tableHeaders = document.querySelectorAll(".nearby-markets-card th");
  if (tableHeaders.length >= 6) {
    tableHeaders[0].textContent = translations[currentLanguage].market;
    tableHeaders[1].textContent = translations[currentLanguage].district;
    tableHeaders[5].textContent = translations[currentLanguage].difference;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Initialize date field with today's date
  const today = new Date();
  const formattedDate = today.toISOString().substr(0, 10);
  document.getElementById("arrival_date").value = formattedDate;

  // Initialize chart variable to avoid multiple instances
  let priceChart = null;

  // Set up language switcher
  document.querySelectorAll(".language-option").forEach((option) => {
    option.addEventListener("click", function (e) {
      e.preventDefault();
      currentLanguage = this.getAttribute("data-lang");
      updateUILanguage();
    });
  });

  // Initial language update
  updateUILanguage();

  // Fetch states for dropdown
  fetchStates();

  // Fetch commodities for dropdown
  fetchCommodities();

  // Event listeners for cascading dropdowns
  document.getElementById("state").addEventListener("change", function () {
    fetchDistricts(this.value);
    // Clear district, market, variety, and grade when state changes
    clearSelect("district");
    clearSelect("market");
  });

  document.getElementById("district").addEventListener("change", function () {
    const state = document.getElementById("state").value;
    fetchMarkets(state, this.value);
    // Clear market when district changes
    clearSelect("market");
  });

  document.getElementById("commodity").addEventListener("change", function () {
    fetchVarieties(this.value);
    fetchGrades(this.value);
    // Clear variety and grade when commodity changes
    clearSelect("variety");
    clearSelect("grade");
  });

  // Form submission handler
  document
    .getElementById("priceForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Show loading indicator
      document.getElementById("loading").style.display = "block";
      document.getElementById("results").style.display = "none";
      document.getElementById("no-results").style.display = "none";

      // Get form data
      const formData = new FormData(this);

      // Update metadata display
      document.getElementById("commodity-name").textContent =
        document.getElementById("commodity").options[
          document.getElementById("commodity").selectedIndex
        ].text;
      document.getElementById("market-name").textContent =
        document.getElementById("market").options[
          document.getElementById("market").selectedIndex
        ].text;

      // Send fetch request
      fetch("/get_prices", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Hide loading indicator
          document.getElementById("loading").style.display = "none";

          if (data.records && data.records.length > 0) {
            // Display price data
            displayPriceData(data.records);

            // Display price chart
            if (data.historical_records && data.historical_records.length > 0) {
              displayPriceChart([...data.records, ...data.historical_records]);
            } else {
              displayPriceChart(data.records);
            }

            // Check if the nearby markets container elements exist
            const nearbyMarketsContainer = document.getElementById(
              "nearby-markets-table-container"
            );
            const noNearbyMarkets =
              document.getElementById("no-nearby-markets");

            // Safely display nearby markets if available and elements exist
            if (nearbyMarketsContainer && noNearbyMarkets) {
              if (data.nearby_markets && data.nearby_markets.length > 0) {
                displayNearbyMarkets(
                  data.nearby_markets,
                  data.records[0].Modal_Price
                );
                nearbyMarketsContainer.style.display = "block";
                noNearbyMarkets.style.display = "none";
              } else {
                nearbyMarketsContainer.style.display = "none";
                noNearbyMarkets.style.display = "block";
              }
            }

            // Show results
            document.getElementById("results").style.display = "block";

            // Scroll to results
            document
              .getElementById("results")
              .scrollIntoView({ behavior: "smooth" });
          } else {
            // Show no results message
            document.getElementById("no-results").style.display = "block";
            document.getElementById("no-results-message").textContent =
              translations[currentLanguage].noResultsFound;
          }
        })
        .catch((error) => {
          // Hide loading, show error
          document.getElementById("loading").style.display = "none";

          const noResultsDiv = document.getElementById("no-results");
          const noResultsMessage =
            document.getElementById("no-results-message");

          if (noResultsDiv && noResultsMessage) {
            noResultsDiv.style.display = "block";
            noResultsMessage.textContent = `${translations[currentLanguage].errorFetching}: ${error.message}. ${translations[currentLanguage].tryAgainLater}`;
          }
          console.error("Error:", error);
        });
    });

  // Quick crop selection handlers
  document.querySelectorAll(".crop-card").forEach((card) => {
    card.addEventListener("click", function () {
      const cropName = this.getAttribute("data-crop");
      const commoditySelect = document.getElementById("commodity");

      // Set the commodity dropdown to the selected crop
      for (let i = 0; i < commoditySelect.options.length; i++) {
        if (commoditySelect.options[i].text === cropName) {
          commoditySelect.selectedIndex = i;
          // Trigger change event to update dependent dropdowns
          commoditySelect.dispatchEvent(new Event("change"));
          break;
        }
      }

      // Scroll to price form
      document
        .getElementById("price-checker")
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  // Function to display price data in the UI
  function displayPriceData(records) {
    // Get the most recent record
    const latestRecord = records[0];

    // Update price displays
    document.getElementById("min-price").textContent =
      "₹" + latestRecord.Min_Price;
    document.getElementById("modal-price").textContent =
      "₹" + latestRecord.Modal_Price;
    document.getElementById("max-price").textContent =
      "₹" + latestRecord.Max_Price;
  }

  // Function to display nearby market comparison
  function displayNearbyMarkets(markets, currentModalPrice) {
    // Make sure the table body element exists
    const tableBody = document.getElementById("nearby-markets-table-body");
    if (!tableBody) {
      console.error("Could not find nearby-markets-table-body element");
      return;
    }

    // Clear existing data
    tableBody.innerHTML = "";

    // Safety check for markets array
    if (!Array.isArray(markets) || markets.length === 0) {
      console.log("No nearby markets to display");
      return;
    }

    try {
      // Sort markets by modal price difference
      markets.sort((a, b) => a.Modal_Price - b.Modal_Price);

      markets.forEach((market) => {
        const row = document.createElement("tr");

        // Calculate price difference
        const priceDiff = market.Modal_Price - currentModalPrice;
        const priceDiffClass =
          priceDiff >= 0
            ? "price-difference-positive"
            : "price-difference-negative";
        const priceDiffSign = priceDiff >= 0 ? "+" : "";

        row.innerHTML = `
                    <td>${market.Market || "N/A"}</td>
                    <td>${market.District || "N/A"}</td>
                    <td>₹${market.Min_Price || 0}</td>
                    <td>₹${market.Modal_Price || 0}</td>
                    <td>₹${market.Max_Price || 0}</td>
                    <td class="${priceDiffClass}">${priceDiffSign}₹${Math.abs(
          priceDiff || 0
        )}</td>
                `;

        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error displaying nearby markets:", error);
    }
  }

  // Function to display price chart
  function displayPriceChart(records) {
    try {
      // Make sure we have valid records
      if (!Array.isArray(records) || records.length === 0) {
        console.log("No price records to display in chart");
        return;
      }

      // Make sure the chart element exists
      const chartElement = document.getElementById("priceChart");
      if (!chartElement) {
        console.error("Could not find priceChart element");
        return;
      }

      // Sort records by date
      records.sort(
        (a, b) => new Date(a.Arrival_Date) - new Date(b.Arrival_Date)
      );

      // Format dates and get prices
      const dates = records.map((record) => {
        const date = new Date(record.Arrival_Date);
        return date.toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
        });
      });

      const minPrices = records.map(
        (record) => parseFloat(record.Min_Price) || 0
      );
      const modalPrices = records.map(
        (record) => parseFloat(record.Modal_Price) || 0
      );
      const maxPrices = records.map(
        (record) => parseFloat(record.Max_Price) || 0
      );

      // Show the results section
      document.getElementById("results").style.display = "block";

      // Create or update chart
      const ctx = chartElement.getContext("2d");

      // Destroy previous chart if it exists
      if (window.priceChart) {
        window.priceChart.destroy();
      }

      // Set chart dimensions
      chartElement.style.height = "100%";
      chartElement.style.width = "100%";

      // Create new chart
      window.priceChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Min Price",
              data: minPrices,
              borderColor: "#4caf50",
              backgroundColor: "rgba(76, 175, 80, 0.1)",
              borderWidth: 2,
              tension: 0.1,
              fill: true,
            },
            {
              label: "Modal Price",
              data: modalPrices,
              borderColor: "#2e7d32",
              backgroundColor: "rgba(46, 125, 50, 0.1)",
              borderWidth: 2,
              tension: 0.1,
              fill: true,
            },
            {
              label: "Max Price",
              data: maxPrices,
              borderColor: "#8bc34a",
              backgroundColor: "rgba(139, 195, 74, 0.1)",
              borderWidth: 2,
              tension: 0.1,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            tooltip: {
              mode: "index",
              intersect: false,
              callbacks: {
                label: function (context) {
                  return context.dataset.label + ": ₹" + context.raw.toFixed(2);
                },
              },
            },
            legend: {
              position: "top",
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 12,
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: "Price (₹)",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
              ticks: {
                callback: function (value) {
                  return "₹" + value;
                },
                font: {
                  size: 12,
                },
              },
            },
            x: {
              title: {
                display: true,
                text: "Date",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
          },
        },
      });

      // Log success
      console.log("Price chart created successfully");
    } catch (error) {
      console.error("Error displaying price chart:", error);
    }
  }

  // Helper function to clear a select dropdown
  function clearSelect(selectId) {
    const select = document.getElementById(selectId);
    if (select) {
      select.innerHTML = "";
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.selected = true;
      defaultOption.disabled = true;
      defaultOption.textContent = `Select ${
        selectId.charAt(0).toUpperCase() + selectId.slice(1)
      }`;
      select.appendChild(defaultOption);
    }
  }

  // Fetch states for dropdown
  function fetchStates() {
    fetch("/states")
      .then((response) => response.json())
      .then((data) => {
        const stateSelect = document.getElementById("state");
        data.states.forEach((state) => {
          const option = document.createElement("option");
          option.value = state;
          option.textContent = state;
          stateSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching states:", error));
  }

  // Fetch districts based on selected state
  function fetchDistricts(state) {
    fetch(`/districts?state=${encodeURIComponent(state)}`)
      .then((response) => response.json())
      .then((data) => {
        const districtSelect = document.getElementById("district");
        clearSelect("district");

        data.districts.forEach((district) => {
          const option = document.createElement("option");
          option.value = district;
          option.textContent = district;
          districtSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching districts:", error));
  }

  // Fetch markets based on selected state and district
  function fetchMarkets(state, district) {
    fetch(
      `/markets?state=${encodeURIComponent(
        state
      )}&district=${encodeURIComponent(district)}`
    )
      .then((response) => response.json())
      .then((data) => {
        const marketSelect = document.getElementById("market");
        clearSelect("market");

        data.markets.forEach((market) => {
          const option = document.createElement("option");
          option.value = market;
          option.textContent = market;
          marketSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching markets:", error));
  }

  // Fetch commodities for dropdown
  function fetchCommodities() {
    fetch("/commodities")
      .then((response) => response.json())
      .then((data) => {
        const commoditySelect = document.getElementById("commodity");
        data.commodities.forEach((commodity) => {
          const option = document.createElement("option");
          option.value = commodity;
          option.textContent = commodity;
          commoditySelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching commodities:", error));
  }

  // Fetch varieties based on selected commodity
  function fetchVarieties(commodity) {
    fetch(`/varieties?commodity=${encodeURIComponent(commodity)}`)
      .then((response) => response.json())
      .then((data) => {
        const varietySelect = document.getElementById("variety");
        clearSelect("variety");

        // Check if varieties exist for this commodity
        if (data.varieties && data.varieties.length > 0) {
          data.varieties.forEach((variety) => {
            const option = document.createElement("option");
            option.value = variety;
            option.textContent = variety;
            varietySelect.appendChild(option);
          });
        } else {
          // If no varieties are available, add a default "Any" option
          const option = document.createElement("option");
          option.value = "Any";
          option.textContent = "Any";
          varietySelect.appendChild(option);
        }
      })
      .catch((error) => {
        console.error("Error fetching varieties:", error);
        // In case of error, add a default "Any" option
        const varietySelect = document.getElementById("variety");
        clearSelect("variety");
        const option = document.createElement("option");
        option.value = "Any";
        option.textContent = "Any";
        varietySelect.appendChild(option);
      });
  }

  // Fetch grades based on selected commodity
  function fetchGrades(commodity) {
    fetch(`/grades?commodity=${encodeURIComponent(commodity)}`)
      .then((response) => response.json())
      .then((data) => {
        const gradeSelect = document.getElementById("grade");
        clearSelect("grade");

        // Check if grades exist for this commodity
        if (data.grades && data.grades.length > 0) {
          data.grades.forEach((grade) => {
            const option = document.createElement("option");
            option.value = grade;
            option.textContent = grade;
            gradeSelect.appendChild(option);
          });
        } else {
          // If no grades are available, add a default "Any" option
          const option = document.createElement("option");
          option.value = "Any";
          option.textContent = "Any";
          gradeSelect.appendChild(option);
        }
      })
      .catch((error) => {
        console.error("Error fetching grades:", error);
        // In case of error, add a default "Any" option
        const gradeSelect = document.getElementById("grade");
        clearSelect("grade");
        const option = document.createElement("option");
        option.value = "Any";
        option.textContent = "Any";
        gradeSelect.appendChild(option);
      });
  }
});
