import { useState, Fragment } from "react";
import Button from "../components/Button";
import ConnexionForm from "../components/ConnexionForm";

const Login = (props) => {
  const [isConnexion, setIsConnexion] = useState(true);

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

const SignIn = (props) => {
  // TODO - Make a state for connection ?
  // TODO - make this state bubble-up
  // TODO - link with Supabase for testing API connexion

  return (
    <Fragment>
      <ConnexionForm />
      <Button textButton="Connexion" />
    </Fragment>
  );
};

const SignUp = (props) => {
  return (
    <Fragment>
      <ConnexionForm />
      <Button textButton="Inscription" />
    </Fragment>
  );
};

export default Login;
