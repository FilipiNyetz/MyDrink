import { prepararDados } from './preparacaoDados.js';
import { calcularKMeans } from './clusterizacao.js'; // Função para calcular os clusters
import { carregarDrinksDoArquivo, listaFiltroDrinks } from './requisicoes/carregarArquivoJSON.js';
import { buscaAPI, dados } from './requisicoes/buscaAPI.js';

const inputDrinkPreferido = document.querySelector('.input-preferido');
const btnRecomendar = document.querySelector('.bt-recomendar');
let drinkEscolhido;

const categoriaPreferida = document.querySelector('.preferido-categoria');
const basePreferida = document.querySelector('.preferido-nome');
// Variável para armazenar a lista de drinks

btnRecomendar.addEventListener('click', escolherDrink);

async function acessarJSON() {
    await carregarDrinksDoArquivo();
    
}
acessarJSON()

function escolherDrink() {
    drinkEscolhido = inputDrinkPreferido.value;
    
    const drinkExiste=listaFiltroDrinks.find(drink=>drink.drinkName==drinkEscolhido)
    if(drinkExiste){
        const dadosPreparados=prepararDados(listaFiltroDrinks);
        const drinksRecomendados = recomendarDrink(drinkEscolhido, listaFiltroDrinks, dadosPreparados);

        categoriaPreferida.innerHTML=`A categoria do seu frink preferido e: ${drinkExiste[`drinkCategory`]}`
        basePreferida.innerHTML=`A base do seu drink preferido e: ${drinkExiste[`drinkBase`]}`

        gerarItensRecomendacao(drinksRecomendados)
    }else{
        console.log("drink nao existe")
    }
    inputDrinkPreferido.value=""
}

async function gerarItensRecomendacao(recomendacoes) {
    const nomesDrinksRecomendados = recomendacoes.map(elemento => elemento.drinkName);

    // Limpa a lista antes de adicionar novos elementos
    const listaRecomendados = document.querySelector('.lista-recomendados');
    listaRecomendados.innerHTML = '';

    for (let i = 0; i < nomesDrinksRecomendados.length; i++) {
        await buscaAPI(nomesDrinksRecomendados[i]);
        // Chama a função para exibir cada drink
        exibirNaTela(dados.drinks[0]);
    }
}

function exibirNaTela(drink) {
    const listaRecomendados = document.querySelector('.lista-recomendados');

    // Cria um card para cada drink recomendado
    const liDrink = document.createElement('li'); // Cria um novo elemento li
    liDrink.classList.add('drink-card'); // Adiciona uma classe para estilização (opcional)

    // Define o conteúdo do card
    const drinkName = document.createElement('h1');
    drinkName.className = "drink-name";
    drinkName.textContent = drink['strDrink'];

    const urlImage = drink['strDrinkThumb'];
    const drinkContainerImage = document.createElement('div');
    drinkContainerImage.className = "drink-image";

    const drinkImage = document.createElement('img');
    drinkImage.src = urlImage;
    drinkContainerImage.appendChild(drinkImage);

    const drinkCategory = document.createElement('h3');
    drinkCategory.textContent = `Categoria: ${drink["strCategory"]}`;

    const drinkBase = document.createElement('h3');
    drinkBase.textContent = `Base: ${drink["strIngredient1"] || 'N/A'}`; // Verifique a chave correta

    // Adiciona o card à lista
    liDrink.appendChild(drinkName);
    liDrink.appendChild(drinkContainerImage);
    liDrink.appendChild(drinkCategory);
    liDrink.appendChild(drinkBase);

    listaRecomendados.appendChild(liDrink); // Usa liDrink em vez de li
}

function recomendarDrink(drinkEscolhido, listaFiltroDrinks, dadosPreparados) {
    const index = listaFiltroDrinks.findIndex(drink => drink.drinkName === drinkEscolhido);
    if (index === -1) return []; // Se o drink não for encontrado, retorne um array vazio

    const clusters = calcularKMeans(dadosPreparados);
    const resultadoCluster = [];
    const recommendedDrinks = []; // Usar um array normal para armazenar as recomendações

    const drinkSelecionado = listaFiltroDrinks[index];
    const categoriaSelecionada = drinkSelecionado.drinkCategory;
    const baseSelecionada = drinkSelecionado.drinkBase;

    Object.values(clusters).forEach(cluster => {
        if (cluster.includes(index)) {
            cluster.forEach(drinkIndex => {
                if (drinkIndex !== index) {
                    const drinkRecomendado = listaFiltroDrinks[drinkIndex];
                    if (drinkRecomendado.drinkCategory === categoriaSelecionada && drinkRecomendado.drinkBase === baseSelecionada) {
                        resultadoCluster.push({
                            drinkName: drinkRecomendado.drinkName,
                            drinkCategory: drinkRecomendado.drinkCategory,
                            drinkBase: drinkRecomendado.drinkBase
                        });
                    }
                }
            });
        }
    });

    const randomIndex = Math.floor(Math.random() * resultadoCluster.length);
    if (resultadoCluster.length > 3) {
        recommendedDrinks.push(...resultadoCluster.slice(randomIndex, randomIndex + 3));
    } else {
        recommendedDrinks.push(...resultadoCluster);
    }

    return recommendedDrinks;
}