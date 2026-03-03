import React, { useState, useEffect } from 'react';
import { Button, Button2, Card, Container, Td, Th, Th1, Th2, Wrapper, Wrapper2, Table, BBlock } from './ManufacturersList.styled';
import { Delete } from 'img/Delete';
import { Edit } from 'img/Edit';
// import { Add } from 'img/Add';

const ManufacturersManager = () => {
  
  const [manufacturers, setManufacturers] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Начальное состояние для нового объекта
  const initialState = { id: null, name: '', buyer: '', currancy: '', products: [] };
  const [editingItem, setEditingItem] = useState(initialState);

  // Стейт для модалки продукту
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentManId, setCurrentManId] = useState(null); // ID виробника, до якого належить продукт

  const productInitialState = { id: null, name: '', billPrice: 0, totalPrice: 0, foc: 0, plan: 0, fact: 0 };
  const [editingProduct, setEditingProduct] = useState(productInitialState);


  // 1. Инициализация
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const authRes = await fetch('https://suppliers-backend-nphe.onrender.com/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'Nadia', password: 'GjkVfh+1' })
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

  // 2. ПРОИЗВОДИТЕЛЬ
  // 2.1. Открытие модалки (для редактирования или создания)
  const openEditModal = (manufacturer = null) => {
    if (manufacturer) {
      setEditingItem({ 
        id: manufacturer._id, 
        name: manufacturer.name,
        buyer: manufacturer.buyer, 
        currancy: manufacturer.currancy
      });
    } else {
      setEditingItem(initialState);
    }
    setIsModalOpen(true);
  };

  // 2.2. УДАЛЕНИЕ ПРОИЗВОДИТЕЛЯ (с подтверждением)
  const deleteManufactor = async (m) => {
    const confirmed = window.confirm(`Ви впевнені, що хочете видалити виробника ${m.name}?`);
    
    if (confirmed) {
      try {
        const response = await fetch(`https://suppliers-backend-nphe.onrender.com/api/manufacturers/${m._id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          setManufacturers(prev => prev.filter(item => item._id !== m._id));
          console.log("Видалено успішно");
        } else {
          alert("Помилка при видаленні на сервері");
        }
      } catch (err) {
        console.error(err);
        alert('Помилка мережі');
      }
    }
  };

  // 2.3. ДОБАВЛЕНИЕ ПРОИЗВОДИТЕЛЯ (PUT или POST)

  const handleSave = async () => {
    const isEdit = !!editingItem.id;
    const url = isEdit 
      ? `https://suppliers-backend-nphe.onrender.com/api/manufacturers/${editingItem.id}`
      : `https://suppliers-backend-nphe.onrender.com/api/manufacturers`;
    
    const method = isEdit ? 'PUT' : 'POST';
  
    // ВАЖНО: Ключи должны совпадать со схемой бэкенда (name, buyer, currancy)
    const payload = {
      name: editingItem.name.trim(),
      buyer: editingItem.buyer.trim(),
      currancy: editingItem.currancy.trim() || "USD" // Добавляем дефолт, если пусто
    };
  
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      // Обработка ошибок в формате JSON или текста
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `Ошибка сервера: ${response.status}`;
        throw new Error(errorMessage);
      }
  
      const savedData = await response.json();
  
      if (isEdit) {
        setManufacturers(prev => prev.map(m => 
          m._id === editingItem.id ? { ...m, ...payload } : m
        ));
      } else {
        // Сервер вернет новый объект с _id и пустым массивом products
        setManufacturers(prev => [...prev, savedData]);
      }
      
      setIsModalOpen(false);
      setEditingItem(initialState);
      
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
      alert(err.message);
    }
  };

  // 3. ПРОДУКТ
  // 3.1. Открытие модалки (для редактирования или создания)
const openProductModal = (manufacturerId, product = null) => {
  setCurrentManId(manufacturerId);
  if (product) {
    setEditingProduct({
      id: product._id,
      name: product.name,
      billPrice: product.billPrice,
      totalPrice: product.totalPrice,
      foc: product.foc,
      plan: product.plan
    });
  } else {
    setEditingProduct(productInitialState);
  }
  setIsProductModalOpen(true);
};

  // 2.2. ДОБАВЛЕНИЕ ПРОДУКТА
  const handleProductSave = async () => {
    const isEdit = !!editingProduct.id;
    // Убедитесь, что currentManId и editingProduct.id не пустые
    const url = isEdit 
      ? `https://suppliers-backend-nphe.onrender.com/api/manufacturers/${currentManId}/products/${editingProduct.id}`
      : `https://suppliers-backend-nphe.onrender.com/api/manufacturers/${currentManId}/products`;
    
    const method = isEdit ? 'PUT' : 'POST';
  
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: editingProduct.name,
          billPrice: Number(editingProduct.billPrice) || 0,
          totalPrice: Number(editingProduct.totalPrice) || 0,
          foc: Number(editingProduct.foc) || 0,
          plan: Number(editingProduct.plan) || 0,
          fact: Number(editingProduct.fact) || 0
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Помилка при збереженні продукту');
      }
  
      const updatedManufacturer = await response.json();
  
      // Бэкенд возвращает обновленного производителя целиком
      setManufacturers(prev => prev.map(m => 
        m._id === currentManId ? updatedManufacturer : m
      ));
  
      setIsProductModalOpen(false);
      setEditingProduct(productInitialState);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // 2.2. УДАЛЕНИЕ ПРОДУКТА
const deleteProduct = async (manId, product) => {
  if (window.confirm(`Ви впевнені, що хочете видалити продукт ${product.name}?`)) {
    try {
      const response = await fetch(`https://suppliers-backend-nphe.onrender.com/api/manufacturers/${manId}/products/${product._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Помилка при видаленні');

      const updatedData = await response.json();

      setManufacturers(prev => prev.map(m => {
        if (m._id === manId) {
          // Оновлюємо тільки масив продуктів, зберігаючи ім'я виробника
          return { ...m, products: updatedData.products || updatedData };
        }
        return m;
      }));
    } catch (err) {
      alert(err.message);
    }
  }
};

  if (loading) return <p>Загрузка данных...</p>;

  return (
    <Container>
      {manufacturers.map((m) => (
        <Card key={m._id}>
          <Wrapper>
            <div>
              <h3>{m.name}</h3>
              <h5>{m.buyer}, {m.currancy}</h5>
            </div>
            <BBlock>
              <Button2 onClick={() => openEditModal(m)} type="button"><Edit/></Button2>
              <Button2 onClick={() => deleteManufactor(m)} type="button"><Delete/></Button2>
            </BBlock>
          </Wrapper>
          <Table>
            <thead>
              <tr>
                <Th1 scope="col" style={{"backgroundColor": "lightgray", "verticalAlign": "middle", "width": "230px"}}>Позиція</Th1>
                <Th scope="col" style={{"backgroundColor": "lightgray"}}>PT</Th>
                <Th scope="col" style={{"backgroundColor": "lightgray"}}>PB</Th>
                <Th scope="col" style={{"backgroundColor": "lightgray","verticalAlign": "middle"}}>FOC</Th>
                <Th scope="col" style={{ "backgroundColor": "lightgray" }}>План<br/>2026</Th>
                <Th scope="col" style={{"backgroundColor": "lightgray"}}>Факт<br/>2026</Th>
                <Th scope="col" style={{"backgroundColor": "lightgray", "verticalAlign": "middle"}}>%%</Th>
                <Th scope="col" style={{"backgroundColor": "lightgray", "verticalAlign": "middle"}}>Змінити</Th>
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
                  <Td style={{ "display": "flex", "gap": "8px" , "justifyContent": "center", "padding": "6px"}}>
                    {/* Здесь пока заглушки, так как логика продуктов требует отдельных функций */}
                    <Button2 onClick={() => openProductModal(m._id, product)} type="button"><Edit/></Button2>
                    <Button2 onClick={() => deleteProduct(m._id, product)} type="button"><Delete/></Button2>
                  </Td>
                </tr>
              </tbody>
            ))}
          </Table>
            <Button onClick={() => openProductModal(m._id)} type="button">Додати продукт</Button>
        </Card>
      ))}
      
      <Wrapper2>
         {/* Вызов без аргументов откроет пустую форму */}
         <Button onClick={() => openEditModal()}>Додати виробника</Button>
      </Wrapper2>

      {/* Модальное окно */}
      {isModalOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>{editingItem.id ? 'Внесення змін' : 'Додати нового виробника'}</h3>
            
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
              <button onClick={() => setIsModalOpen(false)}>Скасувати</button>
              <button onClick={handleSave} style={styles.saveBtn}>Зберегти</button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно продукта */}

      {isProductModalOpen && (
  <div style={styles.overlay}>
    <div style={styles.modal}>
      <h3>{editingProduct.id ? 'Редагувати продукт' : 'Додати продукт'}</h3>
      <label>Назва продукту:</label>
      <input style={styles.input} type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
      
      <label>PT:</label>
      <input style={styles.input} type="number" value={editingProduct.totalPrice ?? 0} onChange={(e) => setEditingProduct({...editingProduct, totalPrice: e.target.value})} />
      
      <label>PB:</label>
      <input style={styles.input} type="number" value={editingProduct.billPrice ?? 0} onChange={(e) => setEditingProduct({...editingProduct, billPrice: e.target.value})} />
      
      <div style={{display: 'flex', gap: '10px'}}>
        <div>
           <label>FOC:</label>
           <input style={styles.input} type="number" value={editingProduct.foc ?? 0} onChange={(e) => setEditingProduct({...editingProduct, foc: e.target.value})} />
        </div>
        <div>
           <label>План:</label>
           <input style={styles.input} type="number" value={editingProduct.plan ?? 0} onChange={(e) => setEditingProduct({...editingProduct, plan: e.target.value})} />
        </div>
      </div>

      <div style={styles.actions}>
        <button onClick={() => setIsProductModalOpen(false)}>Скасувати</button>
        <button onClick={handleProductSave} style={styles.saveBtn}>Зберегти</button>
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