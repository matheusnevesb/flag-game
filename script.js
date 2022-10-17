const searchBtn = document.querySelector('#search-btn');
const flagSpan = document.querySelector('#flag');

function randomCountry(data){
    return Math.floor(Math.random() * data.length)
}

function answers(name, data){
    const a01 = document.querySelector('#answer-01');
    const a02 = document.querySelector('#answer-02');
    const a03 = document.querySelector('#answer-03');
    const a04 = document.querySelector('#answer-04');
    a01.innerText = name;
    a02.innerText = data[randomCountry(data)].name.common;
    a03.innerText = data[randomCountry(data)].name.common;
    a04.innerText = data[randomCountry(data)].name.common;

}

function allContries() {
    let finalURL = `https://restcountries.com/v3.1/all`;

    // console.log(finalURL);
    fetch(finalURL).then((response) => response.json()).then((data) => {
        let country = randomCountry(data);
        console.log(data[country].name.common)
        findCountry(data[country].name.common)
        answers(data[country].name.common, data);

        
    })

}


function displayFlag(flag) {
    flagSpan.innerHTML = `
        <img class="flag" src="${flag}">
        `
}

function findCountry(pais) {

    const countryName = pais;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    console.log(finalURL);
    fetch(finalURL).then((response) => response.json()).then((data) => {
        console.log(data[0])
        // console.log(data[0].flags.svg)
        displayFlag(data[0].flags.svg)
    })



}

searchBtn.addEventListener('click', allContries);