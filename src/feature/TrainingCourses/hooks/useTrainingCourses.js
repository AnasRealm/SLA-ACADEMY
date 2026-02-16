import { useQuery } from "@tanstack/react-query";
import { fetchTrainingCourses } from "../services/trainingCoursesService";

export const useTrainingCourses = () => {
  return useQuery({
    queryKey: ["training-courses"],
    queryFn: fetchTrainingCourses,
    staleTime: 5 * 60 * 1000, // 5 دقائق
    retry: 1,
  });
};