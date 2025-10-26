export function safeGetItem(key) {
  if (typeof localStorage === "undefined") return "";
  if (typeof key === "string") return localStorage.getItem(key) || "";
  if (typeof key === "boolean") return localStorage.getItem(key) || false;
  //Par défaut
  return "";
}
