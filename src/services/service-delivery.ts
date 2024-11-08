import { Api, IPagination } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleDataResponse } from "./service-interface";

export interface ChargeData {
  id?: number;
  address?: string;
  charge?: number;
}

const useFetchCharges = ({ page, perPage, keyword }: IPagination) => {
  return useFetch<RootResponse<ChargeData>>({
    url: Api.DeliveryCharge.get({
      page,
      perPage,
      keyword,
    }),
    queryKey: ["delivery-charges"],
  });
};

const useFetchSingleCharge = (id: number) => {
  return useFetch<SingleDataResponse<ChargeData>>({
    url: Api.DeliveryCharge.getOne.replace(":id", String(id)),
    queryKey: ["delivery-charge", id],
    enabled: !!id,
  });
};

const useAddCharge = () => {
  return useMutate<ChargeData>({
    url: Api.DeliveryCharge.create,
    invalidates: ["delivery-charges"],
    message: "Charge created successfully",
  });
};

const useUpdateCharge = () => {
  return useMutate<ChargeData>({
    url: Api.DeliveryCharge.update,
    invalidates: ["delivery-charges"],
    method: "POST",
    message: "Charge updated successfully",
  });
};

const useDeleteCharge = () => {
  return useMutate<ChargeData>({
    url: Api.DeliveryCharge.delete,
    invalidates: ["delivery-charges"],
    method: "DELETE",
    message: "Charge deleted successfully",
  });
};

export {
  useAddCharge,
  useDeleteCharge,
  useFetchCharges,
  useFetchSingleCharge,
  useUpdateCharge,
};
