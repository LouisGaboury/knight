import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  Circle,
  Polygon,
  LayerGroup,
} from "react-leaflet";

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
];
const purpleOptions = { color: "purple" };

const Map = () => {
  return (
    <MapContainer
      center={[51.49939, -0.124754]}
      zoom={4}
      maxZoom={8}
      minZoom={3}
      scrollWheelZoom={true}
      className={"h-full w-full"}
    >
      <LayersControl position="topright">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl.Overlay checked name="Arches">
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
              <Polygon positions={zone} pathOptions={purpleOptions} />
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default Map;
