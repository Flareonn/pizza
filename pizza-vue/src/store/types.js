/* GENERAL */
// LOAD FROM DB
export const LOAD_PIZZAS = 'loadPizzas';

// STORE PIZZAS
export const GET_PIZZAS = 'getPizzas';
export const SET_PIZZAS = 'setPizzas';
export const EDIT_PIZZAS = 'editPizzas';
export const DEL_PIZZAS = 'delPizzas';

// FILTERS / SORTING
export const SET_FILTERS_PIZZAS = 'setFilterPizzas';
export const SET_SORTING_PIZZAS = 'setSortPizzas'

// ADMIN DB
export const SET_DB_PIZZA = 'setDbPizza';
export const DEL_DB_PIZZA = 'delDbPizza';
export const EDIT_DB_PIZZA = 'editDbPizza';

/* PIZZAS IN CART */
// Adding and removing from selected pizzas
export const SET_SELECTED_PIZZA = 'setPizza';
export const DEL_SELECTED_PIZZAS = 'delAllPizzas';
export const GET_SELECTED_PIZZAS = 'getSelectedPizzas';

/* CART */
// Totals are changed in [SET_PIZZA]
export const GET_TOTAL_COUNT = 'getTotalCount';
export const GET_TOTAL_PRICE = 'getTotalPrice';

/* MENU */
// SORTING
export const GET_SORT = 'getCurrentSort';
export const SET_SORT = 'changeSorting';
// CATEGORIES
export const SET_CATEGORY = 'changeCategory';
export const GET_CATEGORY = 'getCurrentCategory';