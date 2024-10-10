//Lien entre notre fichier js et la section work de notre API
const projet = await fetch("http://localhost:5678/api/works").then((p) =>
  p.json()
);

// On ajout dynamiquement les projets via l'API
function genererProjet() {
  for (let i = 0; i < projet.length; i++) {
    const figure = projet[i];
    // Récupération de l'élément du Dom qui acceuillera les projets
    const sectionProjet = document.querySelector(".gallery");
    // Création des balises dédiée a un projet
    const projetElement = document.createElement("figure");
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
allItems.classList.add("btn-nav", "active");
allItems.innerText = "Tous";
categoryMenu.appendChild(allItems);
// Création de la catégorie Objet
const objetItems = document.createElement("button");
objetItems.classList.add("btn-nav");
objetItems.innerText = "Objets";
categoryMenu.appendChild(objetItems);
// Création de la catégorie appartements
const appartItems = document.createElement("button");
appartItems.classList.add("btn-nav");
appartItems.innerText = "Appartements";
categoryMenu.appendChild(appartItems);
// Création de la catégorie hôtel & Restaurant
const hotelRestaurantItems = document.createElement("button");
hotelRestaurantItems.classList.add("btn-nav");
hotelRestaurantItems.innerText = "Hôtels & Restaurants";
categoryMenu.appendChild(hotelRestaurantItems);

// Selectionne tous les boutons de navigation
const navBtn = document.querySelectorAll(".btn-nav");
navBtn.forEach((button) => {
  //Listener sur mes boutons pour qu'ils appliquent la class "active" quand on clique dessus et le supprime quand on clique sur un autre
  button.addEventListener("click", function () {
    navBtn.forEach((button) => button.classList.remove("active"));
    this.classList.add("active");
  })
})
// event sur le bouton "tous"
allItems.addEventListener("click", () => {
  genererProjet();
});

// //event sur le bouton objet
// objetItems.addEventListener("click",() => {
//       const projetFIlteredByObjet = projet.filter(projets => {
//        projets === new Set([{"category":{"name":"Objets"}}])
//       })
//       console.log(projetFIlteredByObjet);
      
//       document.querySelector(".gallery").innerHTML="";
//       genererProjet(projetFIlteredByObjet);
// });

// On appel la fonction générer projet
genererProjet()
