import React, { useState, useEffect } from 'react';
import { Button, Button2, Card, Container, Td, Th, Th1, Th2, Wrapper, Wrapper2, Table } from './ManufacturersList.styled';

const ManufacturersManager = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Модальное окно и текущий редактируемый объект
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({ id: null, name: '', buyer: '', currancy: '', products:[{
    name: '', foc: 0, totalPrice: 0, billPrice: 0, plan: 0, fact: 0}]});

  // 1. Инициализация: получаем токен и список
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const authRes = await fetch('https://suppliers-backend-nphe.onrender.com/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: '', password: '' })
          // TODO: add username password
        });
        const authData = await authRes.json();
        setToken(authData.token);

        const dataRes = await fetch('https://suppliers-backend-nphe.onrender.com/api/manufacturers', {
          headers: { 'Authorization': `Bearer ${authData.token}` }
        });
        const data = await dataRes.json();
        setManufacturers(data);
      } catch (err) {
        console.error("Ошибка инициализации:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // 2. ФУНКЦИЯ ПОДХВАТА ДАННЫХ: вызывается при клике на кнопку в строке
  const openEditModal = (manufacturer) => {
    setEditingItem({ 
      // ...manufacturer,
      id: manufacturer._id, 
      name: manufacturer.name,
      buyer: manufacturer.buyer, 
      currancy: manufacturer.currancy
    });
    setIsModalOpen(true);
    console.log('editingItem:>> ', editingItem);
  };

  const handleSave = async () => {
    if (!editingItem.id) return;

    try {
      const response = await fetch(`https://suppliers-backend-nphe.onrender.com/api/manufacturers/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name: editingItem.name,
          buyer: editingItem.buyer, 
          currancy: editingItem.currancy
        })
      });

      if (response.ok) {
        setManufacturers(prev => prev.map(m => 
          m._id === editingItem.id ? { ...m, name: editingItem.name, buyer: editingItem.buyer, currancy: editingItem.currancy } : m
        ));
        
        setIsModalOpen(false);
        console.log("Интерфейс обновлен локально");
      } else {
        alert("Ошибка при сохранении на сервере");
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка сети');
    }
  };
  if (loading) return <p>Загрузка данных...</p>;

  return (

      <Container>
        {manufacturers.map((m) => (
        <Card>
          <Wrapper key={m._id}>
            <div>
              <h3>{m.name}</h3>
              <h5>{m.buyer}, {m.currancy}</h5>
            </div>
                {/* ПРИ КЛИКЕ: передаем текущий объект итерации 'm' */}
            <div>
              <Button onClick={() => openEditModal(m)}>Змінити</Button>
              <Button>Видалити</Button>
            </div>
          </Wrapper>
          <Table>
            <thead>
              <tr>
                <Th1 scope="col" style={{"backgroundColor": "lightgray", "vertical-align": "middle"}}>Позиція</Th1>
                <Th scope="col"style={{"backgroundColor": "lightgray"}}>Ціна,<br/>total</Th>
                <Th scope="col"style={{"backgroundColor": "lightgray"}}>Ціна,<br/>bill</Th>
                <Th scope="col"style={{"backgroundColor": "lightgray","vertical-align": "middle"}}>FOC</Th>
                <Th scope="col" style={{ "backgroundColor": "lightgray" }}>План<br/>2026</Th>
                <Th scope="col"style={{"backgroundColor": "lightgray"}}>Факт<br/>2026</Th>
                <Th scope="col"style={{"backgroundColor": "lightgray", "vertical-align": "middle"}}>%%</Th>
                <Th scope="col"style={{"backgroundColor": "lightgray", "vertical-align": "middle"}}>Змінити</Th>
              </tr>
            </thead>
            {m.products?.map((product) => (
              <tbody key={product._id}>
              <tr>
                <Th2 scope="row">{product.name}</Th2>
                <Td>{product.totalPrice}</Td>
                <Td>{product.billPrice}</Td>
                <Td>{product.foc}</Td>
                <Td>{product.plan ? product.plan.toLocaleString('ru-RU') : '-'}</Td>
                <Td>{product.fact ? product.fact.toLocaleString('ru-RU') : '-'}</Td>
                <Td>{product.fact && product.plan ? Math.ceil((product.fact*100)/product.plan) : "-"}</Td>
                <Td>
                  <Button2 onClick={() => openEditModal({})}>Змінити</Button2>
                  <Button2 onClick={() => {}}>Видалити</Button2>
                </Td>
              </tr>
            </tbody>))}
          </Table>
          <Wrapper2>
            <Button onClick={() => openEditModal(m)}>Додати продукт</Button>
          </Wrapper2>
        </Card>))}

      {/* Модальное окно */}
      {isModalOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Внесення змін: {editingItem.name}</h3>
            <label>Назва виробника:</label>
            <input 
              style={styles.input}
              type="text" 
              value={editingItem.name} 
              onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
            />
            <label>Назва покупця:</label>
            <input 
              style={styles.input}
              type="text" 
              value={editingItem.buyer} 
              onChange={(e) => setEditingItem({...editingItem, buyer: e.target.value})}
            />
            <label>Валюта контракту:</label>
            <input 
              style={styles.input}
              type="text" 
              value={editingItem.currancy} 
              onChange={(e) => setEditingItem({...editingItem, currancy: e.target.value})}
            />            
            <div style={styles.actions}>
              <button onClick={() => setIsModalOpen(false)}>Отмена</button>
              <button onClick={handleSave} style={styles.saveBtn}>Сохранить</button>
            </div>
          </div>
        </div>
      )}
      </Container>

  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '300px' },
  input: { width: '100%', padding: '8px', marginTop: '10px', marginBottom: '20px', boxSizing: 'border-box' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: '10px' },
  saveBtn: { backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }
};

export default ManufacturersManager;