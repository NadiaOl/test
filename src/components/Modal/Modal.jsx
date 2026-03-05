import { Button, Container, Content, Button2 } from "./Modal.styled";

export const Modal = ({ title, children, onSave, onClose }) => (
    <Container>
      <Content>
        <h3>{title}</h3>
        {children}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <Button onClick={onSave}>Зберегти</Button>
          <Button2 onClick={onClose}>Закрити</Button2>
        </div>
      </Content>
    </Container>
  );
  
