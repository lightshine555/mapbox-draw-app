import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import shapeStore from '../store/ShapeStore';
import './MapComponent.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const drawRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Prevent map from initializing multiple times
    if (mapRef.current) return;

    // Initialize map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });
    const map = mapRef.current;

    // Initialize MapboxDraw
    drawRef.current = new MapboxDraw({
      displayControlsDefault: true,
      controls: {
        polygon: true,
        point: true,
        line_string: true,
        trash: true,
        combine_features: false,
        uncombine_features: false,
      },
    });
    const draw = drawRef.current;
    map.addControl(draw);

    // --- Map Load Event ---
    map.on('load', () => {
      console.log('Map loaded.');
      setIsMapLoaded(true);
      
      if (shapeStore.shapes.length > 0) {
        draw.set({
            type: 'FeatureCollection',
            features: shapeStore.shapes.map(s => ({...s}))
        });
      }
    });

    // --- Draw Event Listeners ---
    const handleDrawCreate = (event) => {
      console.log('draw.create event:', event);
      event.features.forEach(feature => {
        shapeStore.addShape(feature);
      });
    };

    const handleDrawUpdate = (event) => {
      console.log('draw.update event:', event);
      shapeStore.updateShape(event.features);
    };

    const handleDrawDelete = (event) => {
      console.log('draw.delete event:', event);
      shapeStore.deleteShape(event.features);
    };

    map.on('draw.create', handleDrawCreate);
    map.on('draw.update', handleDrawUpdate);
    map.on('draw.delete', handleDrawDelete);


    // --- Cleanup on unmount ---
    return () => {
      console.log('Cleaning up map...');

      map.off('draw.create', handleDrawCreate);
      map.off('draw.update', handleDrawUpdate);
      map.off('draw.delete', handleDrawDelete);

      if (drawRef.current && map.hasControl(drawRef.current)) {
          try {
            map.removeControl(drawRef.current);
          } catch (error) {
              console.error("Error removing draw control:", error);
          }
      }
      drawRef.current = null;

      if (mapRef.current) {
        map.remove();
        mapRef.current = null;
      }
       setIsMapLoaded(false);
    };
  }, []);

  return (
    <div ref={mapContainerRef} className="map-container" />
  );
};

export default MapComponent;