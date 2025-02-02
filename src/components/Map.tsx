import React, {useRef, useEffect, useState} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicmVkbGlvbjk1IiwiYSI6ImNsbTd0b2RydjAyamIzZGxidWg4azc3eDcifQ.niHxh5TLu_CUQZL-JMSLGA'

interface MapProps {
    accessToken: any;
    lat: number;
    lon: number;
}

const Map: React.FC<MapProps> = ({ lat, lon }) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const marker = useRef<mapboxgl.Marker | null>(null);
    const [zoom, setZoom] = useState(2)

    useEffect(() => {
        if (!map.current && mapContainer.current) {
            const container: string | HTMLElement = mapContainer.current;
            map.current = new mapboxgl.Map({
                container,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lon, lat],
                zoom: zoom,
            });

            map.current.addControl(
                new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true,
                    },
                    trackUserLocation: false,
                    showUserHeading: true,
                })
            );

            //Create a marker and add it to the map
            marker.current = new mapboxgl.Marker()
                .setLngLat([lon, lat])
                .addTo(map.current);
                //Repeating this will add more markers to the map
                //Need to map through an array of locations to render a cluster
                //From there, add popups with AQI data from API

        } else if (map.current && marker.current) {
            // Check if user's input coordinates have changed
            const currentCenter = map.current.getCenter();
            if (lat !== currentCenter.lat || lon !== currentCenter.lng) {
                //Use the `flyTo` method to smoothly transition to the new coordinates
                map.current.flyTo({
                    center: [lon, lat],
                    zoom: 17, //Desired zoom level
                    essential: true, //This E$nsures the animation is not cancelled by user interactions
                    duration: 15000
                });

                //Update the marker's position
                marker.current.setLngLat([lon, lat]);
            }
        }
    }, [lat, lon, zoom])

    return (
        <div>
            <div ref={mapContainer} id='map-container'></div>
        </div>
    )
}

export default Map;