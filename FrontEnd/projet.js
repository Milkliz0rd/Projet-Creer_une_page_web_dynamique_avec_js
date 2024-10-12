//Lien entre notre fichier js et la section work de notre API
const projet = await fetch("http://localhost:5678/api/works").then((response) =>
  response.json()
);

// Créer un set pour les catégories

// pour chaques projets

// on ajoute les projetItem dans categoriesSet par leur nom de catégories

//------------ajout dynamique des projets via l'API----------------------------

// On crée une fonction qui permet de généré les projets

// Récupération de l'élément du Dom qui acceuillera les projets

// On vide la galerie avant de l'afficher

// On récupère chaque projets de l'api

// Création des balises dédiée a un projet

// Création des images des projets

// on récupère les images sur l'api

// on rattache les images à notre parent "projetElement"

// Création des légendes du projets

// on récupère les légendes via l'api

// on rattache les légendes à son parent "projetElement"

// On rattache nos éléments à sont parent "sectionProjet"

//------------------------ajout des menus catégories-------------------------

// On récupère dans le dom, l'élément qui va acceuillir le menu de catégorie

// Création du bouton "Tous"

// On ajoute une class css "btn-nav" et "active" (car on veut que ça soit ce bouton qui soit affiché par défaut lors du refresh)

// On ajoute le text du bouton

// on rattache le bouton à son parent "categoryMenu"

// écoute d'évènement sur allItems

// il appel la fonction "genererProjet" qui affichera tous les projets

//---------------------------------------------------------------------------

// Utilisation du Set pour créer des Boutons pour chaque catégorie unique

// On créé les boutons

// On leur ajoute une class css "btn-nav"

// On leur ajoute le texte qui est le nom de leur catégorie

// On a rattache les boutons à son parent "categoryMenu"

// On ajoute un listener sur nos boutons pour filtrer les projets par catégorie

// on créé une variable qui sera les projets filtré

// le filtre de nos projets agit de façons à ce que le nom de la catégorie soit la même que celle du boutton

// on appel la fonction "genererProjet" avec les projets filtrés

//---------------Ajout du css lorsqu'on active un bouton-----------------------

// Sélectionne tous les boutons de navigations

// Pour chaque bouton

// on créé un listener (sans faire de fonction fléché car on utilisera .this)

// pour chaque bouton nav ayant la class "active", on l'a supprime

//mais pour celui qui a été cliqué ("this") on lui ajoute la class "active"

//------------------------------------------------------------------------------
// on met de base la catégorie "tous"
