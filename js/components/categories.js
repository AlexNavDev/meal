import {allCategories, searchCategories} from "../mealApi.js";

export async function categories(){
    const $select = document.getElementById("categories"),
          categories = await allCategories(),
          $randomMeal = document.querySelector(".random__meal"),
          $searchMeal = document.querySelector(".search__meal"),
          $favoriteMeal = document.querySelector(".favorite__meal"),
          $categoriesMeal = document.querySelector(".categories__meal"),
          $total = document.querySelector(".total__food");

    let $options = `<option value="">Categories</option>`;  

    categories.forEach(category =>{
        $options += `<option value="${category.strCategory}">${category.strCategory}</option>`
    });

    $select.innerHTML = $options;  

      document.addEventListener("change",  e =>{
          if(e.target.matches("#categories")){ 
            
            const category = $select.value;           
            
            if(category === "" )
            return

              $randomMeal.style.display = "none";
              $searchMeal.style.display = "none";
              $favoriteMeal.style.display = "none";
              searchCategories(category);
              $categoriesMeal.style.display = "grid";

          }          
      });
}