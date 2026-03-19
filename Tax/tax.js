let total = 0;
let ratio = 0;

let income_1 = document.getElementById("income_1");
let income_2 = document.getElementById("income_2");
let income_3 = document.getElementById("income_3");
let result = document.getElementById("total_income");

income_1.addEventListener("input", totalIncome);
income_2.addEventListener("input", totalIncome);
income_3.addEventListener("input", totalIncome);

function totalIncome() {
    let input_1 = checkInput(income_1);
    let input_2 = checkInput(income_2);
    let input_3 = checkInput(income_3);

    let taxRateField = document.getElementById("taxRate");
    let netTaxField = document.getElementById("netTax");

    if (input_1 === "error" || input_2 === "error" || input_3 === "error") {
        result.value = "invalid number";
        result.style.color = "red";
        
        taxRateField.value = "error";
        taxRateField.style.color = "red";
        
        netTaxField.value = "error";
        netTaxField.style.color = "red";
        
        return;
    }

    total = input_1 + input_2 + input_3;
    result.value = total;
    result.style.color = "";
    
    //คำนวณเฉพาะตอนกรอกถูก
    rateCalculation();
    taxCalculation();

    taxRateField.style.color = "";
    netTaxField.style.color = "";
}

function checkInput(inputElement) {
    let inputValue = inputElement.value;
    
    if (inputValue.trim() === "") {
        inputElement.style.color = "";
        return 0; 
    }

    let num = Number(inputValue);
    if (Number.isNaN(num) || num < 0) {
        inputElement.style.color = "red";
        return "error";
    }
    
    inputElement.style.color = "";
    return num;
}

function rateCalculation() {
    if (total <= 150000) ratio = 0;
    else if (total <= 300000) ratio = 5;
    else if (total <= 500000) ratio = 10;
    else if (total <= 750000) ratio = 15;
    else if (total <= 1000000) ratio = 20;
    else if (total <= 2000000) ratio = 25;
    else if (total <= 5000000) ratio = 30;
    else ratio = 35;

    document.getElementById("taxRate").value = ratio;
}

function taxCalculation() {
    let tax = (total * ratio) / 100;
    document.getElementById("netTax").value = tax;
}

let addBtn = document.getElementById("addBtn");
let removeBtn = document.getElementById("removeBtn");
income_2.style.display = "none";
income_3.style.display = "none";

let count = 0;

addBtn.addEventListener("click", function () {
    if (count == 0) {
        income_2.style.display = "block";
        count++;

    } else if (count == 1) {
        income_3.style.display = "block";
        count++;
    }
});

removeBtn.addEventListener("click", function() {
    if (count == 2) {
        income_3.style.display = "none";
        count--;
        income_3.value = "";
        income_3.dispatchEvent(new Event("input"));

    } else if (count == 1) {
        income_2.style.display = "none";
        count--;
        income_2.value = "";
        income_2.dispatchEvent(new Event("input"));
    }
});
