import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router/history-router';
import { Loader } from './loader';

describe('Component: login-header', () => {
  it('should be render correctly', () => {
    const history = createMemoryHistory();
    
    render(
      <HistoryRouter history={history}>
        <Loader />
      </HistoryRouter>
    );
    
    const loadingText = screen.getByText('Loading...');
    
    expect(loadingText).toBeInTheDocument();
  });
});
