// Récupérer les projets depuis l'API
const projet = await fetch("http://localhost:5678/api/works").then((res) => res.json());

// Fonction pour générer les projets dans la galerie
function genererProjet(projets) {
  const sectionProjet = document.querySelector(".gallery");
  sectionProjet.innerHTML = ""; // On vide la galerie avant de l'afficher
  for (let i = 0; i < projets.length; i++) {
    const figure = projets[i];

    // Création des éléments pour un projet
    const projetElement = document.createElement("figure");

    // Image du projet
    const imgProjet = document.createElement("img");
    imgProjet.src = figure.imageUrl;
    projetElement.appendChild(imgProjet);

    // Légende du projet
    const nomProjet = document.createElement("figcaption");
    nomProjet.innerText = figure.title;
    projetElement.appendChild(nomProjet);

    // Ajout à la galerie
    sectionProjet.appendChild(projetElement);
  }
}

// Création du menu de catégories
const categoryMenu = document.querySelector(".category-menu");

// Création des boutons de catégorie
const allItems = document.createElement("button");
allItems.classList.add("btn-nav", "active");
allItems.innerText = "Tous";
categoryMenu.appendChild(allItems);

const objetItems = document.createElement("button");
objetItems.classList.add("btn-nav");
objetItems.innerText = "Objets";
categoryMenu.appendChild(objetItems);

const appartItems = document.createElement("button");
appartItems.classList.add("btn-nav");
appartItems.innerText = "Appartements";
categoryMenu.appendChild(appartItems);

const hotelRestaurantItems = document.createElement("button");
hotelRestaurantItems.classList.add("btn-nav");
hotelRestaurantItems.innerText = "Hôtels & Restaurants";
categoryMenu.appendChild(hotelRestaurantItems);

// Ajouter un écouteur d'événement pour chaque bouton
const navBtn = document.querySelectorAll(".btn-nav");
navBtn.forEach((button) => {
  button.addEventListener("click", function () {
    // Gérer l'activation visuelle des boutons
    navBtn.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    // Filtrer et afficher les projets selon le bouton sélectionné
    if (this === allItems) {
      genererProjet(projet); // Afficher tous les projets
    } else if (this === objetItems) {
      const filteredProjets = projet.filter((p) => p.category.name === "Objets");
      genererProjet(filteredProjets); // Afficher seulement les projets de la catégorie "Objets"
    } else if (this === appartItems) {
      const filteredProjets = projet.filter((p) => p.category.name === "Appartements");
      genererProjet(filteredProjets); // Afficher seulement les projets de la catégorie "Appartements"
    } else if (this === hotelRestaurantItems) {
      const filteredProjets = projet.filter((p) => p.category.name === "Hotels & restaurants");
      genererProjet(filteredProjets); // Afficher seulement les projets de la catégorie "Hôtels & Restaurants"
    }
  });
});

// Générer les projets initiaux (tous les projets)
genererProjet(projet);
