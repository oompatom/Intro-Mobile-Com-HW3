income_1 = document.getElementById("income_1")
income_2 = document.getElementById("income_2")
income_3 = document.getElementById("income_3")
button = document.getElementById("totalButton")


button.addEventListener("click", () => {
    totalIncome()
    rateCalculation()
    taxCalculation()
})

function totalIncome()  {
    input_1 = Number(income_1.value)
    input_2 = Number(income_2.value)
    input_3 = Number(income_3.value)
    total = input_1 + input_2 + input_3
    
    document.getElementById("total_income").value = total
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

    document.getElementById("taxRate").value = ratio

}

function taxCalculation() {
    let tax = (total * ratio) / 100
    document.getElementById("netTax").value = tax
}

addBtn = document.getElementById("addBtn")
removeBtn =document.getElementById("removeBtn")
income_2.style.display="none"
income_3.style.display="none"

let count = 0
countDisplay = document.getElementById("countDisplay")

addBtn.addEventListener("click", function() {
    // countDisplay.textContent=count

    if (count == 0) {
        income_2.style.display="block"
        count++
        // countDisplay.textContent=count
    } else if (count == 1) {
        income_3.style.display="block"
        count++
        // countDisplay.textContent=count

    }
})

removeBtn.addEventListener("click", function() {
    if (count == 2) {
        income_2.style.display="none"
        count--
        // countDisplay.textContent=count

    } else if (count == 1) { //the same as else if of add == corrupt
        income_3.style.display="none"
        count--
        // countDisplay.textContent=count
    }
})
