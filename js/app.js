import { state } from "./state.js";
import { loadAllData } from "./dataService.js";
import { getOrderDetails } from "./selectors.js";
import {
 render,
 showError,
 hideError,
 populateCategoryFilter,
 renderOrderModal
} from "./view.js";

async function init() {
 try {

 const data = await loadAllData();
 
 state.customers = data.customers;
 state.products = data.products;
 state.orders = data.orders;

 
 hideError();
 populateCategoryFilter(state.products);
 
 
 render(state);
 } catch (error) {

    
 showError(error.message);
 }
}

function setupEvents() {

 document.getElementById("searchInput").addEventListener("input", event => {
 state.search = event.target.value; // event.target = le champ de saisie
 render(state);
 });
 
 document.getElementById("statusFilter").addEventListener("change", event => {
 state.status = event.target.value; // value de l'<option> choisie
 render(state);
 });
 
 document.getElementById("categoryFilter").addEventListener("change", event => {
 state.category = event.target.value;
 render(state);
 });
 
 document.getElementById("ordersBody").addEventListener("click", event => {


 const button = event.target.closest("[data-order-id]");
 if (!button) return; 
 const orderId = Number(button.dataset.orderId);
 const order = state.orders.find(o => o.id === orderId);
 if (order) {

 renderOrderModal(getOrderDetails(order, state));
 }
 });
}

setupEvents(); // branche les écouteurs (les éléments existent déjà dans le HTML)
init(); // lance le chargement des données
