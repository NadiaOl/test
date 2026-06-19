import { styled } from 'styled-components';

export const Container = styled.div`

`;
// Поиск
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

// Карточка заказа
export const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px 7px rgb(55, 79, 101);
`;
export const Form= styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  gap: 20px;
  align-items: baseline;
`;
export const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
`;
export const Input = styled.input`
  height: 38px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid rgba(44, 62, 80, 0.15);
  background: #f4f7fa;
  font-size: 12px;
  outline: none;
  transition: all 0.15s ease;

  &:focus {
    border-color: #2c3e50;
    box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.15);
    background: #ffffff;
  }
`;
    // Заказ
export const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 50%;
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
export const Coment = styled.div`
  padding: 20px;
  min-height: 60px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px 7px rgb(55, 79, 101);

`;

    // Чеклист
export const CheckListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const TaskText = styled.span`
  transition: color 0.2s ease;
  font-size: 12px;
  color: ${({ completed }) => completed ? "#9ca3af" : "#000"};
  text-decoration: ${({ completed }) => completed ? "line-through" : "none"};
`;
export const Checkbox = styled.input`
accent-color: #2c3e50;
margin-right: "10px"
`

// Модалки
export const Field = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export const Field2 = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const Product = styled.h3`
margin: 2px;
align-self: end;
font-size: 14px;
color: #2c3e50;
`;
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
`;

    // Модалка "добавить заказ"
    // Модалка "добавить продукт"
    // Модалка "добавить комментарий"