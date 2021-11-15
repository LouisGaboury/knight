import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  Polygon,
  LayerGroup,
} from "react-leaflet";
import { getMissions } from "../services/supabase/supabase";
import { redIcon, greenIcon } from "../services/leaflet/icons";
import ActionButton from "./ActionButton";

const arches = [
  {
    name: "Arche de Londres",
    position: [51.49939, -0.124754],
  },
  {
    name: "Arche de Bordeaux",
    position: [44.84044, -0.5805],
  },
];
const anatheme = [
  // La Bête
  [
    // Hyères
    [43.121, 6.128],
    // Dunkerke
    [51.034368, 2.376776],
    // Groningen
    [53.21917, 6.56667],
    // Rostock
    [54.0887, 12.14049],
    // Vilnius
    [54.6871555, 25.2796514],
    //Kiev
    [50.4501, 30.5234],
    // Constanta
    [44.18073, 28.63432],
    // Larissa
    [39.643452, 22.413208],
    // Rome
    [41.89193, 12.51133],
  ],
  // La Dame
  [
    // Laâyoune
    [27.125286, -13.1625],
    // Saint-Louis
    [16.237997, -16.212559],
    // Agadez
    [16.97333, 7.99111],
    // Monts Nouba
    [7.8562715053557, 30.040412902831974],
    // Aswan
    [24.088938, 32.8998293],
    // Sabha
    [27.03766, 14.42832],
    // El Menia
    [30.583316, 2.88367],
  ],
  // La Chair
  [],
];
const purpleOptions = { color: "purple" };

const Map = ({ setMission, setTrigger }) => {
  const [missions, setMissions] = useState(null);

  useEffect(() => {
    getMissions().then((res) => setMissions(res));
  }, []);

  return (
    <MapContainer
      center={[51.49939, -0.124754]}
      zoom={4}
      maxZoom={8}
      minZoom={3}
      scrollWheelZoom={true}
      className={"h-full w-full z-0"}
    >
      <LayersControl position="topright">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl.Overlay name="Arches">
          <LayerGroup>
            {arches.map((arche, index) => (
              <Marker position={arche.position} key={index}>
                <Popup>{arche.name}</Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Tâches d'Anathème">
          <LayerGroup>
            {anatheme.map((zone, index) => (
              <Polygon
                positions={zone}
                pathOptions={purpleOptions}
                key={index}
              />
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Missions">
          <LayerGroup>
            {missions &&
              missions.map((mission, index) => (
                <Marker
                  position={mission.localisation}
                  key={index}
                  icon={mission.coterie_id ? greenIcon : redIcon}
                >
                  <Popup>
                    <h3>{mission.title}</h3>
                    <div className={"flex justify-around mb-8"}>
                      <p>
                        Difficulté : <span>{mission?.difficulty}</span>
                      </p>
                      <p>
                        Récompense : <span>{mission?.reward}</span>
                      </p>
                    </div>
                    <div className={"mx-auto"}>
                      <ActionButton
                        textButton={"Details"}
                        onClick={() => {
                          setTrigger(true);
                          setMission(mission);
                        }}
                      />
                    </div>
                  </Popup>
                </Marker>
              ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default Map;
