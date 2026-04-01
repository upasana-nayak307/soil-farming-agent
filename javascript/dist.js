const companyError = document.getElementById("companyError");
const addressError = document.getElementById("addressError");
const contactError = document.getElementById("contactError");
const mailError = document.getElementById("mailError");
const productsError = document.getElementById("productsError");
const statusError = document.getElementById("statusError");

// Clear input error when typing
function clearInput(inputId, errorElement) {
    const input = document.getElementById(inputId);

    if(!input) return;

    input.addEventListener("input", () => {
        errorElement.innerText = "";
        input.classList.remove("input-error");
        input.classList.add("input-success");
    });
}

clearInput("dist-company", companyError);
clearInput("dist-address", addressError);
clearInput("dist-number", contactError);
clearInput("dist-email", mailError);
clearInput("dist-products", productsError);
clearInput("dist-status", statusError);

function showError(inputId, errorElement, message) {
    const input = document.getElementById(inputId);
    errorElement.innerText = message;
    input.classList.add("input-error");
    input.classList.remove("input-success");
}

async function addingDistributor(event) {
    event.preventDefault();

    if (window.currentDistId) {
        await editDist();
        return;
    }

    const name = document.getElementById("dist-company").value.trim();
    const address = document.getElementById("dist-address").value.trim();
    const contact = document.getElementById("dist-number").value.trim();
    const email = document.getElementById("dist-email").value.trim();
    const products = document.getElementById("dist-products").value
        .split(",")
        .map(p => p.trim())
        .filter(p => p.length > 0);
    const status = document.getElementById("dist-status").value;

    let isValid = true;

    // Company name
    if (!name) {
        showError("dist-company", companyError, "Company name is required");
        isValid = false;
    }

    // Address
    if (!address) {
        showError("dist-address", addressError, "Address is required");
        isValid = false;
    }

    // Contact number
    if (!contact) {
        showError("dist-number", contactError, "Contact number is required");
        isValid = false;
    } else if (!/^[0-9]{10}$/.test(contact)) {
        showError("dist-number", contactError, "Enter a valid 10-digit phone number");
        isValid = false;
    }

    // Email validation
    if (!email) {
        showError("dist-email", mailError, "Email is required");
        isValid = false;
    } else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
        showError("dist-email", mailError, "Enter a valid email address");
        isValid = false;
    }

    // Products
    if (!products) {
        showError("dist-products", productsError, "Enter products available");
        isValid = false;
    }

    // Status (dropdown)
    if (!status || status === "active") {
        showError("dist-status", statusError, "Select a valid status");
        isValid = false;
    }

    // Stop if any validation failed
    if (!isValid) return;

    try {
        const res = await axios.post(
            "http://localhost:8080/api/distributors/addDistributor",
            { name, address, contact, email, products, status },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        console.log(res.data);
        await showAll();

        document.getElementById("dist-form").reset();

    } catch (error) {
        console.log(error);
    }
}

