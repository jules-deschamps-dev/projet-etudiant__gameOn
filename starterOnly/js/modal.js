function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelector("span.close");

// clode modal event
closeModalBtn.addEventListener("click", closeModal)

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/**
 *  launch modal form
 */
function launchModal() {
  modalbg.style.display = "block";
}

/**
 * Ferme la modale
 */
function closeModal() {
  modalbg.style.display = "none";
}






/**
 * controlleur du formulaire d'inscription
 */
const validate = (event) => {
  event.preventDefault();
  const target = event.target;

  // renitialise les messages d'erreurs
  let isError = false;
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((element) => {
    element.remove();
  });

  // recupération des valeurs du formulaire
  const data = new FormData();
  data.append('prenom', target.querySelector("input#first").value);
  data.append('nom', target.querySelector("input#last").value);
  data.append('email', target.querySelector("input#email").value);
  data.append('anniversaire', target.querySelector("input#birthdate").value);
  data.append('nbTournoi', target.querySelector("input#quantity").value);
  data.append('localisation', target.querySelector('input[name="location"]:checked')?.value);
  data.append('terms', target.querySelector("input[name='terms']").checked);
  data.append('newsletter', target.querySelector("input#checkbox2").checked);

  // controle des saisies du formulaire
  for (const [key, value] of data.entries()) {
    console.log(key, value)
    // si la valeur necessite un controle et si la condition contenu dans les règles pour cette clef est rempli
    if (errorsMessages.hasOwnProperty(key) && (formRules[key](value))) {
      printFormErrors(`#formData${capitalizeFirstLetter(key)}`, errorsMessages[key]);
    }
  }
}


/**
 * Affiche les messages d'erreurs dans le formulaire
 * @param {string} selector selecteur html
 * @param {string} message message à afficher
 */
const printFormErrors = (selector, message) => {
  const errorMessage = document.createElement("p");
  errorMessage.innerHTML = message;
  errorMessage.classList.add('error-message');
  console.log(selector);
  document.querySelector(selector).appendChild(errorMessage);
  isError = true;
}