/* =====================================================
   UPLOAD.JS - PART 1
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Elements
    ========================================== */

    const browseBtn = document.getElementById("browseBtn");
    const imageInput = document.getElementById("imageInput");
    const dropArea = document.getElementById("dropArea");

    const previewSection = document.getElementById("previewSection");
    const previewImage = document.getElementById("previewImage");

    const fileName = document.getElementById("fileName");
    const fileSize = document.getElementById("fileSize");
    const fileResolution = document.getElementById("fileResolution");
    const uploadTime = document.getElementById("uploadTime");

    const confidenceSlider = document.getElementById("confidenceSlider");
    const confidenceValue = document.getElementById("confidenceValue");

    /* ==========================================
       Browse Button
    ========================================== */

    browseBtn.addEventListener("click", () => {

        imageInput.click();

    });

    /* ==========================================
       File Selection
    ========================================== */

    imageInput.addEventListener("change", () => {

        if(imageInput.files.length > 0){

            displayImage(imageInput.files[0]);

        }

    });

    /* ==========================================
       Drag Events
    ========================================== */

    ["dragenter","dragover"].forEach(eventName=>{

        dropArea.addEventListener(eventName,(e)=>{

            e.preventDefault();

            dropArea.classList.add("dragover");

        });

    });

    ["dragleave","drop"].forEach(eventName=>{

        dropArea.addEventListener(eventName,(e)=>{

            e.preventDefault();

            dropArea.classList.remove("dragover");

        });

    });

    dropArea.addEventListener("drop",(e)=>{

        const file=e.dataTransfer.files[0];

        if(file){

            imageInput.files=e.dataTransfer.files;

            displayImage(file);

        }

    });

    /* ==========================================
       Confidence Slider
    ========================================== */

    confidenceSlider.addEventListener("input",()=>{

        confidenceValue.innerText=confidenceSlider.value+"%";

    });

    /* ==========================================
       Display Image
    ========================================== */

    function displayImage(file){

        if(!file.type.startsWith("image/")){

            alert("Please select an image file.");

            return;

        }

        const reader=new FileReader();

        reader.onload=function(e){

            previewImage.src=e.target.result;

            previewSection.style.display="block";

            fileName.innerText=file.name;

            fileSize.innerText=(file.size/1024).toFixed(2)+" KB";

            uploadTime.innerText=new Date().toLocaleTimeString();

            const img=new Image();

            img.onload=function(){

                fileResolution.innerText=

                    img.width+" × "+img.height;

            }

            img.src=e.target.result;

        }

        reader.readAsDataURL(file);

    }

});

/* =====================================================
   UPLOAD.JS - PART 2
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const uploadBtn = document.getElementById("uploadBtn");
    const clearBtn = document.getElementById("clearBtn");

    const imageInput = document.getElementById("imageInput");

    const progressSection = document.getElementById("progressSection");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");

    const statusText = document.getElementById("statusText");

    const previewSection = document.getElementById("previewSection");
    const previewImage = document.getElementById("previewImage");

    /* ==========================================
       Upload Image
    ========================================== */

    uploadBtn.addEventListener("click", async () => {

        if (imageInput.files.length === 0) {

            alert("Please select an image first.");

            return;

        }

        const file = imageInput.files[0];

        const formData = new FormData();

        formData.append("image", file);

        progressSection.style.display = "block";

        progressFill.style.width = "0%";

        statusText.className = "status processing";

        statusText.innerText = "Uploading image...";

        /* Fake Progress Animation */

        let progress = 0;

        const progressInterval = setInterval(() => {

            progress += 5;

            progressFill.style.width = progress + "%";

            progressText.innerText = progress + "%";

            if (progress >= 90) {

                clearInterval(progressInterval);

            }

        }, 120);

        try {

            const response = await fetch(

                "http://127.0.0.1:8000/upload",

                {

                    method: "POST",

                    body: formData

                }

            );

            clearInterval(progressInterval);

            progressFill.style.width = "100%";

            progressText.innerText = "100%";

            if (!response.ok) {

                throw new Error("Upload Failed");

            }

            const data = await response.json();

            /* Save Result */

            localStorage.setItem(

                "detectionResult",

                JSON.stringify(data)

            );

            statusText.className = "status success";

            statusText.innerText =

                "Image uploaded successfully.";

            /* Redirect */

            setTimeout(() => {

                window.location.href = "detection.html";

            }, 1500);

        }

        catch (error) {

            clearInterval(progressInterval);

            progressFill.style.width = "0%";

            progressText.innerText = "0%";

            statusText.className = "status error";

            statusText.innerText =

                "Upload failed. Please try again.";

            console.error(error);

        }

    });

    /* ==========================================
       Clear Upload
    ========================================== */

    clearBtn.addEventListener("click", () => {

        imageInput.value = "";

        previewImage.src = "";

        previewSection.style.display = "none";

        progressSection.style.display = "none";

        progressFill.style.width = "0%";

        progressText.innerText = "";

        statusText.className = "status waiting";

        statusText.innerText = "Waiting for image...";

        document.getElementById("fileName").innerText = "No file selected";

        document.getElementById("fileSize").innerText = "--";

        document.getElementById("fileResolution").innerText = "--";

        document.getElementById("uploadTime").innerText = "--";

    });

});