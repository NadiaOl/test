import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
  `;

export const Card = styled.div`
    flex: 0 1 auto;
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    padding: 16px;
    width: 670px;
    border: 1px solid rgba(0, 0, 0, 0.175);
    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 0px 7px rgb(55, 79, 101);
`;
export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;
  

export const CardDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
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
`;

export const Input = styled.input`
  height: 38px;
  padding: 0 12px;
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

export const BBlock = styled.div`
display: flex;
gap: 8px;
padding: 8px 18px;
`;

export const Button = styled.button`
width: 100%;
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

export const ButtonsGroup = styled.button`
width: 30px;
  height: 30px;
  background-color: #2c3e50;
  border: none;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;

  box-shadow:1px 1px 2px #1a252f;;
  transition: all 0.15s ease;

  &:hover {
    transform: translateY(2px);
    box-shadow: 0 2px 0 #1a252f;
  }

  &:active {
    transform: translateY(4px);
    box-shadow: 0 0 0 #1a252f;
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: #ffffff;
    stroke-width: 2.2;
    transition: opacity 0.15s ease;
  }

  &:hover svg {
    opacity: 0.85;
  }
`;

export const Wrapper = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
align-items: center;
`;

export const Wrapper2 = styled.div`
display: flex;
justify-content: flex-end;
/* width: 100%; */
align-items: center;
`;

export const Table = styled.table`
width: 100%;
`;

export const Th = styled.th `
  border: 1px solid #2c3e50;
  padding: 8px;
  text-align: center;  
  background-color: #2c3e50;
  color: white;
  height: 30px;
    `;

export const Th1 = styled.th `
  border: 1px solid #2c3e50;
  padding: 8px;
  text-align: center;
  background-color: #2c3e50;
  color: white;
  width: 200px;
  height: 30px;
  `;

export const Th2 = styled.th `
  border: 1px solid #cdcdd0;
  padding: 8px;
  text-align: left;
  font-size: 14px;
  `;

export const Td = styled.td `
  border: 1px solid #cdcdd0;
  padding: 4px;
  text-align: center;
  font-size: 14px;
`;
