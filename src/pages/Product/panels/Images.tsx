import EmptyState from "@/components/EmptyState";
import { ReactDropzone } from "@/components/Form";
import { toFormData } from "@/services/service-axios";
import { useCreateImages } from "@/services/service-product";
import { Button, Icon, Stack } from "@chakra-ui/react";
import { CloudArrowUp } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { ProductCard } from "../Form";

const Images = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const productId = urlParams.get("product_id");

  const { id } = useParams();
  const { mutateAsync: createImages } = useCreateImages();
  const defaultValues = {
    images: [],
  };
  // const [categoryId, setCategoryId] = useState<string | null>(null);
  const [prevFiles, setPrevFiles] = useState<{ id: number; url: string }[]>([]);
  const [deleteImages, setDeleteImages] = useState<string[]>([]);

  const { control, handleSubmit } = useForm({ defaultValues });

  const onSubmit = async (data: any) => {
    const formData = toFormData(data);
    const response = await createImages({ id: productId, data: formData });
    console.log({ response });
  };

  return (
    <Stack gap={4} as="form" onSubmit={handleSubmit(onSubmit)}>
      <ProductCard heading="Product Images">
        {/* Image Upload Component */}
        <ReactDropzone
          options={{
            accept: { "image/*": [] },
            maxSize: 4,
          }}
          name="images"
          control={control}
          isMultiple
          prevFiles={prevFiles}
          setPrevFiles={setPrevFiles}
          setDeleteImages={setDeleteImages}
          width={"full"}
          imageSize={"150px"}
          boxWidth={"100%"}
          boxHeight={"200px"}
          flexDir="column"
          imageOrder={2}
          dropbox={
            <EmptyState
              icon={<Icon as={CloudArrowUp} boxSize={12} />}
              title="Upload Image"
              description="Drag and drop your image/s here"
            />
          }
        />
      </ProductCard>
      <Button type="submit">Submit</Button>
    </Stack>
  );
};

export default Images;
