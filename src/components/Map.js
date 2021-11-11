import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  Circle,
} from "react-leaflet";

const Map = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
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
        <LayersControl.BaseLayer checked name="Arches">
          <Marker position={[51.49939, -0.124754]}>
            <Popup>QG du Knight</Popup>
          </Marker>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Tâches d'Anathème">
          <Circle center={[48.8534, 2.3488]} radius={20000} />
        </LayersControl.BaseLayer>
      </LayersControl>
    </MapContainer>
  );
};

export default Map;
