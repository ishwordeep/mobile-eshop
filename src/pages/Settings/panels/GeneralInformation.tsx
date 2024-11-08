import { TextInput } from "@/components/Form";
import { useGetDirtyData } from "@/hooks";
import { useUpdateSettings } from "@/services/service-settings";
import { useStoreSettingData } from "@/store/settingStore";
import { Button, Flex, GridItem, HStack, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const GeneralInformation = () => {
  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  };

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues,
  });

  const { settingData } = useStoreSettingData();

  const resetValues = {
    name: settingData?.name ?? "",
    phone: settingData?.phone ?? "",
    address: settingData?.address ?? "",
    description: settingData?.description ?? "",
  };

  useEffect(() => {
    console.log({ settingData });
    if (settingData) {
      reset(resetValues);
    }
  }, [settingData]);

  const { mutateAsync: updateGeneral, isPending: isUpdating } =
    useUpdateSettings();
  const onSubmit = async (data: typeof defaultValues) => {
    const dirtyData = useGetDirtyData(formState, data);
    const response = await updateGeneral({ data: dirtyData });
    if (response.data?.status) {
      setFlag("view");
    }
  };

  const [flag, setFlag] = useState<"view" | "edit">("view");
  return (
    <Flex
      flexDir={"column"}
      gap={4}
      as={"form"}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      id="general-form"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <TextInput
            isReadOnly={flag === "view"}
            control={control}
            name="name"
            label="Name"
            isRequired
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <TextInput
            isReadOnly={flag === "view"}
            control={control}
            name="phone"
            label="Phone"
            isRequired
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <TextInput
            isReadOnly={flag === "view"}
            control={control}
            name="address"
            label="Address"
            isRequired
          />
        </GridItem>
        <GridItem colSpan={2}>
          <TextInput
            isReadOnly={flag === "view"}
            control={control}
            name="description"
            label="Description"
            type="textarea"
            isRequired
          />
        </GridItem>
      </SimpleGrid>
      {flag === "view" && <Button onClick={() => setFlag("edit")}>Edit</Button>}

      {flag === "edit" && (
        <HStack gap={2}>
          {" "}
          <Button isLoading={isUpdating} type="submit" form="general-form">
            Save Changes
          </Button>
          <Button
            onClick={() => {
              reset(resetValues);
              setFlag("view");
            }}
            variant={"outline"}
          >
            Cancel
          </Button>
        </HStack>
      )}
    </Flex>
  );
};

export default GeneralInformation;
