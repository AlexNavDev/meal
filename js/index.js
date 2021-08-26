import {
    allCategories,
    randomMeal,
    searchMeal
} from "./mealApi.js";

import {
    favoritesMeal
} from "./components/favorite.js";

import {
    modal
} from "./components/modal.js";

import { validationSearch } from "./components/validacion.js";
import { categories } from "./components/categories.js";

document.addEventListener("DOMContentLoaded", () => {
    allCategories();
    categories();
    validationSearch();
    randomMeal();
    searchMeal();
    modal();
    favoritesMeal();

});