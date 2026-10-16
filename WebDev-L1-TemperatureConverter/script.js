
const form = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");
const error = document.getElementById("error");

function toCelsius(value, unit) {
    if (unit === "C") return value;
    if (unit === "F") return (value - 32) * 5 / 9;
    return value - 273.15;
}

function fromCelsius(value, unit) {
    if (unit === "C") return value;
    if (unit === "F") return (value * 9 / 5) + 32;
    return value + 273.15;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const temperature = Number(temperatureInput.value);
    const source = fromUnit.value;
    const target = toUnit.value;

    error.textContent = "";
    result.textContent = "--";

    if (temperatureInput.value.trim() === "" ||
        !Number.isFinite(temperature)) {
        error.textContent = "Please enter a valid temperature.";
        return;
    }

    if (source === "K" && temperature < 0) {
        error.textContent = "Kelvin temperature cannot be below 0 K.";
        return;
    }

    const celsius = toCelsius(temperature, source);

    if (celsius < -273.15) {
        error.textContent =
            "Temperature cannot be below absolute zero (-273.15 °C).";
        return;
    }

    const converted = fromCelsius(celsius, target);
    const symbol = target === "K" ? "K" : `°${target}`;

    result.textContent = `${Number(converted.toFixed(4))} ${symbol}`;
});

form.addEventListener("reset", function () {
    error.textContent = "";
    result.textContent = "--";
});
