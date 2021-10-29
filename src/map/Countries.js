import { useContext, useState } from 'react';
import styled from 'styled-components';
import { MapContext } from './MapProvider';

const CountriesWrapper = styled.div`
  height: ${props => props.height};
  overflow-y: scroll;
  flex: 1;
`;

const InputWrap = styled.div`
  padding: 5px 25px 5px 15px;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  padding: 10px 0px 10px 10px;
  width: 100%;
`;

const Country = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const match = ({ needle, haystack }) =>
  needle.length === 0 || haystack.toLowerCase().indexOf(needle.toLowerCase()) > -1;

const Countries = ({ height }) => {
  const { countries, isFavorite, toggleFavorite } = useContext(MapContext);
  const [search, setSearch] = useState('');

  const countriesDom = countries
    .filter(c => match({ needle: search, haystack: c.name }))
    .map(c => (
      <Country key={c.country_code}>
        <input
          key={c.country_code}
          checked={isFavorite(c.country_code)}
          type="checkbox"
          onChange={() => {
            toggleFavorite(c.country_code);
          }}
        />{' '}
        {c.name}
      </Country>
    ));

  return (
    <CountriesWrapper height={height}>
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

export default Countries;
