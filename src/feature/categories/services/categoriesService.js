import apiClient from "../../../lib/api/apiClient";

// جلب الفئات (Categories)
export const fetchCategories = async () => {
  // حسب البوست مان، هذا الاندبوينت يرجع قائمة مع Pagination
  // سنطلب عدد كافي لملء الواجهة
  const response = await apiClient.get("/categories?per_page=36"); 
  return response.data.data.categories; 
};