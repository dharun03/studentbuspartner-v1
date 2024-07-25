import { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapModal = ({ isOpen, onClose, details }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="relative z-50 rounded-lg bg-white p-8"
            onClick={(e) => e.stopPropagation}
          >
            <button className="absolute right-4 top-2" onClick={onClose}>
              <IoIosCloseCircle size={30} color="#dc2626" />
            </button>

            <div
              style={{ width: "700px", height: "600px" }}
              className="mt-4"
              onClick={(e) => e.stopPropagation}
            >
              <MapContainer
                center={[13.0827, 80.2707]} // Chennai coordinates
                zoom={10} // Initial zoom level
                style={{ width: "100%", height: "100%" }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {details.map((bus) => (
                  <Marker key={bus.id} position={[bus.latitude, bus.longitude]}>
                    <Popup>
                      <div>
                        <h2>{bus.name}</h2>
                        <p>Latitude: {bus.latitude}</p>
                        <p>Longitude: {bus.longitude}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapModal;
