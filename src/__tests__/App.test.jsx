// src/__tests__/App.test.jsx
import React from 'react';
import App from '../App';
import { customRender } from '../test-utils.jsx';

test('يظهر نص "Hello"', () => {
  const fakeUser = { name: 'عبد الرحمن' };

  customRender(<App />, {
    providerProps: {
      value: {
        user: fakeUser,
        logout: vi.fn(),
      },
    },
  });

  expect(screen.getByText(/hello/i)).toBeInTheDocument();
});
