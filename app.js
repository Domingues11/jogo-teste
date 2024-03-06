//  Essa variável será responsável por alterar a propriedade selecionada (h1) para que a mesma seja alterada
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número de 1 a 10';

// Função para puxar todas as váriaveis citadas acima (boa prática de programação)
let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibicaoDeTexto(tag, texto) {
    let campo = document.querySelector(tag)
    campo.innerHTML = texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

function exibirMensagemInicial () {
    exibicaoDeTexto('h1', 'Jogo do número secreto'); // Selecione a tag e depois o conteúdo que será escrito
    exibicaoDeTexto('p', 'Escolha um número de 1 a 50');
}

exibirMensagemInicial();

// Realizar a função do chute
function verificarChute() {
    let chute = document.querySelector ('input').value; // value irá pegar apenas o valot gerado dentro do input
    if (chute == numeroSecreto) {
        exibicaoDeTexto('h1', 'ACERTOU!!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto, com ${tentativas} ${palavraTentativa}!`;
        exibicaoDeTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibicaoDeTexto('p', 'O número secreto é menor');
        } else {
            exibicaoDeTexto('p', 'O número secreto é maior');
        }
         //tentativas = tentativas + 1
         tentativas++
         limparCampo();
    }
}

// o "retirn" guarda informação do número gerado e o "parseInt" serve para gerar um número inteiro 
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeNumerosDaLista = listaDeNumerosSorteados.length; //length = retorna a quantidade de elementos da lista 

    if (quantidadeNumerosDaLista == numeroLimite) {
       listaDeNumerosSorteados = [] 
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';   
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}