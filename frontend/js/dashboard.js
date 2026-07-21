if (localStorage.getItem("isLoggedIn") !== "true") {

    window.location.href = "index.html";

}

/* =====================================================
   DASHBOARD.JS - PART 1
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Notification Dropdown
    ========================================== */

const notificationBtn = document.getElementById("notificationBtn");
const notificationMenu = document.getElementById("notificationMenu");
const notificationCount = document.getElementById("notificationCount");

notificationBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    notificationMenu.classList.toggle("active");

    if (notificationMenu.classList.contains("active")) {

        document
            .querySelectorAll(".notification-item")
            .forEach(item => item.classList.remove("unread"));

        notificationCount.style.display = "none";
    }

});

document.addEventListener("click", () => {

    notificationMenu.classList.remove("active");

});

    /* ==========================================
       Profile Dropdown
    ========================================== */

    const profileBtn = document.getElementById("profileBtn");
    const profileMenu = document.getElementById("profileMenu");

    if (profileBtn && profileMenu) {

        profileBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            profileMenu.classList.toggle("active");

            if (notificationMenu) {
                notificationMenu.classList.remove("active");
            }

        });

    }

    /* ==========================================
       Close Menus
    ========================================== */

    document.addEventListener("click", () => {

        if (notificationMenu) {
            notificationMenu.classList.remove("active");
        }

        if (profileMenu) {
            profileMenu.classList.remove("active");
        }

    });

    /* ==========================================
       Sidebar Toggle
    ========================================== */

    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.querySelector(".sidebar");

    if (menuToggle && sidebar) {

        menuToggle.addEventListener("click", () => {

            sidebar.classList.toggle("active");

        });

    }

});


/* ==========================================
   Logout
========================================== */

function logout() {

    if (!confirm("Are you sure you want to logout?")) {
        return;
    }

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("rememberEmail");
    localStorage.removeItem("token");

    window.location.href = "index.html";
}

/* =====================================================
   DASHBOARD.JS - PART 2
===================================================== */


/* ==========================================
   Animated Counter
========================================== */

function animateCounter(id, endValue, duration = 1500) {

    const element = document.getElementById(id);

    if (!element) return;

    let start = 0;

    const increment = endValue / (duration / 16);

    const counter = setInterval(() => {

        start += increment;

        if (start >= endValue) {

            clearInterval(counter);

            start = endValue;

        }

        if (id === "helmetCompliance" || id === "vestCompliance") {

            element.innerText = Math.floor(start) + "%";

        } else {

            element.innerText = Math.floor(start);

        }

    }, 16);

}

/* ==========================================
   Search Cards
========================================== */

const searchInput = document.querySelector(".search-box input");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(value)) {

                card.style.display = "flex";

            } else {

                card.style.display = "none";

            }

        });

    });

}


/* ==========================================
   Scroll Animation
========================================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-in");

        }

    });

}, {

    threshold: 0.2

});

document.querySelectorAll(".card").forEach(card => {

    observer.observe(card);

});


/* ==========================================
   Local Storage
========================================== */

const dashboardData = {

    workers:156,

    helmet:94,

    vest:89,

    violations:12,

    lastUpdate:new Date().toLocaleString()

};

localStorage.setItem(

    "dashboardData",

    JSON.stringify(dashboardData)

);


/* ==========================================
   Fake Live Updates
========================================== */

setInterval(() => {

    const time = new Date().toLocaleTimeString();

    console.log("Dashboard Updated:", time);

},30000);


/* ==========================================
   Fake Notification
========================================== */

function addNotification(message){

    const menu=document.getElementById("notificationMenu");

    if(!menu) return;

    const item=document.createElement("div");

    item.className="notification-item";

    item.innerHTML=message;

    menu.prepend(item);

}

setTimeout(()=>{

    addNotification("🟢 AI detection completed successfully.");

},5000);

/* =====================================================
   DASHBOARD.JS - PART 3
===================================================== */


/* ==========================================
   Live Clock
========================================== */

function updateClock() {

    const clock = document.getElementById("liveClock");

    if (!clock) return;

    const now = new Date();

    clock.innerText = now.toLocaleTimeString();

}

setInterval(updateClock, 1000);

updateClock();


/* ==========================================
   Recent Activity
========================================== */