// get all distributors
let distributorList=[];
async function showAll() {
    const distEmpty=document.getElementById("dist-empty");
    const totalDist=document.getElementById("total-dist");
    const distTable=document.getElementById("dist-table-body");

    if (!distTable || !totalDist || !distEmpty) return;
    distTable.innerHTML = "";

    try {
        const res = await axios.get(
            "http://localhost:8080/api/distributors/getDistributors",
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        distributorList = res.data.allDistributors;
        totalDist.innerText=distributorList.length;
        distEmpty.style.display = distributorList.length === 0 ? "block" : "none";

        distributorList.forEach(element => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${element.name}</td>
                <td>${element.address}</td>
                <td>${element.contact}</td>
                <td>${element.email}</td>
                <td>${element.products}</td>
                <td>${element.status}</td>
                <td class="actions">
                    <i class="fa-solid fa-pen-to-square edit-icon" onclick="fillDistForm('${element._id}')"></i>
                    <i class="fa-solid fa-trash delete-icon" onclick="removeDist('${element._id}')"></i>
                </td>
            `;

            distTable.appendChild(tr);
        });

    } catch (error) {
        console.log(error);
    }
}

// update 

function resetAddDistButton() {
    const btn = document.getElementById("add-distributor");
    btn.innerHTML = `<i data-lucide="plus"></i> Add Distributor`;
    lucide.createIcons();
    window.currentDistId = null;
    document.getElementById("submitBtn2").innerText = "Save Distributor";
}

function fillDistForm(id) {
    const distributor = distributorList.find(d => d._id === id);

    resetAddDistButton();

    document.getElementById("dist-company").value = distributor.name;
    document.getElementById("dist-address").value = distributor.address;
    document.getElementById("dist-number").value = distributor.contact;
    document.getElementById("dist-email").value = distributor.email;
    document.getElementById("dist-products").value = distributor.products.join(", ");
    document.getElementById("dist-status").value = distributor.status;

    document.getElementById('add-distributor').innerHTML = `
        <i data-lucide="pen-square" width="18" height="18"></i> Update Distributor
    `;
    lucide.createIcons();
    window.currentDistId = dist._id;
    document.getElementById("submitBtn2").innerText = "Update distributor";
    openModal('distributor');
}
const cancelBtn2=document.getElementById("cancel-btn2");
if(cancelBtn2){
    cancelBtn2.addEventListener("click", () => {
    resetAddDistButton();
    });
}


async function editDist() {
    try {
        const id = window.currentDistId;

        const name = document.getElementById("dist-company").value.trim();
        const address = document.getElementById("dist-address").value.trim();
        const contact = document.getElementById("dist-number").value.trim();
        const email = document.getElementById("dist-email").value.trim();
        const products = document.getElementById("dist-products").value
            .split(",")
            .map(p => p.trim())
            .filter(p => p.length > 0);
        const status = document.getElementById("dist-status").value;

        const res = await axios.put(
            `http://localhost:8080/api/distributors/updateDistributors/${id}`,
            {name, address, contact, email, products, status  },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        document.getElementById("dist-form").reset();
        window.currentDistId = null;
        await showAll();

        console.log(res.data);

    } catch (error) {
        console.log(error);
    }
}

async function removeDist(id) {
    const confirmOverlay = document.getElementById("confirmOverlay");
    confirmOverlay.style.display = "flex";

    document.getElementById("confirmDelBtn").onclick = async () => {
        await axios.delete(
            `http://localhost:8080/api/distributors/deleteDistributor/${id}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        confirmOverlay.style.display = "none";
        showAll();
    };

    document.getElementById("confirmCancelBtn").onclick = () => {
        confirmOverlay.style.display = "none";
    };
}

async function showToUser() {
    const distGrid=document.getElementById("distGrid");
    distGrid.innerHTML="Loading Distributors...";
    try {
        const res = await axios.get(
            "http://localhost:8080/api/distributors/getDistributors",
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        const dist=res.data.allDistributors;
        distGrid.innerHTML="";
        dist.forEach(d=>{
            const card=document.createElement("div");
            card.className="dist-card";
            card.innerHTML=`
            <h3 class="dist-name">${d.name}</h3>
            
            <div class="dist-section">
                <div class="contact-info">
                <span class="contact-icon">📍</span>
                <div class="contact-details">
                    <span>${d.address}</span>
                </div>
                </div>
            </div>

            <div class="dist-section">
                <div class="contact-info">
                <span class="contact-icon">☎️</span>
                <div class="contact-details">
                    <span>${d.contact}</span>
                </div>
                </div>
            </div>

            <div class="soil-section">
                <div class="contact-info">
                <span class="contact-icon">✉️</span>
                <div class="contact-details">
                    <span>${d.email}</span>
                </div>
                </div>
            </div>

            <div class="dist-section">
                <div class="dist-label">Products Available</div>
                <div>
                ${d.products.map(product => `<span class="crop-tag">${product}</span>`).join('')}
                </div>
            </div>
            `;

            distGrid.appendChild(card);
        })
    } catch (error) {
        console.log(error);
        distGrid.innerHTML="<p>Error loading Distributors.</p>"
    }
}
const role=localStorage.getItem("role");
if(role==="admin"){
    showAll();
}else{
    showToUser();
}