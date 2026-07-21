const BASE_URL = "http://127.0.0.1:8000";

async function getData(endpoint){

    const response = await fetch(BASE_URL + endpoint);

    if(!response.ok){

        throw new Error("API Error");

    }

    return await response.json();

}

async function postForm(endpoint, formData){

    const response = await fetch(BASE_URL + endpoint,{

        method:"POST",

        body:formData

    });

    if(!response.ok){

        throw new Error("Upload Failed");

    }

    return await response.json();

}