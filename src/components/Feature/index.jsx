import "./style.scss";
/**
 * Composant Feature affichant une fonctionnalité avec son icône, son titre et sa description
 *
 * Utilisé pour présenter une caractéristique d'un produit
 *
 * @component
 * @param {string} imageSrc - Chemin absolu vers la ressource de l'image
 * @param {string} imageAlt - Description alternative de l'image
 * @param {string} title - Titre de la fonctionalité
 * @param {string} text - Explication de la fonctionalité
 *
 * @returns {JSX.Element} composant Feature rendu
 */
function Feature({ imageSrc, imageAlt, title, text }) {
  return (
    <article className="featureItem">
      <img src={imageSrc} alt={imageAlt} className="featureItem__icon" />
      <h3 className="featureItem__title">{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export default Feature;
