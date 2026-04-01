function showDashboard(){
    const dashboard=document.getElementById("dashboard");
    const role=localStorage.getItem("role");
    if (!dashboard) return;
    if(role==="admin"){
        dashboard.style.display="block";
    }else{
        dashboard.style.display="none";
    }
}

function showLogout(){
    const logout=document.getElementById("logout");
    const login=document.getElementById("login");
    const register=document.getElementById("register");
    const token=localStorage.getItem("token");

    if (!logout || !login || !register) return;
    if(token){
        logout.style.display="block";
        login.style.display="none";
        register.style.display="none";
    }else{
        logout.style.display="none";
        login.style.display="block";
        register.style.display="block"
    }
}

// showing name in navbar
function getInitials(name) {
    if (!name) return "";
    const parts = name.trim().split(" ");
    let initials = parts[0][0].toUpperCase();
    if (parts.length > 1) {
        initials += parts[1][0].toUpperCase();
    }
    return initials;
}
function showUserInitials() {
    const name = localStorage.getItem("name");
    const avatar = document.getElementById("userAvatar");
     if (!avatar) return;
    if (name && avatar) {
        avatar.textContent = getInitials(name);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    showDashboard();
    showLogout();
    showUserInitials();
});

function handleLogout(){
    localStorage.clear();
    window.location.href='http://127.0.0.1:5500/soil-farming-agent/html/login.html'
}