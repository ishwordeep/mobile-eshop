import { Api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods.ts";
import {
  Image,
  IStatus,
  PaginationProps,
  RootResponse,
  SingleDataResponse,
} from "./service-interface.ts";

export interface BrandResponse {
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
}

interface IBrandData {
  name?: string;
  description?: string;
  image?: string;
  type?: string;
  is_active?: string;
}

const useAddBrand = () => {
  return useMutate<IBrandData>({
    url: Api.Brand.create,
    invalidates: ["brands"],
    message: "Brand added successfully",
  });
};

const useFetchBrand = ({
  page = 1,
  perPage = 10,
  keyword = "",
}: PaginationProps) => {
  return useFetch<RootResponse<BrandResponse>>({
    url: Api.Brand.get({ page, perPage, keyword }),
    queryKey: ["brands", page, perPage],
  });
};

const useFetchBrandList = ({ enabled }: { enabled?: boolean } = {}) => {
  return useFetch<RootResponse<BrandResponse>>({
    url: Api.Brand.getList,
    queryKey: ["brands"],
    enabled: enabled ?? true,
  });
};

const useFetchSingleBrand = (id: number) => {
  return useFetch<SingleDataResponse<BrandResponse>>({
    url: Api.Brand.getOne.replace(":id", id + ""),
    queryKey: [Api.Brand.getOne, id + ""],
    enabled: !!id,
  });
};
const useFetchTrashedBrand = () => {
  return useFetch<RootResponse<BrandResponse>>({
    url: Api.Brand.getTrashed,
  });
};

const useUpdateBrand = () => {
  return useMutate<IBrandData>({
    url: Api.Brand.update,
    invalidates: ["brands", Api.Brand.getOne],
    message: "Brand updated successfully",
    method: "POST",
  });
};

const useUpdateBrandStatus = () => {
  return useMutate<IStatus>({
    url: Api.Brand.update,
    method: "POST",
    invalidates: ["brands", Api.Brand.getOne],
    message: "Brand updated successfully",
  });
};

const useRestoreBrand = () => {
  return useMutate({
    url: Api.Brand.restore,
    invalidates: ["brands", Api.Brand.getTrashed],
    message: "Brand restored successfully",
  });
};

const useDeleteBrand = () => {
  return useMutate({
    method: "DELETE",
    url: Api.Brand.delete,
    invalidates: ["brands"],
    message: "Brand deleted successfully",
  });
};

export {
  useAddBrand,
  useDeleteBrand,
  useFetchBrand,
  useFetchBrandList,
  useFetchSingleBrand,
  useFetchTrashedBrand,
  useRestoreBrand,
  useUpdateBrand,
  useUpdateBrandStatus,
};
