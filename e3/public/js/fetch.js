const API_URL = "https://restcountries.eu/rest/v2/all";

const getCountries = (API_URL) => {
    return fetch(API_URL);
};

const renderCountries = (countries) => {
    console.log(countries);
    let list = countries
        .map(
            (item) =>
            `<div><img src = "${item.flag}" width = "30"> <h2>${item.name}</h2></div> `
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