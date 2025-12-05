import type { ResponsePaginate } from "@/services/http/i-base.http";
import { http } from "./http";
export abstract class AbstractHttp<IEntity extends object> {
  protected abstract uri: string;
  protected http = http;

  async list(params?: any): Promise<ResponsePaginate<IEntity>> {
    const response = await http.get(this.uri, {
      params,
    });

    return response.data;
  }

  async find(id?: string | number, params?: any): Promise<IEntity> {
    const response = await http.get(this.uri + `/${id}`, {
      params,
    });

    return response.data;
  }
  async create(entity: Partial<IEntity>) {
    const response = await http.post(this.uri, entity);
    return response.data;
  }

  async update(id: number, data: Partial<IEntity>): Promise<IEntity> {
    const response = await http.put(this.uri + `/${id}`, data);
    return response.data;
  }

  async partialUpdate(id: number, data: Partial<IEntity>): Promise<IEntity> {
    const response = await http.patch(this.uri + `/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await http.delete(this.uri + `/${id}`);
  }

  async createFormData(formData: FormData) {
    const response = await this.http.post(this.uri, formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
      },
    });

    return response.data;
  }

  async updateFormData(id: number, formData: FormData) {
    const response = await this.http.put(`${this.uri}/${id}`, formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
      },
    });

    return response.data;
  }
}
