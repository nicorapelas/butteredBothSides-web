import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders main heading and pitch form', () => {
  render(<App />);
  expect(screen.getByText(/Still think we might be interested/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Motivate us/i)).toBeInTheDocument();
});
