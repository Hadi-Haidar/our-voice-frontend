import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MagnifyingGlassIcon, Crosshair1Icon } from "@radix-ui/react-icons";

// Fix for default marker icons
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

function LocationMarker({ position, setPosition }) {
    const map = useMap();
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });
    return position === null ? null : <Marker position={position}></Marker>;
}

function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
}

export default function LocationPicker({ selectedPosition, setSelectedPosition, onAddressSelect, isRTL }) {
    const defaultCenter = [33.8938, 35.5018]; // Beirut
    const [address, setAddress] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    // Reverse geocoding when position changes
    useEffect(() => {
        if (selectedPosition) {
            fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${selectedPosition.lat}&lon=${selectedPosition.lng}&accept-language=${isRTL ? 'ar' : 'en'}`
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.address) {
                        const a = data.address;
                        // Pick only ONE primary name of the place
                        const primaryName = a.village || a.town || a.city || a.suburb || a.neighbourhood || a.road || a.municipality || data.name;
                        const addr = primaryName || (isRTL ? "موقع غير معروف" : "Unknown Location");
                        
                        setAddress(addr);
                        if (onAddressSelect) onAddressSelect(addr);
                    } else {
                        const addr = data.name || (isRTL ? "موقع غير معروف" : "Unknown Location");
                        setAddress(addr);
                        if (onAddressSelect) onAddressSelect(addr);
                    }
                })
                .catch(() => { });
        }
    }, [selectedPosition, isRTL, onAddressSelect]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            setIsSearching(true);
            // Bias search towards Lebanon
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=lb&limit=1`);
            const data = await res.json();
            if (data && data.length > 0) {
                const newPos = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
                setSelectedPosition(newPos);
            }
        } catch (err) {
            console.error("Search error:", err);
        } finally {
            setIsSearching(false);
        }
    };

    const handleLocateMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    setSelectedPosition(newPos);
                },
                (err) => {
                    alert(isRTL ? "تعذر تحديد موقعك." : "Could not determine your location.");
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
            );
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                    <input
                        className={`w-full rounded-xl border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:border-red-600 focus:ring-red-600/20 py-3 ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"} outline-none transition-all`}
                        placeholder={isRTL ? "ابحث عن مدينة أو شارع..." : "Search for a city or street..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSearch(e);
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        className={`absolute inset-y-0 ${isRTL ? "right-0 pr-3" : "left-0 pl-3"} flex items-center text-gray-400 hover:text-red-600 transition-colors`}
                    >
                        {isSearching ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-600 border-t-transparent" />
                        ) : (
                            <MagnifyingGlassIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>
                <button
                    onClick={handleLocateMe}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all whitespace-nowrap overflow-hidden w-full sm:w-auto"
                    type="button"
                >
                    <Crosshair1Icon className="h-5 w-5 text-red-600" />
                    {isRTL ? "تحديد موقعي" : "Locate Me"}
                </button>
            </div>

            <div className="relative h-72 w-full rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 z-0">
                <MapContainer
                    center={selectedPosition || defaultCenter}
                    zoom={selectedPosition ? 16 : 13}
                    style={{ height: "100%", width: "100%" }}
                    zoomControl={false}
                >
                    <TileLayer
                        attribution='&copy; Google Maps'
                        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    />
                    <LocationMarker position={selectedPosition} setPosition={setSelectedPosition} />
                    <ChangeView center={selectedPosition} />
                </MapContainer>

                {address && (
                    <div className={`absolute bottom-3 ${isRTL ? "left-3 text-left" : "right-3 text-right"} bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold shadow-xl text-gray-900 dark:text-white border border-white/20 z-[400] max-w-[80%] truncate`}>
                        {address}
                    </div>
                )}
            </div>
        </div>
    );
}
