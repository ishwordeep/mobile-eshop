import { ReactDropzone, SelectInput, TextInput } from "@/components/Form";
import { useFetchColorList } from "@/services/service-color";
import { formatSelectOptions } from "@/utils/format";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { XCircle } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ProductCard } from "../Form";

// interface IVariant {
//   name: string;
//   price: number;
//   color: string[];
//   images: {
//     id: string;
//     name: string;
//     images: string;
//   }[];
// }

const THeads = ["Name", "Price", "Colors", "Images"];

const Variants = () => {
  const { control } = useForm();
  const { data: colors } = useFetchColorList();
  const attributes = {
    borderBottom: "2px solid var(--chakra-colors-gray-300)",
    textAlign: "center" as const,
    width: "400px",
    maxWidth: "400px",
    minWidth: "300px",
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });
  const colorOptions = formatSelectOptions({
    data: colors?.data?.rows,
    valueKey: "id",
    labelKey: "label",
    icon: <Box boxSize={6} borderRadius={"50%"} bg={"hex_value"} />,
  });

  // Ensure at least one variant is added initially
  useEffect(() => {
    if (fields.length === 0) {
      handelAddField();
    }
  }, [fields]);

  const handelAddField = () => {
    append({
      name: "",
      price: "" as never as number,
      color: "" as never as number,
      images: [],
    });
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  const renderVariantFields = () => {
    return (
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              {THeads.map((head, index) => (
                <Th {...attributes} key={index}>
                  {head}
                </Th>
              ))}
              {fields.length > 1 && <Th {...attributes}>Actions</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {fields.map((field, index) => (
              <Tr key={field.id}>
                <Td {...attributes} colSpan={1}>
                  <TextInput
                    name={`variants[${index}].name`}
                    control={control}
                  />
                </Td>
                <Td {...attributes} colSpan={1}>
                  <TextInput
                    name={`variants[${index}].price`}
                    control={control}
                  />
                </Td>
                <Td {...attributes} colSpan={1}>
                  <SelectInput
                    name={`variants[${index}].color`} // Bind size to variants array
                    control={control}
                    options={colorOptions}
                  />
                </Td>
                <Td
                  {...attributes}
                  colSpan={1}
                  minWidth={"400px"}
                  maxWidth={"600px"}
                >
                  <ReactDropzone
                    options={{
                      accept: { "image/*": [] },
                      maxSize: 4,
                    }}
                    justifyContent={"center"}
                    aspectRatio={1}
                    width={"full"}
                    isMultiple
                    imageSize={"100px"}
                    boxWidth={"100px"}
                    control={control}
                    name={`variants[${index}].images`}
                  />
                </Td>
                <Td {...attributes}>
                  {fields.length > 1 && (
                    <IconButton
                      onClick={() => handleRemoveField(index)}
                      aria-label="Remove"
                      my={2}
                      variant={"outline"}
                      colorScheme="red"
                      icon={<Icon as={XCircle} boxSize={6} />}
                    />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <ProductCard heading="Product Variants">
      <Stack gap={2}>
        {renderVariantFields()}
        <Stack gap={2} w={"fit-content"} mt={4}>
          <Button onClick={handelAddField}>Add More</Button>
        </Stack>
      </Stack>
    </ProductCard>
  );
};

export default Variants;
