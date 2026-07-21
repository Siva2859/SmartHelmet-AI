if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

/* =====================================================
   SETTINGS.JS - PART 1
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadSettings();

});

/* ==========================================
   Load Settings
========================================== */

function loadSettings() {

    const settings = JSON.parse(

        localStorage.getItem("settings")

    );

    if (!settings) return;

    document.getElementById("fullName").value =
        settings.fullName || "";

    document.getElementById("email").value =
        settings.email || "";

    document.getElementById("phone").value =
        settings.phone || "";

    document.getElementById("theme").value =
        settings.theme || "Light";

    document.getElementById("language").value =
        settings.language || "English";

    document.getElementById("emailNotification").checked =
        settings.emailNotification ?? true;

    document.getElementById("smsNotification").checked =
        settings.smsNotification ?? false;

    document.getElementById("safetyAlerts").checked =
        settings.safetyAlerts ?? true;

    document.getElementById("weeklyReports").checked =
        settings.weeklyReports ?? true;

    applyTheme(settings.theme);

}

/* ==========================================
   Save Settings
========================================== */

const saveBtn = document.getElementById("saveSettings");

if (saveBtn) {

    saveBtn.addEventListener("click", () => {

        const settings = {

            fullName:
                document.getElementById("fullName").value,

            email:
                document.getElementById("email").value,

            phone:
                document.getElementById("phone").value,

            theme:
                document.getElementById("theme").value,

            language:
                document.getElementById("language").value,

            emailNotification:
                document.getElementById("emailNotification").checked,

            smsNotification:
                document.getElementById("smsNotification").checked,

            safetyAlerts:
                document.getElementById("safetyAlerts").checked,

            weeklyReports:
                document.getElementById("weeklyReports").checked

        };

        localStorage.setItem(

            "settings",

            JSON.stringify(settings)

        );

        applyTheme(settings.theme);

        alert("Settings saved successfully.");

    });

}

/* ==========================================
   Theme
========================================== */

function applyTheme(theme){

    document.body.classList.remove(

        "light-theme",

        "dark-theme"

    );

    switch(theme){

        case "Dark":

            document.body.classList.add("dark-theme");

            break;

        case "Light":

            document.body.classList.add("light-theme");

            break;

        default:

            if(

                window.matchMedia("(prefers-color-scheme: dark)").matches

            ){

                document.body.classList.add("dark-theme");

            }else{

                document.body.classList.add("light-theme");

            }

    }

}

/* =====================================================
   SETTINGS.JS - PART 2
===================================================== */

/* ==========================================
   Reset Settings
========================================== */

const resetBtn = document.getElementById("resetSettings");

if (resetBtn) {

    resetBtn.addEventListener("click", () => {

        if (!confirm("Reset all settings to default?")) return;

        localStorage.removeItem("settings");

        location.reload();

    });

}


/* ==========================================
   Change Password Validation
========================================== */

function validatePassword() {

    const currentPassword =
        document.getElementById("currentPassword").value.trim();

    const newPassword =
        document.getElementById("newPassword").value.trim();

    const confirmPassword =
        document.getElementById("confirmPassword").value.trim();

    if (
        currentPassword === "" &&
        newPassword === "" &&
        confirmPassword === ""
    ) {

        return true;

    }

    if (
        currentPassword === "" ||
        newPassword === "" ||
        confirmPassword === ""
    ) {

        alert("Please fill all password fields.");

        return false;

    }

    if (newPassword.length < 8) {

        alert("Password must be at least 8 characters.");

        return false;

    }

    if (newPassword !== confirmPassword) {

        alert("Passwords do not match.");

        return false;

    }

    return true;

}


/* ==========================================
   Save Password (Demo)
========================================== */

const saveSettingsBtn = document.getElementById("saveSettings");

if (saveSettingsBtn) {

    saveSettingsBtn.addEventListener("click", () => {

        if (!validatePassword()) {

            return;

        }

        console.log("Password validation passed.");

    });

}


/* ==========================================
   Auto Save Theme
========================================== */

const themeSelect = document.getElementById("theme");

if (themeSelect) {

    themeSelect.addEventListener("change", () => {

        applyTheme(themeSelect.value);

    });

}


/* ==========================================
   Auto Save Language
========================================== */

const languageSelect = document.getElementById("language");

if (languageSelect) {

    languageSelect.addEventListener("change", () => {

        console.log(
            "Language changed to:",
            languageSelect.value
        );

    });

}


/* ==========================================
   Send Settings to FastAPI
========================================== */

async function syncSettings() {

    const settings = JSON.parse(
        localStorage.getItem("settings")
    );

    if (!settings) return;

    try {

        const response = await fetch(

            "http://127.0.0.1:8000/settings",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(settings)

            }

        );

        if (!response.ok) {

            throw new Error("Sync failed");

        }

        console.log("Settings synced.");

    }

    catch (error) {

        console.error(error);

    }

}


/* ==========================================
   Auto Sync Every 2 Minutes
========================================== */

setInterval(() => {

    syncSettings();

}, 120000);


/* ==========================================
   Logout Helper
========================================== */

function logout() {

    if (!confirm("Are you sure you want to logout?")) {

        return;

    }

    localStorage.clear();

    window.location.href = "../index.html";

}


/* ==========================================
   Notification Helper
========================================== */

function showSuccess(message) {

    alert(message);

}

function showError(message) {

    alert(message);

}


/* ==========================================
   Initialize
========================================== */

window.addEventListener("load", () => {

    console.log("Settings Module Ready");

});