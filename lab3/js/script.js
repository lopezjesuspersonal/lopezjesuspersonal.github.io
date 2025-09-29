// Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

// Global
let timesTaken = localStorage.timesTaken;
console.log(timesTaken);

displayTimes();
function displayTimes() {
    let times = document.querySelector("#timesTaken");
    times.textContent = timesTaken;
}

displayRandOptions();
function displayRandOptions() {

    let randOptions = ["Swift", "Kotlin", "Go", "C#"];
    randOptions = _.shuffle(randOptions);

    for (let i of randOptions) {
        let inputElement = document.createElement("input");
        inputElement.type = "radio";
        inputElement.name = "q1";
        inputElement.value = i;
        console.log(inputElement);

        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        labelElement.prepend(inputElement);

        document.querySelector("#randOptions").append(labelElement);
    }

    let spanElement = document.createElement("span");
    spanElement.id = "q1f";
    spanElement.textContent = " ";
    document.querySelector("#randOptions").append(spanElement);
}

function gradeQuiz() {
    console.log("check")
    let score = 0;
    let userAnswer1 = document.querySelector("input[name=q1]:checked").value;
    let userAnswer2 = false;
    let userAnswer3 = document.querySelector("#mathQ").value;
    let userAnswer4 = document.querySelector("#chemElt").value;
    let userAnswer5 = document.querySelector("#dropDown").value;

    // QUESTION ONE
    if (userAnswer1 == "Swift") {
        console.log("q1 right");
        score = score + 20;
        document.querySelector("#questionOne").style.color = "green";

        let good1 = document.createElement("img");
        good1.src = "img/good.png";
        good1.width = 15;
        document.querySelector("#q1f").append(good1);
    } else {
        console.log("q1 wrong");
        document.querySelector("#questionOne").style.color = "red";

        let bad1 = document.createElement("img");
        bad1.src = "img/bad.png";
        bad1.width = 15;
        document.querySelector("#q1f").append(bad1);
    }

    // QUESTION TWO
    let q2 = document.querySelector("#q2f");
    if (!document.querySelector("#q2b").checked && !document.querySelector("#q2a").checked && !document.querySelector("#q2c").checked) {
        document.querySelector("#questionTwo").style.color = "red";
        console.log("q2 wrong")

        let bad2 = document.createElement("img");
        bad2.src = "img/bad.png";
        bad2.width = 15;
        document.querySelector("#q2f").append(bad2);
    }
    if (document.querySelector("#q2b").checked && !document.querySelector("#q2a").checked && !document.querySelector("#q2c").checked) {
        userAnswer2 = true;
        score = score + 20;
        document.querySelector("#questionTwo").style.color = "green";
        console.log("q2 right")

        let good2 = document.createElement("img");
        good2.src = "img/good.png";
        good2.width = 15;
        document.querySelector("#q2f").append(good2);
    }
    if (document.querySelector("#q2a").checked) {
        userAnswer2 = false;
        document.querySelector("#questionTwo").style.color = "red";
        console.log("q2a wrong")

        let check = q2.querySelector("img");
        if (check) {
            check.remove();
        }

        let bad2a = document.createElement("img");
        bad2a.src = "img/bad.png";
        bad2a.width = 15;
        document.querySelector("#q2f").append(bad2a);
    } else if (document.querySelector("#q2c").checked) {
        userAnswer2 = false;
        document.querySelector("#questionTwo").style.color = "red";
        console.log("q2b wrong")

        let check = q2.querySelector("img");
        if (check) {
            check.remove();
        }

        let bad2b = document.createElement("img");
        bad2b.src = "img/bad.png";
        bad2b.width = 15;
        document.querySelector("#q2f").append(bad2b);
    }

    // QUESTION THREE
    if (userAnswer3 == 256) {
        console.log("q3 right");
        score = score + 20;
        document.querySelector("#questionThree").style.color = "green";

        let good3 = document.createElement("img");
        good3.src = "img/good.png";
        good3.width = 15;
        document.querySelector("#q3f").append(good3);
    } else {
        console.log("q3 wrong");
        document.querySelector("#questionThree").style.color = "red";

        let bad3 = document.createElement("img");
        bad3.src = "img/bad.png";
        bad3.width = 15;
        document.querySelector("#q3f").append(bad3);
    }

    // QUESTION FOUR
    userAnswer4 = userAnswer4.toLowerCase();
    if (userAnswer4 == "helium") {
        console.log("q4 right");
        score = score + 20;
        document.querySelector("#questionFour").style.color = "green";

        let good4 = document.createElement("img");
        good4.src = "img/good.png";
        good4.width = 15;
        document.querySelector("#q4f").append(good4);
    } else {
        console.log("q4 wrong");
        document.querySelector("#questionFour").style.color = "red";

        let bad4 = document.createElement("img");
        bad4.src = "img/bad.png";
        bad4.width = 15;
        document.querySelector("#q4f").append(bad4);
    }

    // QUESTION FIVE
    if (userAnswer5 == "electron") {
        console.log("q5 right");
        score = score + 20;
        document.querySelector("#questionFive").style.color = "green";

        let good5 = document.createElement("img");
        good5.src = "img/good.png";
        good5.width = 15;
        document.querySelector("#q5f").append(good5);
    } else {
        console.log("q5 wrong");
        document.querySelector("#questionFive").style.color = "red";

        let bad5 = document.createElement("img");
        bad5.src = "img/bad.png";
        bad5.width = 15;
        document.querySelector("#q5f").append(bad5);
    }

    let total = document.createElement("h3");
    total.textContent = score + " / 100"
    document.querySelector("#score").append(total)
    if (score >= 80) {
        document.querySelector("#score").append(" Good Job!")
    }

    let submitBtn = document.querySelector("#submitBtn");
    submitBtn.style.display = "none";

    if (localStorage.timesTaken) {
        localStorage.timesTaken = Number(localStorage.timesTaken) + 1;
    } else {
        localStorage.timesTaken = 1;
    }

    console.log(score);
}