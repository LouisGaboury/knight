import { useEffect } from "react";

const Mission = ({ mission }) => {
  useEffect(() => console.log(mission), [mission]);

  return <h5>{mission.title}</h5>;
};

export default Mission;
