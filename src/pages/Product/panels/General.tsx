import {
  SelectInput,
  StatusRadio,
  TagInput,
  TextInput,
} from "@/components/Form";
import { useFetchCategoryList } from "@/services/service-category";
import { useCreateGeneral } from "@/services/service-product";
import { useFetchSubCategoryList } from "@/services/service-subcategory";
import { formatSelectOptions } from "@/utils/format";
import { Button, Grid, SimpleGrid, Stack } from "@chakra-ui/react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../Form";

const General = () => {
  const defaultValues = {
    category_id: "",
    subcategory_id: "",
    name: "",
    description: "",
    tags: [],
    low_stock_threshold: "" as never as number,
    status: "1",
    price: "" as never as number,
    stock: "" as never as number,
    discount_percentage: "" as never as number,
    delivery_charge: "" as never as number,
  };
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({ defaultValues });
  const categoryId = useWatch({ control, name: "category_id" });
  const { data: categoryList } = useFetchCategoryList();
  const { data: subCategoryList } = useFetchSubCategoryList(categoryId!);
  const { mutateAsync: createGeneral } = useCreateGeneral();
  const categoryOptions = formatSelectOptions({
    data: categoryList?.data?.rows,
    labelKey: "name",
    valueKey: "id",
  });

  const subCategoryOptions =
    (Number(categoryId) && (subCategoryList?.data?.count || 0)) > 0
      ? formatSelectOptions({
          data: subCategoryList?.data.rows,
          labelKey: "name",
          valueKey: "id",
        })
      : [];

  const onSubmit = async (data: any) => {
    const response = await createGeneral({ data });
    console.log({ response });
    if (response.data.status) {
      navigate("?product_id=" + response.data.data.id);
    }
  };

  return (
    <Stack spacing={6} as={"form"} onSubmit={handleSubmit(onSubmit)} noValidate>
      <ProductCard heading="Category">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <SelectInput
            control={control}
            name="category_id"
            label="Category"
            options={categoryOptions}
          />
          <SelectInput
            control={control}
            name="subcategory_id"
            label="SubCategory"
            options={subCategoryOptions}
          />
        </SimpleGrid>
      </ProductCard>
      <ProductCard heading="General Information">
        <TextInput label={"Name"} isRequired name={"name"} control={control} />

        <TextInput
          label={"Description"}
          name={"description"}
          type="textarea"
          control={control}
        />
        <TagInput control={control} name="tags" label="Product Keywords" />
        <TextInput
          type="number"
          label="Low Stock Threshold"
          name="low_stock_threshold"
          control={control}
          helperText="When the stock reaches this number, it will be considered as low stock."
        />
        <StatusRadio control={control} />
      </ProductCard>

      <ProductCard heading={"Price"}>
        <Grid
          gridTemplateColumns={{
            base: "repeat(1, 1fr)",
            "2xl": "repeat(2, 1fr)",
          }}
          gap={4}
        >
          <TextInput
            label={"Base Price"}
            name={"price"}
            control={control}
            isRequired
            type="number"
          />
          <TextInput
            label={"Stock"}
            name={"stock"}
            control={control}
            isRequired
            type="number"
          />
          <TextInput
            label={"Discount Percentage"}
            name={"discount_percentage"}
            control={control}
            type="number"
          />
          <TextInput
            label={"Delivery Charge"}
            name={"delivery_charge"}
            control={control}
            type="number"
          />
        </Grid>
      </ProductCard>

      <Button type="submit">Save & Next</Button>
    </Stack>
  );
};

export default General;
