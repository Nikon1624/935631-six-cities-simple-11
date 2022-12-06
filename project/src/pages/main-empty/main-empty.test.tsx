import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../../components/history-router/history-router';
import { MainEmpty } from './main-empty';

describe('Component: main-empty', () => {
  it('should be render correctly', () => {
    const history = createMemoryHistory();
    
    render(
      <HistoryRouter history={history}>
        <MainEmpty />
      </HistoryRouter>
    );
    
    const noPlacestext = screen.getByText('No places to stay available');
    const notFoundDescription = screen.getByText('We could not find any property available at the moment in Dusseldorf');
    
    expect(noPlacestext).toBeInTheDocument();
    expect(notFoundDescription).toBeInTheDocument();
  });
});
