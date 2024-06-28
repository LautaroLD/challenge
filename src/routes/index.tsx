import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AuthLayout from '../layouts/AuthLayout';
import AppLayout from '../layouts/AppLayout';

export default function Navigation() {
  const { isAuth } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        {!isAuth && (
          <Route path='/' element={<AuthLayout />}>
            <Route index path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        )}
        {isAuth && (
          <Route path='/' element={<AppLayout />}>
            <Route path='home' element={<Home />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}
