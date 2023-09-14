export interface IDataMapUKE<T> {
  p_id: string | number;
  data: T[];
}
export type DataMapUKEType<T> = Map<string, T>;
