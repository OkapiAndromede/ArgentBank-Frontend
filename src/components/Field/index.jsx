/**
 * Composant Field affichant les champs pour un formulaire
 * Ce composant prends les props suivantes :
 * @param {string} inputType - Le type d'input (ex : "text", "password", "checkbox")
 * @param {string} inputId - L'identifiant unique de l'input
 * @param {string} inputName - le nom de l'input
 * @param {boolean} [isRequired = fasle]  - Détermine si le champ est requis
 * @param {string} value - la valeur actuelle du champ
 * @param {Function} onChange - fonction appellée lors d'une modification du champ
 *
 * @returns {JSX.Element} composant Field rendu
 */

function Field({
  inputType = "text",
  inputId,
  inputName,
  isRequired = false,
  value,
  onChange,
}) {
  return (
    <>
      <input
        type={inputType}
        id={inputId}
        name={inputName}
        value={value}
        onChange={onChange}
        {...(isRequired ? { required: true } : {})}
      />
    </>
  );
}

export default Field;
