import styled from 'styled-components';
import MapProvider from './MapProvider';
import CountryMap from './CountryMap';
import Countries from './Countries';
import Header from './Header';

const HEIGHT = `${window.innerHeight - 300}px`;

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 700px;
  margin: 100px auto;
`;

const List = styled.div`
  display: flex;
`;

const Map = () => {
  return (
    <MapProvider>
      <Wrapper>
        <Header />
        <List>
          <Countries height={HEIGHT} />
          <CountryMap height={HEIGHT} />
        </List>
      </Wrapper>
    </MapProvider>
  );
};

export default Map;
