async function loadJson(path) {
 try {
 
 const response = await fetch(path);
 
 if (!response.ok) {
 throw new Error(`HTTP ${response.status}`); // ex : "HTTP 404"
 }
 
 const data = await response.json();
 
 if (!Array.isArray(data)) {
 throw new Error("le contenu n'est pas un tableau JSON");
 }
 return data; // ce tableau devient la valeur de la Promise
 } catch (error) {
 
 console.error(`Erreur de chargement de ${path} :`, error);
 
 throw new Error(`Impossible de charger le fichier « ${path} » (${error.message}).`);
 }
}

export async function loadAllData() {
 
 const [customers, products, orders] = await Promise.all([
 loadJson("data/customers.json"),
 loadJson("data/products.json"),
 loadJson("data/orders.json")
 ]);
 return { customers, products, orders }; // raccourci de { customers: customers, ... }
}