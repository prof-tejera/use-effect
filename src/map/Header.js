import { useContext } from 'react';
import styled from 'styled-components';
import { MapContext } from './MapProvider';

const Clear = styled.div`
  background: red;
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
`;

const Title = styled.div`
  display: flex;
  font-weight: bold;
  border-bottom: 1px solid #f3f3f3;
  padding: 15px 20px;
  margin: 0px;
  height: 40px;
`;

const Header = () => {
  const { favoriteCount, clearFavorites } = useContext(MapContext);

  return (
    <Title>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>My Favorite Places ({favoriteCount})</div>
      {favoriteCount > 0 && <Clear onClick={clearFavorites}>Clear</Clear>}
    </Title>
  );
};

export default Header;
