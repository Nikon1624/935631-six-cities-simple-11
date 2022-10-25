import { Outlet } from 'react-router-dom';
import { LoginHeader } from '../../components/login-header/login-header';

export const LoginLayout = () => (
  <div className="page page--gray page--login">
    <LoginHeader />
    <main className="page__main page__main--login">
      <Outlet />
    </main>
  </div>
);
