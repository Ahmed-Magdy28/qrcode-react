import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Vite + React heading', () => {
   render(<App />);
   const element = screen.getByText(/Vite \+ React/i);
   expect(element).toBeInTheDocument();
});
