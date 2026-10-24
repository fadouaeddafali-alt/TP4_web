export function findCustomer(customers, customerId) {
 return customers.find(customer => customer.id === customerId);
}

export function findProduct(products, productId) {
 return products.find(product => product.id === productId);
}

export function getLineAmount(product, quantity) {
 return product ? product.price * quantity : 0;
}

export function getOrderDetails(order, state) {
 
 const customer = findCustomer(state.customers, order.customerId);
 
 const lines = order.items.map(item => {
 const product = findProduct(state.products, item.productId); 
 return {
 name: product ? product.name : "Produit inconnu",
 price: product ? product.price : 0,
 quantity: item.quantity,
 amount: getLineAmount(product, item.quantity)
 };
 });

 let total = 0;
 lines.forEach(line => {
 total += line.amount;
 });
 return { order, customer, lines, total };
}

export function filterOrders(state) {
 
 const term = state.search.trim().toLowerCase();

 return state.orders.filter(order => {
 const customer = findCustomer(state.customers, order.customerId);
 
 const matchSearch =
 term === "" ||
 (customer !== undefined && customer.name.toLowerCase().includes(term));
 
 const matchStatus = state.status === "all" || order.status === state.status;
 
 const matchCategory =
 state.category === "all" ||
 order.items.some(item => {
 const product = findProduct(state.products, item.productId);
 return product !== undefined && product.category === state.category;
 });

 return matchSearch && matchStatus && matchCategory;
 });
}

export function getCategories(products) {
 return products
 .map(product => product.category)
 .filter((category, index, all) => all.indexOf(category) === index);
}

export function computeIndicators(state) {
 let revenue = 0;
 state.orders.forEach(order => {
 revenue += getOrderDetails(order, state).total;
 });
 return {
 customers: state.customers.length,
 products: state.products.length,
 orders: state.orders.length,
 revenue
 };
}