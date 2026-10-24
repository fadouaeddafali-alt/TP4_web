import {
 filterOrders,
 computeIndicators,
 getOrderDetails,
 getCategories
} from "./selectors.js";

const $ = id => document.getElementById(id);

const formatMAD = amount => `${amount.toLocaleString("fr-FR")} MAD`;

const escapeHtml = value =>
 String(value)
 .replace(/&/g, "&amp;")
 .replace(/</g, "&lt;")
 .replace(/>/g, "&gt;")
 .replace(/"/g, "&quot;");

const STATUS_CLASS = {
 "Livree": "bg-success",
 "En attente": "bg-warning text-dark",
 "Annulee": "bg-danger"
};

function statusBadge(status) {
 const css = STATUS_CLASS[status] || "bg-secondary";
 return `<span class="badge ${css}">${escapeHtml(status)}</span>`;
}

export function showError(message) {
 const alertBox = $("errorAlert");
 alertBox.textContent = message; // textContent : jamais interprété comme HTML
 alertBox.classList.remove("d-none");
}

export function hideError() {
 $("errorAlert").classList.add("d-none");
}

export function populateCategoryFilter(products) {
 const select = $("categoryFilter");
 getCategories(products).forEach(category => {
 const option = document.createElement("option"); // crée <option>
 option.value = category; // valeur lue au "change"
 option.textContent = category; // texte visible
 select.appendChild(option); // l'ajoute dans <select>
 });
}

function renderIndicators(state) {
 const kpi = computeIndicators(state);
 $("kpiCustomers").textContent = kpi.customers;
 $("kpiProducts").textContent = kpi.products;
 $("kpiOrders").textContent = kpi.orders;
 $("kpiRevenue").textContent = formatMAD(kpi.revenue);
}

function renderOrders(state) {
 const orders = filterOrders(state); // commandes qui passent les 3 filtres
 const body = $("ordersBody");
 
 if (orders.length === 0) {
 body.innerHTML =
 `<tr><td colspan="6" class="text-center text-muted py-4">Aucun résultat</td></tr>`;
 return;
 }
 
 body.innerHTML = orders
 .map(order => {
 const details = getOrderDetails(order, state);
 const name = details.customer ? details.customer.name : "Client inconnu";
 return `
 <tr>
 <td>#${order.id}</td>
 <td>${escapeHtml(name)}</td>
 <td>${escapeHtml(order.date)}</td>
 <td>${statusBadge(order.status)}</td>
 <td class="text-end">${formatMAD(details.total)}</td>
 <td class="text-end">
 <button class="btn btn-sm btn-outline-primary"
 data-order-id="${order.id}"
 data-bs-toggle="modal" data-bs-target="#orderModal">
 Détail
 </button>
 </td>
 </tr>`;
 })
 .join("");
}

export function renderOrderModal(details) {
 const { order, customer, lines, total } = details; // déstructuration
 $("modalTitle").textContent = `Commande #${order.id}`;

 const rows = lines
 .map(line => `
 <tr>
 <td>${escapeHtml(line.name)}</td>
 <td class="text-end">${formatMAD(line.price)}</td>
 <td class="text-end">${line.quantity}</td>
 <td class="text-end">${formatMAD(line.amount)}</td>
 </tr>`)
 .join("");
 $("modalBody").innerHTML = `
 <p class="mb-1"><strong>Client :</strong>
 ${customer ? escapeHtml(customer.name) : "Client inconnu"}</p>
Guide TP4 - Git, GitHub, HTML, Bootstrap, JavaScript, JSON Page 41
 <p class="mb-1"><strong>Ville :</strong>
 ${customer ? escapeHtml(customer.city) : "-"}</p>
 <p class="mb-1"><strong>Date :</strong> ${escapeHtml(order.date)}</p>
 <p class="mb-3"><strong>Statut :</strong> ${statusBadge(order.status)}</p>
 <table class="table table-sm">
 <thead>
 <tr>
 <th>Produit</th>
 <th class="text-end">Prix</th>
 <th class="text-end">Qté</th>
 <th class="text-end">Montant</th>
 </tr>
 </thead>
 <tbody>${rows}</tbody>
 <tfoot>
 <tr>
 <th colspan="3" class="text-end">Total</th>
 <th class="text-end">${formatMAD(total)}</th>
 </tr>
 </tfoot>
 </table>`;
}

export function render(state) {
 renderIndicators(state);
 renderOrders(state);
}