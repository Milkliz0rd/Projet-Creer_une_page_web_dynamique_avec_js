const currentPageBtn = document.querySelector("#login-page");
currentPageBtn.classList.add("active-nav-page");

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
            alert(data.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.token) {
          // Stocker le token et rediriger
          localStorage.setItem("token", data.token);
          window.location.href = "./index.html";
        }
      })
      .catch((error) => {
        alert("Un problème est survenu. Veuillez réessayer.");
      });
  });
}
initializedLoginUser();
