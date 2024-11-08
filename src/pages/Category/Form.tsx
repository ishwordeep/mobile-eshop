import { ReactDropzone, StatusRadio, TextInput } from "@/components/Form";
import { ModalForm } from "@/components/Form/Modal";
import { useGetDirtyData, useGetErrors } from "@/hooks";
import { toFormData } from "@/services/service-axios";
import {
  useAddCategory,
  useFetchSingleCategory,
  useUpdateCategory,
} from "@/services/service-category";
import { FC, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface ICategoryForm {
  isOpen: boolean;
  onClose: () => void;
  id?: number | null;
}

const CategoryForm: FC<ICategoryForm> = ({
  isOpen,
  onClose,
  id,
}: ICategoryForm) => {
  const defaultValues = {
    name: "",
    description: "",
    image: "",
    is_active: "1",
  };

  const {
    mutateAsync: addCategory,
    isPending: isAdding,
    isError: isAddingError,
    error: addError,
  } = useAddCategory();

  const {
    mutateAsync: updateCategory,
    isPending: isUpdating,
    isError: isUpdatingError,
    error: updateError,
  } = useUpdateCategory();

  const navigate = useNavigate();

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues,
  });

  const { data: category, isFetching: isFetchingData } = useFetchSingleCategory(
    id!
  );

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
        name: category?.data?.name ?? "",
        description: category?.data?.description ?? "",
        image: category?.data?.image ?? "",
        is_active: category?.data?.is_active ? "1" : "0",
      });
    }
  }, [id, category?.data]);

  const onSubmit = async (data: typeof defaultValues) => {
    const formData = toFormData<typeof defaultValues>(
      id ? useGetDirtyData(formState, data) : data
    );
    if (id) {
      const response = await updateCategory({ id, data: formData });
      if (response.data.status) {
        onClose();
        reset(defaultValues);
        setBackendError({});
        navigate("?page=1");
      }
    } else {
      const response = await addCategory({ data: formData });
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
      heading={id ? "Edit Category" : "Add Category"}
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
        file={id ? category?.data?.image : ""}
      />
      <StatusRadio control={control} />
    </ModalForm>
  );
};

export default CategoryForm;
