import { AuthContext } from 'components/Auth/Auth';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import { Button, Content, Field, Label, Input, EyeButton } from './Login.styled';
import { OpenEye } from 'img/OpenEye';
import { CloseEye } from 'img/CloseEye';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, token } = useContext(AuthContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (token) navigate('/manufacturers');
    }, [token, navigate]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('https://suppliers-backend-nphe.onrender.com/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
          login(data.token);
          navigate('/manufacturers');
        } else {
          setError(data.message || 'Ошибка входа');
        }
      } catch (err) {
        setError('Ошибка сети');
      }
    };
  
    return (
      <Content>
        <h2>Привіт, ти хто 😉?</h2>
        <form onSubmit={handleSubmit}>
          <Field >
            <Label>Логін</Label>
            <Input 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
          </Field>
          <Field>
            <Label>Пароль</Label>
              <EyeButton
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ?  <CloseEye/> : <OpenEye/>}
              </EyeButton>
              <Input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
          </Field>
          {error && <p style={{ color: 'red' }}>Шось ти наплутала, спробуй ще раз</p>}
          <Button type="submit">Увійти</Button>
        </form>
      </Content>
    );
  };
  