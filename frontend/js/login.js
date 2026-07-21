/* =====================================================
   LOGIN.JS
   SmartHelmet AI
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // DOM Elements
    // ============================

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMe = document.getElementById("rememberMe");
    const togglePassword = document.getElementById("togglePassword");
    const loginBtn = document.getElementById("loginBtn");
    const loginText = document.getElementById("loginText");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const forgotPassword = document.getElementById("forgotPassword");

    // ============================
    // Load Remembered Email
    // ============================

    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMe.checked = true;
    }

    // ============================
    // Show / Hide Password
    // ============================

    if (togglePassword) {

        togglePassword.addEventListener("click", () => {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";
                togglePassword.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                passwordInput.type = "password";
                togglePassword.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

            }

        });

    }

    // ============================
    // Forgot Password
    // ============================

    if (forgotPassword) {

        forgotPassword.addEventListener("click", (e) => {

            e.preventDefault();

            alert("Please contact your administrator.");

        });

    }

    // ============================
    // Login Form
    // ============================

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Validation

            if (email === "") {

                alert("Please enter your email.");
                emailInput.focus();
                return;

            }

            if (password === "") {

                alert("Please enter your password.");
                passwordInput.focus();
                return;

            }

            // Loading UI

            loginBtn.disabled = true;
            loginText.style.display = "none";
            loadingSpinner.classList.remove("hidden");

            setTimeout(() => {

                // ============================
                // Demo Login
                // ============================

                if (
                    email === "admin@smarthelmet.ai" &&
                    password === "admin123"
                ) {

                    // Remember Email

                    if (rememberMe.checked) {

                        localStorage.setItem(
                            "rememberEmail",
                            email
                        );

                    } else {

                        localStorage.removeItem(
                            "rememberEmail"
                        );

                    }

                    // Save Login Session

                    localStorage.setItem(
                        "isLoggedIn",
                        "true"
                    );

                    localStorage.setItem(
                        "userName",
                        "Safety Officer"
                    );

                    localStorage.setItem(
                        "userEmail",
                        email
                    );

                    alert("Login Successful!");

                    window.location.href = "dashboard.html";

                    return;

                }

                // Wrong Credentials

                alert(
                    "Invalid Email or Password\n\nUse Demo Login:\n\nEmail: admin@smarthelmet.ai\nPassword: admin123"
                );

                loginBtn.disabled = false;
                loginText.style.display = "inline";
                loadingSpinner.classList.add("hidden");

            }, 1000);

        });

    }

});