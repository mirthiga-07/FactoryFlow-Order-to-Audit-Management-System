
// =====================================
// FACTORYFLOW AUTHENTICATION SYSTEM
// =====================================

// Get current logged-in user
function getCurrentUser() {
    try {
        return JSON.parse(
            localStorage.getItem("factoryflowCurrentUser") || "null"
        );
    } catch (error) {
        return null;
    }
}

// Role permissions
const rolePermissions = {
    "Salesman": [
        "index.html",
        "orders.html"
    ],

    "Factory Admin": [
        "index.html",
        "orders.html",
        "production.html",
        "inventory.html",
        "billing.html",
        "costing.html",
        "quality.html",
        "audit.html"
    ],

    "Production Supervisor": [
        "index.html",
        "production.html",
        "inventory.html",
        "quality.html"
    ],

    "Owner/Accountant": [
        "index.html",
        "inventory.html",
        "billing.html",
        "costing.html",
        "audit.html"
    ]
};

// Check access to current page
function checkAccess() {

    const user = getCurrentUser();

    if (!user || !rolePermissions[user.role]) {
        window.location.replace("login.html");
        return false;
    }

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const allowedPages = rolePermissions[user.role];

    if (!allowedPages.includes(currentPage)) {
        alert("Access denied! You are not authorized to open this module.");
        window.location.replace("index.html");
        return false;
    }

    return true;
}

// Logout
function logout() {
    localStorage.removeItem("factoryflowCurrentUser");
    window.location.replace("login.html");
}

// Display logged-in role
function displayUserRole(elementId = "userRole") {

    const user = getCurrentUser();
    const element = document.getElementById(elementId);

    if (user && element) {
        element.textContent = user.role;
    }
}

// Hide unauthorized sidebar links
function applyRoleMenu() {

    const user = getCurrentUser();

    if (!user || !rolePermissions[user.role]) return;

    const allowedPages = rolePermissions[user.role];

    document.querySelectorAll(".sidebar a").forEach(link => {

        const page = link.getAttribute("href");

        if (page && !allowedPages.includes(page)) {
            link.style.display = "none";
        }

    });

}
