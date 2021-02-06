const API_URL = "http://localhost:2009/api/cursos";

function getCursos(API_URL) {
    return fetch(API_URL);
}

function renderCursos(cursos){
    console.log(cursos);
    let list = cursos
    .map((item) => `<p>${item.name} - `)
}