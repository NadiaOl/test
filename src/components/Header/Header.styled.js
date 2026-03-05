import { styled } from "styled-components";
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
background: #2c3e50; 
padding: 1.5rem; 
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
border: none;
padding: 8px;
border-radius: 3px;
background-color:#2c3e50;
color: white;
cursor: pointer;
box-shadow: 0px 2px 0 1px #1a252f;
transition: all 0.15s ease;
  &:hover {
    transform: translateY(3px);
    box-shadow: 0 3px 0 #1a252f;
  }
  &:active{
    transform: translateY(6px);
    box-shadow: 0 0 0 #1a252f;
  }
`;