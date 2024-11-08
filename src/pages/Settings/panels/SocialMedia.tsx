import { TextInput } from "@/components/Form";
import { useGetDirtyData } from "@/hooks";
import { useUpdateSettings } from "@/services/service-settings";
import { useStoreSettingData } from "@/store/settingStore";
import { Button, Flex, GridItem, HStack, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const SocialMedia = () => {
  const defaultValues = {
    facebook: "",
    instagram: "",
    youtube: "",
  };

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues,
  });

  const { settingData } = useStoreSettingData();

  const resetValues = {
    facebook: settingData?.facebook ?? "",
    instagram: settingData?.instagram ?? "",
    youtube: settingData?.youtube ?? "",
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
      maxW={"1000px"}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      id="social-media-form"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <TextInput
            isReadOnly={flag === "view"}
            control={control}
            name="facebook"
            label="Facebook"
            isRequired
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <TextInput
            isReadOnly={flag === "view"}
            control={control}
            name="instagram"
            label="Instagram"
            isRequired
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <TextInput
            isReadOnly={flag === "view"}
            control={control}
            name="youtube"
            label="Youtube"
            isRequired
          />
        </GridItem>
      </SimpleGrid>
      {flag === "view" && <Button onClick={() => setFlag("edit")}>Edit</Button>}

      {flag === "edit" && (
        <HStack gap={2}>
          {" "}
          <Button isLoading={isUpdating} type="submit" form="social-media-form">
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

export default SocialMedia;
