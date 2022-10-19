const searchBtn = document.querySelector('#search-btn');
const flagSpan = document.querySelector('#flag');
const answersBtns = document.querySelector('#container-answers')

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
    fetch(finalURL).then((response) => response.json()).then((data) => {
        let country = randomCountry(data);
        findCountry(data[country].name.common)
        answers(data[country].name.common, data);
        localStorage.setItem('resposta', data[country].name.common)

        
    })
    answersBtns.addEventListener('click', identifyAnswer);
    let choices = answersBtns.children;
    for (let i = 0; i < choices.length; i += 1){
        if (choices[i].classList !== ''){
            choices[i].classList.remove(choices[i].classList[2])
        }
        choices[i].classList.add('btn')
        choices[i].classList.add('btn-light')
    }

}


function displayFlag(flag) {
    flagSpan.innerHTML = `
        <img class="flag" src="${flag}">
        `
}

function findCountry(pais) {

    const countryName = pais;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(finalURL).then((response) => response.json()).then((data) => {
        displayFlag(data[0].flags.svg)
    })



}

allContries();

searchBtn.addEventListener('click', allContries);

function identifyAnswer(e) {
    let resposta = localStorage.getItem('resposta');
    if (e.target.innerHTML.includes('<span')){
        return
    }

    if (resposta === e.target.innerHTML ){
        e.target.classList.add('correct')
    }else {
        e.target.classList.add('wrong')
    }
    answersBtns.removeEventListener('click', identifyAnswer)


}

