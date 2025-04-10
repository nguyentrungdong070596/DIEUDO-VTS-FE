import { useEffect } from 'react';
import L from 'leaflet';

const LeafletMap = () => {
    useEffect(() => {
        const mapId = 'leaflet-map';

        // Xử lý lỗi "Map container is already initialized"
        const existingMap = L.DomUtil.get(mapId);
        if (existingMap && (existingMap as any)._leaflet_id != null) {
            existingMap.innerHTML = '';
            (existingMap as any)._leaflet_id = null;
        }

        // Tọa độ tương ứng với địa chỉ "Số 01 Thống Nhất, P1, TP. Vũng Tàu"
        const map = L.map(mapId).setView([10.346947, 107.084265], 17);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Thêm marker vào địa chỉ
        L.marker([10.346947, 107.084265])
            .addTo(map)
            .bindPopup("Số 01 Thống Nhất, P.1, TP. Vũng Tàu")
            .openPopup();

        return () => {
            map.remove();
        };
    }, []);

    return <div id="leaflet-map" style={{ height: '400px', width: '100%' }} />;
};

export default LeafletMap;
