const botaoModalEdicao = document.querySelectorAll("[data-botao-completo]");
const botaoFechaModalEdicao = document.querySelector("[data-botao-fechar]");
const modalEdicao = document.querySelector("[data-form-edicao]");
const fade = document.querySelector(".fade");
const atividadesAdicionadas = document.querySelectorAll(".secao__formulario__lista__item");

const toggleModal = () => {
    modalEdicao.classList.toggle("hide");
    fade.classList.toggle("hide");
}

botaoModalEdicao.forEach((botao) => {
    botao.addEventListener("click", (evento) => {
        evento.preventDefault();
        toggleModal();
    });
});

function clicar () {
    [botaoModalEdicao, botaoFechaModalEdicao, fade].forEach((elemeto) => {
        elemeto.addEventListener("click", (evento) => {
            evento.preventDefault();
            toggleModal();
        });
    });
}

clicar();