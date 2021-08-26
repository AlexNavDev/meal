import {
    removeLocalStorge
} from "./localStorage.js";

export function favoritesMeal() {
    const $btnFavorite = document.querySelector(".btn-favorite"),
          $randomMeal = document.querySelector(".random__meal"),
          $searchMeal = document.querySelector(".search__meal"),
          $categoriesMeal = document.querySelector(".categories__meal"),
          $favoriteMeal = document.querySelector(".favorite__meal"),
          $tbody = document.querySelector("#favorites__table tbody"),
          $totalFood = document.querySelector(".total__food");

    $btnFavorite.addEventListener("click", async () => {
        $tbody.innerHTML = "";
        $randomMeal.style.display = "none";
        $searchMeal.style.display = "none";
        $categoriesMeal.style.display = "none";
        $favoriteMeal.style.display = "block";

        //Se obtienen los datos del localstorage
        let dataLocal = localStorage.getItem("LikeMe"),
            historic = [];

        dataLocal == null ?
            historic = [] :
            historic = JSON.parse(dataLocal);

        for (let i = 0; i < historic.length; i++) {
            idMeal(historic[i]);
        }

        $totalFood.style.visibility = "visible";
        $totalFood.innerHTML = `<p> Favorite meals: ${historic.length} </p>`;     
    
    });

    async function idMeal(id) {
        const $error = document.querySelector(".error"),
              $loader = document.querySelector(".loader");

        try {
            const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
            let res = await fetch(api),
                mealData = await res.json();

            $loader.style.display = "none";
            tableFavorites(mealData);
   

       } catch (error) {
            $error.style.display = "block";
                let message = error.statusText || "Ocurrio un error";
            $error.innerHTML = `<p> <b> Error: ${error.status}, ${message} </b> </p>`;
            $favoriteMeal.style.display = "none";

            $randomMeal.style.display = "none";
                setTimeout(() => {           
                    location.reload();                
                }, 3000); 
        }
    }

    function tableFavorites(mealData) {
        let tr = document.createElement("tr"),
            tdName = document.createElement("td"),
            tdPhoto = document.createElement("td"),
            tdMore = document.createElement("td"),
            tdDelete = document.createElement("td");

        tdName.innerHTML = mealData.meals[0].strMeal;
        tdPhoto.innerHTML = `<img src="${mealData.meals[0].strMealThumb}" alt="">`;
        tdMore.innerHTML = `<input type="button" value="🔎" class="btn-see-more" data-id="${mealData.meals[0].idMeal}">`;
        tdDelete.innerHTML = `<input type="button" value="❌" class="btn-delete" data-id="${mealData.meals[0].idMeal}">`;

        tr.appendChild(tdName);      
        tr.appendChild(tdPhoto);
        tr.appendChild(tdMore);
        tr.appendChild(tdDelete);

        $tbody.appendChild(tr);
    }
    btnDelete();   
}

export function hiddenBtnFavorite() {
    const mealId = JSON.parse(localStorage.getItem("LikeMe")),
          $btnFavorite = document.querySelector(".btn-favorite"),
          $favoriteMeal = document.querySelector(".favorite__meal"),
          $select = document.getElementById("categories");

    if (localStorage.getItem("LikeMe")) {
        if (mealId.length === 0) {
            $btnFavorite.style.display = "none";
            $favoriteMeal.style.display = "none";
            $select.value = "";

        } else {
            $btnFavorite.style.display = "block";
        }
    }
}

export function btnDelete() {
    document.addEventListener("click", e => {
           const $totalFood = document.querySelector(".total__food");
     
        if (e.target.matches(".btn-delete")) {
            let row = e.target.parentNode.parentNode,
                id = e.target.dataset.id;

            row.parentNode.removeChild(row);
            removeLocalStorge(id);
            hiddenBtnFavorite();
            $totalFood.innerHTML = `<p> Favorite meals: ${countFavoriteMeals()} </p>`;                           
        }
    });
}

function countFavoriteMeals() {
    const totalMeals = JSON.parse(localStorage.getItem("LikeMe"));
    return totalMeals.length;
}

