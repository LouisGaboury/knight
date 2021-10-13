import react, { useState } from "react";
import Button from "../components/Button";
import ConnexionForm from "../components/ConnexionForm";

const Login = (props) => {
  const [action, setAction] = useState("signIn");

  if (action !== "signIn") {
    return <SignUp />;
  }
  return <SignIn />;
};

const SignIn = (props) => {
  const [connected, setConnedted] = useState(false);
  // TODO - make this state bubble-up
  // TODO - link with Supabase for testing API connexion

  return (
    <div className="flex flex-col justify-center rounded-xs mx-auto mt-12 shadow-md w-4/6 max-w-lg h-3/4">
      <img
        src="/logoK32.png"
        alt="logo de Knight"
        className="max-w-md mx-auto mb-28"
      />
      <ConnexionForm />
      <Button textButton="Connexion" />
    </div>
  );
};

const SignUp = (props) => {
  return (
    <div className="flex flex-col justify-center rounded-xs mx-auto mt-12 shadow-md w-4/6 max-w-lg h-3/4">
      <img
        src="/logoK32.png"
        alt="logo de Knight"
        className="max-w-md mx-auto mb-28"
      />
      <ConnexionForm />
      <Button textButton="Connexion" />
    </div>
  );
};

export default Login;
