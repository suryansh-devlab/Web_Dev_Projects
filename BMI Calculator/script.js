function bmi() {
  let h = Number(document.getElementById("height").value);
  let w = Number(document.getElementById("weight").value);

  let bmi = w / (((h / 100) * h) / 100);
  let total = bmi.toFixed(2);

  let result = document.getElementById("result");

  let message = "";
  if (bmi < 18.5) {
    message = "Underweight 😕";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    message = "Normal weight ✅";
  } else if (bmi >= 25 && bmi < 29.9) {
    message = "Overweight ⚠️";
  } else {
    message = "Obese ❌";
  }
  result.innerHTML = `BMI: ${total} <br> ${message}`;
}
// CLEAR BUTTON
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
  document.getElementById("result").innerHTML = "";
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
});
