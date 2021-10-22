import { Fragment, useEffect, useState } from "react";

const Coterie = ({ getCoteries }) => {
  const [coteries, setCoteries] = useState([]);

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
