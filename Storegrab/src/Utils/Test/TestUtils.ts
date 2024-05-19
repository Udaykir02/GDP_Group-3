import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types'


export const mockUseIsFocused = jest.fn().mockReturnValue(true)
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useIsFocused: mockUseIsFocused,
}))

export const createMockNavigation = () => {
  type ScreenNavigationProp = NativeStackNavigationProp<any>

  const mockNavigation: ScreenNavigationProp = {
    navigate: jest.fn(),
    setOptions: jest.fn(),
    reset: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    canGoBack: jest.fn(),
    // @ts-ignore
    dangerouslyGetParent: jest.fn(),
    dangerouslyGetState: jest.fn(),
    dispatch: jest.fn(),
    emit: jest.fn(),
    getParent: jest.fn(),
    getState: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    setParams: jest.fn(),
    jumpTo: jest.fn(),
    push: jest.fn(),
  }
  return mockNavigation
}

export const createMockNavigationWithScreen = (
  screen: keyof any,
) => {

  const mockNavigation: any = {
    navigate: jest.fn(),
    push: jest.fn(),
    setOptions: jest.fn(),
    reset: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    canGoBack: jest.fn(),
    // @ts-ignore
    dangerouslyGetParent: jest.fn(),
    dangerouslyGetState: jest.fn(),
    dispatch: jest.fn(),
    emit: jest.fn(),
    getParent: jest.fn(),
    getState: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    setParams: jest.fn(),
    jumpTo: jest.fn(),
  }
  return mockNavigation
}

export const createMockRoute = (
  screen: keyof any,
  params?: any,
) => {
  return {
    key: 'mock-route-key',
    name: screen,
    params: params,
  }
}

export const mockReactHookFormUseController = {
  field: {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    value: undefined,
    name: '',
    ref: jest.fn(),
  },
  fieldState: {
    invalid: false,
    isTouched: false,
    isDirty: false,
    error: undefined,
  },
}
export const mockHandleSubmit = jest.fn()
export const mockReactHookFormUseForm = {
  getValues: jest.fn(),
  getFieldState: jest.fn(),
  setValue: jest.fn(),
  resetField: jest.fn(),
  handleSubmit: mockHandleSubmit,
  formState: {
    errors: {},
  },
  control: {
    register: jest.fn(),
    handleSubmit: mockHandleSubmit,
    unregister: jest.fn(),
    getFieldState: jest.fn(),
    setError: jest.fn(),
  } as any,
}
