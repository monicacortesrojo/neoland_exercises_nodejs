const API_URL = "https://restcountries.eu/rest/v2/region/americas";

const getCountries = (API_URL) => {
    return fetch(API_URL);
};

const renderCountries = (countries) => {
    console.log(countries);
    let list = countries
        .map(
            (item) => `<h2>${item.name}</h2> <img src = "${item.flag}" width = "50">`
        )
        .join("");
    const countriesList = document.querySelector("#countries-list");
    countriesList.innerHTML = list;
};

getCountries(API_URL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        renderCountries(data);
    })
    .finally(() => console.log("Fetch realizado con éxito"));