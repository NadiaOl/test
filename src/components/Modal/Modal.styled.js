import { styled } from "styled-components";

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
export const Button2 = styled.button`
width: 100px;
border: none;
padding: 8px;
border-radius: 3px;
background-color: white;
color: #2c3e50;
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


export const Container = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(44, 62, 80, 0.25);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Content = styled.div`

width: 420px;
  max-width: 90%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 
    0 20px 60px rgba(44, 62, 80, 0.15),
    0 8px 20px rgba(44, 62, 80, 0.08);
`;


