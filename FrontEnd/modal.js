// on concidère que la modal est égale à null
let modal = null;

// On créé une variable pour éviter de rappeler toujours l'url lors de nos fetch
const projetApi = "http://localhost:5678/api/works/";
//--------------------------modal 1----------------------------

//element du dom de la modal 1
const sectionImageModal = document.querySelector(".section-image-projet");
const headermodal1 = document.querySelector(".header-modal-1");

//création de la croix qui fermera la modal
const closingModalBtn = document.createElement("button");
closingModalBtn.classList.add("js-modal-close");
// ajout du logo "croix" qui fermera la modal
const closingModalLogo = document.createElement("i");
closingModalLogo.classList.add("fa-solid", "fa-xmark");
// ajout du titre de la modal
const modal1Title = document.createElement("h3");
modal1Title.classList.add("modal-title");
modal1Title.innerText = "Gallerie photo";

//listener du bouton close
closingModalBtn.addEventListener("click", closeModal);
// ajout des éléments aux parents
closingModalBtn.appendChild(closingModalLogo);
headermodal1.appendChild(closingModalBtn);
headermodal1.appendChild(modal1Title);

// partie modal-line
const modalLine = document.createElement("p");
modalLine.setAttribute("id", "modal-line");
sectionImageModal.appendChild(modalLine);

// partie changement de page
const switchPageBtn = document.createElement("button");
switchPageBtn.setAttribute("id", "switch-page-btn");
switchPageBtn.classList.add("btn-nav", "active");
switchPageBtn.innerText = "Ajouter une photo";
sectionImageModal.appendChild(switchPageBtn);

//listener sur le changement de page de modal
switchPageBtn.addEventListener("click", () => {
  switchModalView("add");
});

// on appel la fonction qui gènère les projets sur la modal
genererProjetModal();

//------------------modal 2-------------------------------

// élément du dom de la modal 2
const headermodal2 = document.querySelector(".header-modal-2");
const formModal = document.querySelector(".form-modal-2");

//Création du bouton retour à la section Modal 1
const backBtn = document.createElement("button");
backBtn.classList.add("js-modal-back");
//logo du bouton
const backBtnLogo = document.createElement("i");
backBtnLogo.classList.add("fa-solid", "fa-arrow-left");

//création du bouton qui fermera la modal
const closingModalBtn2 = document.createElement("button");
closingModalBtn2.classList.add("js-modal-close");
// ajout du logo "croix" qui fermera la modal
const closingModalLogo2 = document.createElement("i");
closingModalLogo2.classList.add("fa-solid", "fa-xmark");

// ajout du titre de la modal
const modal2Title = document.createElement("h3");
modal2Title.classList.add("modal-title");
modal2Title.innerText = "Ajout Photo";

// ajout des éléments aux parents
backBtn.appendChild(backBtnLogo);
closingModalBtn2.appendChild(closingModalLogo2);
headermodal2.appendChild(backBtn);
headermodal2.appendChild(closingModalBtn2);
headermodal2.appendChild(modal2Title);

// listener du bouton retour
backBtn.addEventListener("click", () => {
  switchModalView("edit");
  resetForm();
});

//listener du bouton close
closingModalBtn2.addEventListener("click", closeModal);
closingModalBtn2.addEventListener("click", () => {
  switchModalView("edit");
  resetForm();
});

