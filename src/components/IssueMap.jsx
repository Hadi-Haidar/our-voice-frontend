import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ChevronDownIcon, DrawingPinFilledIcon, Crosshair1Icon } from "@radix-ui/react-icons";
import { m, AnimatePresence } from "framer-motion";

// Custom modern red marker
const customIcon = L.divIcon({
    html: `
        <div class="relative flex items-center justify-center">
            <div class="absolute w-8 h-8 bg-red-500/30 rounded-full animate-ping"></div>
            <div class="relative w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <div class="absolute -bottom-1 w-1 h-1 bg-red-600 rotate-45 transform origin-center"></div>
        </div>
    `,
    className: "custom-marker-icon",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
});

function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
}

export default function IssueMap({ coordinates, address, isRTL }) {
    const [isOpen, setIsOpen] = useState(false);
    if (!coordinates || !coordinates.lat || !coordinates.lng) return null;

    const position = [coordinates.lat, coordinates.lng];

    return (
        <div className="mt-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/40 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all group"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                        <DrawingPinFilledIcon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <p className={`text-sm font-bold text-gray-900 dark:text-white ${isRTL ? "text-right" : "text-left"}`}>
                            {isRTL ? "الموقع الدقيق على الخريطة" : "Precise Map Location"}
                        </p>
                        <p className={`text-xs text-gray-500 dark:text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
                            {isOpen ? (isRTL ? "انقر للإغلاق" : "Click to collapse") : (isRTL ? "انقر للعرض" : "Click to view location")}
                        </p>
                    </div>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-3">
                            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xl z-0">
                                <MapContainer
                                    center={position}
                                    zoom={16}
                                    scrollWheelZoom={false}
                                    style={{ height: "100%", width: "100%" }}
                                    zoomControl={false}
                                >
                                    <TileLayer
                                        attribution='&copy; Google Maps'
                                        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                    />
                                    <Marker position={position} icon={customIcon} />
                                    <ChangeView center={position} />
                                </MapContainer>

                                {/* Modern Map Controls Overlay */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2 z-[400]">
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 z-[400]">
                                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-xl flex items-center justify-between">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <Crosshair1Icon className="w-4 h-4 text-red-600 shrink-0" />
                                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                                                {address}
                                            </p>
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-mono shrink-0">
                                            {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
