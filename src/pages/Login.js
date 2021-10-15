import { useState, Fragment } from "react";
// Imports des composants extérieurs
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

const Login = (props) => {
  const [isConnexion, setIsConnexion] = useState(true);

  /**
   * @description Permet de changer l'état de isConnexion (true-false) pour switcher entre la connexion et l'inscription
   */
  const toggleAction = () => {
    setIsConnexion(!isConnexion);
  };

  return (
    <Fragment>
      <img
        src="/logoK32.png"
        alt="logo de Knight"
        className="max-w-md mx-auto mt-24"
      />
      <div className="flex flex-col rounded-xs mx-auto mt-8 shadow-md w-4/6 max-w-lg h-2/4">
        <div className="flex mb-12">
          <button
            className={
              "w-1/2 h-8 text-center italic " +
              (isConnexion ? "shadow-noBottom" : "shadow-md")
            }
            onClick={toggleAction}
          >
            Connexion
          </button>
          <button
            className={
              "w-1/2 h-8 text-center italic " +
              (isConnexion ? "shadow-md" : "shadow-noBottom")
            }
            onClick={toggleAction}
          >
            Inscription
          </button>
        </div>
        {isConnexion !== false ? <SignIn /> : <SignUp />}
      </div>
    </Fragment>
  );
};

export default Login;
