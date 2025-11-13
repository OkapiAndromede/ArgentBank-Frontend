import { NavLink } from "react-router-dom";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
/**
 * Composant Navigation gérant l'affichage de la barre de navigation
 *
 * Il utilise :
 * - {@function renderUserLink} : Une fonction interne permettant un affichage conditionnel des liens
 * @component
 * @param {boolean} wantToConnect - Indique si l'utilisateur cherche à se connecter
 * @param {string} userName - Le nom d'utilisateur actuellement affiché dans la barre de navigation
 *
 * @returns {JSX.Element} composant Navigation rendu
 */
function Navigation({ wantToConnect, userName }) {
  const dispatch = useDispatch();
  const isRemember = useSelector((state) => state.auth.isRemember);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  function handleSignOut() {
    dispatch(logOut());
  }

  function renderUserLink() {
    //Cas 1 : Connecté + veut accéder à son compte
    if (isRemember && wantToConnect) {
      return (
        <NavLink to={"/user-account"} className={"navBar__user--link"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="navBar__user--icon arrow"
          >
            <path d="M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5 384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384 464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337zM224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160z" />
          </svg>
          <p className="navBar__user--text">My Account</p>
        </NavLink>
      );
    }
    //Cas 2 : non connecté mais veut se connecter
    if (!isRemember && wantToConnect) {
      return (
        <NavLink to={"/signIn"} className={"navBar__user"}>
          <p className="navBar__user--text">Sign In</p>
        </NavLink>
      );
    }
    //Cas 3 : connecté et déjà sur son compte
    if (isAuthenticated && !wantToConnect) {
      return (
        <NavLink to={"/signIn"} className={"navBar__user--link"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="navBar__user--icon arrow"
          >
            <path d="M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5 384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384 464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337zM224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160z" />
          </svg>
          <p className="navBar__user--text" onClick={handleSignOut}>
            Sign Out
          </p>
        </NavLink>
      );
    }
    //Si aucun cas ne corespond
    return null;
  }
  return (
    <nav className="navBar">
      <NavLink to={"/"} className={"navBar__logo"}>
        <img
          className="navBar__logo--img"
          src="../public/images/argentBankLogo.webp"
          alt="Argent Bank Logo"
        ></img>
        <h1 className="srOnly">Argent Bank</h1>
      </NavLink>
      <div className={"navBar__user"}>
        <svg
          className="navBar__user--icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M463 448.2C440.9 409.8 399.4 384 352 384L288 384C240.6 384 199.1 409.8 177 448.2C212.2 487.4 263.2 512 320 512C376.8 512 427.8 487.3 463 448.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 336C359.8 336 392 303.8 392 264C392 224.2 359.8 192 320 192C280.2 192 248 224.2 248 264C248 303.8 280.2 336 320 336z" />
        </svg>
        <p className="navBar__user--text">{userName}</p>
        {renderUserLink()}
      </div>
    </nav>
  );
}
export default Navigation;
