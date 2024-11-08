import { Api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods.ts";
import {
  Image,
  IStatus,
  PaginationProps,
  RootResponse,
  SingleDataResponse,
} from "./service-interface.ts";

export interface CategoryResponse {
  id: number;
  title?: string;
  name: string;
  slug: string;
  type?: string;
  description: string;
  is_active: number;
  image: string;
  icon: string;
  images: Image[];
  videos: [{ url: string }];
}

interface ICategoryData {
  name?: string;
  description?: string;
  image?: string;
  type?: string;
  is_active?: string;
}

const useAddCategory = () => {
  return useMutate<ICategoryData>({
    url: Api.Category.create,
    invalidates: ["categorys"],
    message: "Category added successfully",
  });
};

const useFetchCategory = ({
  page = 1,
  perPage = 10,
  keyword = "",
}: PaginationProps) => {
  return useFetch<RootResponse<CategoryResponse>>({
    url: Api.Category.get({ page, perPage, keyword }),
    queryKey: ["categorys", page, perPage],
  });
};

const useFetchCategoryList = ({ enabled }: { enabled?: boolean } = {}) => {
  return useFetch<RootResponse<CategoryResponse>>({
    url: Api.Category.getList,
    queryKey: ["categorys"],
    enabled: enabled ?? true,
  });
};

const useFetchSingleCategory = (id: number) => {
  return useFetch<SingleDataResponse<CategoryResponse>>({
    url: Api.Category.getOne.replace(":id", id + ""),
    queryKey: [Api.Category.getOne, id + ""],
    enabled: !!id,
  });
};
const useFetchTrashedCategory = () => {
  return useFetch<RootResponse<CategoryResponse>>({
    url: Api.Category.getTrashed,
  });
};

const useUpdateCategory = () => {
  return useMutate<ICategoryData>({
    url: Api.Category.update,
    invalidates: ["categorys", Api.Category.getOne],
    message: "Category updated successfully",
    method: "POST",
  });
};

const useUpdateCategoryStatus = () => {
  return useMutate<IStatus>({
    url: Api.Category.update,
    method: "POST",
    invalidates: ["categorys", Api.Category.getOne],
    message: "Category updated successfully",
  });
};

const useRestoreCategory = () => {
  return useMutate({
    url: Api.Category.restore,
    invalidates: ["categorys", Api.Category.getTrashed],
    message: "Category restored successfully",
  });
};

const useDeleteCategory = () => {
  return useMutate({
    method: "DELETE",
    url: Api.Category.delete,
    invalidates: ["categorys"],
    message: "Category deleted successfully",
  });
};

export {
  useAddCategory,
  useDeleteCategory,
  useFetchCategory,
  useFetchCategoryList,
  useFetchSingleCategory,
  useFetchTrashedCategory,
  useRestoreCategory,
  useUpdateCategory,
  useUpdateCategoryStatus,
};
