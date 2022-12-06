import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router/history-router';
import { LoginHeader } from './login-header';

describe('Component: login-header', () => {
  it('should be render correctly', () => {
    const history = createMemoryHistory();
    
    render(
      <HistoryRouter history={history}>
        <LoginHeader />
      </HistoryRouter>
    );
    
    const logo = screen.getByTestId('logo_img');
    
    expect(logo).toBeInTheDocument();
  });
});
