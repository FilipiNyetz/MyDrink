import { randomAPI} from "./requisicoes/randomAPI.js";

const displayDrinksTela = document.querySelector('.drinks-display');

let drinks = [];
async function buscarDrinkAleatorio() {
    for (let i = 0; i < 9; i++) {
        let randomDrinks = await randomAPI(); // Chama a função e aguarda os resultados
        if (randomDrinks && randomDrinks.drinks && randomDrinks.drinks.length > 0) {
            drinks.push(randomDrinks.drinks[0]); // Adiciona o primeiro drink do array
            exibirDrinks(drinks);
        } else {
            console.log("Nenhum dado foi retornado.");
        }
    }
    console.log(drinks); // Exibe os dados no console
    
}

// Chame a função para buscar um drink aleatório
buscarDrinkAleatorio();

function exibirDrinks(drinks) {
    displayDrinksTela.innerHTML = ""; // Limpa a tela antes de exibir novos drinks
    const ulDrinks = document.createElement('ul');
    ulDrinks.className = "drinks-list"; // Classe para estilização

    drinks.forEach(item => {
        console.log(item);
        const liDrinks = document.createElement('li');
        liDrinks.className = 'drink'; // Classe para estilização

    // Acessando o nome do drink corretamente
        const drinkTitle = document.createElement('h2');
        drinkTitle.className = "drink-title"; // Classe para estilização
        drinkTitle.textContent = item.strDrink; // Acessa a propriedade strDrink diretamente

        const imgDrink = document.createElement('img');
        imgDrink.className = "drink-img"; // Classe para estilização
        imgDrink.src = item['strDrinkThumb'];

        const ingredients = [];
        for (let i = 1; i <= 5; i++) {
            const ingredient = item[`strIngredient${i}`];
            if (ingredient) {
                ingredients.push(ingredient);
            }
        }
    
        const drinkContainerIngredient = document.createElement('div');
        drinkContainerIngredient.className = "details"; // Classe para estilização

        const drinkListIngredient = document.createElement('ul');
        drinkListIngredient.className = "ingredients-list"; // Classe para estilização

        ingredients.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            drinkListIngredient.appendChild(listItem);
        });
        drinkContainerIngredient.appendChild(drinkListIngredient);

    // Adiciona o título ao item da lista
        liDrinks.appendChild(drinkTitle);
        liDrinks.appendChild(imgDrink);
        liDrinks.appendChild(drinkContainerIngredient);

        // Adiciona o item da lista à lista não ordenada
        ulDrinks.appendChild(liDrinks);
    });

    displayDrinksTela.appendChild(ulDrinks);

}