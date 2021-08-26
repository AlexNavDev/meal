import {
    hiddenBtnFavorite
} from "./favorite.js";

// Datos que se almacen en localStorage
export function addLocalStorage() {
    document.addEventListener("click", e => {
        const $iconsHeart = Array.from(document.querySelectorAll(".fa-heart")),
            indexIcon = $iconsHeart.indexOf(e.target),
            mealId = e.target.dataset.id,
            iconSelected = $iconsHeart[indexIcon];        

        if (e.target.matches(".fa-heart")) {
            if (iconSelected.classList.contains("active")) {
                removeLocalStorge(mealId);
                iconSelected.classList.remove("active");
                hiddenBtnFavorite();

            } else {
                storageLocalStorge(mealId);
                iconSelected.classList.add("active");
                hiddenBtnFavorite(); 
            }
        }
    });
}

//Funciones para almacenar en el localStorage
let historic = [];

function storageLocalStorge(data) {
    const mealIds = getLocalStorge();
    localStorage.setItem("LikeMe", JSON.stringify([...mealIds, data]));   
}

function getLocalStorge() {
    let dataLocal = localStorage.getItem("LikeMe");
    dataLocal === null ?
        historic = [] :
        historic = JSON.parse(dataLocal)
        return historic;
}

export function removeLocalStorge(md) {
    const mealIds = getLocalStorge();
    localStorage.setItem("LikeMe", JSON.stringify(mealIds.filter(id => id !== md)));   
}

// Datos que persisten en el html
export function saveLike() {
    if (localStorage.getItem("LikeMe")) {
        const $iconsHeart = Array.from(document.querySelectorAll(".fa-heart")),
            mealId = JSON.parse(localStorage.getItem("LikeMe"));

        for (let i = 0; i < $iconsHeart.length; i++) {
            let iconId = $iconsHeart[i].dataset.id;

            for (let j = 0; j < mealId.length; j++) {
                if (iconId === mealId[j]) {
                    $iconsHeart[i].classList.add("active");
                }
            }
        }
    }
}

hiddenBtnFavorite();