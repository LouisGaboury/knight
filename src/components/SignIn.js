import { Fragment, useState } from "react";
import Button from "./Button";
import { supabase } from "../supabaseClient";

const SignIn = (props) => {
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
  const handleLogin = async () => {
    try {
      // Se connecte à Supabase pour chercher le user
      const { error } = await supabase.auth.signIn({
        email: userCredentials.email,
        password: userCredentials.password,
      });
      // Si erreur => soulève l'erreur
      if (error) throw error;
      // Si ok => passe à la suite
      if (!userCredentials.password) {
        alert("Vérifiez votre email pour le lien de connexion");
      }
      console.log("Authentification ok");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
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
        textButton="Connexion"
        onClick={(event) => {
          // Utilisation de preventDefault() pour empêcher le rafraichissement de la page
          event.preventDefault();
          handleLogin();
        }}
      />
    </Fragment>
  );
};

export default SignIn;
