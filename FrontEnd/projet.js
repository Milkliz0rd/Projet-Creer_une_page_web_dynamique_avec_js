//Lien entre notre fichier js et la section work de notre API
const projet = await fetch("http://localhost:5678/api/works").then(projet => projet.json())




// On ajout dynamiquement les projets via l'API
function genererProjet  () {
    for (let i = 0; i < projet.length; i++){
        const figure = projet[i];
        // Récupération de l'élément du Dom qui acceuillera les projets
        const sectionProjet = document.querySelector(".gallery");
        // Création des balises dédiée a un projet
        const projetElement = document.createElement("figure")
        // création des balises 

        // les images
        const imgProjet = document.createElement("img");
        imgProjet.src = figure.imageUrl;
        projetElement.appendChild(imgProjet);
        
        // les légendes (figcaption)
        const nomProjet = document.createElement("figcaption");
        nomProjet.innerText = figure.title;
        projetElement.appendChild(nomProjet);

        // on ajoute nos balises à l'élement parent
        sectionProjet.appendChild(projetElement);
    }
}

//Création d'un menu de catégorie
const categoryMenu = document.querySelector(".category-menu");
// Création de la catégorie tous
const allItems = document.createElement("button");
allItems.innerText = "Tous";
categoryMenu.appendChild(allItems);
// Création de la catégorie Objet
const objetItems = document.createElement("button");
objetItems.innerText = "Objets"
categoryMenu.appendChild(objetItems)
// Création de la catégorie appartements




// On appel la fonction générer projet
genererProjet();