import HomeDataService from '../services/HomeDataService';
import LoginDataService from '../services/LoginDataService';
import ReferenceDataService from '../services/ReferenceDataService';
import IUser, { ILocation } from './User';
import OrderDataService from '../services/OrderDataService';

export default interface IGlobalContext {
  referenceData: ReferenceDataService;
  homeDataService: HomeDataService;
  loginDataService: LoginDataService;
  user: IUser;
  setUser: any;
  notificationCount: number;
  setNotificationCount: any;
  activeCartCount: number;
  setActiveCartCount: any;
  orderDataService: OrderDataService;
  activeLocation: ILocation;
  setActiveLocation: any;
  isAllLocationSelected: boolean;
  setIsAllLocationSelected: any;
  hideAllLocation: boolean;
  setHideAllLocation: any;
}
