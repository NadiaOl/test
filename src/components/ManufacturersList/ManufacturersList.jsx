import React, { useState, useEffect, useContext } from 'react';
import { Button, ButtonsGroup, Card, Td, Th, Th1, Th2, Wrapper, Wrapper2, Table, BBlock, Container, ProductContainer, CardDiv, Field, Label, Input } from './ManufacturersList.styled';
import { Delete } from 'img/Delete';
import { Edit } from 'img/Edit';
import { Contacts } from 'img/Contact';
import { AuthContext } from 'components/Auth/Auth';
import { Modal } from 'components/Modal/Modal';

export const ManufacturersList = () => {
  const { token } = useContext(AuthContext);
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Состояния для модалок
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isContactListModalOpen, setIsContactListModalOpen] = useState(false); // Список контактов
  const [isContactEditModalOpen, setIsContactEditModalOpen] = useState(false); // Форма создания/редактирования
  
  const [currentManId, setCurrentManId] = useState(null);

  const initialState = { id: null, name: '', buyer: '', currancy: '', products: [] };
  const [editingItem, setEditingItem] = useState(initialState);

  const productInitialState = { id: null, name: '', billPrice: 0, totalPrice: 0, foc: 0, plan: 0, fact: 0 };
  const [editingProduct, setEditingProduct] = useState(productInitialState);

  const contactInitialState = { id: null, fullName: '', position: '', phone: '', email: '' };
  const [editingContact, setEditingContact] = useState(contactInitialState);

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

  // --- Логика Производителей ---
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

  // --- Логика Продуктов ---
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

  // --- Логика Контактов ---
  const openContactList = (manufacturer) => {
    setCurrentManId(manufacturer._id);
    setIsContactListModalOpen(true);
  };

  const openContactEditModal = (contact = null) => {
    if (contact) {
      setEditingContact({ id: contact._id, fullName: contact.fullName, position: contact.position, phone: contact.phone, email: contact.email });
    } else {
      setEditingContact(contactInitialState);
    }
    setIsContactEditModalOpen(true);
  };

  const handleContactSave = async () => {
    if (!editingContact.fullName) {
      alert("ПІБ контакту є обов'язковим");
      return;
    }
    const isEdit = !!editingContact.id;
    const url = isEdit 
      ? `https://suppliers-backend-nphe.onrender.com/api/manufacturers/${currentManId}/contacts/${editingContact.id}`
      : `https://suppliers-backend-nphe.onrender.com/api/manufacturers/${currentManId}/contacts`;
    
    try {
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(editingContact)
      });

      if (!response.ok) {
        throw new Error("Не вдалося зберегти контакт");
      }

      const savedContact = await response.json();
      
      setManufacturers(prev => prev.map(m => {
        if (m._id === currentManId) {
          if (isEdit) {
            const updatedContacts = (m.contacts || []).map(c => c._id === editingContact.id ? savedContact : c);
            return { ...m, contacts: updatedContacts };
          } else {
            return { ...m, contacts: [...(m.contacts || []), savedContact] };
          }
        }
        return m;
      }));
      setIsContactEditModalOpen(false);
    } catch (err) { alert(err.message); }
  };

  const deleteContact = async (manId, contact) => {
    if (window.confirm(`Видалити ${contact.fullName}?`)) {
      try {
        await fetch(`https://suppliers-backend-nphe.onrender.com/api/manufacturers/${manId}/contacts/${contact._id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setManufacturers(prev => prev.map(m => {
          if (m._id === manId) {
            return { ...m, contacts: (m.contacts || []).filter(c => c._id !== contact._id) };
          }
          return m;
        }));
      } catch (err) { console.error(err); }
    }
  };

  if (loading) return <p>Завантаження...</p>;

  const currentManufacturer = manufacturers.find(m => m._id === currentManId);

  return (
    <Container>

      {manufacturers.map((m) => (
        <Card key={m._id}>
          <ProductContainer>
            <CardDiv>
              <Wrapper>
                <div>
                  <h3>{m.name}</h3>
                  <h5>{m.buyer}, {m.currancy}</h5>
                </div>
                <BBlock>
                  <ButtonsGroup onClick={() => openContactList(m)}><Contacts/></ButtonsGroup>
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
                        <ButtonsGroup style={{marginLeft: '4px'}} onClick={() => deleteProduct(m._id, p)}><Delete/></ButtonsGroup>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardDiv>
            <Wrapper2>
              <Button onClick={() => openProductModal(m._id)}>Додати продукт</Button>
            </Wrapper2>
          </ProductContainer>
        </Card>
      ))}
              
      <div>
        <Button style={{width: '400px', height: '40px'}}onClick={() => openEditModal()}>Додати виробника</Button>
      </div>

      {/*  МОДАЛКА: Список контактов  */}
      {isContactListModalOpen && currentManufacturer && (
        <Modal 
          title={`Контакти ${currentManufacturer.name}`} 
          onClose={() => setIsContactListModalOpen(false)}
          onSave={() => setIsContactListModalOpen(false)}
        >
          <Table cellSpacing="0" cellPadding="0" border="0">
            <thead>
              <tr>
                <Th1 style={{width: '150px'}}>ПІБ</Th1>
                <Th style={{width: '75px'}}>Посада</Th>
                <Th>Телефон</Th>
                <Th>email</Th>
                <Th>Дії</Th>
              </tr>
            </thead>
            <tbody>
              {currentManufacturer.contacts?.map((c) => (
                <tr key={c._id}>
                  <Th2>{c.fullName}</Th2>
                  <Td>{c.position}</Td>
                  <Td>{c.phone}</Td>
                  <Td>{c.email}</Td>
                  <Td>
                    <ButtonsGroup style={{marginRight: '4px'}} onClick={() => openContactEditModal(c)}><Edit/></ButtonsGroup>
                    <ButtonsGroup style={{marginLeft: '4px'}} onClick={() => deleteContact(currentManId, c)}><Delete/></ButtonsGroup>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Wrapper2>
            <Button onClick={() => openContactEditModal()}>Додати контакт</Button>
          </Wrapper2>
        </Modal>
      )}

      {/*  МОДАЛКА: Создание/Редактирование контакта  */}
      {isContactEditModalOpen && (
        <Modal 
          title={editingContact.id ? "Редагувати контакт" : "Додати контакт"} 
          onSave={handleContactSave} 
          onClose={() => setIsContactEditModalOpen(false)}
        >
          <Field>
            <Label htmlFor="fullName">ПІБ контакту</Label>
            <Input 
              id="fullName"
              value={editingContact.fullName} 
              onChange={e => setEditingContact({...editingContact, fullName: e.target.value})}   
            />
          </Field>
          <Field>
            <Label htmlFor="pos">Посада</Label>
            <Input 
              id="pos"
              value={editingContact.position} 
              onChange={e => setEditingContact({...editingContact, position: e.target.value})}   
            />
          </Field>
          <Field>
            <Label htmlFor="tel">Телефон</Label>
            <Input 
              id="tel"
              value={editingContact.phone} 
              onChange={e => setEditingContact({...editingContact, phone: e.target.value})}   
            />
          </Field>
          <Field>
            <Label htmlFor="mail">Email</Label>
            <Input 
              id="mail"
              value={editingContact.email} 
              onChange={e => setEditingContact({...editingContact, email: e.target.value})}   
            />
          </Field>
        </Modal>
      )}

      {/*  МОДАЛКА: Создание/Редактирование производителя  */}
      {isModalOpen && (
        <Modal title={editingItem.id ? 'Редагувати' : 'Додати'} onSave={handleSave} onClose={() => setIsModalOpen(false)}>
          <Field>
            <Label htmlFor="name">Назва</Label>
            <Input id="name" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
          </Field>
          <Field>
            <Label htmlFor="buyer">Покупець</Label>
            <Input id="buyer" value={editingItem.buyer} onChange={e => setEditingItem({...editingItem, buyer: e.target.value})} />
          </Field>
          <Field>
            <Label htmlFor="curr">Валюта</Label>
            <Input id="curr" value={editingItem.currancy} onChange={e => setEditingItem({...editingItem, currancy: e.target.value})} />
          </Field>
        </Modal>
      )}

      {/*  МОДАЛКА: Создание/Редактирование продукта */}
      {isProductModalOpen && (
        <Modal title="Продукт" onSave={handleProductSave} onClose={() => setIsProductModalOpen(false)}>
          <Field>
            <Label>Назва продукту</Label>
            <Input value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
          </Field>
          <Field>
            <Label>PT</Label>
            <Input type="number" value={editingProduct.totalPrice} onChange={e => setEditingProduct({...editingProduct, totalPrice: e.target.value})} />
          </Field>
          <Field>
            <Label>PB</Label>
            <Input type="number" value={editingProduct.billPrice} onChange={e => setEditingProduct({...editingProduct, billPrice: e.target.value})} />
          </Field>
          <Field>
            <Label>FOC</Label>
            <Input type="number" value={editingProduct.foc} onChange={e => setEditingProduct({...editingProduct, foc: e.target.value})} />
          </Field>
          <Field>
            <Label>План</Label>
            <Input type="number" value={editingProduct.plan} onChange={e => setEditingProduct({...editingProduct, plan: e.target.value})} />
          </Field>
          <Field>
            <Label>Факт</Label>
            <Input type="number" value={editingProduct.fact} onChange={e => setEditingProduct({...editingProduct, fact: e.target.value})} />
          </Field>
        </Modal>
      )}
    </Container>
  );
};

