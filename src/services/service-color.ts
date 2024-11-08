import { Api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import { RootResponse, SingleDataResponse } from "./service-interface";

export interface ColorResponse {
  id: number;
  label: string;
  is_active: boolean;
  hex_value: string;
}

interface IColorData {
  name?: string;
  hex_code?: string;
  is_active?: string;
}

const useAddColor = () => {
  return useMutate<IColorData>({
    url: Api.Color.create,
    invalidates: ["colors"],
    message: "Color added successfully",
  });
};

const useFetchColor = ({ page = 1, perPage = 10 }) => {
  return useFetch<RootResponse<ColorResponse>>({
    url: Api.Color.get({ page, perPage }),
    queryKey: ["colors"],
  });
};

const useFetchColorList = () => {
  return useFetch<RootResponse<ColorResponse>>({
    url: Api.Color.getList,
    queryKey: ["colors"],
  });
};

const useFetchSingleColor = (id: number) => {
  return useFetch<SingleDataResponse<ColorResponse>>({
    url: Api.Color.getOne.replace(":id", id + ""),
    queryKey: ["color", id],
    enabled: !!id,
  });
};

const useUpdateColor = () => {
  return useMutate<IColorData>({
    url: Api.Color.update,
    invalidates: ["colors"],
    message: "Color updated successfully",
    method: "POST",
  });
};

const useDeleteColor = () => {
  return useMutate<IColorData>({
    url: Api.Color.delete,
    invalidates: ["colors"],
    message: "Color deleted successfully",
    method: "DELETE",
  });
};

export {
  useAddColor,
  useDeleteColor,
  useFetchColor,
  useFetchColorList,
  useFetchSingleColor,
  useUpdateColor,
};
