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
const modalBody = document.querySelector('.bground .content .modal-body');
const nav = document.querySelector('.main-navbar');
const form = document.querySelector('.bground .content .modal-body form');
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelector("span.close");
let modalInitialHeight;

// clode modal event
closeModalBtn.addEventListener("click", closeModal)

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/**
 *  launch modal form
 */
function launchModal() {
  form.style.display = "block";
  modalbg.style.display = "block";
  modalInitialHeight = form.offsetHeight;
  document.querySelector('body').style.overflow = "hidden";
  window.scrollTo(0, 0);
}

/**
 * Ferme la modale
 */
function closeModal() {
  if (document.querySelector('#modale-confirmation')) {
    document.querySelector('#modale-confirmation').remove();
    document.querySelector('#close-modale-btn').remove();
  }
  document.querySelector('body').style.overflow = "initial";
  modalbg.style.display = "none";
}

function navBehavior() {
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
  data.append('prenom', target.querySelector("input#prenom").value);
  data.append('nom', target.querySelector("input#nom").value);
  data.append('email', target.querySelector("input#email").value);
  data.append('anniversaire', target.querySelector("input#anniversaire").value);
  data.append('nbTournoi', target.querySelector("input#quantity").value);
  data.append('localisation', target.querySelector('input[name="location"]:checked')?.value);
  data.append('terms', target.querySelector("input[name='terms']").checked);
  data.append('newsletter', target.querySelector("input#checkbox2").checked);

  // controle des saisies du formulaire
  for (const [key, value] of data.entries()) {
    // si la valeur necessite un controle et si la condition contenu dans les règles pour cette clef est rempli
    if (errorsMessages.hasOwnProperty(key) && !(formRules[key](value))) {
      printFormErrors(`#formData${capitalizeFirstLetter(key)}`, errorsMessages[key]);
      isError = true;
    }
  }

  // si aucune erreur est relevé on passe à la confirmation
  if (!isError) {
    confirmInscription(data);
    const inputs = target.querySelectorAll("input:not([type='submit'])")
    inputs.forEach(element => {
      element.value = ""
    });
  }
}

function inputController(key) {
  const element = `#formData${capitalizeFirstLetter(key)}`
  document.querySelector(element).querySelector('.error-message')?.remove();
  const value = document.querySelector('#' + key).value;
  if (errorsMessages.hasOwnProperty(key) && !(formRules[key](value))) {
    printFormErrors(element , errorsMessages[key]);
    isError = true;
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
  document.querySelector(selector).appendChild(errorMessage);
  isError = true;
}


/**
 * Affiche une modale pour le succès de l'inscription à un tournoi
 * 
 * @param {string} localisation Lieu du tournoi
 */
const confirmInscription = (data) => {
  // fait disparaitre le formulaire d'inscription
  form.style.display = 'none';

  // affiche le succès à l'inscription
  const confirmationText = document.createElement('div');
  confirmationText.id = 'modale-confirmation';
  confirmationText.textContent = `Vous êtes bien inscrit pour le tournoi de ${data.get('localisation')}`;
  confirmationText.style.height = modalInitialHeight + 'px';
  modalBody.appendChild(confirmationText);


  const closeBtn = document.createElement('div');
  closeBtn.id = 'close-modale-btn';
  closeBtn.classList = 'btn-submit';
  closeBtn.style.display = 'table';
  closeBtn.textContent = 'Fermer';
  closeBtn.addEventListener('click', () => closeModal());
  modalBody.appendChild(closeBtn);
}
