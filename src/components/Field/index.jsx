/**
 * Composant Field affichant les champs pour un formulaire
 * Ce composant prends les props suivantes :
 * @param {string} inputType - Le type d'input (ex : "text", "password", "checkbox")
 * @param {string} inputId - L'identifiant unique de l'input
 * @param {string} inputName - le nom de l'input
 * @param {boolean} [isRequired = fasle]  - Détermine si le champ est requis
 * @param {object} register - Objet register de React hook form
 * @param {string} error - Message d'erreur éventuel
 *
 * @returns {JSX.Element} composant Field rendu
 */

function Field({
  inputType = "text",
  inputId,
  inputName,
  isRequired = false,
  register,
  error,
}) {
  return (
    <>
      <input
        type={inputType}
        id={inputId}
        name={inputName}
        {...register(inputName, { require: isRequired })}
      />
      {error && <span>{error}</span>}
    </>
  );
}

export default Field;
