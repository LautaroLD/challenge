/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function AppLayout() {
  const loc = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    loc.pathname === '/' && navigate('/home');
  }, []);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
