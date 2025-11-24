import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ImageOverlay, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';

// Fix for default Leaflet icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = new Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Component to update map center
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 16); // Zoom in closer for land
  }, [center, map]);
  return null;
};

export const MapView = () => {
  const { properties } = useData();
  const { t } = useLanguage();
  const [center] = useState<[number, number]>([23.1086, 72.5276]); // Default to Gota
  const [opacity, setOpacity] = useState(0.6);
  const [isSatellite, setIsSatellite] = useState(false);

  // TP Scheme Overlay (Simulated for Gota area)
  const overlayBounds: [[number, number], [number, number]] = [
    [23.1000, 72.5200],
    [23.1150, 72.5400]
  ];

  return (
    <div className="h-full w-full rounded-3xl overflow-hidden border border-brand-border relative z-0">
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution={isSatellite ? 'Esri Satellite' : 'OpenStreetMap'}
          url={isSatellite
            ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          }
        />

        {/* TP Scheme Overlay */}
        <ImageOverlay
          url="/shilaj_tp_map.png" // Real Shilaj TP Map from GujRERA PDF
          bounds={overlayBounds}
          opacity={opacity}
        />

        {properties.map((property) => (
          property.lat && property.lng && (
            <Marker
              key={property.id}
              position={[property.lat, property.lng]}
              icon={DefaultIcon}
            >
              <Popup className="custom-popup">
                <div className="p-1">
                  <h3 className="font-bold text-sm">{property.location}</h3>
                  <p className="text-xs text-gray-600">{t.surveyNo}: {property.surveyNumber}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${property.status === 'Safe' ? 'bg-green-100 text-green-800' :
                    property.status === 'Risky' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {property.status}
                  </span>
                </div>
              </Popup>
            </Marker>
          )
        ))}

        <MapUpdater center={center} />
      </MapContainer>

      {/* Controls Container */}
      <div className="absolute bottom-24 right-4 z-[400] flex flex-col space-y-2">
        <button
          onClick={() => setIsSatellite(!isSatellite)}
          className="w-10 h-10 rounded-full bg-brand-secondary/90 backdrop-blur-md border border-brand-border flex items-center justify-center text-white shadow-lg hover:bg-brand-surface transition-colors"
          title="Toggle Satellite View"
        >
          {isSatellite ? '🗺️' : '🛰️'}
        </button>
      </div>

      {/* Opacity Slider */}
      <div className="absolute bottom-6 left-6 right-6 z-[400] bg-brand-secondary/90 backdrop-blur-md p-4 rounded-2xl border border-brand-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-white font-medium">TP Map Overlay</span>
          <span className="text-xs text-brand-text-muted">{Math.round(opacity * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          className="w-full h-2 bg-brand-surface rounded-lg appearance-none cursor-pointer accent-brand-accent"
        />
      </div>
    </div>
  );
};
