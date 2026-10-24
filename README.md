# TP4 - Gestion des commandes
Application web frontend (HTML, Bootstrap, JavaScript modulaire, JSON) qui charge trois
fichiers de données liés (clients, produits, commandes), reconstruit les relations entre eux,
calcule des montants et affiche les commandes avec recherche, filtres et détail.
## Structure du projet
 tp4-commandes/
 |-- index.html page principale (Bootstrap)
 |-- css/style.css retouches de style
 |-- data/
 | |-- customers.json clients (id, name, city, active)
 | |-- products.json produits (id, name, category, price, stock)
 | `-- orders.json commandes (customerId, items[productId, quantity])
 `-- js/
 |-- app.js initialisation et événements
 |-- state.js état central (données + filtres)
 |-- dataService.js chargement des JSON (fetch, async/await, try/catch)
 |-- selectors.js relations, calculs, filtres, indicateurs
 `-- view.js affichage dans le DOM (render, modale, erreurs)
## Relations entre les données
- order.customerId correspond à customer.id
- item.productId correspond à product.id
- Le nom du client, les prix et les totaux sont calculés, jamais écrits dans orders.json.
## Fonctionnalités
- Chargement des 3 fichiers JSON avec gestion des erreurs (message à l'écran + console)
- 4 indicateurs : clients, produits, commandes, chiffre d'affaires cumulé
- Recherche par nom de client, filtre par statut, filtre par catégorie (cumulables)
- Détail d'une commande dans une modale (client, ville, lignes, total)
## Lancer le projet
1. Cloner le dépôt : git clone URL_DU_DEPOT
2. Ouvrir le dossier dans VS Code
3. Installer l'extension Live Server
4. Clic droit sur index.html puis Open with Live Server
Ne pas ouvrir index.html par double-clic : fetch() et les modules ES exigent un serveur HTTP.
## Auteur
ED-DAFALI FADOUA