import { AddButton } from "@/components/Button";
import { ActionColumn, DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/Form/Modal";

import SearchInput from "@/components/Form/SearchInput";
import { useDeleteProduct, useFetchProducts } from "@/services/service-product";
import { useStoreHeaderData } from "@/store/headerStore";
import { Flex, HStack, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const { setHeaderData } = useStoreHeaderData();
  const pageFromUrl = Number(urlParams.get("page")) || 1;
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    setPageIndex(pageFromUrl);
  }, [pageFromUrl]);

  const [id, setId] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [keyword, setKeyword] = useState<string>("");
  const { data: products } = useFetchProducts({
    page: pageFromUrl,
    perPage: 10,
    keyword,
  });
  const { mutateAsync: deleteProduct, isPending: isDeleting } =
    useDeleteProduct();
  console.log({ products });
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
      accessorKey: "category.name",
    },
    {
      header: "Sub Category",
      accessorKey: "subcategory.name",
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
      cell: ({ row }: any) => {
        const { id } = row.original;
        const handleOpen = (id: number) => {
          setId(id);
          onOpen();
        };
        return (
          <ActionColumn
            handleEdit={() => console.log("edit", id)}
            handleDelete={() => handleOpen(id)}
          />
        );
      },
    },
  ];

  return (
    <Flex flexDir={"column"} gap={4} minH={"100dvh"}>
      {/* <SimpleGrid columns={{ base: 1, sm: 2, lg: 2, "2xl": 3 }} gap={4}>
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
      </SimpleGrid> */}

      <Flex justify={"space-between"} align={"center"}>
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

      <DataTable
        columns={columns}
        data={products?.data?.rows ?? []}
        count={products?.data.count ?? 0}
        pagination={
          products?.data.count ?? 0 > 0
            ? {
                manual: true,
                pageCount: products?.data?.pagination?.last_page ?? 1,
                totalRows: products?.data?.pagination?.total ?? 1,
                pageParams: {
                  pageIndex,
                  pageSize: 10,
                },
              }
            : undefined
        }
      />
      <DeleteAlert
        isOpen={isOpen}
        onClose={onClose}
        onDelete={async () => {
          if (id) {
            await deleteProduct({ id });
            onClose();
            setId(null);
          }
        }}
        heading="Delete Product"
        message="Are you sure you want to delete this product?"
        isDeleting={isDeleting}
      />
    </Flex>
  );
};

export default Product;
