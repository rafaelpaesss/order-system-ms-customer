import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    // Configuração do Axios
    this.axiosInstance = axios.create({
      baseURL,  // URL base da API
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Método para fazer requisições GET
  async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching data.');
      }
      throw new Error('An unknown error occurred.');
    }
  }

  // Método para fazer requisições POST
  async post<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(endpoint, data);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'An error occurred while posting data.');
      }
      throw new Error('An unknown error occurred.');
    }
  }
}
