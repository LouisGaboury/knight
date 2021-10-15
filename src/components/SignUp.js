import { Fragment } from "react";
import ConnexionForm from "./ConnexionForm";
import Button from "./Button";

const SignUp = (props) => {
  return (
    <Fragment>
      <ConnexionForm />
      <Button textButton="Inscription" />
    </Fragment>
  );
};

export default SignUp;
