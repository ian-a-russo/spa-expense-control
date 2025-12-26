export type ResponsePaginate<Entity> = {
  data: Entity[];
  meta: {
    currentPage: number;
    itensPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export interface IBaseHttp<Entity> {
  list(params?: any): Promise<ResponsePaginate<Entity>>;
  find(id?: number, params?: any): Promise<Entity>;
  find(id?: number, params?: any): Promise<Entity>;
  create(entity: Partial<Entity>): Promise<Entity>;
  createFormData(formData: FormData): Promise<Entity>;
  update(id: number | string, data: Partial<Entity>): Promise<Entity>;
  partialUpdate(id: number | string, data: Partial<Entity>): Promise<Entity>;
  updateFormData(id: number | string, formData: FormData): Promise<Entity>;
  delete(id: number | string): Promise<void>;
}
