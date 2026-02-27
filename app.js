const BASE_URL = "https://open.er-api.com/v6/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdown
for (let select of dropdowns) {

  select.innerHTML = "";  // clear existing options first

  Object.keys(countryList).forEach(currCode => {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select.name === "from" && currCode === "AED") {
       option.selected = true;
    }
    else if (select.name === "to" && currCode === "AFN") {
      option.selected = true;
    }

    select.appendChild(option);
  });

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

async function updateExchangeRate() {
  let amountInput = document.querySelector(".amount input");
  let amount = amountInput.value;

  if (amount === "" || amount <= 0) {
    msg.innerText = "Please enter a valid amount.";
    msg.style.color = "red";
    msg.style.opacity = "1";
    return;
  }

  try {
    const response = await fetch(BASE_URL + fromCurr.value);
    const data = await response.json();

    const rate = data.rates[toCurr.value];
    const finalAmount = amount * rate;

    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    msg.style.color = "black";
    msg.style.opacity = "1";
  } catch (error) {
    msg.innerText = "Error fetching exchange rate!";
    msg.style.color = "red";
    msg.style.opacity = "1";
  }
}

function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

btn.addEventListener("click", function (evt) {
  evt.preventDefault();
  updateExchangeRate();
});
