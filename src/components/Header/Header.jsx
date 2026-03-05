import React, { useContext } from 'react';
import { AuthContext } from "components/Auth/Auth";
import { Nav, NavLink, Wrapper, Container, Button } from './Header.styled';

export const Header = () => {
    const { token, logout } = useContext(AuthContext);
    return (
      <Nav>
      {token && (
        <Container>
          <Wrapper>
            <NavLink to="/checklist">Чек-ліст</NavLink>
            <NavLink to="/manufacturers">Виробники</NavLink>
          </Wrapper>
          <Button onClick={logout}>Вихід</Button>
        </Container>
      )}
    </Nav>
    );
  };