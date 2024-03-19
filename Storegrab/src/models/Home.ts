export default interface IHome {
  notificationCount: number;
  activeCartCount: number;
  orderDashboard: IOrderDashboard;
  ads: IResources;
  merchandiseProgram: IResources;
  foodServiceProgram: IResources;
}

export interface IOrderDashboard {
  unSubmittedOrderCount: number;
  cutOffOrderCount: number;
  deliveryCount: number;
  deliveryDate: string;
  creditRequestCount: number;
  preBookItemCount: number;
}

export interface IResources {
  id: string;
  name: string;
  typeCode: string;
  downloadUrl: string;
  resourceItems: IResourceItem[];
}

export interface IResourceItem {
  name: string;
  imageType: string;
  imageUrl: string;
}
export interface IResourceImage {
  img: string;
}
export interface IOrderDashboardTile {
  type: string;
  icon: string;
  title: string;
  count: string;
  status: string;
  flag: boolean;
}

export interface IResourceResponse {
  id: string;
  name: string;
  typeId: number;
  validFromDate: string;
  validToDate: string;
  IsDeleted: boolean;
  downloadUrl: string;
  createdBy: string;
  createdDateTime: string;
  updatedBy: string;
  updatedDateTime: string;
  inDeviceUpdatedDateTime: string;
  resourceDetail: IResourceDetailsResponse[];
}

export interface IResourceDetailsResponse {
  resourceId: string;
  lineNumber: number;
  itemName: string;
  imageType: string;
  validFromDate: string;
  validToDate: string;
  lineType: string;
  promo: string;
  shipDate: string;
  daysToLookBackForGAP: number;
  autoCheckForGAP: boolean;
  vendorName: string;
  IsDeleted: boolean;
  createdBy: string;
  createdDateTime: string;
  updatedBy: string;
  updatedDateTime: string;
}
