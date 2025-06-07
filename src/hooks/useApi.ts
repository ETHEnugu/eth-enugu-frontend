/* eslint-disable */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchData,
  postData,
  postMultipartData,
  updateData,
  updateMultipartData,
  patchMultipartData,
} from "@/config/api";
import { handleGenericError } from "@/lib/errorHandler";

export const usePostMutation = <T>(
  endpoint: string,
  queryKey: string | readonly unknown[]
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newData: T) => {
      try {
        const response = await postData(endpoint, newData);
        return response;
      } catch (error) {
        throw error || new Error("An unexpected error occurred");
      }
    },
    onSuccess: (data) => {
      if (queryKey) {
        const normalizedQueryKey = Array.isArray(queryKey)
          ? queryKey
          : [queryKey];
        queryClient.invalidateQueries({ queryKey: normalizedQueryKey });
        const successMessage =
          data?.response || data?.message || "Operation successful";
        toast.success(successMessage);
      }
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });

  return mutation;
};

export const usePostMultipartMutation = (
  endpoint: string,
  queryKey: string | readonly unknown[]
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const response = await postMultipartData(endpoint, formData);
        return response;
      } catch (error) {
        throw error || new Error("An unexpected error occurred");
      }
    },
    onSuccess: (data) => {
      if (queryKey) {
        const normalizedQueryKey = Array.isArray(queryKey)
          ? queryKey
          : [queryKey];
        queryClient.invalidateQueries({ queryKey: normalizedQueryKey });
        const successMessage =
          data?.response || data?.message || "Upload successful";
        toast.success(successMessage);
      }
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });

  return mutation;
};

export const useGetQuery = (url: string, key: string) => {
  return useQuery({
    queryKey: [key, url],
    queryFn: async () => {
      const response = await fetchData(url);
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
};

export const useUpdateMutation = <T>(
  endpoint: string,
  queryKey: string | readonly unknown[]
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updatedData: T) => {
      try {
        const response = await updateData(endpoint, updatedData);
        return response;
      } catch (error) {
        throw error || new Error("An unexpected error occurred");
      }
    },
    onSuccess: (data) => {
      if (queryKey) {
        const normalizedQueryKey = Array.isArray(queryKey)
          ? queryKey
          : [queryKey];
        queryClient.invalidateQueries({ queryKey: normalizedQueryKey });
        const successMessage =
          data?.response || data?.message || "Update successful";
        toast.success(successMessage);
        return data;
      }
      console.log("Successful");
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error);
      toast.error(errorMessage);
      console.log("Errored");
      throw new Error(errorMessage);
    },
  });
  return mutation;
};

export const useUpdateMultipartMutation = (
  endpoint: string,
  queryKey: string | readonly unknown[]
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const response = await updateMultipartData(endpoint, formData);
        return response;
      } catch (error) {
        throw error || new Error("An unexpected error occurred");
      }
    },
    onSuccess: (data) => {
      if (queryKey) {
        const normalizedQueryKey = Array.isArray(queryKey)
          ? queryKey
          : [queryKey];
        queryClient.invalidateQueries({ queryKey: normalizedQueryKey });
        const successMessage =
          data?.response || data?.message || "Update successful";
        toast.success(successMessage);
        return data;
      }
      console.log("Successful");
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error);
      toast.error(errorMessage);
      console.log("Errored");
      throw new Error(errorMessage);
    },
  });
  return mutation;
};

export const usePatchMultipartMutation = (
  endpoint: string,
  queryKey: string | readonly unknown[]
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const response = await patchMultipartData(endpoint, formData);
        return response;
      } catch (error) {
        throw error || new Error("An unexpected error occurred");
      }
    },
    onSuccess: (data) => {
      if (queryKey) {
        const normalizedQueryKey = Array.isArray(queryKey)
          ? queryKey
          : [queryKey];
        queryClient.invalidateQueries({ queryKey: normalizedQueryKey });
        const successMessage =
          data?.response || data?.message || "Patch successful";
        toast.success(successMessage);
        return data;
      }
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });
  return mutation;
};

// Utility function to create FormData from an object
export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item instanceof File || item instanceof Blob) {
          formData.append(`${key}[${index}]`, item);
        } else {
          formData.append(`${key}[${index}]`, String(item));
        }
      });
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  return formData;
};
