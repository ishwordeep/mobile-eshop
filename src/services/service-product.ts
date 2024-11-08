import { Api, IPagination } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse } from "./service-interface";

const useFetchProducts = ({
  page = 1,
  perPage = 10,
  keyword = "",
}: IPagination) => {
  return useFetch<RootResponse<any>>({
    url: Api.Product.get({ page, perPage, keyword }),
    queryKey: ["products", page, perPage, keyword],
  });
};

const useDeleteProduct = () => {
  return useMutate({
    url: Api.Product.delete,
    invalidates: ["products"],
    method: "DELETE",
    message: "Product deleted successfully",
  });
};

const useCreateGeneral = () => {
  return useMutate({
    url: Api.Product.createGeneral,
    invalidates: ["products"],
    message: "Product created successfully",
  });
};

const useCreateImages = () => {
  return useMutate({
    url: Api.Product.createImages,
    invalidates: ["products"],
    method: "POST",
  });
};

const useCreateSpecification = () => {
  return useMutate({
    url: Api.Product.createSpecification,
    invalidates: ["products"],
    method: "POST",
  });
};

const useCreateVariant = () => {
  return useMutate({
    url: Api.Product.createVariant,
    invalidates: ["products"],
    method: "POST",
  });
};

export {
  useCreateGeneral,
  useCreateImages,
  useCreateSpecification,
  useCreateVariant,
  useDeleteProduct,
  useFetchProducts,
};
