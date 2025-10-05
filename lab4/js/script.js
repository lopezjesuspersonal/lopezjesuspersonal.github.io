document.querySelector("#zipCode").addEventListener("change",updateZip);
document.querySelector("#password").addEventListener("click",suggestedPassword);
document.querySelector("#username").addEventListener("change",usernameCheck);
document.querySelector("#stateSelect").addEventListener("change",displayCounties);
document.querySelector("#submit").addEventListener("click",checkLength);

let abbreviation;
let userAvailable;

async function updateZip() {
    let zipCode = document.querySelector("#zipCode").value;
    let zipURL = "https://csumb.space/api/cityInfoAPI.php?zip="+zipCode;
    try {
        let response = await fetch(zipURL);
        try {
            let data = await response.json();
            if (data == false) {
                document.querySelector("#zipInvalid").textContent = "Zip code not found";
                document.querySelector("#zipInvalid").style.color = "red";
            } else {
                document.querySelector("#zipInvalid").textContent = "";
                document.querySelector("#zipCity").textContent = data.city;
                document.querySelector("#zipLat").textContent = data.latitude;
                document.querySelector("#zipLong").textContent = data.longitude;
            }
        } catch(parseError){
            console.log("Error Parsing Data" + parseError);
            document.querySelector("#zipInvalid").textContent = "Zip code not found";
            document.querySelector("#zipInvalid").style.color = "red";
            document.querySelector("#zipCity").textContent = "";
            document.querySelector("#zipLat").textContent = "";
            document.querySelector("#zipLong").textContent = "";
        }

    } catch(error){
        console.log("Network Error" + error);
    }
}

displayStates();
async function displayStates() {
    let statesURL = "https://csumb.space/api/allStatesAPI.php";
    try {
        let response = await fetch(statesURL);
        try {
            let data = await response.json();
            console.log(data)
            for(let i of data){
                let optionElement = document.createElement("option");
                optionElement.textContent = i.state;
                optionElement.value = i.usps;
                document.querySelector("#stateSelect").append(optionElement);
                
            }
            
                 
        } catch(parseError){
            console.log("Error Parsing Data" + parseError);
        }

    } catch(error){
        console.log("Network Error" + error);
    }
}


async function displayCounties() {
    let countiesURL = "https://csumb.space/api/countyListAPI.php?state="+document.querySelector("#stateSelect").value;
    document.querySelector("#countySelect").textContent="";
    try {
        let response = await fetch(countiesURL);
        try {
            let data = await response.json();
            for(let i of data){
                let optionElement = document.createElement("option");
                optionElement.textContent = i.county;
                document.querySelector("#countySelect").append(optionElement);
            }
            
                 
        } catch(parseError){
            console.log("Error Parsing Data" + parseError);
        }

    } catch(error){
        console.log("Network Error" + error);
    }
}


async function suggestedPassword() {
    let passwordURL = "https://csumb.space/api/suggestedPassword.php?length=8";
    try {
        let response = await fetch(passwordURL);
        try {
            let data = await response.json();
            console.log(data)
            document.querySelector("#suggestedPassword").textContent = " Suggested Password: " + data.password;



        } catch (parseError) {
            console.log("Error Parsing Data" + parseError);
        }

    } catch (error) {
        console.log("Network Error" + error);
    }
}



async function usernameCheck() {
    let username = document.querySelector("#username").value;
    let usernameURL = "https://csumb.space/api/usernamesAPI.php?username="+username;
    try {
        let response = await fetch(usernameURL);
        try {
            let data = await response.json();
            if(data.available){
                document.querySelector("#usernameText").textContent = " Username Available";
                document.querySelector("#usernameText").style.color = "green";
                userAvailable = true;
            }else{
                document.querySelector("#usernameText").textContent = " Username Unavailable";
                document.querySelector("#usernameText").style.color = "red";
                userAvailable = false;
            }



        } catch (parseError) {
            console.log("Error Parsing Data" + parseError);
        }

    } catch (error) {
        console.log("Network Error" + error);
    }
}

function checkLength(){
    if (userAvailable) {
        document.querySelector("#userAvailableError").textContent = "";
    } else if (document.querySelector("#username").value.length > 0) {
        document.querySelector("#userAvailableError").textContent = "Username not available.";
        document.querySelector("#userAvailableError").style.color = "red";
    }
    if (document.querySelector("#username").value.length < 3) {
        document.querySelector("#userLengthError").textContent = "Please use have a username length of at least 3 characters";
        document.querySelector("#userLengthError").style.color = "red";
    } else {
        document.querySelector("#userLengthError").textContent = "";
    }

    if(document.querySelector("#password").value.length<6){
        document.querySelector("#lengthError").textContent = "Please make a password of at least 6 characters";
        document.querySelector("#lengthError").style.color = "red";
    }else{
        document.querySelector("#lengthError").textContent = "";
    }
    
    if (!(document.querySelector("#passwordAgain").value == document.querySelector("#password").value)) {
        document.querySelector("#passwordEqualsError").textContent = "Passwords do not match. Retype Password";
        document.querySelector("#passwordEqualsError").style.color = "red";
    } else {
        document.querySelector("#passwordEqualsError").textContent = "";
    }
}



