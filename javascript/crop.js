(function() {

// 🌱 ERROR ELEMENT REFERENCES

const nameError = document.getElementById("cropNameError");
const typeError = document.getElementById("cropTypeError");
const durError = document.getElementById("DurationError");
const descError = document.getElementById("descError");
const seasonError = document.getElementById("seasonError");
const waterError = document.getElementById("waterError");
const statusError = document.getElementById("cropStatusError");


// 🌱 CLEAR ERROR ON INPUT

function clear(inputId, errorElement) {
    const input = document.getElementById(inputId);

    if (!input) return;
    input.addEventListener("input", () => {
        errorElement.innerText = "";
        input.classList.remove("input-error");
        input.classList.add("input-success");
    });
}

clear("crop-name", nameError);
clear("crop-cropType", typeError);
clear("crop-duration", durError);
clear("crop-description", descError);
clear("crop-season", seasonError);
clear("crop-water", waterError);
clear("crop-status", statusError);


// 🌱 SHOW ERROR FUNCTION

function showError(inputId, errorElement, message) {
    const input = document.getElementById(inputId);
    errorElement.innerText = message;
    input.classList.add("input-error");
    input.classList.remove("input-success");
}


// 🌱 ADD OR UPDATE CROP (FORM SUBMIT)

async function addCrops(event) {
    event.preventDefault();

    if (window.currentCropId) {
        await editCrop();
        return;
    }

    const nameInput = document.getElementById("crop-name").value.trim();
    const soilId = document.getElementById("crop-soilType").value;
    const cropDuration = document.getElementById("crop-duration").value.trim();
    const description = document.getElementById("crop-description").value.trim();
    const season = document.getElementById("crop-season").value;
    const waterRequire = document.getElementById("crop-water").value;
    const status = document.getElementById("crop-status").value;

    let isValid = true;

    if (!nameInput) {
        showError("crop-name", nameError, "Crop name is required");
        isValid = false;
    }

    if (!soilId) {
        showError("crop-soilType", typeError, "Select the soil type");
        isValid = false;
    }

    if (!cropDuration) {
        showError("crop-duration", durError, "Enter crop duration");
        isValid = false;
    }

    if (!description) {
        showError("crop-description", descError, "Enter description");
        isValid = false;
    }

    if (!season || season === "active") {
        showError("crop-season", seasonError, "Select a season");
        isValid = false;
    }

    if (!waterRequire || waterRequire === "active") {
        showError("crop-water", waterError, "Select water requirement");
        isValid = false;
    }

    if (!status) {
        showError("crop-status", statusError, "Select status");
        isValid = false;
    }

    if (!isValid) return;

    try {
        await axios.post(
    "http://localhost:8080/api/crops/addCrops",
    {
        name: nameInput, // keep comma-separated names in one string
        soil: soilId,
        cropDuration,
        description,
        season,
        waterRequire,
        status
    },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
);
        document.getElementById("crop-form").reset();
        await showAllCrops();
        resetAddCropButton();

    } catch (error) {
        console.log(error);
    }
}

window.addCrops = addCrops;

 
// 🌱 FETCH & SHOW ALL CROPS

let cropList = [];
async function showAllCrops() {
    const cropEmpty = document.getElementById("crop-empty");
    const cropTable = document.getElementById("crop-table-body");
    if (!cropTable) return;
    cropTable.innerHTML = "";

    try {
        const res = await axios.get(
            "http://localhost:8080/api/crops/getCrops",
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        cropList = res.data.allCrops;
        window.cropList=cropList;
        const activeCount = cropList.filter(crop => crop.status === "Active").length;
        document.getElementById("active-crops").innerText = activeCount;
        cropEmpty.style.display = cropList.length === 0 ? "block" : "none";

        cropList.forEach(element => {
            const tr = document.createElement("tr");
            const soilName = element.soil && element.soil.soilType ? element.soil.soilType : element.soil || "";
            tr.innerHTML = `
                <td>${element.name}</td>
                <td>${soilName}</td>
                <td>${element.season}</td>
                <td>${element.waterRequire}</td>
                <td>${element.cropDuration}</td>
                <td>${element.status}</td>
                <td class="actions">
                    <i class="fa-solid fa-pen-to-square edit-icon" onclick="fillCropForm('${element._id}')"></i>
                    <i class="fa-solid fa-trash delete-icon" onclick="removeCrop('${element._id}')"></i>
                </td>
            `;

            cropTable.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
}

async function populateSoilAndCrops() {
    const soilSelect = document.getElementById("crop-soilType");
    const cropSelect = document.getElementById("crop-name");
    if (!soilSelect || !cropSelect) {
        console.log("Crop form not present on this page, skipping populateSoilAndCrops");
        return;
    }

    try {
        const res = await axios.get("http://localhost:8080/api/soil/getSoil", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        const soils = res.data.soils;

        // Populate soil dropdown
        soils.forEach(soil => {
            const option = document.createElement("option");
            option.value = soil._id;
            option.textContent = soil.soilType;
            soilSelect.appendChild(option);
        });

        soilSelect.addEventListener("change", () => {
            cropSelect.innerHTML = '<option value="">Select Crop</option>';

            const selectedSoil = soils.find(s => s._id === soilSelect.value);
            if (!selectedSoil || !selectedSoil.crops || selectedSoil.crops.length === 0) return;

            const option = document.createElement("option");
            option.value = selectedSoil.crops.join(", "); 
            option.textContent = selectedSoil.crops.join(", ");
            cropSelect.appendChild(option);
        });

    } catch (error) {
        console.log("Error fetching soils:", error);
    }
}

document.addEventListener("DOMContentLoaded", populateSoilAndCrops);

// 🌱 FILL FORM FOR UPDATE
function resetAddCropButton() {
    const btn = document.getElementById("add-crop");
    btn.innerHTML = `<i data-lucide="plus"></i> Add Crop`;
    lucide.createIcons();
    window.currentCropId = null;
    document.getElementById("submitBtn1").innerText = "Save Crop";
}
function fillCropForm(id) {
    const crop = cropList.find(c => c._id === id);
    if (!crop) return;

    resetAddCropButton();

    document.getElementById("crop-name").value = crop.name;
    document.getElementById("crop-soilType").value = crop.soil ? crop.soil._id : "";
    document.getElementById("crop-duration").value = crop.cropDuration;
    document.getElementById("crop-description").value = crop.description;
    document.getElementById("crop-season").value = crop.season;
    document.getElementById("crop-water").value = crop.waterRequire;
    document.getElementById("crop-status").value = crop.status;

    document.getElementById('add-crop').innerHTML = `
        <i data-lucide="pen-square" width="18" height="18"></i> Update Crop
    `;
    lucide.createIcons();
    window.currentCropId = crop._id;
    document.getElementById("submitBtn1").innerText = "Update Crop";
    openModal('crop');
}

window.fillCropForm = fillCropForm;
const cancelBtn = document.getElementById("cancel-btn");
if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
        resetAddCropButton();
    });
}


// 🌱 UPDATE CROP
async function editCrop() {
    try {
        const id = window.currentCropId;

        const nameInput = document.getElementById("crop-name").value.trim();
        const soilId = document.getElementById("crop-soilType").value;
        const cropDuration = document.getElementById("crop-duration").value.trim();
        const description = document.getElementById("crop-description").value.trim();
        const season = document.getElementById("crop-season").value;
        const waterRequire = document.getElementById("crop-water").value;
        const status = document.getElementById("crop-status").value;

        await axios.put(
            `http://localhost:8080/api/crops/updateCrops/${id}`,
            { name: nameInput, soil: soilId, cropDuration, description, season, waterRequire, status },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        document.getElementById("crop-form").reset();
        window.currentCropId = null;
        await showAllCrops();

    } catch (error) {
        console.log(error);
    }
}



// 🌱 DELETE CROP
async function removeCrop(id) {
    const confirmOverlay = document.getElementById("confirmOverlay");
    confirmOverlay.style.display = "flex";

    document.getElementById("confirmDelBtn").onclick = async () => {
        await axios.delete(
            `http://localhost:8080/api/crops/removeCrop/${id}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        confirmOverlay.style.display = "none";
        showAllCrops();
    };

    document.getElementById("confirmCancelBtn").onclick = () => {
        confirmOverlay.style.display = "none";
    };
}

window.removeCrop = removeCrop;


// Recommendation form submit for user
async function showAllCropsInCards() {
    const cropGrid = document.getElementById("cropGrid");
    const noResults = document.getElementById("noResults");

    if (!cropGrid) {
        console.log("No crop grid found on this page.");
        return;
    }

    try {
        const res = await axios.get(
            "http://localhost:8080/api/crops/getCrops",
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        const cropList = res.data.allCrops;
        cropGrid.innerHTML = "";

        if (!cropList || cropList.length === 0) {
            if (noResults) noResults.style.display = "block";
            return;
        } else if (noResults) {
            noResults.style.display = "none";
        }

        cropList.forEach(crop => {
            const cropName = Array.isArray(crop.name)
                ? crop.name.map(n => n.trim()).join(", ")
                : crop.name;

            const soilName = crop.soil && crop.soil.soilType
                ? crop.soil.soilType
                : "N/A";

            const card = document.createElement("div");
            card.className = "crop-card";
            card.innerHTML = `
                <div class="crop-icon">🌱</div>
                <div class="crop-name">${cropName}</div>
                <div class="crop-detail">
                    <span class="crop-detail-label">Soil:</span> 
                    <span>${soilName}</span>
                </div>
                <div class="crop-detail">
                    <span class="crop-detail-label">Season:</span> 
                    <span>${crop.season}</span>
                </div>
                <div class="crop-description">${crop.description}</div>
            `;
            cropGrid.appendChild(card);
        });

    } catch (error) {
        console.log(error);
        if (cropGrid) cropGrid.innerHTML = "<p>Error loading crops.</p>";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem("role");
    if(role === "admin") {
        showAllCrops();
    } else {
        showAllCropsInCards();
    }
    // populateSoilAndCrops();
});
})();