import { Fragment, useEffect, useState } from "react";

const Coterie = ({ getCoteries }) => {
  const [coteries, setCoteries] = useState([]);

  // Se déclenche dès que getCoteries est updated
  useEffect(() => {
    setCoteries(getCoteries());
  }, [getCoteries]);

  return (
    <Fragment>
      <h5>Liste des coteries</h5>
      {coteries.map((coterie) => (
        <div key={coterie.id}>{coterie.rank}</div>
      ))}
    </Fragment>
  );
};

export default Coterie;
