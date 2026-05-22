import { styled } from 'styled-components';

export const Container = styled.div`

`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
export const SearchBlock = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const Input = styled.input`
  height: 28px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid rgba(44, 62, 80, 0.15);
  background: #f4f7fa;
  font-size: 14px;
  &:focus {
    border-color: #2c3e50;
    box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.15);
    background: #ffffff;
  }
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


export const Card = styled.div`
  background-color: #ffe4e1;
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;
  `;

export const OrderWrapper = styled.div`
display: flex;
flex-direction: column;
`;

export const CheckListWrapper = styled.div`
display: flex;
flex-direction: column;
`;

export const Table = styled.table`
width: 100%;
font-size: 14px;
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
  width: 140px;
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

export const PaymentDiv = styled.div`
display: flex;
gap: 40px;
`;

export const EditBtnBlock = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
justify-content: flex-start;
`;

export const Textarea = styled.textarea`
margin-top: 40px;
width: 100%;
height: 60px;
overflow-y: auto;

`;

export const TaskText = styled.span`
  transition: color 0.2s ease;
  font-size: 12px;
  color: ${({ completed }) =>
    completed ? "#9ca3af" : "#000"};

  text-decoration: ${({ completed }) =>
    completed ? "line-through" : "none"};
`;

  export const Modal = styled.div`
    background-color: #faebd7;
  `;