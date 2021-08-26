import {
    idMeal
} from "../mealApi.js";

export function modal() {
    const $modal = document.querySelector(".modal");
    document.addEventListener("click", (e) => {

        if (e.target.matches(".btn-see-more")) {
            let id = e.target.dataset.id;
            idMeal(id);
            $modal.style.transform = "scaleX(1)";            
        }

        if (e.target.matches(".btn-close-modal")) $modal.style.transform = "scaleX(0)";
        
    })
}