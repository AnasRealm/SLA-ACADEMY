import { useQuery } from "@tanstack/react-query";
import { fetchPopularCourses } from "../services/mostPopularService";

export const useMostPopular = () => {
  return useQuery({
    queryKey: ["popular-courses"],
    queryFn: fetchPopularCourses,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};