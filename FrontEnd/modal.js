let modal = null;
const projet = await fetch("http://localhost:5678/api/works").then((response) =>
  response.json()
);

export function openModal(event) {
  event.preventDefault();
  const target = document.querySelector(event.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  // modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
}

function closeModal(event) {
  if (modal === null) return;
  event.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  // modal
  //   .querySelectorAll(".js-modal-close")
  //   .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
}

function stopPropagation(e) {
  e.stopPropagation();
}

export function ModalGalleryPhoto() {
  // élément du dom de la modal 1
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

    // Ajout de l'événement de suppression
    deleteButton.addEventListener("click", async () => {
      const id = p.id;
      const projetElementsGallery = document.querySelector(
        ".projet-element-gallery"
      );
      projetElementsGallery.setAttribute("id", "projet-element-gallery-" + id);
      if (window.confirm("Souhaitez-vous supprimer cet élément ?")) {
        try {
          const token = window.localStorage.getItem("token");
          const response = await fetch(
            "http://localhost:5678/api/works/" + id,
            {
              headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
              },
              method: "DELETE",
            }
          );
          if (response.status === 200 || response.status === 204) {
            // Suppression des éléments du DOM
            projetElementsModal.remove();
            projetElementsGallery.remove();
          }
        } catch (error) {
          console.error("Erreur lors de la suppression du projet :", error);
        }
      }
    });
  });

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
    const sectionAjoutProjet = document.querySelector(".section-ajout-projet");
    sectionAjoutProjet.classList.remove("hidden");
    sectionImageModal.classList.add("hidden");
  });
}

export function modalAjoutPhoto() {
  // élément du dom de la modal 1
  const sectionAjoutProjet = document.querySelector(".section-ajout-projet");
  const headermodal2 = document.querySelector(".header-modal-2");
  const formModal = document.querySelector(".form-modal-2");
  projet.forEach((p) => {
  const category = projet.category.name;

  //Création du bouton retour à la section Modal 1
  const backBtn = document.createElement("button");
  backBtn.classList.add("js-modal-back");
  //logo du bouton
  const backBtnLogo = document.createElement("i");
  backBtnLogo.classList.add("fa-solid", "fa-arrow-left");
  //création du bouton qui fermera la modal
  const closingModalBtn = document.createElement("button");
  closingModalBtn.classList.add("js-modal-close");
  // ajout du logo "croix" qui fermera la modal
  const closingModalLogo = document.createElement("i");
  closingModalLogo.classList.add("fa-solid", "fa-xmark");
  // ajout du titre de la modal
  const modal2Title = document.createElement("h3");
  modal2Title.classList.add("modal-title");
  modal2Title.innerText = "Ajout Photo";

  // ajout des éléments aux parents
  backBtn.appendChild(backBtnLogo);
  closingModalBtn.appendChild(closingModalLogo);
  headermodal2.appendChild(backBtn);
  headermodal2.appendChild(closingModalBtn);
  headermodal2.appendChild(modal2Title);

  // listener du bouton retour
  backBtn.addEventListener("click", () => {
    const sectionImageModal = document.querySelector(".section-image-projet");
    sectionImageModal.classList.remove("hidden");
    sectionAjoutProjet.classList.add("hidden");
  });

  //listener du bouton close
  closingModalBtn.addEventListener("click", closeModal);

  // crétation de la partie formulaire

  //form
  const formAjoutProjet = document.createElement("form");
  formAjoutProjet.id = "form-ajout-projet";
  formAjoutProjet.action = "#";
  formAjoutProjet.method = "post";
  formAjoutProjet.name = "form-ajout-projet";

  //input d'ajout de photo du form
  const containerForm = document.querySelector(".container");
  //logo
  const logoPicture = document.createElement("i");
  logoPicture.classList.add("fa-regular", "fa-image");
  logoPicture.setAttribute("id", "logo-picture");
  //boutton d'ajout de fichier
  const addPictureBtn = document.createElement("button");
  addPictureBtn.classList.add("add-picture-btn");
  //création de l'input
  const addPictureInput = document.createElement("input");
  addPictureInput.type = "file";
  addPictureInput.accept = "image/png, image/jpeg";
  addPictureInput.name = "add-picture";
  addPictureInput.id = "add-picture-input";
  // création du label
  const addPictureInputLabel = document.createElement("label");
  addPictureInputLabel.name = "add-picture";
  addPictureInputLabel.id = "add-picture-input-label";
  addPictureInputLabel.innerText = "+ Ajouter Photo";
  // création du text d'avertissment
  const infoSizeFile = document.createElement("p");
  infoSizeFile.innerText = "jpg, png : 4mo max";

  // eventListener pour que la taille du fichier fasse 4mo max

  // input d'ajout de titre des photos
  const addTitlePictureLabel = document.createElement("label");
  addTitlePictureLabel.name = "title-picture";
  addTitlePictureLabel.innerText = "titre";
  const addTitlePictureInput = document.createElement("input");
  addTitlePictureInput.name = "title-picture";
  addTitlePictureInput.type = "text";

  // input avec choix de catégorie de projet
  const addCategoryPictureLabel = document.createElement("label");
  addCategoryPictureLabel.name = "category-picture";
  addCategoryPictureLabel.innerText = "Catégorie";
  const addCategoryPictureInput = document.createElement("select");
  addCategoryPictureInput.name = "category-picture";
  addCategoryPictureInput.options = category;

  formModal.appendChild(formAjoutProjet);
  formAjoutProjet.appendChild(containerForm);
  addPictureBtn.appendChild(addPictureInputLabel);
  addPictureBtn.appendChild(addPictureInput);
  containerForm.appendChild(logoPicture);
  containerForm.appendChild(addPictureBtn);
  containerForm.appendChild(infoSizeFile);
  formAjoutProjet.appendChild(addTitlePictureLabel);
  formAjoutProjet.appendChild(addTitlePictureInput);
  
}
modalAjoutPhoto();
