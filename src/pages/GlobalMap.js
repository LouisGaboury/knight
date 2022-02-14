import { Fragment, useState } from "react";
import Map from "../components/map/Map";
import FocusMission from "../components/map/FocusMission";

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
        setMission={setMission}
      />
    </Fragment>
  );
};

export default GlobalMap;
