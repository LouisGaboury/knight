import { Fragment } from "react";
import ConnexionForm from "./ConnexionForm";
import Button from "./Button";

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

export default SignIn;
