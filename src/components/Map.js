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
const anatheme = [];
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
          <Circle center={[48.8534, 2.3488]} radius={20000} />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default Map;
