const $randomCard = document.querySelector(".random__meal"),
      $contentCards = document.querySelector(".search__meal"),
      $templateSearch = document.getElementById("template-card").content,
      $fragmentSearch = document.createDocumentFragment(),
      $contentCategories = document.querySelector(".categories__meal"),
      $templateCategories = document.getElementById("template__card-categories").content,
      $fragmentCategories = document.createDocumentFragment(),
      $modal = document.querySelector(".modal");

let $templateRandom = "",
    $templateModal = "";

export const templateRandom = (data) => {
    const random = data.meals[0];

    $templateRandom = `
        <div class="card__random">
            <div class="card__image">
                <span>Random Recipe</span>
                <img src="${random.strMealThumb}" alt="">
            </div>

            <div class="card__name">
                 <p>${random.strMeal}</p>
            </div>
         
            <div class= "card__footer">
                <input type="button" value="See more" class="btn-see-more" data-id="${random.idMeal}">
                <button class="btn-icon-heart"> <i class="fa fa-heart" data-id="${random.idMeal}"> </i></button>  
            </div>         
        
        </div>   
     `
    $randomCard.innerHTML = $templateRandom;
}

export const templateSearch = (data) => {
    data.meals.forEach(meal => {
        $templateSearch.querySelector(".cards h2").innerHTML = `${meal.strMeal}`;
        $templateSearch.querySelector(".origin").innerHTML = `<span> Origin: </span> ${meal.strArea}`;
        $templateSearch.querySelector(".category").innerHTML = `<span> Category: </span> ${meal.strCategory}`;

        $templateSearch.querySelector(".card__image img").src = meal.strMealThumb;
        $templateSearch.querySelector(".card__image img").alt = meal.strMeal;

        $templateSearch.querySelector(".btn-see-more").dataset.id = `${meal.idMeal}`;
        $templateSearch.querySelector("button i").dataset.id = `${meal.idMeal}`;

        let $clone = document.importNode($templateSearch, true);
        $fragmentSearch.appendChild($clone);
    });

    $contentCards.innerHTML = "";
    $contentCards.appendChild($fragmentSearch);
}

export const templateCategories = (data) => {
    data.meals.forEach(meal => {
        
        $templateCategories.querySelector(".cards__categories h2").innerHTML = `${meal.strMeal}`;

        $templateCategories.querySelector(".card__image img").src = meal.strMealThumb;
        $templateCategories.querySelector(".card__image img").alt = meal.strMeal;

        $templateCategories.querySelector(".btn-see-more").dataset.id = `${meal.idMeal}`;
        $templateCategories.querySelector("button i").dataset.id = `${meal.idMeal}`;

        let $clone = document.importNode($templateCategories, true);
        $fragmentCategories.appendChild($clone);
    });

    $contentCategories.innerHTML = "";
    $contentCategories.appendChild($fragmentCategories);
}

export const templateModal = (data) => {
    const meals = data.meals[0],
        ingredients = [];

    function createIngredient(meal) {
        for (let i = 1; i <= 20; i++) {

            if (meal[`strIngredient${i}`]) {
                ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
            } else {
                break;
            }
        }
    }

    createIngredient(meals);

    $templateModal = `
        <div class="modal__container">
            <div class="modal__header">
                <h2>${meals.strMeal}</h2>
            </div>

            <div class="modal__body">
                <div class="modal__image">
                    <img src="${meals.strMealThumb}" alt="${meals.strMeal}">                
                </div>

                <div class="modal__info">
                    <div class="ingredients">
                    <h2>Ingredients</h2>
                        <ul>
                            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
                                  
                        </ul>
                    </div>

                    <div class="preparation">
                    <h2> Preparation </h2>
                        ${meals.strInstructions}
                    </div>
                </div>
            </div>

            <div class="modal__footer">
                <input type="button" value="Close" class="btn-close-modal">
            </div>

        </div>
    `
    $modal.innerHTML = $templateModal;
}