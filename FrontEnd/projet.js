// import { initializedLoginUser } from "./login";

const currentPageBtn = document.querySelector("#projet-page");
currentPageBtn.classList.add("active-nav-page");

//Lien entre notre fichier js et la section work de notre API
const projet = await fetch("http://localhost:5678/api/works").then((response) =>
  response.json()
);

// Créer un set pour les catégories
const categoriesSet = new Set();
// pour chaque projet
projet.forEach((p) => {
  // on les ajoute dans categoriesSet par leur nom de catégories
  categoriesSet.add(p.category.name);
});
//------------ajout dynamique des projets via l'API----------------------------

// On crée une fonction qui permet de généré les projets
function genererProjet(projets) {
  // Récupération de l'élément du Dom qui acceuillera les projets
  const sectionProjet = document.querySelector(".gallery");
  // On vide la galerie avant de l'afficher
  sectionProjet.innerHTML = "";
  // On récupère chaque projets de l'api
  projets.forEach((p) => {
    // Création des balises dédiée a un projet
    const projetElements = document.createElement("figure");
    // Création des images des projets
    const imgElement = document.createElement("img");
    // on récupère les images sur l'api
    imgElement.src = p.imageUrl;
    // on rattache les images à notre parent "projetElement"
    projetElements.appendChild(imgElement);
    // Création des légendes du projets
    const nomElement = document.createElement("figcaption");
    // on récupère les légendes via l'api
    nomElement.innerText = p.title;
    // on rattache les légendes à son parent "projetElement"
    projetElements.appendChild(nomElement);
    // On rattache nos éléments à sont parent "sectionProjet"
    sectionProjet.appendChild(projetElements);
  });
}
//------------------------ajout des menus catégories-------------------------

// Création du menu de catégories à partir du set
const categoryMenu = document.querySelector(".category-menu");
// Création du bouton "Tous"
const AllItems = document.createElement("button");
// On ajoute une class css "btn-nav" et "active" (car on veut que ça soit ce bouton qui soit affiché par défaut lors du refresh)
AllItems.classList.add("btn-nav", "active");
// On ajoute le text du bouton
AllItems.innerText = "Tous";
// on rattache le bouton à son parent "categoryMenu"
categoryMenu.appendChild(AllItems);
// écoute d'évènement sur AllItems
AllItems.addEventListener("click", () => {
  // il appel la fonction "genererProjet" qui affichera tous les projets
  genererProjet(projet);
});
// Utilisation du Set pour créer des Boutons pour chaque catégorie unique
categoriesSet.forEach((category) => {
  // On créé les boutons
  const categoryBtn = document.createElement("button");
  // On leur ajoute une class css "btn-nav"
  categoryBtn.classList.add("btn-nav");
  // On leur ajoute le texte qui est le nom de leur catégorie
  categoryBtn.innerText = category;
  // On a rattache les boutons à son parent "categoryMenu"
  categoryMenu.appendChild(categoryBtn);
  // On ajoute un listener sur nos boutons pour filtrer les projets par catégorie
  categoryBtn.addEventListener("click", () => {
    // on créé une variable qui sera les projets filtré
    const projetFiltered = projet.filter(
      (projets) =>
        // le filtre de nos projets agit de façons à ce que le nom de la catégorie soit la même que celle du boutton
        projets.category.name === category
    );
    // on appel la fonction "genererProjet" avec les projets filtrés
    genererProjet(projetFiltered);
  });
});
//---------------Ajout du css lorsqu'on active un bouton-----------------------

// Sélectionne tous les boutons de navigations
const navBtn = document.querySelectorAll(".btn-nav");
// Pour chaque bouton
navBtn.forEach((button) => {
  // on créé un listener (sans faire de fonction fléché car on utilisera .this)
  button.addEventListener("click", function () {
    //au clique, pour chaque bouton nav ayant la class "active", on l'a supprime
    navBtn.forEach((btn) => btn.classList.remove("active"));
    //mais pour celui qui a été cliqué ("this") on lui ajoute la class "active"
    this.classList.add("active");
  });
});
//------------------------------------------------------------------------------
const loginBtn = document.querySelector("#login-page");
const logOutBtn = document.querySelector("#logout-page");
const logoModal = document.querySelector("#logo-modal");
const editionMode = document.querySelector(".edition-mode");
const titleNav = document.querySelector("header");

function ckeckUserAuthentification() {
  const token = localStorage.getItem("token");
  if (token) {
    loginBtn.classList.add("hidden");
    categoryMenu.classList.add("hidden");
    titleNav.classList.add("header-edition-mode");
    logoModal.classList.remove("hidden");
    logOutBtn.classList.remove("hidden");
  } else {
    logOutBtn.classList.add("hidden");
    logoModal.classList.add("hidden");
    loginBtn.classList.remove("hidden");
    categoryMenu.classList.remove("hidden");
    titleNav.classList.remove("header-edition-mode");
    editionMode.innerHTML = "";
    editionMode.classList.remove("edition-mode");
  }
}
//------------------------------Partie Modale-----------------------------------

//------------------------------------------------------------------------------
function logOutUser() {
  localStorage.removeItem("token");
  alert("Vous êtes déconnecté");
  ckeckUserAuthentification();
}

logOutBtn.addEventListener("click", logOutUser);

// On appel la fonction "ckeckUserAuthentification"
ckeckUserAuthentification();
// on met de base la catégorie "tous"
genererProjet(projet);
