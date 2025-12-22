interface ClientResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}