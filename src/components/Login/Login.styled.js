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

export const Content = styled.div`

width: 420px;
margin: 0 auto;
  max-width: 90%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 
    0 20px 60px rgba(44, 62, 80, 0.15),
    0 8px 20px rgba(44, 62, 80, 0.08);
`;
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 6px;
position: relative;
`;

export const Input = styled.input`
  height: 38px;
  padding: 0 12px;
  /* width: 100%; */
  padding-right: 36px;
  border-radius: 8px;
  border: 1px solid rgba(44, 62, 80, 0.15);
  background: #f4f7fa;
  font-size: 14px;
  outline: none;
  transition: all 0.15s ease;

  &:focus {
    border-color: #2c3e50;
    box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.15);
    background: #ffffff;
  }
`;


export const EyeButton = styled.button`
  position: absolute;
  bottom: 90px;
  right: 45px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #2c3e50;
  opacity: 0.6;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;