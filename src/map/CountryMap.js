import mapboxgl from 'mapbox-gl';
import { useContext, useRef } from 'react';
import { token } from '../config';
import { useEffect } from 'react/cjs/react.development';
import styled from 'styled-components';
import { MapContext } from './MapProvider';

const MapContainer = styled.div`
  flex: 1;
  height: ${props => props.height};
`;

const CountryMap = ({ height }) => {
  const map = useRef();
  const markers = useRef();
  const { favoriteCountries, isFavorite } = useContext(MapContext);

  useEffect(() => {
    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    // Initialize markers to empty array
    markers.current = [];
  }, []);

  useEffect(() => {
    const markersToRemove = markers.current.filter(m => !isFavorite(m.country_code));

    // Remove the ones that are no longer favorites
    markersToRemove.forEach(m => m.marker.remove());

    // Then for each favorite, add it if it's not already in the markers array
    favoriteCountries.forEach(f => {
      if (!markers.current.find(m => m.country_code === f.country_code)) {
        const marker = new mapboxgl.Marker().setLngLat(f.lnglat).addTo(map.current);
        markers.current.push({
          country_code: f.country_code,
          marker,
        });
      }
    });

    // If we have favorites, fit the bounds of the map to the markers
    if (favoriteCountries.length > 0) {
      const [firstFavorite] = favoriteCountries;

      const bounds = favoriteCountries.reduce((bounds, { lnglat }) => {
        return bounds.extend(lnglat);
      }, new mapboxgl.LngLatBounds(firstFavorite.lnglat, firstFavorite.lnglat));

      map.current.fitBounds(bounds, {
        padding: 80,
        duration: 200,
      });
    }
  }, [favoriteCountries, isFavorite]);

  return <MapContainer id="map" height={height} />;
};

export default CountryMap;
