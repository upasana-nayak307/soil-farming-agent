(function () {
document.addEventListener("DOMContentLoaded", () => {

    // ------------------ VARIABLE DECLARATIONS ------------------
    const nameError = document.getElementById("soilError");
    const typeError = document.getElementById("typeError");
    const phError = document.getElementById("phError");
    const moisturesError = document.getElementById("moistureError");
    const nutrientsError = document.getElementById("nutrientsError");
    const charactersticsError = document.getElementById("descriptionError");
    const cropsError=document.getElementById("crops");
    const statusError = document.getElementById("statusError");


    // ------------------ VALIDATION HELPERS ------------------
    function clearAndValidate(inputId, errorElement) {
        const input = document.getElementById(inputId);

        if (!input) return;

        input.addEventListener("input", () => {
            errorElement.innerText = "";
            input.classList.remove("input-error");
            input.classList.add("input-success");
        });
    }

    clearAndValidate("soilName", nameError);
    clearAndValidate("soilType", typeError);
    clearAndValidate("phLevel", phError);
    clearAndValidate("moisture", moisturesError);
    clearAndValidate("nutrients", nutrientsError);
    clearAndValidate("description", charactersticsError);
    clearAndValidate("crops",cropsError);
    clearAndValidate("status", statusError);


    function showError(inputId, errorElement, message) {
        const input = document.getElementById(inputId);
        errorElement.innerText = message;
        input.classList.add("input-error");
        input.classList.remove("input-success");
    }


    // ------------------ ADD SOIL ------------------
    async function addingSoil(event) {
        event.preventDefault();

        if (window.currentSoilId) {
            await editSoil();
            return;
        }

        const name = document.getElementById("soilName").value;
        const soilType = document.getElementById("soilType").value;
        const phLevel = document.getElementById("phLevel").value;
        const moistures = document.getElementById("moisture").value;
        const nutrientsInput = document.getElementById("nutrients").value.trim();
        const nutrients = nutrientsInput ? nutrientsInput.split(",") : [];
        const cropsInput=document.getElementById("crops").value.trim();
        const crops= cropsInput ? cropsInput.split(",") : [];
        const characterstics = document.getElementById("description").value;
        const status = document.getElementById("status").value;

        let isValid = true;

        try {
            if (!name) {
                showError("soilName", nameError, "Please enter the soil name");
                isValid = false;
            }
            if (!soilType) {
                showError("soilType", typeError, "Please enter the type");
                isValid = false;
            }
            if (!phLevel) {
                showError("phLevel", phError, "Enter the pH level");
                isValid = false;
            }
            if (!moistures) {
                showError("moisture", moisturesError, "Enter the moisture level");
                isValid = false;
            }
            if (!nutrientsInput) {
                showError("nutrients", nutrientsError, "Enter the nutrients");
                isValid = false;
            }
            if (!characterstics) {
                showError("description", charactersticsError, "Write description shortly");
                isValid = false;
            }
            if(!crops){
                showError("crops",cropsError, "Write the required crops");
                isValid=false;
            }
            if (!status) {
                showError("status", statusError, "Select status");
                isValid = false;
            }

            if (!isValid) return;

            const res = await axios.post("http://localhost:8080/api/soil/addSoil", {
                name,
                soilType,
                phLevel,
                moistures,
                nutrients,
                characterstics,
                crops,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            document.getElementById('soil-form').reset();
            showAllSoils();
            console.log(res.data);

        } catch (error) {
            console.log(error);
        }
    }


// ------------------ FETCH SOILS ------------------
let soilList = [];

async function showAllSoils() {
const soilEmpty = document.getElementById("soil-empty");
const soilTable = document.getElementById("soil-table-body");
const totalSoil=document.getElementById("total-soil");

soilTable.innerHTML = "";

try {
    const res = await axios.get("http://localhost:8080/api/soil/getSoil", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    soilList = res.data.soils;
    totalSoil.innerText = soilList.length;
    if (soilList.length === 0) {
        soilEmpty.style.display = "block";
    } else {
        soilEmpty.style.display = "none";
    }

    soilList.forEach(element => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${element.name}</td>
            <td>${element.phLevel}</td>
            <td>${element.moistures}</td>
            <td>${element.nutrients}</td>
            <td>${element.soilType}</td>
            <td>${element.status}</td>
            <td class="actions">
                <i class="fa-solid fa-pen-to-square edit-icon" onclick="fillSoilForm('${element._id}')"></i>
                <i class="fa-solid fa-trash delete-icon" onclick="removeSoil('${element._id}')"></i>
            </td>
        `;
        soilTable.appendChild(tr);
    });

} catch (error) {
    console.log(error);
}
}

// showing for users
const specializedIcons={
    "Black Soil":"⚫",
    "Red Soil":"🌾",
    "Laterite Soil":"🌿",
    "Desert Soil":"🌵",
    "Mountain Forest Soil":"🏔️"
}
async function showUser() {
    const soilGrid=document.getElementById("soilGrid");
    soilGrid.innerHTML="Loading Soils...";
    try {
        const res = await axios.get("http://localhost:8080/api/soil/getSoil", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        const soils=res.data.soils;
        soilGrid.innerHTML="";
        soils.forEach(element => {
            const icon = specializedIcons[element.name] || "🌳";
            const card=document.createElement("div");
            card.className="soil-card";
            card.innerHTML = `
            <div class="soil-icon">${icon}</div>

            <h3 class="soil-name">${element.name}</h3>

            <div class="soil-section">
                <div class="soil-label">Characteristics</div>
                <p class="soil-content">${element.characterstics || "No details"}</p>
            </div>

            <!-- 📌 ONE ROW for pH, Moisture, Soil Type  -->
            <div class="soil-row">
                <div class="soil-box">
                    <div class="soil-small-label">pH</div>
                    <p>${element.phLevel || "-"}</p>
                </div>

                <div class="soil-box">
                    <div class="soil-small-label">Moisture</div>
                    <p>${element.moistures || "-"}</p>
                </div>

                <div class="soil-box">
                    <div class="soil-small-label">Type</div>
                    <p>${element.soilType || "-"}</p>
                </div>
            </div>

            <div class="soil-section">
                <div class="soil-label">Nutrients</div>
                <p class="soil-content">${element.nutrients || "-"}</p>
            </div>

            <div class="soil-section">
                <div class="soil-label">Best Crops</div>
                <div>
                    ${element.crops?.length 
                        ? element.crops.map(c => `<span class="crop-tag">🌿 ${c}</span>`).join("") 
                        : "No crops listed"}
                </div>
            </div>
        `;
            soilGrid.appendChild(card);
        });
    } catch (error) {
        console.log(error);
        soilGrid.innerHTML="<p>Error loading Soils.</p>"
    }
}

const role=localStorage.getItem("role");
if(role==="admin"){
    showAllSoils();
}else{
    showUser();
}


// ------------------ UPDATE SOIL ------------------
function resetAddSoilButton() {
    const btn = document.getElementById("add-soil");
    btn.innerHTML = `<i data-lucide="plus"></i> Add Soil`;
    lucide.createIcons();
    window.currentSoilId = null;
    document.getElementById("submitBtn").innerText = "Save Soil";
}
function fillSoilForm(id) {
    const soil = soilList.find(d => d._id === id);

    resetAddSoilButton();

    document.getElementById("soilName").value = soil.name;
    document.getElementById("soilType").value = soil.soilType;
    document.getElementById("phLevel").value = soil.phLevel;
    document.getElementById("moisture").value = soil.moistures;
    document.getElementById("nutrients").value = soil.nutrients.join(",");
    document.getElementById("crops").value=soil.crops.join(",");
    document.getElementById("description").value = soil.characterstics;
    document.getElementById("status").value = soil.status;

    document.getElementById('add-soil').innerHTML = `
        <i data-lucide="pen-square" width="18" height="18"></i> Update Soil
    `;
    lucide.createIcons();
    window.currentSoilId = soil._id;
    document.getElementById("submitBtn").innerText = "Update Soil";
    openModal('soil');
}
const cancelBtn1 = document.getElementById("cancel-btn1");
if (cancelBtn1) {
    cancelBtn1.addEventListener("click", () => {
        resetAddSoilButton();
    });
}

// 🌳Edit soil
async function editSoil() {
try {
    const id = window.currentSoilId;

    const name = document.getElementById("soilName").value;
    const soilType = document.getElementById("soilType").value;
    const phLevel = document.getElementById("phLevel").value;
    const moistures = document.getElementById("moisture").value;
    const nutrientsInput = document.getElementById("nutrients").value.trim();
    const nutrients = nutrientsInput ? nutrientsInput.split(",") : [];
    const cropsInput=document.getElementById("crops").value.trim();
    const crops= cropsInput ? cropsInput.split(",") : [];
    const characterstics = document.getElementById("description").value;
    const status = document.getElementById("status").value;

    const res = await axios.put(
        `http://localhost:8080/api/soil/updateSoil/${id}`,
        { name, soilType, phLevel, moistures, nutrients, characterstics, crops,status },
        {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
    );

    document.getElementById("soil-form").reset();
    window.currentSoilId = null;
    await showAllSoils();
    console.log(res.data);

} catch (error) {
    console.log(error);
}
}


// ------------------ DELETE SOIL ------------------
async function removeSoil(id) {
const confirmOverlay = document.getElementById("confirmOverlay");
confirmOverlay.style.display = "flex";

const delBtn = document.getElementById("confirmDelBtn");
delBtn.onclick = async () => {
    await axios.delete(
        `http://localhost:8080/api/soil/removeSoil/${id}`,
        {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
    );

    confirmOverlay.style.display = "none";
    showAllSoils();
};

const cancelBtn = document.getElementById("confirmCancelBtn");
cancelBtn.onclick = () => {
    confirmOverlay.style.display = "none";
    showAllSoils();
};
}


// ------------------ EXPOSE FUNCTIONS GLOBALLY ------------------
window.addingSoil = addingSoil;
window.fillSoilForm = fillSoilForm;
window.removeSoil = removeSoil;

}); 
})();