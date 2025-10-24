/**
 * Formate les montants d'un tableau d'objet :
 * - Convertit les montants au format local "en-US" (séparateur de millier, deux décimales)
 * - Remplace les virgules par des espaces pour un affichage européen
 *
 * @param {object[]} table - Tableau d'objet contenant les données bancaires
 * @returns {object[]} Nouveau tableau avec les montants formatés en chaîne de caractères
 *
 * @example
 * formatAmount ([{amount : 1234.5}])
 * tableau d'objet retourné -> [{amount : "1 234.50"}]
 */
export function formatAmount(table) {
  return table.map((item) => ({
    ...item,
    amount: item.amount
      .toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/,/g, " "),
  }));
}
