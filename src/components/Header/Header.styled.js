import { styled } from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";


export const Nav = styled.nav`
  position: fixed;
  width: 100%;
  background: #2c3e50;
  height: 74px;
  padding: 1rem;
  box-sizing: border-box;
  border-bottom: 2px solid white;
`;

export const NavLink = styled(RouterNavLink)`
  padding: 10px 18px;
  width: 84px;
  text-align: center;
  font-size: 14px;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  text-decoration: none;
  color: #e6edf3;
  transition: all 0.15s ease;

  background: transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  &.active {
    background: linear-gradient(
      180deg,
      #34495e 0%,
rgb(29, 41, 52) 100%
    );

    box-shadow:
      inset 0 2px 4px rgba(0,0,0,0.4),
      0 2px 0 rgba(255,255,255,0.05);

    color: #ffffff;
  }
`;

export const Wrapper = styled.div`
display: flex;
gap: 12px;
justify-content: space-between;
align-items: center;
`;

export const Container = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
align-items: center;
`;
export const Button = styled.button`
  padding: 10px 18px;
  font-size: 14px;
  width: 120px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.15);
  background: linear-gradient(
    180deg,
    #3b536b 0%,
    #2c3e50 100%
  );
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.08),
    0 2px 6px rgba(0,0,0,0.25);

  &:hover {
    background: linear-gradient(
      180deg,
      #45627e 0%,
      #324a5f 100%
    );
    transform: translateY(1px);
  }

  &:active {
    transform: translateY(2px);
    box-shadow:
      inset 0 2px 4px rgba(0,0,0,0.4);
  }
`;