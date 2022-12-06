import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-router/history-router';
import { NotFound } from './not-found';

describe('Component: NotFound', () => {
  it('shold be render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFound />
      </HistoryRouter>
    );

    const headerElement = screen.getByText('Page Not Found 404');
    const linkElement = screen.getByText('Go to main');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
