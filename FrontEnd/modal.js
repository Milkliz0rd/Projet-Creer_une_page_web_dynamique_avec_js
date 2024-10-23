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
  const categoriesSet = new Set();
  // pour chaque projet
  projet.forEach((p) => {
    // on les ajoute dans categoriesSet par leur nom de catégories
    categoriesSet.add(p.category.name);
  });
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
    resetForm();
  });

  //listener du bouton close
  closingModalBtn.addEventListener("click", closeModal);
  closingModalBtn.addEventListener("click", resetForm);
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
  const addPictureBtn = document.createElement("button");
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
  // création du text d'avertissment
  const infoSizeFile = document.createElement("p");
  infoSizeFile.innerText = "jpg, png : 4mo max";

  //creation du listenner de l'ajout photo
  addPictureInput.addEventListener("change", (e) => {
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
    // addPictureInputLabel.style.display = "none";
    addPictureBtn.style.display = "none";
    logoPicture.style.display = "none";
    infoSizeFile.style.display = "none";
    containerForm.style.padding = "0px";

    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
    };
    reader.readAsDataURL(picture);
  });

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
  const defaultOption = document.createElement("option");
  defaultOption.id = "default-option";
  defaultOption.value = "";
  defaultOption.selected = true;
  defaultOption.disabled = true;
  addCategoryPictureInput.appendChild(defaultOption);
  categoriesSet.forEach((category) => {
    const options = document.createElement("option");
    options.setAttribute("id", "generate-options");
    options.innerText = category;
    addCategoryPictureInput.appendChild(options);
  });
  addCategoryPictureInput.addEventListener("change", formFull);

  // partie modal-line
  const modalLine = document.createElement("p");
  modalLine.setAttribute("id", "modal2-line");

  // partie submit
  const submitFormBtn = document.createElement("button");
  submitFormBtn.id = "submit-form-btn";
  submitFormBtn.type = "submit";
  submitFormBtn.innerText = "Valider";
  submitFormBtn.disabled = "true";

  // envoie du projet à l'api
  submitFormBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const pictureSubmit = document.querySelector("[name=add-picture]").files[0];
    const titleSubmit = document.querySelector("[name=title-picture]").value;
    const categorySubmit = document.querySelector(
      "[name=category-picture]"
    ).value;

    const formData = new FormData();
    const token = window.localStorage.getItem("token");

    // Vérification des données
    console.log("Image:", pictureSubmit);
    console.log("Titre:", titleSubmit);
    console.log("Catégorie (ID):", categorySubmit);

    formData.append("image", pictureSubmit); // Utilise la bonne clé pour l'image
    formData.append("title", titleSubmit);
    formData.append("category", categorySubmit); // Vérifie si c'est bien un ID

    await fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((reponse) => {
        if (!reponse.ok) {
          return reponse.json().then((error) => {
            console.log("Erreur serveur:", error);
            throw new Error("Erreur lors de l'envoi: " + JSON.stringify(error));
          });
        }
        return reponse.json();
      })
      .then((data) => {
        alert("Succès", data);
      })
      .catch((error) => {
        alert("Erreur", error);
      });
  });

  // ajout des élements aux parents
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
  formAjoutProjet.appendChild(modalLine);
  formAjoutProjet.appendChild(submitFormBtn);
}

function formFull() {
  const pictureSubmit = document.querySelector("[name=add-picture]").files[0];
  const titleSubmit = document.querySelector("[name=title-picture]").value;
  const categorySubmit = document.querySelector(
    "[name=category-picture]"
  ).value;
  const submitFormBtn = document.querySelector("#submit-form-btn");
  if (pictureSubmit && titleSubmit && categorySubmit) {
    submitFormBtn.style.backgroundColor = "#1d6154";
    submitFormBtn.style.transition = "0.3s";
    submitFormBtn.disabled = false;
  }
}

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
  submitFormBtn.style.backgroundColor = "#ccc"; // ou toute autre couleur par défaut
  submitFormBtn.disabled = true;
}

modalAjoutPhoto();
