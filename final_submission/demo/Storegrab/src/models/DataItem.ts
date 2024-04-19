export default interface IDataItem {
  createdBy: string;
  createdDate: Date;
  updatedBy: string;
  updatedDate: Date;
}

export interface IResponse<T> {
  error: string;
  payload: T;
  status: number | undefined;
}
