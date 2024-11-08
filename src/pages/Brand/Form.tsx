import { ReactDropzone, StatusRadio, TextInput } from "@/components/Form";
import { ModalForm } from "@/components/Form/Modal";
import { useGetDirtyData, useGetErrors } from "@/hooks";
import { toFormData } from "@/services/service-axios";
import {
  useAddBrand,
  useFetchSingleBrand,
  useUpdateBrand,
} from "@/services/service-brand";
import { FC, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IBrandForm {
  isOpen: boolean;
  onClose: () => void;
  id?: number | null;
}

const BrandForm: FC<IBrandForm> = ({ isOpen, onClose, id }: IBrandForm) => {
  const defaultValues = {
    name: "",
    description: "",
    image: "",
    is_active: "1",
  };

  const {
    mutateAsync: addBrand,
    isPending: isAdding,
    isError: isAddingError,
    error: addError,
  } = useAddBrand();

  const {
    mutateAsync: updateBrand,
    isPending: isUpdating,
    isError: isUpdatingError,
    error: updateError,
  } = useUpdateBrand();

  const navigate = useNavigate();

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues,
  });

  const { data: brand, isFetching: isFetchingData } = useFetchSingleBrand(id!);

  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );

  useEffect(() => {
    isAddingError
      ? setBackendError(useGetErrors(addError))
      : isUpdatingError
      ? setBackendError(useGetErrors(updateError))
      : {};
  }, [isAddingError, isUpdatingError, addError, updateError]);

  useEffect(() => {
    if (id) {
      reset({
        name: brand?.data?.name ?? "",
        description: brand?.data?.description ?? "",
        image: brand?.data?.image ?? "",
        is_active: brand?.data?.is_active ? "1" : "0",
      });
    }
  }, [id, brand?.data]);

  const onSubmit = async (data: typeof defaultValues) => {
    const formData = toFormData<typeof defaultValues>(
      id ? useGetDirtyData(formState, data) : data
    );
    if (id) {
      const response = await updateBrand({ id, data: formData });
      if (response.data.status) {
        onClose();
        reset(defaultValues);
        setBackendError({});

        navigate("?page=1");
      }
    } else {
      const response = await addBrand({ data: formData });
      if (response.data.status) {
        onClose();
        reset(defaultValues);
        setBackendError({});

        navigate("?page=1");
      }
    }
  };

  return (
    <ModalForm
      isFetching={isFetchingData}
      heading={id ? "Edit Brand" : "Add Brand"}
      id={id}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setBackendError({});
        reset(defaultValues); // Ensure reset happens after closing modal
        // Delay to ensure modal closes before resetting form
      }}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isAdding || isUpdating}
    >
      <TextInput
        name={"name"}
        control={control}
        label={"Name"}
        backendError={backendError.name}
      />
      <TextInput
        control={control}
        name={"description"}
        type="textarea"
        label={"Description"}
      />

      <ReactDropzone
        name={"image"}
        control={control}
        label={"Image"}
        options={{
          accept: { "image/png": [] },
          maxSize: 2,
        }}
        file={id ? brand?.data?.image : ""}
      />
      <StatusRadio control={control} />
    </ModalForm>
  );
};

export default BrandForm;
