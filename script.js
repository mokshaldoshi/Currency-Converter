const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const options = document.querySelectorAll(".options select");
const btn = document.querySelector("#btn-msg");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("#msg"); 

for(let select of options){
    for(currCode in countryList){
        let newOPtion = document.createElement("option");
        newOPtion.innerText = currCode;
        newOPtion.value = currCode;
        
        // By default Behaviour -> USD to INR //
    if(select.name === "from" && currCode === "USD"){
        newOPtion.selected = "selected";
    }
    else if(select.name === "to" && currCode === "INR"){
        newOPtion.selected = "selected";
        }
    select.append(newOPtion);
    }
    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let cMap = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = cMap;
};

btn.addEventListener("click" , (evt) => {
    evt.preventDefault();
    updateExchangeRate();   
})

window.addEventListener("load" , () => {
    updateExchangeRate();
})