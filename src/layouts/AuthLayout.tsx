/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function AuthLayout() {
  const loc = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    loc.pathname === '/' && navigate('/login');
  }, []);
  return (
    <main className='authPage'>
      <Outlet />
    </main>
  );
}
