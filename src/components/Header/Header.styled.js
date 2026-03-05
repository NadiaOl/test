import { styled } from "styled-components";
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
background: #2c3e50; 
padding: 1rem; 
display: flex; 
gap: 20px; 
color: white; 
`;

export const NavLink = styled(Link)`
color: white; 
text-decoration: none; 
&:hover { 
    text-decoration: underline; 
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
width: 100px;
  position: relative;
  padding: 12px 20px;
  color: #e6edf3;
  letter-spacing: 0.5px;

  background: linear-gradient(
    180deg,
    #34495e 0%,
    #2c3e50 50%,
    #233140 100%
  );

  border: 1px solid #1a252f;
  border-radius: 4px;
  cursor: pointer;

  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);

  box-shadow:
    inset 0 2px 4px rgba(255,255,255,0.15),
    inset 0 -4px 8px rgba(0,0,0,0.4),
    0 4px 0 #16202a;

  transition: all 0.15s ease;

  /* верхний блик */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 8%;
    width: 84%;
    height: 45%;
    background: linear-gradient(
      to bottom,
      rgba(255,255,255,0.25),
      rgba(255,255,255,0.05),
      transparent
    );
    border-radius: 3px 3px 0 0;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(2px);
    box-shadow:
      inset 0 2px 4px rgba(255,255,255,0.15),
      inset 0 -4px 8px rgba(0,0,0,0.4),
      0 2px 0 #16202a;
  }

  &:active {
    transform: translateY(4px);
    box-shadow:
      inset 0 3px 6px rgba(0,0,0,0.5),
      0 0 0 #16202a;
  }

  &:focus {
    outline: none;
  }
`;