// crétation de la partie formulaire
//form
const formAjoutProjet = document.createElement("form");
formAjoutProjet.id = "form-ajout-projet";
formAjoutProjet.action = "#";
formAjoutProjet.method = "post";
formAjoutProjet.name = "form-ajout-projet";
//input d'ajout de photo du form
const containerForm = document.querySelector("#container");
//logo
const logoPicture = document.createElement("i");
logoPicture.classList.add("fa-regular", "fa-image");
logoPicture.setAttribute("id", "logo-picture");
//boutton d'ajout de fichier
const addPictureBtn = document.createElement("div");
addPictureBtn.classList.add("add-picture-btn");
//création de l'input
const addPictureInput = document.createElement("input");
addPictureInput.type = "file";
addPictureInput.accept = "image/png, image/jpeg";
addPictureInput.name = "add-picture";
addPictureInput.id = "add-picture-input";
addPictureInput.addEventListener("change", formFull);
// création du preview
const imagePreview = document.createElement("img");
imagePreview.id = "image-preview";
imagePreview.alt = "Aperçu de l'image";
imagePreview.style.display = "none";
// création du label
const addPictureInputLabel = document.createElement("label");
addPictureInputLabel.id = "add-picture-input-label";
addPictureInputLabel.innerText = "+ Ajouter Photo";
addPictureInputLabel.setAttribute("for", "add-picture-input");
// création du text d'avertissment
const infoSizeFile = document.createElement("p");
infoSizeFile.innerText = "jpg, png : 4mo max";
//creation du listenner de l'ajout photo
addPictureInput.addEventListener("change", picturePreview);
// input d'ajout de titre des photos
const addTitlePictureLabel = document.createElement("label");
addTitlePictureLabel.innerText = "Titre";
const addTitlePictureInput = document.createElement("input");
addTitlePictureInput.name = "title-picture";
addTitlePictureInput.type = "text";
addTitlePictureInput.addEventListener("input", formFull);
// input avec choix de catégorie de projet
const addCategoryPictureLabel = document.createElement("label");
addCategoryPictureLabel.innerText = "Catégorie";
const addCategoryPictureInput = document.createElement("select");
addCategoryPictureInput.name = "category-picture";
addCategoryPictureInput.setAttribute("id", "selectCategorie");
createCategorieSelect();
//listener qui fait appel à la fonction formFull une fois l'input validé
addCategoryPictureInput.addEventListener("change", formFull);

// partie modal-line
const modalLine2 = document.createElement("p");
modalLine2.setAttribute("id", "modal2-line");

// partie submit
const submitFormBtn = document.createElement("button");
submitFormBtn.id = "submit-form-btn";
submitFormBtn.type = "submit";
submitFormBtn.innerText = "Valider";
submitFormBtn.disabled = "true";

// listener du bouton submit ajouter les éléments du formulaire sur l'api et en temps réél sur notre page
submitFormBtn.addEventListener("click", sendForm);

// On rattache les élements aux parents
formModal.appendChild(formAjoutProjet);
formAjoutProjet.appendChild(containerForm);
addPictureBtn.appendChild(addPictureInputLabel);
addPictureBtn.appendChild(addPictureInput);
containerForm.appendChild(imagePreview);
containerForm.appendChild(logoPicture);
containerForm.appendChild(addPictureBtn);
containerForm.appendChild(infoSizeFile);
formAjoutProjet.appendChild(addTitlePictureLabel);
formAjoutProjet.appendChild(addTitlePictureInput);
formAjoutProjet.appendChild(addCategoryPictureLabel);
formAjoutProjet.appendChild(addCategoryPictureInput);
formAjoutProjet.appendChild(modalLine2);
formAjoutProjet.appendChild(submitFormBtn);

//---------------modal projet validé--------------------------
const sectionProjetAdded = document.querySelector(".section-projet-added");
const headermodal3 = document.querySelector(".header-modal-3");

//création du bouton qui fermera la modal
const closingModalBtn3 = document.createElement("button");
closingModalBtn3.classList.add("js-modal-close");
// ajout du logo "croix" qui fermera la modal
const closingModalLogo3 = document.createElement("i");
closingModalLogo3.classList.add("fa-solid", "fa-xmark");
closingModalBtn3.appendChild(closingModalLogo3);

const projetAdded = document.createElement("h2");
projetAdded.setAttribute("id", "projet-added");
projetAdded.textContent = "Projet ajouté avec succès!";

closingModalBtn3.addEventListener("click", closeModal);
closingModalBtn3.addEventListener("click", () => {
  switchModalView("edit");
});

headermodal3.appendChild(closingModalBtn3);
sectionProjetAdded.appendChild(headermodal3);
sectionProjetAdded.appendChild(projetAdded);

//----------fonction----------

