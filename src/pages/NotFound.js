import { Fragment } from "react";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <Fragment>
      <Header />
      <h2 className="text-7xl mt-16 ml-16">404 not found</h2>
      <p className="text-3xl mt-8 ml-16">
        Attention, Chevalier ! Vous vous aventurez dans les Abysses. Nous vous
        conseillons vivement de retourner en zone sûre !
      </p>
    </Fragment>
  );
};

export default NotFound;
