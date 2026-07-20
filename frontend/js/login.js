/* =====================================================
   LOGIN.JS - PART 1
   Login Validation + Show Password + Remember Me
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeLogin();

});

/* ==========================================
   DOM Elements
========================================== */

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const rememberMe = document.getElementById("rememberMe");

const togglePassword = document.getElementById("togglePassword");

const loginBtn = document.getElementById("loginBtn");

const loginText = document.getElementById("loginText");

const loadingSpinner = document.getElementById("loadingSpinner");


/* ==========================================
   Initialize
========================================== */

function initializeLogin(){

    loadRememberedUser();

}


/* ==========================================
   Show / Hide Password
========================================== */

togglePassword.addEventListener("click", () => {

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';

    }

    else{

        passwordInput.type = "password";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye"></i>';

    }

});


/* ==========================================
   Remember User
========================================== */

function loadRememberedUser(){

    const savedEmail =
        localStorage.getItem("rememberEmail");

    if(savedEmail){

        emailInput.value = savedEmail;

        rememberMe.checked = true;

    }

}


/* ==========================================
   Login Submit
========================================== */

loginForm.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value.trim();

    if(email===""){

        alert("Please enter email.");

        emailInput.focus();

        return;

    }

    if(password===""){

        alert("Please enter password.");

        passwordInput.focus();

        return;

    }

    loginText.classList.add("hidden");

    loadingSpinner.classList.remove("hidden");

    loginBtn.disabled = true;

    setTimeout(()=>{

        login(email,password);

    },1200);

});

/* ==========================================
   Login Function
========================================== */

async function login(email,password){

    /* Demo Login */

    if(

        email==="admin@smarthelmet.ai" &&

        password==="admin123"

    ){

        if(rememberMe.checked){

            localStorage.setItem(

                "rememberEmail",

                email

            );

        }

        else{

            localStorage.removeItem(

                "rememberEmail"

            );

        }

        localStorage.setItem(

            "isLoggedIn",

            "true"

        );

        localStorage.setItem(

            "userName",

            "Safety Officer"

        );

        showSuccess(

            "Login Successful"

        );

        setTimeout(()=>{
            window.location.href = "dashboard.html";

        },1000);

        return;

    }

    /* FastAPI Login */

    try{

        const response = await fetch(

            "http://127.0.0.1:8000/login",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    email,

                    password

                })

            }

        );

        if(response.ok){

            const data = await response.json();

            if(rememberMe.checked){

                localStorage.setItem(

                    "rememberEmail",

                    email

                );

            }

            localStorage.setItem(

                "isLoggedIn",

                "true"

            );

            localStorage.setItem(

                "token",

                data.access_token || ""

            );

                window.location.href = "dashboard.html";

        }

        else{

            showError(

                "Invalid Email or Password"

            );

        }

    }

    catch(error){

        console.error(error);

        showError(

            "Unable to connect to server."

        );

    }

    finally{

        loginBtn.disabled=false;

        loginText.classList.remove("hidden");

        loadingSpinner.classList.add("hidden");

    }

}


/* ==========================================
   Alerts
========================================== */

function showSuccess(message){

    alert(message);

}

function showError(message){

    alert(message);

}


/* ==========================================
   Forgot Password
========================================== */

document
.getElementById("forgotPassword")
.addEventListener("click",(e)=>{

    e.preventDefault();

    alert(

        "Please contact your administrator to reset your password."

    );

});