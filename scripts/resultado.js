export function construirResultado(drinkEncontrado) {
    const results = document.querySelector('.results');
    results.textContent = "";

    // Criando e configurando o nome do drink
    const drinkName = document.createElement('h1');
    drinkName.className = "drink-name";
    drinkName.textContent = drinkEncontrado.strDrink;

    // Criando e configurando a imagem do drink
    const drinkContainerImage = document.createElement('div');
    drinkContainerImage.className = "drink-image";
    
    const drinkImage = document.createElement('img');
    drinkImage.src = drinkEncontrado.strDrinkThumb;
    drinkImage.alt = `Imagem de ${drinkEncontrado.strDrink}`;
    drinkContainerImage.appendChild(drinkImage);

    // Criando e configurando os ingredientes
    const ingredientes = [];

    for (let i = 1; i <= 15; i++) {
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
    
    // Adicionando todos os elementos ao container de resultados
    results.appendChild(drinkName);
    results.appendChild(drinkContainerImage);
    results.appendChild(drinkContainerIngredient);
}
