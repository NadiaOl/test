import React, { useState, useEffect } from 'react';

const ManufacturersList = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Авторизация (логика получения токена)
      const authResponse = await fetch('https://suppliers-backend-nphe.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'Nadia', // Замени на реальные данные
          password: 'GjkVfh+1'
        })
      });

      if (!authResponse.ok) throw new Error('Ошибка авторизации');
      
      const authData = await authResponse.json();
      const token = authData.token; // Предполагаем, что токен лежит в ключе token

      // 2. Запрос за списком производителей с использованием токена
      const dataResponse = await fetch('https://suppliers-backend-nphe.onrender.com/api/manufacturers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Отправляем токен в заголовке
          'Content-Type': 'application/json'
        }
      });

      if (!dataResponse.ok) throw new Error('Не удалось загрузить данные');

      const result = await dataResponse.json();
      setManufacturers(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Загрузка данных (Render может просыпаться до 1 минуты)...</p>;
  if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;

  return (
    <div>
      <h2>Список производителей</h2>
      {manufacturers.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Страна</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Список пуст</p>
      )}
    </div>
  );
};

export default ManufacturersList;