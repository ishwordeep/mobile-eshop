import { StatusRadio, TextInput } from "@/components/Form";
import { ModalForm } from "@/components/Form/Modal";
import { useGetDirtyData, useGetErrors } from "@/hooks";
import { toFormData } from "@/services/service-axios";
import {
  useAddCharge,
  useFetchSingleCharge,
  useUpdateCharge,
} from "@/services/service-delivery";
import { FC, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IChargeForm {
  isOpen: boolean;
  onClose: () => void;
  id?: number | null;
}

const ChargeForm: FC<IChargeForm> = ({ isOpen, onClose, id }: IChargeForm) => {
  const defaultValues = {
    address: "",
    charge: "" as never as number,
    is_active: "1",
  };

  const {
    mutateAsync: addCharge,
    isPending: isAdding,
    isError: isAddingError,
    error: addError,
  } = useAddCharge();

  const {
    mutateAsync: updateCharge,
    isPending: isUpdating,
    isError: isUpdatingError,
    error: updateError,
  } = useUpdateCharge();

  const navigate = useNavigate();

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues,
  });

  const { data: charge, isFetching: isFetchingData } = useFetchSingleCharge(
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
        address: charge?.data?.address ?? "",
        charge: charge?.data?.charge ?? ("" as never as number),
      });
    }
  }, [id, charge?.data]);

  const onSubmit = async (data: typeof defaultValues) => {
    const formData = toFormData<typeof defaultValues>(
      id ? useGetDirtyData(formState, data) : data
    );
    if (id) {
      const response = await updateCharge({ id, data: formData });
      if (response.data.status) {
        onClose();
        reset(defaultValues);
        setBackendError({});
        navigate("?page=1");
      }
    } else {
      const response = await addCharge({ data: formData });
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
      heading={id ? "Edit Charge" : "Add Charge"}
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
        name={"address"}
        control={control}
        label={"Address"}
        backendError={backendError.address}
        isRequired
      />
      <TextInput
        control={control}
        name={"charge"}
        type="number"
        label={"Charge"}
        isRequired
      />

      <StatusRadio control={control} />
    </ModalForm>
  );
};

export default ChargeForm;