// on créé une fonction qui nous permettra de choisir si nous somme sur la modal 1 ou 2
function switchModalView(view) {
  const sectionAjoutProjet = document.querySelector(".section-ajout-projet");
  const sectionImageModal = document.querySelector(".section-image-projet");
  const sectionRemoveProjet = document.querySelector(".remove-projet");
  if (view === "edit") {
    sectionAjoutProjet.classList.add("hidden");
    sectionImageModal.classList.remove("hidden");
    sectionProjetAdded.classList.add("hidden");
    sectionRemoveProjet.classList.add("hidden");
  }
  if (view === "add") {
    sectionAjoutProjet.classList.remove("hidden");
    sectionImageModal.classList.add("hidden");
    sectionProjetAdded.classList.add("hidden");
    sectionRemoveProjet.classList.add("hidden");
  }
  if (view === "projetAdded") {
    sectionAjoutProjet.classList.add("hidden");
    sectionImageModal.classList.add("hidden");
    sectionProjetAdded.classList.remove("hidden");
    sectionRemoveProjet.classList.add("hidden");
  }
  if (view === "removeProjet") {
    sectionAjoutProjet.classList.add("hidden");
    sectionImageModal.classList.add("hidden");
    sectionProjetAdded.classList.add("hidden");
    sectionRemoveProjet.classList.remove("hidden");
  }
}

//on créé un fonction qui nous permettra d'ouvir la modal
export function openModal(event) {
  event.preventDefault();
  const target = document.querySelector(event.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
  ModalGalleryPhoto();
}

// on créé une fonction qui nous permettra de fermer la modal
function closeModal(event) {
  if (modal === null) return;
  event.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
}

// on créé une fonction qui empêche que quand on clique sur notre modal de la fermer
function stopPropagation(e) {
  e.stopPropagation();
}

// On créé une fonction qui va gérer la première "page" de notre modal
export function ModalGalleryPhoto() {
  switchModalView("edit");
}

// on créé une fonction qui nous génère les projets de l'api sur notre page modal
async function genererProjetModal() {
  // on récupère les objets déjà présent sur l'api
  const projet = await fetch(projetApi).then((response) => response.json());

  //partie de la gallery des images des projets
  const galleryModal = document.querySelector(".modif-gallery");
  galleryModal.classList.add("figure-modal");
  galleryModal.innerHTML = "";

  // Partie de génération des images des projets
  projet.forEach((p) => {
    const projetElementsModal = document.createElement("figure");
    projetElementsModal.classList.add("projet-element-modal");
    projetElementsModal.setAttribute("id", "projet-element-modal-" + p.id);

    const imageElements = document.createElement("img");
    imageElements.src = p.imageUrl;
    imageElements.classList.add("img-modal");
    projetElementsModal.appendChild(imageElements);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-Btn");

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular", "fa-trash-can", "delete-icon");
    deleteButton.appendChild(deleteIcon);

    projetElementsModal.appendChild(deleteButton);
    galleryModal.appendChild(projetElementsModal);

    // Ajout de la page de confirmation de suppression
    deleteButton.addEventListener("click", () => {
      switchModalView("removeProjet");

      const sectionRemoveProjet = document.querySelector(".remove-projet");
      sectionRemoveProjet.innerHTML = "";

      const confirmation = document.createElement("h2");
      confirmation.innerText = "Voulez-vous vraiment supprimer cet élément ?";
      sectionRemoveProjet.appendChild(confirmation);

      const retour = document.createElement("button");
      retour.classList.add("remove-confirmation-button");
      retour.innerText = "Non";
      sectionRemoveProjet.appendChild(retour);
      retour.addEventListener("click", () => {
        switchModalView("edit");
      });

      const removeProjet = document.createElement("button");
      removeProjet.innerText = "oui";
      removeProjet.classList.add("remove-confirmation-button");
      sectionRemoveProjet.appendChild(removeProjet);

      //Listener sur la confirmation de suppression
      removeProjet.addEventListener("click", async () => {
        const id = p.id;
        const projetElementsGallery = document.querySelector(
          `#projet-element-gallery-${id}`
        );
        try {
          const token = window.localStorage.getItem("token");
          const response = await fetch(`${projetApi}/${id}`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            method: "DELETE",
          });
          if (response.status === 200 || response.status === 204) {
            // Suppression des éléments du DOM
            projetElementsModal.remove();
            projetElementsGallery.remove();
            switchModalView("edit");
          }
        } catch (error) {
          console.error("Erreur lors de la suppression du projet :", error);
        }
      });
    });
  });
}

