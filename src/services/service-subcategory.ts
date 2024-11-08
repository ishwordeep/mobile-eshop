import { Api } from "./service-api";
import { CategoryResponse } from "./service-category";
import { useFetch, useMutate } from "./service-form-methods";
import {
  PaginationProps,
  RootResponse,
  SingleDataResponse,
} from "./service-interface";

export interface SubCategoryResponse {
  id: number;
  name: string;
  slug: string;
  description: string;
  is_active: number;
  image: string;
  category: CategoryResponse;
}

interface ISubCategoryData {
  name?: string;
  description?: string;
  image?: string;
  category_id?: string;
  is_active?: string;
}

const useAddSubCategory = () => {
  return useMutate<ISubCategoryData>({
    url: Api.SubCategory.create,
    invalidates: ["subcategorys"],
    message: "SubCategory added successfully",
  });
};

const useFetchSubCategory = ({ page = 1, perPage = 10 }: PaginationProps) => {
  return useFetch<RootResponse<SubCategoryResponse>>({
    url: Api.SubCategory.get({ page, perPage }),
    queryKey: ["subcategorys", page, perPage],
  });
};

const useFetchSingleSubCategory = (id: number | null) => {
  return useFetch<SingleDataResponse<SubCategoryResponse>>({
    url: Api.SubCategory.getOne.replace(":id", id + ""),
    queryKey: [Api.SubCategory.getOne, id + ""],
    enabled: !!id,
  });
};
const useFetchTrashedSubCategory = () => {
  return useFetch<RootResponse<SubCategoryResponse>>({
    url: Api.SubCategory.getTrashed,
  });
};

const useFetchSubCategoryList = (id: string) => {
  return useFetch<RootResponse<SubCategoryResponse>>({
    url: Api.SubCategory.getList.replace(":categoryId", id),
    enabled: !!id,
  });
};

const useUpdateSubCategory = () => {
  return useMutate<ISubCategoryData>({
    url: Api.SubCategory.update,
    invalidates: ["subcategorys", Api.SubCategory.getOne],
    message: "Sub Category updated successfully",
    method: "POST",
  });
};

const useRestoreSubCategory = () => {
  return useMutate({
    url: Api.SubCategory.restore,
    invalidates: ["subcategorys", Api.SubCategory.getTrashed],
    message: "SubCategory restored successfully",
  });
};

const useDeleteSubCategory = () => {
  return useMutate({
    url: Api.SubCategory.delete,
    invalidates: ["subcategorys"],
    message: "SubCategory deleted successfully",
    method: "DELETE",
  });
};

export {
  useAddSubCategory,
  useDeleteSubCategory,
  useFetchSingleSubCategory,
  useFetchSubCategory,
  useFetchSubCategoryList,
  useFetchTrashedSubCategory,
  useRestoreSubCategory,
  useUpdateSubCategory,
};
