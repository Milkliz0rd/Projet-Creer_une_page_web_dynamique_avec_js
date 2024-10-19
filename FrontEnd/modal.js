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
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
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
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
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
    deleteButton.setAttribute("id", "delete-Btn");

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular", "fa-trash-can");
    deleteIcon.setAttribute("id", "delete-icon");
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
    sectionImageModal.classList.add("hidden");
    modalAjoutPhoto();
  });
}
