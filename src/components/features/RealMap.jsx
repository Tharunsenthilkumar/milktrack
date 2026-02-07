import React, { useEffect, useRef } from 'react';

const RealMap = ({ center, markers, route, isLive, height = "300px" }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef({});
    const routeLineRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // Initialize Map if not already done
        if (!mapInstanceRef.current) {
            // Default center if none provided (Bangalore)
            const defaultCenter = [12.9716, 77.5946];
            const map = window.L.map(mapRef.current).setView(center || defaultCenter, 13);

            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            mapInstanceRef.current = map;
        }

        const map = mapInstanceRef.current;

        // Update View if center changes drastically (optional, usually better to keep user control)
        // map.setView(center, 13);

        // Clear markers not in current set? Or update them. 
        // For simplicity, we'll clear and redraw dynamic ones or update positions.

        // Define Icons
        const truckIcon = window.L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/2830/2830305.png', // Truck icon
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });

        const homeIcon = window.L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', // Home/Pin icon
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30]
        });

        // Current Marker Keys
        const currentIds = new Set();

        markers.forEach(marker => {
            currentIds.add(marker.id);
            const { id, lat, lng, type, title } = marker;

            if (markersRef.current[id]) {
                // Update position
                markersRef.current[id].setLatLng([lat, lng]);
            } else {
                // Create new
                const layer = window.L.marker([lat, lng], {
                    icon: type === 'provider' ? truckIcon : homeIcon
                }).addTo(map);

                if (title) {
                    layer.bindPopup(title);
                }

                markersRef.current[id] = layer;
            }
        });

        // Cleanup removed markers
        Object.keys(markersRef.current).forEach(id => {
            if (!currentIds.has(id)) {
                map.removeLayer(markersRef.current[id]);
                delete markersRef.current[id];
            }
        });

        // Draw Route (Polyline)
        if (route && route.length > 0) {
            if (routeLineRef.current) {
                routeLineRef.current.setLatLngs(route);
            } else {
                routeLineRef.current = window.L.polyline(route, { color: 'blue', dashArray: '10, 10', opacity: 0.6 }).addTo(map);
            }
        } else if (routeLineRef.current) {
            map.removeLayer(routeLineRef.current);
            routeLineRef.current = null;
        }

        // Auto-fit bounds if multiple markers
        if (markers.length > 0) {
            const group = window.L.featureGroup(Object.values(markersRef.current));
            map.fitBounds(group.getBounds().pad(0.1));
        }

    }, [center, markers, route]);

    return (
        <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner">
            <div ref={mapRef} style={{ width: '100%', height: height, zIndex: 0 }} />

            {!isLive && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-[500]">
                    <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200 text-sm font-medium text-gray-500">
                        Simulation Paused / Offline
                    </div>
                </div>
            )}
        </div>
    );
};

export default RealMap;
