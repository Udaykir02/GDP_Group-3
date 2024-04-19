export interface IOrders {
  orderId: number;
  opcoCustomerId: number;
  status: string;
  orderSentDateTime: string;
  confNumber: number;
  orderTypeId: string;
  customerPurchaseOrder: string;
  memo?: string;
  netValue: number;
  totalLineItemCount: number;
  totalItemCount: number;
  totalCartonCount: number;
  totalLabelCount: number;
  totalBookingItemCount: number;
  newItemCount: number;
  isDeleted?: boolean;
  orderDeletedDatetime: string;
  orderReason: string;
  createdDeviceId: string;
  updatedDeviceId: string;
  createdBy: string;
  createdDateTime: string;
  lastUpdatedPlatform: string;
  updatedBy: string;
  updatedDateTime: string;
  inDeviceUpdatedDateTime: string;
  orderItemDetails?: IOrderDetails[];
}

export interface IOrderDetails {
  orderId: number;
  opcoCustomerId: number;
  orderItemId: number;
  shelfTag: boolean;
  opcoMaterialId: number;
  orderedQty: number;
  uom: string;
  cost: number;
  discount: number;
  retailPrice: number;
  materialModifiedDateTime: string;
  bookingFlag: boolean;
  returnable: string;
  orderReason: string;
  sourceOfEntry: string;
  erpRefOfOrder: string;
  createdDeviceId: string;
  updatedDeviceId: string;
  createdBy: string;
  createdDateTime: string;
  updatedBy: string;
  updatedDateTime: string;
}
