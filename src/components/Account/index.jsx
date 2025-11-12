import "./style.scss";
/**
 * Composant Account affichant les informations générales d'un compte bancaire
 * Ce composant présente le titre, le montant et une courte description du compte
 *
 * @component
 * @param {string} title - Le titre du compte bancaire
 * @param {number} amount - Le montant total du compte bancaire
 * @param {string} description - La description du compte bancaire
 *
 * @returns {JSX.Element} composant Account rendu
 */
function Account({ title, amount, description }) {
  return (
    <div className="accountContent">
      <h3 className="accountContent__title">{title}</h3>
      <p className="accountContent__amount">{amount}</p>
      <p className="accountContent__description">{description}</p>
    </div>
  );
}
export default Account;
