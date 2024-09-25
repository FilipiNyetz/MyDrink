import { buscaAPI, dados} from "./requisicoes/buscaAPI.js";

const inputSearch = document.getElementById('cocktailInput');
const btSearch = document.getElementById('searchButton');
const results = document.querySelector('.results');

let drinkEncontrado = {};

async function buscarDrink() {
    const drinkName = inputSearch.value.trim();
    if (drinkName) {
        await buscaAPI(drinkName);
        if (dados.drinks && dados.drinks.length > 0) {
            const drinkEncontrado = dados.drinks[0];
            construirResultado(drinkEncontrado);
            inputSearch.value=""
        } else {
            results.innerHTML = `
                <div class="landing">
                    <h2>Drink não encontrado ):!</h2>
                    <p>Tente buscar outro nome e aprenda a preparar um drink como um verdadeiro bartender!</p>
                </div>
            `;
            inputSearch.value=""
        }
    } else {
        results.innerHTML = `
            <div class="landing">
                <h2>Descubra o Segredo por Trás dos Melhores Drinks!</h2>
                <p>Digite o nome de um coquetel e aprenda a prepará-lo como um verdadeiro bartender. Explore receitas, ingredientes e técnicas para criar bebidas incríveis!</p>
            </div>
        `;
    }
}

btSearch.addEventListener('click',buscarDrink);

function construirResultado(drinkEncontrado){
    results.textContent="";
    const drinkName = document.createElement('h1')
    drinkName.className="drink-name"
    drinkName.textContent=drinkEncontrado['strDrink'];

    let urlImage=drinkEncontrado['strDrinkThumb'];
    
    const drinkContainerImage=document.createElement('div');
    drinkContainerImage.className="drink-image";

    const drinkImage=document.createElement('img');
    drinkImage.src=urlImage;
    drinkContainerImage.appendChild(drinkImage);

    const ingredientes = [];

    for (let i = 1; i <= 15; i++) { // Ajuste o número se necessário
        const ingrediente = drinkEncontrado[`strIngredient${i}`];
        const medida = drinkEncontrado[`strMeasure${i}`];
        if (ingrediente) {
            ingredientes.push(`${medida ? medida + ' ' : ''}${ingrediente}`);
        }
    }

    const drinkContainerIngredient = document.createElement('div');
    drinkContainerIngredient.className = "drink-ingredients";
    
    const drinkListIngredient = document.createElement('ul');
    drinkListIngredient.className = "list-ingredients";

    ingredientes.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        drinkListIngredient.appendChild(listItem);
    });
    drinkContainerIngredient.appendChild(drinkListIngredient);

    const drinkContainerInstructions = document.createElement('div');
    drinkContainerInstructions.className="drink-instructions";
    drinkContainerInstructions.textContent=`Modo de preparo:`
    const drinkInstruction = document.createElement('p');
    drinkInstruction.className="drink-instructions";
    drinkInstruction.innerHTML=`${drinkEncontrado[`strInstructions`]}`;
    
    drinkContainerInstructions.appendChild(drinkInstruction);

    results.appendChild(drinkName);
    results.appendChild(drinkContainerImage);
    results.appendChild(drinkContainerIngredient);
    results.appendChild(drinkContainerInstructions);
}