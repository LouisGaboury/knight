import { Fragment, useEffect, useState } from "react";

const Coterie = ({ getCoteries }) => {
  const [coteries, setCoteries] = useState([]);
  const [focus, setFocus] = useState(0);

  // Se déclenche dès que getCoteries est updated
  useEffect(() => {
    setCoteries(getCoteries());
  }, [getCoteries]);

  const displayLoading = () => {
    return <Fragment />;
  };

  const displayLoaded = () => {
    return (
      <section>
        <h5>Coterie n°{coteries[focus].id}</h5>
      </section>
    );
  };

  return coteries.length > 0 ? displayLoaded() : displayLoading();
};

export default Coterie;
