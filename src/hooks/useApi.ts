import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchData, postData, updateData } from "@/config/api";
import { handleGenericError } from "@/lib/errorHandler";

export const usePostMutation = <T>(
  endpoint: string,
  queryKey: string | readonly unknown[]
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // Mutation function that calls postData
    mutationFn: async (newData: T) => {
      try {
        const response = await postData(endpoint, newData);
        return response;
      } catch (error) {
        throw error || new Error("An unexpected error occurred");
      }
    },
    // On success, invalidate queries and show success message
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
    // On error, handle the error and show error message
    onError: (error) => {
      const errorMessage = handleGenericError(error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    },
  });

  return mutation;
};

export const useGetQuery = (
  url: string,
  key: string,
  params?: Record<string, number | string | boolean>
) => {
  return useQuery({
    queryKey: [key, url, params],
    queryFn: async () => {
      try {
        // Ensure params are properly typed as numbers where required
        const sanitizedParams = params
          ? Object.fromEntries(
              Object.entries(params).map(([k, v]) => [
                k,
                typeof v === "number" ? v : String(v),
              ])
            )
          : undefined;
        const response = await fetchData(url, sanitizedParams);
        return response.data;
      } catch (error) {
        const errorMessage = handleGenericError(error);
        throw new Error(errorMessage);
      }
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
