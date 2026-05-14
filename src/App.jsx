import {  BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "components/Layout/Layout";
import { ManufacturersList } from "components/ManufacturersList/ManufacturersList";
import { AuthProvider } from 'components/Auth/Auth';
import { PrivateRoute } from 'components/Routes/Routes';
import { Login } from 'components/Login/Login';
import { CheckList } from 'components/CheckList/Checlist';

export const  App = () =>{
  const basename = window.location.pathname.startsWith('/test') ? '/test' : '';
    return (
      <AuthProvider>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/login" replace />} />
              <Route path="login" element={<Login />} />
              <Route path="manufacturers" element={<PrivateRoute><ManufacturersList/></PrivateRoute>} />
              <Route path="checklist" element={<PrivateRoute><CheckList /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );
  }