// fonction lorque le formulaire est complètement pour le valider
function formFull() {
  const pictureSubmit = document.querySelector("[name=add-picture]").files[0];
  const titleSubmit = document.querySelector("[name=title-picture]").value;
  const categorySubmit = document.querySelector(
    "[name=category-picture]"
  ).value;
  const submitFormBtn = document.querySelector("#submit-form-btn");
  const isValid = pictureSubmit && titleSubmit && parseInt(categorySubmit) >= 0;
  submitFormBtn.disabled = !isValid;
  if (isValid) {
    submitFormBtn.style.backgroundColor = "#1d6154";
  } else {
    submitFormBtn.style.backgroundColor = "#cfd5d9";
  }
  submitFormBtn.style.transition = "0.3s";
}

// fonction qui reset le formulaire
function resetForm() {
  // Sélectionne le formulaire
  const formAjoutProjet = document.getElementById("form-ajout-projet");
  // Réinitialise le formulaire (tous les inputs seront vidés)
  formAjoutProjet.reset();
  // Supprimer l'aperçu de l'image et réafficher les éléments du formulaire
  const imagePreview = document.getElementById("image-preview");
  const container = document.getElementById("container");
  const addPictureBtn = document.querySelector(".add-picture-btn");
  const logoPicture = document.getElementById("logo-picture");
  const infoSizeFile = document.querySelector("#container p");
  // Masquer l'aperçu de l'image
  imagePreview.style.display = "none";
  imagePreview.src = "";
  // Réafficher les éléments masqués après le choix de l'image
  addPictureBtn.style.display = "block";
  container.style.padding = "20px";
  logoPicture.style.display = "block";
  infoSizeFile.style.display = "block";
  // Remettre la couleur du bouton de soumission à son état initial
  const submitFormBtn = document.getElementById("submit-form-btn");
  submitFormBtn.style.backgroundColor = "#ccc";
  submitFormBtn.disabled = true;
}

// On créé un fonction qui nous permet de voir la photo avant de la submit
function picturePreview(e) {
  const picture = e.target.files[0];
  const validType = ["image/jpeg", "image/png"];
  if (!validType.includes(picture.type)) {
    alert("Seules les images PNG et JPEG sont acceptées.");
    return;
  }
  if (picture.size > 4 * 1024 * 1024) {
    alert("Le fichier doit faire moins de 4 Mo.");
    return;
  }
  // on enlève les élements du container
  addPictureBtn.style.display = "none";
  logoPicture.style.display = "none";
  infoSizeFile.style.display = "none";
  containerForm.style.padding = "0px";
  // on applique un préview de l'image qui l'on a ajouté grace à "FileReader" et "readAsDataUrl"
  const reader = new FileReader();
  reader.onload = function (e) {
    imagePreview.src = e.target.result;
    imagePreview.style.display = "block";
  };
  reader.readAsDataURL(picture);
}

// on créé une fonction qui nous permet de créé des options dans notre input select
async function createCategorieSelect() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  let select = document.getElementById("selectCategorie");
  //création d'une option vide avec valeur spéciale "-1" qui sera par défaut
  let option = document.createElement("option");
  option.setAttribute("label", " ");
  option.value = "-1";
  select.appendChild(option);
  //boucle "for...of" pour récupérer les id de chaque catégorie et les intégrer aux options du select
  for (const category of categories) {
    let option = document.createElement("option");
    option.innerText = category.name;
    option.value = category.id;
    select.appendChild(option);
  }
}

