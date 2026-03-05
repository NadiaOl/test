import React, { useState, useEffect, useContext } from 'react';
import { Button, ButtonsGroup, Card, Td, Th, Th1, Th2, Wrapper, Wrapper2, Table, BBlock, Container, CardDiv, Field, Label, Input } from './ManufacturersList.styled';
import { Delete } from 'img/Delete';
import { Edit } from 'img/Edit';
import { AuthContext } from 'components/Auth/Auth';
import { Modal } from 'components/Modal/Modal';


export const ManufacturersList = () => {
  const { token } = useContext(AuthContext);
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentManId, setCurrentManId] = useState(null);

  const initialState = { id: null, name: '', buyer: '', currancy: '', products: [] };
  const [editingItem, setEditingItem] = useState(initialState);

  const productInitialState = { id: null, name: '', billPrice: 0, totalPrice: 0, foc: 0, plan: 0, fact: 0 };
  const [editingProduct, setEditingProduct] = useState(productInitialState);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://suppliers-backend-nphe.onrender.com/api/manufacturers', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setManufacturers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token]);

  const openEditModal = (manufacturer = null) => {
    if (manufacturer) {
      setEditingItem({ id: manufacturer._id, name: manufacturer.name, buyer: manufacturer.buyer, currancy: manufacturer.currancy });
    } else {
      setEditingItem(initialState);
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const isEdit = !!editingItem.id;
    const url = isEdit 
      ? `https://suppliers-backend-nphe.onrender.com/api/manufacturers/${editingItem.id}` 
      : `https://suppliers-backend-nphe.onrender.com/api/manufacturers`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingItem.name, buyer: editingItem.buyer, currancy: editingItem.currancy || "USD" })
      });
      const savedData = await response.json();
      if (isEdit) {
        setManufacturers(prev => prev.map(m => m._id === editingItem.id ? { ...m, ...editingItem } : m));
      } else {
        setManufacturers(prev => [...prev, savedData]);
      }
      setIsModalOpen(false);
    } catch (err) { alert(err.message); }
  };

  const deleteManufactor = async (m) => {
    if (window.confirm(`Видалити ${m.name}?`)) {
      await fetch(`https://suppliers-backend-nphe.onrender.com/api/manufacturers/${m._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setManufacturers(prev => prev.filter(item => item._id !== m._id));
    }
  };

  const openProductModal = (manufacturerId, product = null) => {
    setCurrentManId(manufacturerId);
    if (product) {
      setEditingProduct({ id: product._id, name: product.name, billPrice: product.billPrice, totalPrice: product.totalPrice, foc: product.foc, plan: product.plan, fact: product.fact });
    } else {
      setEditingProduct(productInitialState);
    }
    setIsProductModalOpen(true);
  };

  const handleProductSave = async () => {
    const isEdit = !!editingProduct.id;
    const url = isEdit 
      ? `https://suppliers-backend-nphe.onrender.com/api/manufacturers/${currentManId}/products/${editingProduct.id}`
      : `https://suppliers-backend-nphe.onrender.com/api/manufacturers/${currentManId}/products`;
    
    try {
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });
      const updatedMan = await response.json();
      setManufacturers(prev => prev.map(m => m._id === currentManId ? updatedMan : m));
      setIsProductModalOpen(false);
    } catch (err) { alert(err.message); }
  };

  const deleteProduct = async (manId, product) => {
    if (window.confirm(`Видалити ${product.name}?`)) {
      const res = await fetch(`https://suppliers-backend-nphe.onrender.com/api/manufacturers/${manId}/products/${product._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const updatedData = await res.json();
      setManufacturers(prev => prev.map(m => m._id === manId ? { ...m, products: updatedData.products || updatedData } : m));
    }
  };

  if (loading) return <p>Завантаження...</p>;

  return (
    <Container>
      {manufacturers.map((m) => (
        <Card key={m._id}>
          <CardDiv>
          <Wrapper>
            <div>
              <h3>{m.name}</h3>
              <h5>{m.buyer}, {m.currancy}</h5>
            </div>
            <BBlock>
              <ButtonsGroup onClick={() => openEditModal(m)}><Edit/></ButtonsGroup>
              <ButtonsGroup onClick={() => deleteManufactor(m)}><Delete/></ButtonsGroup>
            </BBlock>
          </Wrapper>
          <Table cellSpacing="0" cellPadding="0" border="0">
            <thead>
              <tr>
                <Th1>Позиція</Th1>
                  <Th>PT</Th>
                  <Th>PB</Th>
                  <Th>FOC</Th>
                  <Th>План</Th>
                  <Th>Факт</Th>
                  <Th>%%</Th><Th>Дії</Th>
              </tr>
            </thead>
            <tbody>
              {m.products?.map((p) => (
                <tr key={p._id}>
                  <Th2>{p.name}</Th2>
                  <Td>{p.totalPrice}</Td>
                  <Td>{p.billPrice}</Td>
                  <Td>{p.foc}</Td>
                  <Td>{p.plan?.toLocaleString()}</Td>
                  <Td>{p.fact?.toLocaleString()}</Td>
                  <Td>{p.fact && p.plan ? Math.ceil((p.fact*100)/p.plan) : "-"}</Td>
                  <Td>
                      <ButtonsGroup style={{marginRight: '4px'}} onClick={() => openProductModal(m._id, p)}><Edit/></ButtonsGroup>
                      <ButtonsGroup style={{marginLeft: '4px'}}onClick={() => deleteProduct(m._id, p)}><Delete/></ButtonsGroup>

                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
          </CardDiv>
          <Wrapper2>

          <Button onClick={() => openProductModal(m._id)}>Додати продукт</Button>
          </Wrapper2>
        </Card>
      ))}
      <Wrapper2>
        <Button onClick={() => openEditModal()}>Додати виробника</Button>
      </Wrapper2>


      {isModalOpen && <Modal title={editingItem.id ? 'Редагувати' : 'Додати'} onSave={handleSave} onClose={() => setIsModalOpen(false)}>
        <Field>
          <Label htmlFor="Постачальник">Назва</Label>
          <Input 
            id="Постачальник"
            placeholder="Назва" 
            value={editingItem.name} 
            onChange={e => setEditingItem({...editingItem, name: e.target.value})}  
          />
        </Field>
        <Field>
          <Label htmlFor="Покупець">Покупець</Label>
          <Input 
            id="Покупець"
            placeholder="Покупець" 
            value={editingItem.buyer} 
            onChange={e => setEditingItem({...editingItem, buyer: e.target.value})} 
          />
        </Field>
        <Field>
          <Label htmlFor="Валюта">Валюта</Label>
          <Input 
            id="Валюта"
            placeholder="Валюта" 
            value={editingItem.currancy} 
            onChange={e => setEditingItem({...editingItem, currancy: e.target.value})} 
          />
        </Field>
        </Modal>}

      {isProductModalOpen && 
      
        <Modal title="Продукт" onSave={handleProductSave} onClose={() => setIsProductModalOpen(false)}>
          <Field>
            <Label htmlFor="Продукт">Назва продукту</Label>
            <Input 
              id="Продукт"
              value={editingProduct.name} 
              onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}  
            />
          </Field>
          <Field>
            <Label htmlFor="PT">PT</Label>
            <Input 
              id="PT"
              type="number" 
              value={editingProduct.totalPrice} 
              onChange={e => setEditingProduct({...editingProduct, totalPrice: e.target.value})}  
            />
          </Field>
          <Field>
            <Label htmlFor="PB">PB</Label>
            <Input 
              id="PB"
              type="number" 
              value={editingProduct.billPrice} 
              onChange={e => setEditingProduct({...editingProduct, billPrice: e.target.value})}  
            />
          </Field>
          <Field>
            <Label htmlFor="FOC">FOC</Label>
            <Input 
              id="FOC"
              type="number" 
              value={editingProduct.foc} 
              onChange={e => setEditingProduct({...editingProduct, foc: e.target.value})}  
            />
          </Field>
          <Field>
            <Label htmlFor="План">План</Label>
            <Input 
              id="План" 
              type="number" 
              value={editingProduct.plan} 
              onChange={e => setEditingProduct({...editingProduct, plan: e.target.value})}  
            />
          </Field>
          <Field>
            <Label htmlFor="Факт">Факт</Label>
            <Input 
              id="Факт" 
              type="number" 
              value={editingProduct.fact} 
              onChange={e => setEditingProduct({...editingProduct, fact: e.target.value})}  
            />
          </Field>
        </Modal>
        }
    </Container>
  );
};