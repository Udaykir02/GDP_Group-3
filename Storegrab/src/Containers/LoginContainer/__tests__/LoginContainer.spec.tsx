import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginContainer from '../LoginContainer';
import { Provider } from 'react-redux';

import { legacy_createStore as createStore} from 'redux'
jest.mock('axios');

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));
describe('LoginContainer', () => {
    let store:any;

    beforeEach(() => {
      store = createStore(() => ({
        modalVisible: false,
        vendor: {
          radius: 5,
          vendorTypes: [],
        },
        location: {
          defaultLocation: {},
          region: {
            latitude: 18.44082130082575,
            latitudeDelta: 0.019175200768195566,
            longitude: 79.1182143241167,
            longitudeDelta: 0.01609325408935547,
          },
          chosenLocation: {},
          chosenRegion: {
            latitude: 18.44082130082575,
            latitudeDelta: 0.019175200768195566,
            longitude: 79.1182143241167,
            longitudeDelta: 0.01609325408935547,
          },
          chosenAddress: {},
          isModalVisible: false
        },
        auth: {
          user: null,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQxNDkxZjViZTJkNjI0MWM3Nzc0YTkiLCJpYXQiOjE3MTYxNDM2MTgsImV4cCI6MTcxNjI4NzYxOH0.MC5LB_FhT-rmbCEOLTjzFpY4TWOB8EfzjOlVuzAaezY',
          error: null,
          loading: false,
          resetToken: null,
          vendorAdmin: false
        }
  
      }));
    });
    it('renders without crashing', () => {
        const { container } = render(<Provider store={store}><LoginContainer /></Provider>);

        expect(container).toBeTruthy();
    });

it('displays an error message when username is empty', async () => {
        const { getByTestId, findByText } = render(<Provider store={store}><LoginContainer /></Provider>);
        const loginButton = getByTestId('login-button');});

  it('displays an error message when password is empty', async () => {
    const { getByTestId, findByText } = render(<Provider store={store}><LoginContainer /></Provider>);
    const loginButton = getByTestId('login-button');

    fireEvent.press(loginButton);

    const errorMessage = await findByText(/password cannot be empty/i);
    expect(errorMessage).toBeDefined();
  });

it('calls the login function with the correct username and password', () => {
    const mockLogin = jest.fn();
    const { getByLabelText, getByTestId } = render(<Provider store={store}><LoginContainer /></Provider>);
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByTestId('login-button');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'testpass');
    fireEvent.press(loginButton);

    expect(mockLogin).toHaveBeenCalledWith('testuser', 'testpass');
});});