function addActivity(title, description) {

    const activityList = document.getElementById("activityList");

    if (!activityList) return;

    const item = document.createElement("div");

    item.className = "activity-item fade-in";

    item.innerHTML = `

        <div class="activity-icon success">

            <i class="fa-solid fa-check"></i>

        </div>

        <div class="activity-content">

            <h4>${title}</h4>

            <p>${description}</p>

            <div class="activity-time">
                Just Now
            </div>

        </div>

    `;

    activityList.prepend(item);

}

/* Demo Activity */

setTimeout(() => {

    addActivity(

        "Helmet Detection",

        "AI detected all workers wearing helmets."

    );

}, 4000);


/* ==========================================
   Upload Preview
========================================== */

const imageInput = document.getElementById("imageInput");

const previewImage = document.getElementById("previewImage");

if (imageInput && previewImage) {

    imageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            previewImage.src = e.target.result;

            previewImage.parentElement.style.display = "block";

        };

        reader.readAsDataURL(file);

    });

}


/* ==========================================
   Dark Mode
========================================== */

const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        localStorage.setItem(

            "theme",

            document.body.classList.contains("dark")

        );

    });

}

/* Load Theme */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "true") {

    document.body.classList.add("dark");

}


/* ==========================================
   Auto Refresh Dashboard
========================================== */

function refreshDashboard() {

    console.log("Dashboard refreshed");

}

setInterval(refreshDashboard, 60000);


/* ==========================================
   API Ready Functions
========================================== */

async function fetchDashboardData(){

    try{

        const data = await getData("/dashboard");

        animateCounter("totalWorkers", data.workers);

        animateCounter("helmetCompliance", data.helmet);

        animateCounter("vestCompliance", data.vest);

        animateCounter("violations", data.violations);

    }

    catch(error){

        console.error(error);

    }

}

/* ==========================================
   Detection API
========================================== */

async function fetchDetections() {

    try {

        const response = await fetch("http://127.0.0.1:8000/detections");

        if (!response.ok) return;

        const detections = await response.json();

        console.log(detections);

    }

    catch (error) {

        console.error(error);

    }

}


/* ==========================================
   Report API
========================================== */

async function fetchReports() {

    try {

        const response = await fetch("http://127.0.0.1:8000/reports");

        if (!response.ok) return;

        const reports = await response.json();

        console.log(reports);

    }

    catch (error) {

        console.error(error);

    }

}


/* ==========================================
   Utility Functions
========================================== */

function showLoader() {

    document.body.classList.add("loading");

}

function hideLoader() {

    document.body.classList.remove("loading");

}

function showMessage(message) {

    alert(message);

}


/* ==========================================
   Initialize Dashboard
========================================== */

window.addEventListener("load", () => {

    fetchDashboardData();

    fetchDetections();

    fetchReports();

    console.log("SmartHelmet AI Dashboard Ready");

});

/* =====================================================
   DASHBOARD.JS - PART 4
   Live Camera
===================================================== */

const startCameraBtn = document.getElementById("startCamera");
const stopCameraBtn = document.getElementById("stopCamera");
const cameraPreview = document.getElementById("cameraPreview");
const cameraStatus = document.getElementById("cameraStatus");

let cameraStream = null;

/* ==========================================
   Create Video Element
========================================== */

const video = document.createElement("video");

video.setAttribute("autoplay", true);
video.setAttribute("playsinline", true);
video.style.width = "100%";
video.style.height = "100%";
video.style.objectFit = "cover";

/* ==========================================
   Start Camera
========================================== */

startCameraBtn?.addEventListener("click", async () => {

    try {

        cameraStream = await navigator.mediaDevices.getUserMedia({

            video: true,
            audio: false

        });

        video.srcObject = cameraStream;

        cameraPreview.innerHTML = "";

        cameraPreview.appendChild(video);

        cameraStatus.innerHTML = "● Live";

        cameraStatus.classList.remove("offline");

        cameraStatus.classList.add("online");

    }

    catch(error){

        alert("Unable to access camera.");

        console.error(error);

    }

});

/* ==========================================
   Stop Camera
========================================== */

