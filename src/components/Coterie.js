import { Fragment, useEffect, useState } from "react";

const Coterie = ({ getCoteries }) => {
  const [coteries, setCoteries] = useState([]);

  // Se déclenche dès que getCoteries est updated
  useEffect(() => {
    setCoteries(getCoteries());
  }, [getCoteries]);

  return (
    <Fragment>
      {coteries.map((coterie) => (
        <div key={coterie.id}>{coterie.rank}</div>
      ))}
    </Fragment>
  );
};

export default Coterie;
