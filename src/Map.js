import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import { token } from './config';
import { useContext, useEffect, useRef, useState } from 'react';
import MapProvider, { MapContext } from './MapProvider';

const HEIGHT = `${window.innerHeight - 300}px`;

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 700px;
  margin: 100px auto;
`;

const Title = styled.h3`
  padding: 0px 20px;
`;

const List = styled.div`
  display: flex;
`;

const Country = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const CountriesWrapper = styled.div`
  height: ${HEIGHT};
  overflow-y: scroll;
  flex: 1;
`;

const MapContainer = styled.div`
  flex: 1;
  height: ${HEIGHT};
`;

const InputWrap = styled.div`
  padding: 5px 25px 5px 15px;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  padding: 10px 0px 10px 10px;
  width: 100%;
`;

const CountryMap = () => {
  const map = useRef();
  const markers = useRef();
  const { favoriteCountries } = useContext(MapContext);

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
    const isFavorite = m => favoriteCountries.find(f => m.country_code === f.country_code);

    const markersToRemove = markers.current.filter(m => !isFavorite(m));
    markers.current = markers.current.filter(isFavorite);

    // Remove the ones that are no longer favorites
    markersToRemove.forEach(m => m.marker.remove());

    favoriteCountries.forEach(f => {
      if (!markers.current.find(m => m.country_code === f.country_code)) {
        const marker = new mapboxgl.Marker().setLngLat(f.lnglat).addTo(map.current);
        markers.current.push({
          country_code: f.country_code,
          marker,
        });
      }
    });

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
  }, [favoriteCountries]);

  return <MapContainer id="map" />;
};

const Countries = () => {
  const { countries, isFavorite, toggleFavorite } = useContext(MapContext);
  const [search, setSearch] = useState('');

  const countriesDom = countries
    .filter(c => {
      return !search || search.length === 0 || c.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
    })
    .map(c => {
      return (
        <Country key={c.country_code}>
          <input
            checked={isFavorite(c.country_code)}
            type="checkbox"
            onChange={e => {
              toggleFavorite(c.country_code);
            }}
          />{' '}
          {c.name}
        </Country>
      );
    });

  return (
    <CountriesWrapper>
      <InputWrap>
        <Input
          placeholder="Search..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
          }}
        />
      </InputWrap>
      {countriesDom}
    </CountriesWrapper>
  );
};

const Inner = () => {
  const { favoriteCount } = useContext(MapContext);

  return (
    <Wrapper>
      <Title>My Favorite Places ({favoriteCount})</Title>
      <List>
        <Countries />
        <CountryMap />
      </List>
    </Wrapper>
  );
};

const Map = () => {
  return (
    <MapProvider>
      <Inner />
    </MapProvider>
  );
};

export default Map;