stopCameraBtn?.addEventListener("click", () => {

    if(!cameraStream) return;

    cameraStream.getTracks().forEach(track=>{

        track.stop();

    });

    cameraStream = null;

    cameraPreview.innerHTML = `

        <div class="camera-overlay">

            Waiting for Camera...

        </div>

    `;

    cameraStatus.innerHTML="● Offline";

    cameraStatus.classList.remove("online");

    cameraStatus.classList.add("offline");

});

/* ==========================================
   Fake Live AI Detection
========================================== */

function updateDetectionStats(){

    document.getElementById("liveWorkers").innerText =
        Math.floor(Math.random()*10)+10;

    document.getElementById("liveHelmet").innerText =
        Math.floor(Math.random()*10)+8;

    document.getElementById("liveVest").innerText =
        Math.floor(Math.random()*10)+7;

    document.getElementById("liveViolations").innerText =
        Math.floor(Math.random()*3);

}

updateDetectionStats();

setInterval(updateDetectionStats,3000);

/* ==========================================
   RECENT SAFETY ALERTS
========================================== */

const alerts = [

    {
        title:"Worker #12 without Helmet",
        time:"10:25 AM",
        level:"High"
    },

    {
        title:"Worker #07 without Safety Vest",
        time:"10:28 AM",
        level:"Medium"
    },

    {
        title:"Restricted Zone Entry",
        time:"10:31 AM",
        level:"High"
    },

    {
        title:"All Workers Safe in Zone A",
        time:"10:35 AM",
        level:"Low"
    }

];

function loadAlerts(){

    const container = document.getElementById("alertsContainer");

    container.innerHTML="";

    alerts.forEach(alert=>{

        const card=document.createElement("div");

        card.className="alert-item";

        card.innerHTML=`

            <div class="alert-info">

                <div class="alert-title">

                    ${alert.title}

                </div>

                <div class="alert-time">

                    ${alert.time}

                </div>

            </div>

            <span class="alert-level ${alert.level.toLowerCase()}">

                ${alert.level}

            </span>

        `;

        container.appendChild(card);

    });

}

loadAlerts();

/* ==========================================
   ANALYTICS OVERVIEW
========================================== */

function updateAnalytics(){

    const helmet = Math.floor(Math.random()*10)+90;
    const vest = Math.floor(Math.random()*15)+80;

    document.getElementById("helmetProgress").style.width = helmet + "%";
    document.getElementById("vestProgress").style.width = vest + "%";

    document.getElementById("helmetPercent").innerText = helmet + "%";
    document.getElementById("vestPercent").innerText = vest + "%";

    document.getElementById("todayWorkers").innerText =
        Math.floor(Math.random()*80)+100;

    document.getElementById("todayViolations").innerText =
        Math.floor(Math.random()*20);

}

updateAnalytics();

setInterval(updateAnalytics,5000);

/* ==========================================
   DETECTION HISTORY
========================================== */

const historyData = [

    {
        time:"10:15 AM",
        worker:"W-101",
        helmet:"✅",
        vest:"✅",
        status:"Safe",
        zone:"Zone A"
    },

    {
        time:"10:18 AM",
        worker:"W-102",
        helmet:"❌",
        vest:"✅",
        status:"Violation",
        zone:"Zone B"
    },

    {
        time:"10:22 AM",
        worker:"W-103",
        helmet:"✅",
        vest:"❌",
        status:"Violation",
        zone:"Zone C"
    },

    {
        time:"10:25 AM",
        worker:"W-104",
        helmet:"✅",
        vest:"✅",
        status:"Safe",
        zone:"Zone A"
    }

];

function loadHistory(filter=""){

    const body=document.getElementById("historyBody");

    body.innerHTML="";

    historyData
    .filter(item=>item.worker.toLowerCase().includes(filter.toLowerCase()))
    .forEach(item=>{

        body.innerHTML+=`

        <tr>

            <td>${item.time}</td>

            <td>${item.worker}</td>

            <td>${item.helmet}</td>

            <td>${item.vest}</td>

            <td class="${item.status==="Safe"?"safe":"violation"}">

                ${item.status}

            </td>

            <td>${item.zone}</td>

        </tr>

        `;

    });

}

document
.getElementById("historySearch")
.addEventListener("input",(e)=>{

    loadHistory(e.target.value);

});

loadHistory();


document
.querySelector(".export-btn")
.addEventListener("click",()=>{

    alert("CSV Export will be connected with FastAPI.");

});
