import { TagInput, TextInput } from "@/components/Form";
import { ModalForm } from "@/components/Form/Modal";
import { useGetDirtyData, useGetErrors } from "@/hooks";
import {
  useAddSpecification,
  useFetchSpecification,
  useUpdateSpecification,
} from "@/services/service-specification";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IHederFormProps {
  id?: number | null;
  onClose: () => void;
  isOpen: boolean;
}

const SpecificationForm: FC<IHederFormProps> = ({ id, onClose, isOpen }) => {
  const defaultValues: { header: string; subheaders: string[] } = {
    header: "",
    subheaders: [],
  };

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues,
  });

  const {
    mutateAsync: addSpecification,
    isPending: isAdding,
    isError: isAddingError,
    error: addError,
  } = useAddSpecification();
  const {
    mutateAsync: updateSpecification,
    isPending: isUpdating,
    isError: isUpdatingError,
    error: updateError,
  } = useUpdateSpecification();

  const { data: specification, isFetching } = useFetchSpecification(id!);

  const [backendError, setBackendError] = useState<Record<string, string[]>>(
    {}
  );

  useEffect(() => {
    isAddingError
      ? setBackendError(useGetErrors(addError))
      : isUpdatingError
      ? setBackendError(useGetErrors(updateError))
      : {};
  }, [isAddingError, addError]);

  useEffect(() => {
    if (id) {
      reset({
        header: specification?.data?.header ?? "",
        subheaders: specification?.data?.subheaders ?? [],
      });
    }
  }, [id, specification?.data]);

  const onSubmit = async (data: typeof defaultValues) => {
    if (id) {
      const dirtyData = useGetDirtyData(formState, data);
      const response = await updateSpecification({ id, data: dirtyData });
      if (response.data.status) {
        onClose();
        reset(defaultValues);
      }
    } else {
      const response = await addSpecification({ data });
      if (response.data.status) {
        onClose();
        reset(defaultValues);
      }
    }
  };

  return (
    <ModalForm
      isFetching={isFetching}
      heading={id ? "Edit Header" : "Add Header"}
      id={id}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setBackendError({});
        reset(defaultValues);
      }}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isAdding || isUpdating}
    >
      <TextInput
        name={"header"}
        control={control}
        label={"Header"}
        backendError={backendError.header}
      />
      <TagInput
        name={"subheaders"}
        control={control}
        label={"Sub Headers"}
        backendError={backendError.subheaders}
      />
    </ModalForm>
  );
};

export default SpecificationForm;
