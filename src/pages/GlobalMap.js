import { Fragment, useState } from "react";
import Map from "../components/Map";
import FocusMission from "../components/FocusMission";

const GlobalMap = () => {
  const [trigger, setTrigger] = useState(false);
  const [mission, setMission] = useState(null);

  return (
    <Fragment>
      <Map trigger={trigger} setTrigger={setTrigger} setMission={setMission} />
      <FocusMission
        trigger={trigger}
        setTrigger={setTrigger}
        mission={mission}
      />
    </Fragment>
  );
};

export default GlobalMap;
