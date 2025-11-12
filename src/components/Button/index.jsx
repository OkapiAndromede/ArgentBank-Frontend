import "./style.scss";
/**
 * Composant Button gérant l'affichage et le comportement des différents types de boutons
 *
 * Ce composant prend en charge deux types de boutons :
 * - "default" : un bouton standard
 * - "submit" : un bouton associé à la soumission d'un formulaire
 *
 * @component
 * @param {"default" | "submit"} buttonType - Le type de bouton à afficher
 * @param {React.ReactNode} children - Le contenu textuel ou JSX à afficher dans le bouton
 * @param {boolean} [isDisabled = false] - Indique si le bouton est désactivé
 * @param {string} [buttonStyle] - La class CSS appliquée au bouton
 * @param {Function} onClick - Fonction appelée lors du clic sur le bouton (uniquement pour le type `default`)
 *
 * @returns {JSX.Element} composant Button rendu
 */
const BUTTON_TYPES = {
  DEFAULT: "default",
  SUBMIT: "submit",
};
function Button({
  buttonType,
  children,
  isDisabled = false,
  buttonStyle,
  onClick,
}) {
  switch (buttonType) {
    case BUTTON_TYPES.DEFAULT:
      return (
        <button onClick={onClick} className={buttonStyle} type="button">
          {children}
        </button>
      );
    case BUTTON_TYPES.SUBMIT:
      return (
        <input
          className={buttonStyle || "button"}
          type="submit"
          value={children}
          {...(isDisabled && { disabled: true })}
        />
      );
    default:
      return <button value={children} className="defaultButton" />;
  }
}
export default Button;
