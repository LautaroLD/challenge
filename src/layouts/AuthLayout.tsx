/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <main className='authPage'>
      <Outlet />
    </main>
  );
}
