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

export function genererImageModal() {
  const sectionImageProjet = document.querySelector(".modif-gallery");
  sectionImageProjet.classList.add("figure-modal");
  sectionImageProjet.innerHTML = "";

  projet.forEach((p) => {
    // Création des éléments modaux
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
    sectionImageProjet.appendChild(projetElementsModal);

    // Sélection de l'élément correspondant dans la galerie
    const projetElementsGallery = document.querySelector(
      ".projet-element-gallery"
    );
    projetElementsGallery.setAttribute("id", "projet-element-gallery-" + p.id);

    // Ajout de l'événement de suppression
    deleteButton.addEventListener("click", async () => {
      const id = p.id;
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
}
