/* =====================================================
   PROFILE.JS - PART 1
   Load Profile + Upload Image + Save Profile
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadProfile();

});

/* ==========================================
   DOM Elements
========================================== */

const profileImage = document.getElementById("profileImage");
const navbarProfile = document.getElementById("navbarProfile");

const uploadInput = document.getElementById("profileUpload");
const changePhotoBtn = document.getElementById("changePhoto");

const saveProfileBtn = document.getElementById("saveProfile");


/* ==========================================
   Upload Profile Image
========================================== */

changePhotoBtn?.addEventListener("click", () => {

    uploadInput.click();

});


uploadInput?.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        profileImage.src = e.target.result;

        navbarProfile.src = e.target.result;

        localStorage.setItem(

            "profileImage",

            e.target.result

        );

    };

    reader.readAsDataURL(file);

});


/* ==========================================
   Save Profile
========================================== */

saveProfileBtn?.addEventListener("click", () => {

    const profile = {

        fullName:
            document.getElementById("fullName").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        organization:
            document.getElementById("organization").value,

        role:
            document.getElementById("role").value,

        location:
            document.getElementById("location").value

    };

    localStorage.setItem(

        "profile",

        JSON.stringify(profile)

    );

    syncProfile(profile);

    alert("Profile saved successfully.");

});


/* ==========================================
   Load Profile
========================================== */

function loadProfile() {

    const profile = JSON.parse(

        localStorage.getItem("profile")

    );

    if (profile) {

        document.getElementById("fullName").value =
            profile.fullName || "";

        document.getElementById("email").value =
            profile.email || "";

        document.getElementById("phone").value =
            profile.phone || "";

        document.getElementById("organization").value =
            profile.organization || "";

        document.getElementById("role").value =
            profile.role || "";

        document.getElementById("location").value =
            profile.location || "";

        document.getElementById("profileName").textContent =
            profile.fullName || "Safety Officer";

    }

    const image = localStorage.getItem("profileImage");

    if (image) {

        profileImage.src = image;

        navbarProfile.src = image;

    }

}

/* =====================================================
   PROFILE.JS - PART 1
   Load Profile + Upload Image + Save Profile
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadProfile();

});

/* ==========================================
   DOM Elements
========================================== */

const profileImage = document.getElementById("profileImage");
const navbarProfile = document.getElementById("navbarProfile");

const uploadInput = document.getElementById("profileUpload");
const changePhotoBtn = document.getElementById("changePhoto");

const saveProfileBtn = document.getElementById("saveProfile");


/* ==========================================
   Upload Profile Image
========================================== */

changePhotoBtn?.addEventListener("click", () => {

    uploadInput.click();

});


uploadInput?.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        profileImage.src = e.target.result;

        navbarProfile.src = e.target.result;

        localStorage.setItem(

            "profileImage",

            e.target.result

        );

    };

    reader.readAsDataURL(file);

});


/* ==========================================
   Save Profile
========================================== */

saveProfileBtn?.addEventListener("click", () => {

    const profile = {

        fullName:
            document.getElementById("fullName").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        organization:
            document.getElementById("organization").value,

        role:
            document.getElementById("role").value,

        location:
            document.getElementById("location").value

    };

    localStorage.setItem(

        "profile",

        JSON.stringify(profile)

    );

    syncProfile(profile);

    alert("Profile saved successfully.");

});


/* ==========================================
   Load Profile
========================================== */

function loadProfile() {

    const profile = JSON.parse(

        localStorage.getItem("profile")

    );

    if (profile) {

        document.getElementById("fullName").value =
            profile.fullName || "";

        document.getElementById("email").value =
            profile.email || "";

        document.getElementById("phone").value =
            profile.phone || "";

        document.getElementById("organization").value =
            profile.organization || "";

        document.getElementById("role").value =
            profile.role || "";

        document.getElementById("location").value =
            profile.location || "";

        document.getElementById("profileName").textContent =
            profile.fullName || "Safety Officer";

    }

    const image = localStorage.getItem("profileImage");

    if (image) {

        profileImage.src = image;

        navbarProfile.src = image;

    }

}

function logout(){

    localStorage.removeItem("isLoggedIn");

    localStorage.removeItem("token");

    window.location.href="../index.html";

}