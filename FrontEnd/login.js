// Modification de class du lien de naviagtion sur lequel nous sommes
const currentPageBtn = document.querySelector("#login-page");
currentPageBtn.classList.add("active-nav-page");

// création de la fonction "initializedLoginUser"
function initializedLoginUser() {
  // On va chercher l'élément du Dom qui sera notre variable "loginForm"
  const loginForm = document.querySelector(".login-form");
  // On effectue un évènement d'écoute au clique et ayant pour objet d'évènement "event"
  loginForm.addEventListener("submit", (event) => {
    // Comme c'est un formulaire, on évite son comportement par défaut (refresh de la page)
    event.preventDefault();
    // On créé une variable "email" qui récupère la valeur de notre inpute[name=email] en passant par l'élément déclancheur d'évènement (event.target)
    const email = event.target.querySelector("[name=e-mail]").value;
    // On créé une variable "password" qui récupère la valeur de notre inpute[name=password] en passant par l'élément déclancheur d'évènement (event.target)
    const password = event.target.querySelector("[name=password]").value;
    // on créé notre variable "chargeUtile" qui va nous aider à créé notre requête au près de l'api. Pour cela il faut que celle ci soit en converti en JSON et créer un objet contenant les deux valeurs clés "email" et "password"
    const chargeUtile = JSON.stringify({ email: email, password: password });
    // on utlise la méthode fetch suivi de l'url pour envoyer une requête "http" (ici celle de notre api pour section login)
    fetch("http://localhost:5678/api/users/login", {
      // on ajoute l'option de notre requête "http" qui contient un objet avec les paramêtres "method", "headers", et "body":
      // le paramêtre "method" est "POST" car on envoie une requête au serveur
      method: "POST",
      // le paramêtre "headers" indique au serveur que les données envoyées (chargeUtile) sont tranmises au format JSON.
      headers: { "Content-Type": "application/json" },
      // le paramètre "body" contient la variable "chargeUtile" qui contient elle même, le données que l'on veut transmettre à notre serveur.
      body: chargeUtile,
    })
      // notre requête fetch renvoie à une promèsse (promise ".then()") qui contient la réponse (l'objet "response")
      .then((response) => {
        // on créé une conditions en commençant par "si la réponse de mo'n API est status 404"
        if (response.status === 404) {
          // on retourne une réponse au format json qui contient une promise ayant pour objet "data"
          return response.json().then((data) => {
            // cette promise sera affiché en alert qui contient le message de notre objet provenant de l'api
            alert(data.message);
          });
          // réponce pour "et si la réponce de mon API est le status 404"
        } else if (response.status === 401) {
          // on créé une alerte avec une chaine de caractère car l'api n'a pas de réponse pour un statut 401
          alert("Erreur dans l’identifiant ou le mot de passe.");
          // on retourne la réponse pour éviter que la fonction continue de s'executer
          return;
        }
        // on retourne le corps de réponse pour toutes celles qui ne sont pas 404 ou 401 au format json
        return response.json();
      })
      // une fois que notre requête URL ai obtenu le status voulu, elle renvoie à une promesse qui contient l'objet "data"
      .then((data) => {
        // on créé une conditions qui assure que les données de "data" sont valides et on vérifie que les data contiennent bien les données "token"
        if (data && data.token) {
          // On sauvegarde le token sous la clé "token" dans le "localStorage"
          localStorage.setItem("token", data.token);
          // On redirige l'utilisateur vers la page des projets
          window.location.href = "./index.html";
        }
      })
      // On crée un bloc de code "catch" ayant pour objet "error" qui gère les erreurs
      .catch((error) => {
        // si lors d'une requête on obtient par ex: un problème réseau, serveur inaccessible... on créé une alerte avec un message ""Un problème est survenu. Veuillez réessayer.""
        alert("Un problème est survenu. Veuillez réessayer.");
      });
  });
}
// on appel notre fonction "initializedLoginUser"
initializedLoginUser();
