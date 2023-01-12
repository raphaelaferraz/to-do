const botaoModalEdicao = document.querySelectorAll("[data-botao-completo]");
const botaoFechaModalEdicao = document.querySelector("[data-botao-fechar]");
const modalEdicao = document.querySelector("[data-form-edicao]");
const fade = document.querySelector(".fade");
const atividadesAdicionadas = document.querySelectorAll(".secao__formulario__lista__item");

function getDados(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText
}

function postDados(url, body) {
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(body));
    request.onload = function() {
        console.log(this.responseText);
    }
    return request.responseText
}

function cadastraAtividade() {
    event.preventDefault();
    let url = "https://to-do-list-api.fly.dev/tarefas/";
    let titulo = document.getElementById("titulo").value;
    let body = {
        "titulo": titulo,
        "data_de_conclusao": null,
        "concluida": false,
        "descricao": ""
    }
    postDados(url, body);
    getDados(url);
    document.location.reload(true);
}

function criaAtividade(atividades) {
    let item = document.createElement("li");
    item.classList.add("secao__formulario__lista__item");
    let itemNome =  document.createElement("p");
    let itemId = document.createElement("span");
    itemId.id = atividades.id;
    itemId.title = "itemId";
    itemId.style.display = "none";
    let conteinerBotoes = document.createElement("div");
    conteinerBotoes.classList.add("secao__formulario__lista__item__conteiner");
    let botaoCompleto = document.createElement("button");
    botaoCompleto.innerHTML = `<svg width="25" height="25" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 18.3333V33.3333C35 33.7754 34.8244 34.1993 34.5118 34.5118C34.1993 34.8244 33.7754 35 33.3333 35H6.66667C6.22464 35 5.80072 34.8244 5.48816 34.5118C5.17559 34.1993 5 33.7754 5 33.3333V6.66667C5 6.22464 5.17559 5.80072 5.48816 5.48816C5.80072 5.17559 6.22464 5 6.66667 5H26.6667" stroke="#337539" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M35 8.33333L20 23.3333L13.3333 16.6667" stroke="#337539" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    botaoCompleto.classList.add("secao__formulario__lista__item__conteiner__botao-completo");
    let botaoLixeira = document.createElement("button");
    botaoLixeira.innerHTML =  ` <svg width="40" height="31" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.7917 30.2083V23.9583" stroke="#CD3A3A" stroke-width="2.66667" stroke-linecap="round"/>
    <path d="M30.2083 30.2083V23.9583" stroke="#CD3A3A" stroke-width="2.66667" stroke-linecap="round"/>
    <path d="M6.25 13.5417H43.75C40.824 13.5417 39.361 13.5417 38.3102 14.2439C37.8552 14.5479 37.4646 14.9385 37.1606 15.3935C36.4583 16.4444 36.4583 17.9074 36.4583 20.8333V32.2917C36.4583 36.22 36.4583 38.1842 35.2379 39.4046C34.0175 40.625 32.0533 40.625 28.125 40.625H21.875C17.9466 40.625 15.9824 40.625 14.7621 39.4046C13.5417 38.1842 13.5417 36.22 13.5417 32.2917V20.8333C13.5417 17.9074 13.5417 16.4444 12.8395 15.3935C12.5355 14.9385 12.1448 14.5479 11.6899 14.2439C10.6389 13.5417 9.17596 13.5417 6.25 13.5417Z" stroke="#CD3A3A" stroke-width="2.66667" stroke-linecap="round"/>
    <path d="M19.7917 7.29217C19.7917 7.29217 20.8333 5.20833 25 5.20833C29.1667 5.20833 30.2083 7.29167 30.2083 7.29167" stroke="#CD3A3A" stroke-width="2.66667" stroke-linecap="round"/>
    </svg>`;
    botaoLixeira.classList.add("secao__formulario__lista__item__conteiner__botao-lixeira");

    itemNome.innerHTML = atividades.titulo
    itemId.innerHTML = atividades.id
    
    conteinerBotoes.appendChild(botaoLixeira);
    conteinerBotoes.appendChild(botaoCompleto);

    item.appendChild(itemNome);
    item.appendChild(itemId);
    item.appendChild(conteinerBotoes);

    return item
}


function principal() {
    let dados = getDados("http://to-do-list-api.fly.dev/tarefas/");
    let atividades = JSON.parse(dados);
    console.log(atividades);
    const lista = document.querySelector("[data-atividades-lista]");
    atividades.forEach((item) => {
        let itemDaLista = criaAtividade(item);
        lista.appendChild(itemDaLista);
    });
}

principal();

function edicaoAtividade() {
 
    function pegaId(item) {
        return item.getElementsByTagName("span")[0].id
    }

    const toggleModal = () => {
        modalEdicao.classList.toggle("hide");
        fade.classList.toggle("hide");
    }

    const itemLista = document.querySelectorAll(".secao__formulario__lista__item");       
    itemLista.forEach((item) => {
        item.addEventListener("click", () => {  
            pegaId(item);
            toggleModal();
        });
    });
    
    function clicar () {
        [botaoFechaModalEdicao, fade].forEach((elemeto) => {
            elemeto.addEventListener("click", (evento) => {
                evento.preventDefault();
                toggleModal();
            });
        });
    }
    
    clicar();    
}

edicaoAtividade();

