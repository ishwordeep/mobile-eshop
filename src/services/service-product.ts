import { Api } from "./service-api";
import { useMutate } from "./service-form-methods";

const useCreateGeneral = () => {
  return useMutate({
    url: Api.Product.createGeneral,
    invalidates: ["products"],
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
};
