import { Api } from "./service-api";
import { useFetch, useMutate } from "./service-form-methods";
import {
  PaginationProps,
  RootResponse,
  SingleDataResponse,
} from "./service-interface";

interface ISubheader {
  id: number;
  name: string;
}

export interface SpecificationResponse {
  id: number;
  header: string;
  subheaders: string[];
}

const useFetchSpecifications = ({
  page = 1,
  perPage = 10,
  keyword = "",
}: PaginationProps) => {
  return useFetch<RootResponse<SpecificationResponse>>({
    url: Api.Specification.get({
      page,
      perPage,
      keyword,
    }),
    queryKey: ["specifications", page, perPage],
  });
};

const useFetchSpecification = (id: number) => {
  return useFetch<SingleDataResponse<SpecificationResponse>>({
    url: Api.Specification.getOne.replace(":id", id + ""),
    queryKey: ["specification", id],
    enabled: !!id,
  });
};

const useAddSpecification = () => {
  return useMutate({
    url: Api.Specification.create,
    invalidates: ["specifications"],
    message: "Specification added successfully",
  });
};

const useUpdateSpecification = () => {
  return useMutate({
    url: Api.Specification.update,
    invalidates: ["specifications"],
    message: "Specification updated successfully",
    method: "POST",
  });
};

const useFetchHeaderList = () => {
  return useFetch<RootResponse<SpecificationResponse>>({
    url: Api.Specification.getHeaderList,
    queryKey: ["specifications"],
  });
};

const useFetchSubheaderList = (headerId: number) => {
  return useFetch<RootResponse<ISubheader>>({
    url: Api.Specification.getOne.replace(":id", headerId + ""),
    queryKey: ["subheaders", headerId],
    enabled: !!headerId,
  });
};

const useDeleteSpecification = () => {
  return useMutate({
    url: Api.Specification.delete,
    invalidates: ["specifications"],
    message: "Specification deleted successfully",
    method: "DELETE",
  });
};

export {
  useAddSpecification,
  useDeleteSpecification,
  useFetchHeaderList,
  useFetchSpecification,
  useFetchSpecifications,
  useFetchSubheaderList,
  useUpdateSpecification,
};
