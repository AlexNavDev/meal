import {
    addLocalStorage,
    saveLike
} from "./components/localStorage.js";

import {
    templateRandom,
    templateSearch,
    templateModal,
    templateCategories
} from "./components/templates.js";

const $error = document.querySelector(".error"),
    $form = document.getElementById("form__search"),
    $searchInput = document.querySelector(".search"),
    $searchMeal = document.querySelector(".search__meal"),
    $loader = document.querySelector(".loader"),
    $favoriteMeal = document.querySelector(".favorite__meal"),
    $randomMeal = document.querySelector(".random__meal"),
    $categoriesMeal = document.querySelector(".categories__meal"),
    $select = document.getElementById("categories"),
    $totalFood = document.querySelector(".total__food");

export async function randomMeal() {
    try {
        const api = "https://www.themealdb.com/api/json/v1/1/random.php";
        let res = await fetch(api),
            mealData = await res.json();

        $loader.style.display = "none";
        $favoriteMeal.style.display = "none"; 

        templateRandom(mealData);
        addLocalStorage();
        saveLike();

    } catch (error) {
        $error.style.display = "block";
        let message = error.statusText || "Ocurrio un error";
        $error.innerHTML = `<p> <b> Error: ${error.status}, ${message} </b> </p>`;
        $favoriteMeal.style.display = "none";   
    }
}

export async function searchMeal() {
    $form.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            let meal = e.target.search.value;
            const searchMeal = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
            let res = await fetch(searchMeal),
                mealData = await res.json(),
                totalFood = mealData.meals.length;
            
            if(mealData.meals === null){                  
                $error.style.display = "block";
                $error.innerHTML =  `<p> <b> Meal not found: ${$searchInput.value} </b> </p>`;   
            }

            $totalFood.style.visibility = "visible";
            $totalFood.innerHTML = `<p> Number of results: ${totalFood} </p>`;
   
            $loader.style.display = "none";

            $searchInput.value = "";
            $searchInput.focus();
            $searchMeal.style.display = "grid";

            $randomMeal.style.display = "none";
            $favoriteMeal.style.display = "none";
            $categoriesMeal.style.display = "none";
            $select.value = "";

            templateSearch(mealData);
            saveLike();  

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
    });
}

export async function idMeal(id) {
        try {
            const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
            let res = await fetch(api),
                mealData = await res.json();

            $loader.style.display = "none";
            templateModal(mealData);

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

export async function allCategories(){
        try {
            const api = "https://www.themealdb.com/api/json/v1/1/categories.php";
            let res = await fetch(api),
            mealData = await res.json();
            
            return mealData.categories;
            
        } catch (error) {
            $error.style.display = "block";
                let message = error.statusText || "Ocurrio un error";
            $error.innerHTML = `<p> <b> Error: ${error.status}, ${message} </b> </p>`;
            $randomMeal.style.display = "none";
        }
}

export async function searchCategories(category){
        try {
            const api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
            let res = await fetch(api),
                mealData = await res.json(),
                totalFood = mealData.meals.length;

                $totalFood.style.visibility = "visible";
                $totalFood.innerHTML = `<p> Number of results: ${totalFood} </p>`;
                $totalFood.innerHTML += `<p> Category: ${category} </p>`;
                templateCategories(mealData);
            
        } catch (error) {
            $error.style.display = "block";
                let message = error.statusText || "Ocurrio un error";
            $error.innerHTML = `<p> <b> Error: ${error.status}, ${message} </b> </p>`;
            $randomMeal.style.display = "none";

            $randomMeal.style.display = "none";
                setTimeout(() => {           
                    location.reload();                
                }, 3000);         
        }
}