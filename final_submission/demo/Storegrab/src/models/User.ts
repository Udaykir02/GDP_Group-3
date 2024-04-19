export interface ILocation {
  customerId: string;
  name: string;
  address1: string;
  address2: string;
  state: string;
  city: string;
  zipcode: string;
  country: string;
  customerTypeId: number;
  emailId: string;
  opcoCustomerId: number;
  opcoId: number;
  commitmentTime: string;
  deliveryDays: string;
  orderDay: string;
  cutOffTime: string;
  shelfTagWithRtl: boolean;
  salesRepId: string;
  salesRepFirstName: string;
  salesRepLastName: string;
  opcoName: string;
  currencyCode?: string;
  telephone?: string;
  parentCustomerId?: string;
  timeOpen?: string;
  timeClose?: string;
  timeZone?: string;
}

export default interface IUser {
  userTypeId: number;
  customerAssigned: string;
  userId: string;
  emailId: string;
  firstName: string;
  lastName: string;
  isMultiStore?: boolean;
  lastSelectedLocation?: number;
  isAuthenticated?: boolean;
  locations: ILocation[];
  accessToken: string;
  password: string;
  userTypeCode: string;
}
