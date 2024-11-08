import { AddButton } from "@/components/Button";
import { DataTable } from "@/components/DataTable";

import SearchInput from "@/components/Form/SearchInput";
import { useStoreHeaderData } from "@/store/headerStore";
import {
  Card,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  Text,
} from "@chakra-ui/react";
import { Bag } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const { setHeaderData } = useStoreHeaderData();

  useEffect(() => {
    setHeaderData({
      heading: "Product",
      description: "Manage your products",
    });
  }, [setHeaderData]);
  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Sub Category",
      accessorKey: "subCategory",
    },
    {
      header: "Color",
      accessorKey: "color",
    },
    {
      header: "Size",
      accessorKey: "size",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Discount",
      accessorKey: "discount",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Action",
      accessorKey: "action",
    },
  ];

  return (
    <Flex flexDir={"column"} gap={4} minH={"100dvh"}>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 2, "2xl": 3 }} gap={4}>
        {[...Array(3)].map((_, index) => (
          <Card
            border={"2px solid "}
            borderColor={"gray.200"}
            borderRadius={10}
            boxShadow={"0 0 10px rgba(0, 0, 0, 0.1)"}
            p={4}
            key={index}
          >
            <Stack gap={2}>
              <Icon
                p={2}
                borderRadius={5}
                bg={"rgba(0, 128, 0, 0.1)"}
                as={Bag}
                weight="fill"
                color={"green.500"}
                boxSize={12}
              />
              <Text fontSize={"md"} fontWeight={500} color={"gray.700"}>
                Product
              </Text>
              <HStack
                mt={2}
                justify={"space-between"}
                gap={4}
                flexWrap={"wrap"}
              >
                <Text fontSize={"xl"} fontWeight={600}>
                  1231203
                </Text>
                <StatGroup>
                  <Stat>
                    <StatHelpText
                      borderRadius={5}
                      p={2}
                      bg={"rgba(0, 128, 0, 0.2)"}
                      border={"2px solid rgba(0, 128, 0, 0.5)"}
                    >
                      23.36%
                      <StatArrow ml={1} type="increase" />
                    </StatHelpText>
                  </Stat>
                </StatGroup>
              </HStack>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      <Flex my={2} justify={"space-between"} align={"center"}>
        <HStack>
          <SearchInput
            onSearch={console.log}
            placeholder={"Search Product"}
            w={"300px"}
          />
        </HStack>

        <HStack gap={2}>
          <AddButton onClick={() => navigate("add")} />
        </HStack>
      </Flex>

      <DataTable columns={columns} data={[]} count={0} />
    </Flex>
  );
};

export default Product;
