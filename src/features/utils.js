/**
 * Fonction qui récupère une valeur spécifique depuis le `localStorage`.
 *
 * En particulier, elle lit la clé "user" dans le `localStorage`, tente de la parser en JSON,
 * puis retourne la valeur correspondante à la propriété demandée (`key`).
 * Si la clé n'existe pas, si le `localStorage` est vide ou si une erreur survient,
 * la fonction renvoie une chaîne vide.
 *
 * @param {string} key - Nom de la propriété à récupérer dans l'objet `user` du `localStorage`.
 * @returns {string} La valeur associée à la clé demandée,ou une chaîne vide en cas d'erreur ou de valeur inexistante.
 */
export function safeGetItem(key) {
  try {
    const userString = localStorage.getItem("user");
    if (!userString) return "";
    const rememberedUser = JSON.parse(userString);
    //Si la clé n'existe pas
    if (!(key in rememberedUser)) return "";
    return rememberedUser[key];
  } catch (err) {
    console.error("Erreur dans le safeGetItem", err);
    //Par défaut
    return "";
  }
}

/**
 * Fonction qui change la valeur d'une propriété spécifique depuis le `localStorage`.
 *
 * En particulier, elle lit la clé "user" dans le `localStorage`, tente de la parser en JSON,
 * puis met à jour ou creé la clé. Pour finir, elle string la clé `"user"`.
 * Si le `localStorage` est vide ou si une erreur survient,
 * la fonction renvoie une chaîne vide.
 * @param {string} key - Nom de la propriété à récupérer dans l'objet `user` du `localStorage`.
 * @param {string} newValue - Nouvelle valeur à associé à la propriété.
 * @returns {void} Cette fonction ne renvoie rien.
 */
export function safeChangeItem(key, newValue) {
  try {
    const userString = localStorage.getItem("user");
    if (!userString) return "";
    const rememberedUser = JSON.parse(userString);
    if (key in rememberedUser) {
      //Mise à jour ou création de la clé
      rememberedUser[key] = newValue;
      //Reecriture dans le localStorage
      localStorage.setItem("user", JSON.stringify(rememberedUser));
    }
  } catch (err) {
    console.error("Erreur dans le safeChangeItem", err);
  }
}
