import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../services/categoriesService";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // الاحتفاظ بالبيانات لمدة 5 دقائق
    retry: 1,
  });
};