document.getElementById("recommendationForm").addEventListener("submit", recommendCrops);
async function recommendCrops(event) {
    event.preventDefault();

    const soilType = document.getElementById("soilType").value.trim().toLowerCase();
    const season = document.getElementById("season").value.trim().toLowerCase();

    const cropGrid = document.getElementById("cropGrid");
    const noResults = document.getElementById("noResults");

    cropGrid.innerHTML = "";

    // Filter crops
    const filtered = cropList.filter(crop =>
        crop.soilType.toLowerCase() === soilType &&
        crop.season.toLowerCase() === season &&
        crop.status === "Active"
    );

    if (filtered.length === 0) {
        cropGrid.style.display = "none";
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";
    cropGrid.style.display = "grid";

    // Create cards
    filtered.forEach(crop => {
        const card = document.createElement("div");
        card.className = "crop-card";

        card.innerHTML = `
            <div class="crop-card-content">
                <h3 class="crop-title">${crop.name}</h3>
                <p><strong>Soil:</strong> ${crop.soilType}</p>
                <p><strong>Season:</strong> ${crop.season}</p>
                <p><strong>Duration:</strong> ${crop.cropDuration}</p>
                <p><strong>Water:</strong> ${crop.waterRequire}</p>
                <p class="crop-desc">${crop.description}</p>
            </div>
        `;

        cropGrid.appendChild(card);
    });
}