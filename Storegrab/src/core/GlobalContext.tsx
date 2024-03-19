import { createContext } from 'react';
import IGlobalContext from '../../models/GlobalContext';

const GlobalContext = createContext<IGlobalContext>({
  referenceData: null,
  user: null,
  setUser: () => null,
  notificationCount: null,
  setNotificationCount: () => null,
  activeCartCount: null,
  setActiveCartCount: () => null,
  homeDataService: null,
  loginDataService: null,
  orderDataService: null,
  activeLocation: null,
  setActiveLocation: () => null,
  isAllLocationSelected: null,
  setIsAllLocationSelected: () => null,
  hideAllLocation: null,
  setHideAllLocation: () => null
});

export default GlobalContext;