// Fonction pour ajouter dynamiquement un nouveau projet à la galerie et à la modal
function addProjectToGallery(project) {
  // Section Gallerie
  const gallerySection = document.querySelector(".gallery");
  //on créé la figure
  const projectElement = document.createElement("figure");
  projectElement.classList.add("projet-element-gallery");
  projectElement.setAttribute("id", "projet-element-gallery-" + project.id);
  // on crée l'image
  const img = document.createElement("img");
  img.src = project.imageUrl;
  img.alt = project.title;
  // on créé la légende
  const figcaption = document.createElement("figcaption");
  figcaption.innerText = project.title;
  // on rattache les éléments aux parents
  projectElement.appendChild(img);
  projectElement.appendChild(figcaption);
  gallerySection.appendChild(projectElement);
  // section modal
  const modalGallery = document.querySelector(".modif-gallery");
  //on créé la figure
  const modalProjectElement = document.createElement("figure");
  modalProjectElement.classList.add("projet-element-modal");
  modalProjectElement.setAttribute("id", "projet-element-modal-" + project.id);
  // on créé l'image
  const modalImg = document.createElement("img");
  modalImg.src = project.imageUrl;
  modalImg.alt = project.title;
  modalImg.classList.add("img-modal");
  // on créé le bouton delete
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-Btn");
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-regular", "fa-trash-can", "delete-icon");
  deleteButton.appendChild(deleteIcon);

  // Ajout de la page de confirmation de suppression pour le nouveau projet de la modal
  deleteButton.addEventListener("click", () => {
    switchModalView("removeProjet");

    const sectionRemoveProjet = document.querySelector(".remove-projet");
    sectionRemoveProjet.innerHTML = "";

    const confirmation = document.createElement("h2");
    confirmation.innerText = "Voulez-vous vraiment supprimer cet élément ?";
    sectionRemoveProjet.appendChild(confirmation);

    const retour = document.createElement("button");
    retour.classList.add("remove-confirmation-button");
    retour.innerText = "Non";
    sectionRemoveProjet.appendChild(retour);
    retour.addEventListener("click", () => {
      switchModalView("edit");
    });

    const removeProjet = document.createElement("button");
    removeProjet.innerText = "oui";
    removeProjet.classList.add("remove-confirmation-button");
    sectionRemoveProjet.appendChild(removeProjet);

    // Ajout de l'événement de suppression pour le nouveau projet dans la modale
    removeProjet.addEventListener("click", async () => {
      const id = project.id;
      try {
        const token = window.localStorage.getItem("token");
        const response = await fetch(`${projetApi}/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          method: "DELETE",
        });
        if (response.status === 200 || response.status === 204) {
          // Suppression des éléments du DOM
          modalProjectElement.remove();
          projectElement.remove();
          switchModalView("edit");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression du projet :", error);
      }
    });
  });
  // on rattache les éléments aux parents
  modalProjectElement.appendChild(modalImg);
  modalProjectElement.appendChild(deleteButton);
  modalGallery.appendChild(modalProjectElement);
}

async function sendForm(e) {
  // arrêt du comportement par défaut
  e.preventDefault();
  // recherche des valeurs/fichiers des inputs du formulaire
  const pictureSubmit = document.querySelector("[name=add-picture]").files[0];
  const titleSubmit = document.querySelector("[name=title-picture]").value;
  const categorySubmit = document.querySelector(
    "[name=category-picture]"
  ).value;
  // création d'un nouveau FormData
  const formData = new FormData();
  //Récupération du token pour l'autorisation
  const token = window.localStorage.getItem("token");
  // on rattache nos valeurs d'input à formData en ajoutant un clé à chacun
  formData.append("image", pictureSubmit);
  formData.append("title", titleSubmit);
  formData.append("category", categorySubmit);

  // condition qui empêche l'appel à l'API
  if (!pictureSubmit || !titleSubmit || !categorySubmit) {
    console.error(
      "Veuillez rensigner toutes les informations de votre nouveau projet"
    );
    return;
  }

  // on créé une variable réponse qui sera une requête http "post"
  try {
    const response = await fetch(projetApi, {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    // Condition de si "response" est différents de ce que l'on attend
    if (!response.ok) {
      const error = await response.json();
      console.log("Erreur serveur:", error);
      throw new Error("Erreur lors de l'envoi: " + JSON.stringify(error));
    }
    // Création de la variable qui sera l'ajout du nouveau projet
    const newProject = await response.json();
    // Appel de la fonction pour ajouter le nouveau projet à la galerie de la page principal et de la modale en temps réel
    addProjectToGallery(newProject);
    // on reset le formulaire
    resetForm();
    // on retourne par défaut à la page modal1
    switchModalView("projetAdded");
    // // Fermer la modale après l'ajout
    // const modal = document.querySelector(".modal");
    // modal.style.display = "none";
    // En cas d'erreur lors de l'ajout de projet
  } catch (error) {
    alert("Erreur lors de l'ajout du projet:", error);
  }
}
