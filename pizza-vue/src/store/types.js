/* GENERAL */
// General list with pizzas
export const LOAD_PIZZAS = 'getPizzas';
export const FILTERED_PIZZAS = 'filterPizzas';

/* PIZZAS IN CART */
// Adding and removing from selected pizzas
export const SET_PIZZA = 'setPizza';
export const DEL_PIZZAS = 'delAllPizzas';
export const GET_PIZZAS = 'getSelectedPizzas';

/* CART */
// Totals are changed in [SET_PIZZA]
export const GET_TOTAL_COUNT = 'getTotalCount';
export const GET_TOTAL_PRICE = 'getTotalPrice';

/* MENU */
// SORTING
export const GET_SORT = 'getCurrentSort'
export const SET_SORT = 'changeSorting';
// CATEGORIES
export const SET_CATEGORY = 'changeCategory';
export const GET_CATEGORY = 'getCurrentCategory'