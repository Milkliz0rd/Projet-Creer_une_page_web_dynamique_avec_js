function initializedLoginUser() {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = event.target.querySelector("[name=e-mail]").value;
    const password = event.target.querySelector("[name=password]").value;

    // Préparation des données à envoyer
    const chargeUtile = JSON.stringify({ email: email, password: password });

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    })
      .then((response) => {
        if (response.status === 404) {
          return response.json().then((data) => {
            // Afficher le message d'erreur renvoyé par l'API
            alert(data.message);
          });
        }
        return response.json(); // Conversion en JSON pour les autres réponses
      })
      .then((data) => {
        if (data && data.token) {
          // Stocker le token et rediriger
          localStorage.setItem("token", data.token);
          window.location.href = "./index.html"; // Correction ici
        }
      })
      .catch((error) => {
        alert("Un problème est survenu. Veuillez réessayer.");
      });
  });
}

// Initialiser l'événement au chargement de la page
initializedLoginUser();
