import react from "react";
import Button from "../components/Button";
import ConnexionForm from "../components/ConnexionForm";

const Login = (props) => {
  // TODO - add state for connected or not connected
  // TODO - make previous state bubble-up
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

export default Login;
