import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with Vite/Webpack
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition, isRTL }) {
    const map = useMap();

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

// Separate component to handle centering
function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
}

export default function LocationPicker({ selectedPosition, setSelectedPosition, isRTL }) {
    const defaultCenter = [33.8938, 35.5018]; // Beirut center
    const [address, setAddress] = useState(isRTL ? "بيروت، لبنان" : "Beirut, Lebanon");

    // Reverse geocoding (simplified using Nominatim)
    useEffect(() => {
        if (selectedPosition) {
            fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${selectedPosition.lat}&lon=${selectedPosition.lng}&accept-language=${isRTL ? 'ar' : 'en'}`
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.display_name) {
                        setAddress(data.display_name);
                    }
                })
                .catch(() => { });
        }
    }, [selectedPosition, isRTL]);

    const handleLocateMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    setSelectedPosition(newPos);
                },
                () => {
                    alert(isRTL ? "تعذر تحديد موقعك." : "Could not determine your location.");
                }
            );
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                    <input
                        className={`w-full rounded-xl border-gray-200 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 text-gray-900 dark:text-white focus:border-red-600 focus:ring-red-600/20 py-3 ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"} outline-none transition-all truncate`}
                        value={address}
                        readOnly
                        placeholder={isRTL ? "العنوان المحدد" : "Selected address"}
                        type="text"
                    />
                    <div className={`pointer-events-none absolute inset-y-0 ${isRTL ? "right-0 pr-3" : "left-0 pl-3"} flex items-center text-gray-400`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                </div>
                <button
                    onClick={handleLocateMe}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all whitespace-nowrap overflow-hidden w-full sm:w-auto"
                    type="button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="2" y1="12" x2="5" y2="12"></line><line x1="19" y1="12" x2="22" y2="12"></line></svg>
                    {isRTL ? "حدّد موقعي" : "Locate Me"}
                </button>
            </div>

            <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 z-0">
                <MapContainer
                    center={selectedPosition || defaultCenter}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    zoomControl={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker position={selectedPosition} setPosition={setSelectedPosition} isRTL={isRTL} />
                    <ChangeView center={selectedPosition} />
                </MapContainer>

                <div className={`absolute bottom-3 ${isRTL ? "left-3 text-left" : "right-3 text-right"} bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-sm text-gray-900 dark:text-white border border-white/20 z-[400] max-w-[200px] truncate`}>
                    {address}
                </div>
            </div>
        </div>
    );
}
