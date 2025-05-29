// src/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/" />; // redireciona para o login
  }

  return <Outlet />; // libera acesso às rotas internas
}
