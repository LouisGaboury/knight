import { useState, Fragment } from "react";
import Button from "../components/Button";
import ConnexionForm from "../components/ConnexionForm";

const Login = (props) => {
  const [action, setAction] = useState("signIn");

  /* if (action !== "signIn") {
    return <SignUp />;
  }
  return <SignIn />; */

  return (
    <Fragment>
      <img
        src="/logoK32.png"
        alt="logo de Knight"
        className="max-w-md mx-auto mt-24"
      />
      <div className="flex flex-col rounded-xs mx-auto mt-8 shadow-md w-4/6 max-w-lg h-2/4">
        <div className="flex mb-12">
          <span className="w-1/2 h-8 text-center italic shadow-noBottom">
            Connexion
          </span>
          <span className="w-1/2 h-8 text-center italic shadow-md">
            Inscription
          </span>
        </div>
        {action !== "signUp" ? <SignIn /> : <SignUp />}
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
