const roleError=document.getElementById("roleError");
const nameError=document.getElementById("nameError");
const emailError=document.getElementById("emailError");
const passwordError=document.getElementById("passwordError");
// clearing the input
document.getElementById("email").addEventListener('input', () => {
        emailError.style.display = "none";
    });

document.getElementById("password").addEventListener('input', () => {
    passwordError.style.display = "none";
});
function clear(){
    document.getElementById('registrationForm').reset();
}
async function handleRegistration(event) {
    event.preventDefault();
    nameError.innerText = "";
    nameError.style.display = "none";
    emailError.innerText = "";
    emailError.style.display = "none";
    passwordError.innerText = "";
    passwordError.style.display = "none";
    const role=document.querySelector('input[name="role"]:checked').value;
    console.log("Selected role:", role);
    const name=document.getElementById("fullName").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    let isValid=true;
    if(!name){
        nameError.innerText="Enter Your name";
        nameError.style.display = "block";
        isValid=false;
    }else if (name.trim().length < 3) {
        nameError.innerText="Name is too short";
        nameError.style.display="block";
        isValid=false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email){
        emailError.innerText="Enter your mail id";
        emailError.style.display = "block";
        isValid=false;
    }
    else if (!emailRegex.test(email)) {
        emailError.innerText="Please enter a valid email id";
        emailError.style.display = "block";
        isValid=false;
    }
    if(!password){
        passwordError.innerText="Please enter your password";
        passwordError.style.display = "block";
        isValid=false;
    }
    else if(password.length < 8){
        passwordError.innerText="Password must be atleast 8 characters";
        passwordError.style.display = "block";
        isValid=false;
    }
    if (!isValid) return;
    try {
        const res=await axios.post("http://localhost:8080/api/auth/register",{
            role,name,email,password
        });
        clear();
        if (res.status === 201) {
            const overlay = document.getElementById("successOverlay");
            // SHOW overlay
            overlay.classList.add("show");
            setTimeout(() => {
                window.location.href = "http://127.0.0.1:5500/soil-farming-agent/index.html";
            }, 2000);
        }
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

// handle login
async function handleLogin(event) {
    event.preventDefault();
    emailError.innerText = "";
    emailError.style.display = "none";
    passwordError.innerText = "";
    passwordError.style.display = "none";
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    let isValid=true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email){
        emailError.innerText="Enter your mail id";
        emailError.style.display = "block";
        isValid=false;
    }
    else if (!emailRegex.test(email)) {
        emailError.innerText="Please enter a valid email id";
        emailError.style.display = "block";
        isValid=false;
    }
    if(!password){
        passwordError.innerText="Please enter your password";
        passwordError.style.display = "block";
        isValid=false;
    }
    else if(password.length < 8){
        passwordError.innerText="Password must be atleast 8 characters";
        passwordError.style.display = "block";
        isValid=false;
    }
    if (!isValid) return;

    try {
        const res=await axios.post("http://localhost:8080/api/auth/login",{
            email,password
        });
        if (res.status === 200) {
            document.getElementById("successOverlay").classList.add("show");

            localStorage.setItem("role", res.data.user.role);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.user.name);
            localStorage.setItem("user", JSON.stringify(res.data));

            setTimeout(() => {
                window.location.href = "http://127.0.0.1:5500/soil-farming-agent/index.html";
            }, 1500);
        }
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}
