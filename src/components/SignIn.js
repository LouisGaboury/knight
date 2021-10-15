import { Fragment, useState } from "react";
import ConnexionForm from "./ConnexionForm";
import Button from "./Button";
import { supabase } from "../supabaseClient";

const SignIn = (props) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email: userCredentials.email,
        password: userCredentials.password,
      });
      if (error) throw error;
      console.log(user);
      console.log(session);
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <Fragment>
      <ConnexionForm />
      <Button
        textButton="Connexion"
        onClick={(event) => {
          event.preventDefault();
          handleLogin();
        }}
      />
    </Fragment>
  );
};

export default SignIn;
