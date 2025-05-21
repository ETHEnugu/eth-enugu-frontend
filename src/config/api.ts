/* eslint-disable */
import apiClient from "./_config";

export const fetchData = async (endpoint: string): Promise<any> => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const postData = async (endpoint: string, data: any): Promise<any> => {
  const response = await apiClient.post(endpoint, data);
  return response.data;
};

export const updateData = async (endpoint: string, data: any): Promise<any> => {
  const response = await apiClient.put(endpoint, data);
  return response.data;
};

export const patchData = async (endpoint: string, data: any): Promise<any> => {
  const response = await apiClient.patch(endpoint, data);
  return response.data;
};

export const deleteData = async (endpoint: string): Promise<any> => {
  const { data } = await apiClient.delete(endpoint);
  return data;
};
