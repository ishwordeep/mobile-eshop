import { StatusRadio, TextInput } from "@/components/Form";
import { ModalForm } from "@/components/Form/Modal/";
import { useGetDirtyData, useGetErrors } from "@/hooks";
import {
  useAddColor,
  useFetchSingleColor,
  useUpdateColor,
} from "@/services/service-color";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  hex_value: yup.string().required("Color is required"),
  is_active: yup.string().required("Status is required"),
});

export type ColorFormValues = yup.InferType<typeof schema>;

interface IColorForm {
  isOpen: boolean;
  onClose: () => void;
  id?: number | null;
  setId: any;
}

const ColorForm: FC<IColorForm> = ({
  isOpen,
  onClose,
  id,
  setId,
}: IColorForm) => {
  const defaultValues = {
    name: "",
    hex_value: "",
    is_active: "1",
  };

  const {
    mutateAsync: addColor,
    isPending: isAdding,
    isError: isAddingError,
    error: addError,
  } = useAddColor();

  const {
    mutateAsync: updateColor,
    isPending: isUpdating,
    isError: isUpdatingError,
    error: updateError,
  } = useUpdateColor();

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { data: color, isFetching: isFetchingData } = useFetchSingleColor(id!);

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
        name: color?.data?.name ?? "",
        hex_value: color?.data?.hex_value ?? "",
        is_active: color?.data?.is_active ? "1" : "0",
      });
    }
  }, [id, color?.data]);

  const onSubmit = async (data: typeof defaultValues) => {
    if (id) {
      const dirtyData = useGetDirtyData(formState, data);
      const response = await updateColor({ id, data: dirtyData });
      if (response.data.status) {
        onClose();
        reset(defaultValues);
      }
    } else {
      const response = await addColor({ data });
      if (response.data.status) {
        onClose();
        reset(defaultValues);
      }
    }
  };
  return (
    <ModalForm
      heading={id ? "Edit Size" : "Add Size"}
      id={id}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setId(null);
        reset(defaultValues);
        setBackendError({});
      }}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isAdding || isUpdating}
      isFetching={isFetchingData}
    >
      <TextInput
        name="name"
        label="Name"
        isRequired
        control={control}
        backendError={backendError.name}
      />
      <TextInput
        type="color"
        name="hex_value"
        label="Color"
        control={control}
        backendError={backendError.hex_value}
        isRequired
      />
      <StatusRadio control={control} />
    </ModalForm>
  );
};

export default ColorForm;
