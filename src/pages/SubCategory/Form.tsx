import {
  ReactDropzone,
  SelectInput,
  StatusRadio,
  TextInput,
} from "@/components/Form";
import { ModalForm } from "@/components/Form/Modal";
import { useGetDirtyData, useGetErrors } from "@/hooks";
import { toFormData } from "@/services/service-axios";
import { useFetchCategoryList } from "@/services/service-category";
import {
  useAddSubCategory,
  useFetchSingleSubCategory,
  useUpdateSubCategory,
} from "@/services/service-subcategory";
import { formatSelectOptions } from "@/utils/format";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IOption {
  label: string;
  value: string | number;
}

interface ISubCategoryForm {
  isOpen: boolean;
  onClose: () => void;
  id?: number | null;
  setId: any;
}

const SubCategoryForm: FC<ISubCategoryForm> = ({
  isOpen,
  onClose,
  id,
  setId,
}: ISubCategoryForm) => {
  const defaultValues = {
    name: "",
    description: "",
    image: "",
    is_active: "1",
    category_id: "",
  };

  const { data: categories } = useFetchCategoryList({ enabled: isOpen });

  const categoryOptions = formatSelectOptions({
    data: categories?.data?.rows,
    labelKey: "name",
    valueKey: "id",
  });
  // const [categoryOptions, setCategoryOptions] = useState<IOption[]>([]);

  // useEffect(() => {
  //   if (categories?.data.count ?? 0 > 0) {
  //     setCategoryOptions(
  //       categories?.data.rows?.map((item) => ({
  //         label: item.name,
  //         value: item.id.toString(),
  //       })) || []
  //     );
  //   }
  // }, [categories]);

  const {
    mutateAsync: addSubCategory,
    isPending: isAdding,
    isError: isAddingError,
    error: addError,
  } = useAddSubCategory();

  const {
    mutateAsync: updateSubCategory,
    isPending: isUpdating,
    isError: isUpdatingError,
    error: updateError,
  } = useUpdateSubCategory();

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues,
  });

  const { data: subCategory, isFetching: isFetchingData } =
    useFetchSingleSubCategory(id!);

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
        name: subCategory?.data?.name ?? "",
        description: subCategory?.data?.description ?? "",
        image: subCategory?.data?.image ?? "",
        is_active: subCategory?.data?.is_active ? "1" : "0",
        category_id: categoryOptions.find(
          (item: IOption) => item.value === subCategory?.data?.category?.id
        )?.value,
      });
    }
  }, [id, subCategory?.data]);

  const onSubmit = async (data: typeof defaultValues) => {
    const formData = toFormData<typeof defaultValues>(
      id ? useGetDirtyData(formState, data) : data
    );
    if (id) {
      const response = await updateSubCategory({ id, data: formData });
      if (response.data.status) {
        onClose();
        reset(defaultValues);
      }
    } else {
      const response = await addSubCategory({ data: formData });
      if (response.data.status) {
        onClose();
        reset(defaultValues);
      }
    }
  };
  return (
    <ModalForm
      heading={id ? "Edit SubCategory" : "Add SubCategory"}
      id={id}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset({ ...defaultValues });
        setId(null);
        setBackendError({});
      }}
      isFetching={isFetchingData}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isAdding || isUpdating}
    >
      <TextInput
        name={"name"}
        control={control}
        label={"Name"}
        backendError={backendError ? backendError.name : []}
      />
      <TextInput
        control={control}
        name={"description"}
        type="textarea"
        label={"Description"}
      />
      <SelectInput
        control={control}
        name={"category_id"}
        label={"Category"}
        backendError={backendError.category_id}
        options={categoryOptions}
      />
      <ReactDropzone
        name={"image"}
        control={control}
        label={"Image"}
        options={{
          accept: { "image/png": [] },
          maxSize: 2,
        }}
        file={id ? subCategory?.data?.image : ""}
      />
      <StatusRadio control={control} />
    </ModalForm>
  );
};

export default SubCategoryForm;
