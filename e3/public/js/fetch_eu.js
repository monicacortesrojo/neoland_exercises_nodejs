const API_URL_EU = "https://restcountries.eu/rest/v2/region/europe";

const getCountries = (API_URL_EU) => {
    return fetch(API_URL_EU);
};

const renderCountries = (countries) => {
    console.log(countries);
    let list = countries
        .map(
            (item) => `<h2>${item.name}</h2> <img src = "${item.flag}" width = "50">`
        )
        .join("");
    const countriesList = document.querySelector("#europa-list");
    countriesList.innerHTML = list;
};

getCountries(API_URL_EU)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        renderCountries(data);
    })
    .finally(() => console.log("Fetch realizado con éxito"));