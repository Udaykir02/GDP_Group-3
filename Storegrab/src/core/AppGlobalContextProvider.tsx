import React, { useEffect, useMemo, useState } from 'react';

import GlobalContext from './GlobalContext';
import IGlobalContext from '../../models/GlobalContext';
import IUser, { ILocation } from '../../models/User';

import ReferenceDataService from '../../services/ReferenceDataService';
import HomeDataService from '../../services/HomeDataService';
import LoginDataService from '../../services/LoginDataService';
import OrderDataService from '../../services/OrderDataService';

interface Props {
  children: React.ReactNode;
}

const intitialUserData: IUser = {
  userTypeId: 0,
  customerAssigned: '',
  userId: '',
  emailId: '',
  firstName: '',
  lastName: '',
  isMultiStore: false,
  isAuthenticated: false,
  locations: [],
  accessToken: '',
  password: '',
  userTypeCode: 'CUSTOMER',
  lastSelectedLocation: 0
};

const GlobalDataProvider: React.FC<Props> = ({ children }) => {
  const [referenceData] = useState(new ReferenceDataService());
  const [homeDataService] = useState(new HomeDataService());
  const [loginDataService] = useState(new LoginDataService());
  const [orderDataService] = useState(new OrderDataService());
  const [user, setUser] = useState<IUser>(intitialUserData);
  const [notificationCount, setNotificationCount] = useState(null);
  const [activeCartCount, setActiveCartCount] = useState(null);
  const [activeLocation, setActiveLocation] = useState<ILocation>();
  const [isAllLocationSelected, setIsAllLocationSelected] = useState(false);
  const [hideAllLocation, setHideAllLocation] = useState(false);

  const ctxData = useMemo<IGlobalContext>(
    () => ({
      referenceData,
      homeDataService,
      user,
      setUser,
      notificationCount,
      setNotificationCount,
      activeCartCount,
      setActiveCartCount,
      loginDataService,
      orderDataService,
      activeLocation,
      setActiveLocation,
      isAllLocationSelected,
      setIsAllLocationSelected,
      hideAllLocation,
      setHideAllLocation
    }),
    [
      referenceData,
      user,
      setUser,
      notificationCount,
      setNotificationCount,
      activeCartCount,
      setActiveCartCount,
      homeDataService,
      loginDataService,
      orderDataService,
      activeLocation,
      setActiveLocation,
      isAllLocationSelected,
      setIsAllLocationSelected,
      hideAllLocation,
      setHideAllLocation
    ]
  );

  const init = () => {
    const getData = async () => {
      // get initial data if needed
    };

    getData();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(init, []);

  return <GlobalContext.Provider value={ctxData}>{children}</GlobalContext.Provider>;
};

export default GlobalDataProvider;
