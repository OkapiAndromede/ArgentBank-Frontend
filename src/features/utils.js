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
