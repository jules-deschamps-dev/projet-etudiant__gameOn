// messages d'erreurs
const errorsMessages = {
  localisation: "Vous devez choisir une option. <br/><br/>",
  prenom: "Le prénom doit faire au moins 2 caractères.",
  nom: "Le nom doit faire au moins 2 caractères.",
  email: "Vous devez saisir une adresse mail valide.",
  anniversaire: "Vous devez avoir au moins 18ans.",
  terms: "Vous devez accepter les conditions d'utilisation.",
};

const formRules = {
  prenom: (value) => value.length >= 2,
  nom: (value) => value.length >= 2,
  email: (value) => /^[\w\.-]+@[\w\.-]+\.\w+$/.test(value),
  localisation: (value) => value !== 'undefined',
  anniversaire: (value) => verifierAge(value),
  terms: (value) => value === "true",
};

function verifierAge(date) {
  const dateActuelle = new Date();
  const dateFournie = new Date(date);
  const majorite = 18 * 365.25 * 24 * 60 * 60 * 1000;
  return dateActuelle - dateFournie >= majorite;
}

function capitalizeFirstLetter(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}