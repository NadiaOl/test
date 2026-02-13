import { styled } from "styled-components";

  export const Container = styled.div`
     display: flex;
    gap: 30px;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    padding: 20px
  `;
  
  export const Card = styled.div`
  flex: 1 1 auto;
  display: flex;
gap: 8px;
padding: 16px;
width: 600px;
border: 1px solid rgba(0, 0, 0, 0.175);
border-radius: 10px;
flex-direction: column;
justify-content: space-between;
`;

export const Button = styled.button`
width: 100px;
border: 1px solid #05067a;
padding: 8px;
border-radius: 3px;
background-color:#0d6efd;
color: white;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color:#0b5ed7;
  }
`;

export const Button2 = styled.button`

padding: 4px;
border-radius: 3px;
background-color:#3b394f;
color: white;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color:#0b5ed7;
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
width: 100%;
align-items: center;
`;

export const Table = styled.table`
width: 100%;
`;

export const Th = styled.th `
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
    `
export const Th1 = styled.th `
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: lightgray;


  `
export const Th2 = styled.th `
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  `
export const Td = styled.td `
  border: 1px solid #ddd;
  /* padding: 8px; */
  text-align: center;
`
