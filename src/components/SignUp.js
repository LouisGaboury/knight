import { Fragment, useState } from "react";
import Button from "./Button";
import { supabase } from "../supabaseClient";

const SignUp = (props) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  /**
   * @async
   * Permet de connecter un user inscrit dans la BDD
   * @todo sauvegarder ce que renvoie la connexion dans un state
   * @todo Chiffrer les password
   */
  const handleSignUp = async () => {
    try {
      const { error, user } = await supabase.auth.signUp({
        email: userCredentials.email,
        password: userCredentials.password,
      });
      // Si erreur => soulève l'erreur
      if (error) throw error;
      // Si ok => enregistre le nouvel utilisateur dans les profiles
      const register = await registerNewUser(user.id);
      if (register) {
        // Si ok => tout va bien
        console.log("Enregistrement ok");
      } else {
        // Si erreur => dire que c'est la sauce
        throw new Error("L'enregistrement a échoué");
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  /**
   * @async
   * @description Permet d'enregistrer le nouvel utilisateur dans les profiles
   * @param {String} id UID créé automatiquement lors de la création du compte
   * @returns {boolean} true si l'ajout est ok, false sinon
   * @todo La mettre dans le back-end
   */
  const registerNewUser = async (id) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .insert([{ id: id, username: "test" }]);
      if (error) throw error;
      return true;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <Fragment>
      <Fragment>
        <form className="mb-24">
          <fieldset>
            <div className="flex flex-col mx-4 mb-4">
              <label>login</label>
              <input
                type="text"
                placeholder="votre email"
                value={userCredentials.email}
                onChange={(event) => {
                  setCredentials((prevState) => ({
                    // Charge le state précédent
                    ...prevState,
                    // Ne change que la valeur qui nous intéresse
                    email: event.target.value,
                  }));
                }}
              ></input>
            </div>
            <div className="flex flex-col mx-4 mb-4">
              <label>mot de passe</label>
              <input
                type="password"
                value={userCredentials.password}
                onChange={(event) => {
                  setCredentials((prevState) => ({
                    // Charge le state précédent
                    ...prevState,
                    // Ne change que la valeur qui nous intéresse
                    password: event.target.value,
                  }));
                }}
              ></input>
            </div>
          </fieldset>
        </form>
        <Button
          textButton="Inscription"
          onClick={(event) => {
            // Utilisation de preventDefault() pour empêcher le rafraichissement de la page
            event.preventDefault();
            handleSignUp();
          }}
        />
      </Fragment>
    </Fragment>
  );
};

export default SignUp;
