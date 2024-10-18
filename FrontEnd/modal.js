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
    const projetElements = document.createElement("figure");
    const imageElements = document.createElement("img");
    imageElements.src = p.imageUrl;
    imageElements.classList.add("img-modal");
    projetElements.appendChild(imageElements);
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "delete-Btn");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-regular", "fa-trash-can");
    deleteIcon.setAttribute("id", "delete-icon");
    deleteButton.appendChild(deleteIcon);
    projetElements.appendChild(deleteButton);
    sectionImageProjet.appendChild(projetElements);
    deleteButton.addEventListener("click", removeProjet);
  });
}

async function removeProjet(projetId) {
  try {
    const token = localStorage.getItem("token");
    const reponse = await fetch("http://localhost:5678/api/works/{id}", {
      method: "DELETE",
    });
    if (token && reponse === true) {
      console.log(`projet ${projetId} supprimé`);
      genererImageModal();
    } else {
      console.error(`erreur lors de la suppression du projet ${projetId}`);
    }
  } catch (error) {
    console.error("erreu lors de la supression du contact:", error);
  }
}
