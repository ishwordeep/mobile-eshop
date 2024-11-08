import { ActionColumn, DataTable, StatusSwitch } from "@/components/DataTable";

import { AddButton } from "@/components/Button";
import { SearchInput } from "@/components/Form";
import { DeleteAlert } from "@/components/Form/Modal";
import {
  useDeleteCategory,
  useFetchCategory,
} from "@/services/service-category";
import { useStoreHeaderData } from "@/store/headerStore";
import {
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CategoryForm from "./Form";

const Category = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const pageFromUrl = Number(urlParams.get("page")) || 1;
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    setPageIndex(pageFromUrl);
  }, [pageFromUrl]);

  const {
    data: category,
    isPending: isLoading,
    isFetching,
  } = useFetchCategory({
    page: pageFromUrl,
    perPage: 10,
  });
  const [id, setId] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();

  const { mutateAsync: deleteCategory, isPending: isDeleting } =
    useDeleteCategory();
  const handleOpen = (id: number) => {
    setId(id);
    onOpen();
  };
  const [keyword, setKeyword] = useState<string>("");

  const { setHeaderData } = useStoreHeaderData();

  useEffect(() => {
    setHeaderData({
      heading: "Category",
      description: "Manage your categories here",
    });
  }, [setHeaderData]);

  const columns = [
    {
      header: "S.N",
      accessorKey: "sn",
      cell: ({ row }: any) => {
        return <Text> {10 * (pageIndex - 1) + (row.index + 1)} </Text>;
      },
      enableSorting: false,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: any) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.name}
          </Text>
        );
      },
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }: any) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.description}
          </Text>
        );
      },
      enableSorting: false,
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: any) => {
        return (
          <Stack align={"center"}>
            <Image objectFit={"cover"} src={row.original.image} boxSize={16} />
          </Stack>
        );
      },
      enableSorting: false,
    },
    {
      header: "Status",
      accessorKey: "is_active",
      enableSorting: false,

      cell: ({ row }: any) => {
        const { is_active, id } = row.original;
        return (
          <StatusSwitch
            id={id as string}
            isActive={is_active}
            model="category"
          />
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: any) => {
        return (
          <HStack>
            <ActionColumn
              handleEdit={() => handleFormOpen(row.original.id)}
              handleDelete={() => handleOpen(row.original.id)}
            />
          </HStack>
        );
      },
    },
  ];

  const handleDelete = async () => {
    if (id) {
      await deleteCategory({ id });
      onClose();
      setId(null);
    }
  };

  const handleFormOpen = (id: number) => {
    setId(id);
    onFormOpen();
  };

  return (
    <Flex flexDir={"column"} gap={4}>
      <HStack justify={"space-between"} align={"center"} mb={4}>
        <SearchInput
          placeholder="Search Category"
          onSearch={(value) => setKeyword(value)}
          maxW={"300px"}
        />
        <HStack gap={4} align={"center"}>
          <AddButton onClick={onFormOpen} />
        </HStack>
      </HStack>
      <CategoryForm
        isOpen={isFormOpen}
        onClose={() => {
          onFormClose();
          setId(null);
        }}
        id={id}
      />
      <DataTable
        columns={columns}
        data={category?.data.rows ?? []}
        isLoading={isLoading || isFetching}
        count={category?.data.count ?? 0}
        pagination={
          category?.data.count ?? 0 > 0
            ? {
                manual: true,
                pageCount: category?.data?.pagination?.last_page ?? 1,
                totalRows: category?.data?.pagination?.total ?? 1,
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
        onClose={() => {
          onClose();
          setId(null);
        }}
        onDelete={handleDelete}
        heading="Delete Category"
        isDeleting={isDeleting}
        message="Are you sure you want to delete this category?"
      />
    </Flex>
  );
};

export default Category;
