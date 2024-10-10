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
    sectionProjet.innerHTML="";
    // On récupère les projets de l'api
    projets.forEach((projet) => {
    // Création des balises dédiée a un projet
    const projetElement = document.createElement("figure");
    // Création des images des projets
    const imageProjet = document.createElement("img");
    // on récupère les images sur l'api
    imageProjet.src = projet.imageUrl;
    // on rattache les images à notre parent "projetElement"
    projetElement.appendChild(imageProjet);
    // Création des légendes du projets 
    const nomProjet = document.createElement("figcaption");
    // on récupère les légendes via l'api
    imageProjet.innerText = projet.title;
    // on rattache les légendes à son parent "projetElement"
    projetElement.appendChild(nomProjet);

    // On rattache nos éléments à sont parent "sectionProjet"
    sectionProjet.appendChild(projetElement)
     });
    }
//------------------------ajout des menus catégories-------------------------

  // Création du menu de catégories à partir du set
  const categoryMenu = document.querySelector(".category-menu");

  // Création du bouton "Tous"
  const allItems = document.createElement("button");
  // On ajoute une class css "btn-nav" et "active" (car on veut que ça soit ce bouton qui soit affiché par défaut lors du refresh)
  allItems.classList.add("btn-nav", "active");
  // On ajoute le text du bouton
  allItems.innerText = "Tous";
  // on rattache le bouton à son parent "categoryMenu"
  categoryMenu.appendChild(allItems);
  // écoute d'évènement sur AllItems
  allItems.addEventListener("click", () => {
    // il appel la fonction "genererProjet" qui affichera tous les projets
    genererProjet(projet);
  })

  // Utilisation du Set pour créer des Boutons pour chaque catégorie unique
  categoriesSet.forEach((category)=> {
    // On créé les boutons
    const categoryBtn = document.createElement("button");
    // On leur ajoute une class css "btn-nav"
    categoryBtn.classList.add("btn-nav");
    // On leur ajoute le texte qui est le nom de leur catégorie
    categoryBtn.innerText= category;
    // On a rattache les boutons à son parent "categoryMenu"
    categoryMenu.appendChild(categoryBtn);

    // On ajoute un listener sur nos boutons pour filtrer les projets par catégorie
    categoryBtn.addEventListener("click", () => {
      // on créé une variable qui sera les projets filtré
      const filteredProjets = projet.filter((p) =>
        // le filtre de nos projets agit de façons à ce que le nom de la catégorie soit la même que celle du boutton
         p.category.name === category);
         // on appel la fonction "genererProjet" avec les projets filtrés
      genererProjet(filteredProjets);
    });
  });

//---------------Ajout du css lorsqu'on active un bouton-----------------------

  // Sélectionne tous les boutons de navigations 
  const navBtn = document.querySelectorAll(".btn-nav");
  // Pour chaque bouton
  navBtn.forEach((button) => {
    // on créé un listener
    button.addEventListener("click", function () {
      //au clique, pour chaque bouton nav ayant la class "active", on l'a supprime
      navBtn.forEach((btn) => btn.classList.remove("active"));
      //mais pour celui qui a été cliqué ("this") on lui ajoute la class "active"
      this.classList.add("active");
    });
  });
//------------------------------------------------------------------------------
  // on met de base la catégorie "tous"
  genererProjet(projet);