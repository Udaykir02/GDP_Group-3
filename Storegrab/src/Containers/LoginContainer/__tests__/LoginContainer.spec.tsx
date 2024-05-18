import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginContainer from '../LoginContainer';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';

describe('LoginContainer', () => {
  it('renders without crashing', () => {
    const { container } = render(<LoginContainer />);
    expect(container).toBeTruthy();
  });

it('displays an error message when username is empty', async () => {
    const { getByTestId, findByText } = render(<LoginContainer />);
    const loginButton = getByTestId('login-button');

    fireEvent.click(loginButton);

    const errorMessage = await findByText(/username cannot be empty/i);
    expect(errorMessage).toBeInTheDocument();
});

  it('displays an error message when password is empty', async () => {
    const { getByTestId, findByText } = render(<LoginContainer />);
    const loginButton = getByTestId('login-button');

    fireEvent.click(loginButton);

    const errorMessage = await findByText(/password cannot be empty/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('calls the login function with the correct username and password', () => {
    const mockLogin = jest.fn();
    const { getByLabelText, getByTestId } = render(<LoginContainer login={mockLogin} />);
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByTestId('login-button');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith('testuser', 'testpass');
  });
});