import { ActionColumn, DataTable, StatusSwitch } from "@/components/DataTable";

import { AddButton } from "@/components/Button";
import { SearchInput } from "@/components/Form";
import { DeleteAlert } from "@/components/Form/Modal";
import {
  useDeleteSubCategory,
  useFetchSubCategory,
} from "@/services/service-subcategory";
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
import SubCategoryForm from "./Form";

const SubCategory = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const pageFromUrl = Number(urlParams.get("page")) || 1;

  const [pageIndex, setPageIndex] = useState(1);

  const { data: subCategory, isPending: isLoading } = useFetchSubCategory({
    page: pageFromUrl,
    perPage: 10,
  });
  const [id, setId] = useState<number | null>(null);

  const [keyword, setKeyword] = useState<string>("");
  const { setHeaderData } = useStoreHeaderData();

  useEffect(() => {
    setHeaderData({
      heading: "Sub Category",
      description: "Welcome to the subCategory",
    });
  }, [setHeaderData]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();

  const { mutateAsync: deleteSubCategory, isPending: isDeleting } =
    useDeleteSubCategory();
  const handleOpen = (id: number) => {
    setId(id);
    onOpen();
  };

  useEffect(() => {
    setPageIndex(pageFromUrl);
  }, [pageFromUrl]);

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
            {row.original.name}{" "}
          </Text>
        );
      },
    },
    {
      header: "Category",
      accessorKey: "category_id.name",
      cell: ({ row }: any) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.category?.name}
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
            {row.original.description}{" "}
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
            <Image src={row.original.image} boxSize={10} />
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
            model="subcategory"
          />
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: any) => {
        const handleFormOpen = (id: number) => {
          setId(id);
          onFormOpen();
        };
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
      await deleteSubCategory({ id });
      onClose();
      setId(null);
    }
  };

  return (
    <Flex flexDir={"column"} gap={4}>
      <HStack justify={"space-between"} align={"center"} mb={4}>
        <SearchInput
          onSearch={(value) => setKeyword(value)}
          placeholder="Search SubCategory"
          maxW={"300px"}
        />
        <HStack gap={4} align={"center"}>
          <AddButton onClick={onFormOpen} />
        </HStack>
      </HStack>
      <SubCategoryForm
        isOpen={isFormOpen}
        onClose={() => {
          onFormClose();
          setId(null);
        }}
        id={id}
        setId={setId}
      />
      <DataTable
        columns={columns}
        data={subCategory?.data.rows ?? []}
        count={subCategory?.data.count ?? 0}
        isLoading={isLoading}
        pagination={
          subCategory?.data.count ?? 0 > 10
            ? {
                manual: true,
                pageCount: subCategory?.data?.pagination?.last_page ?? 1,
                totalRows: subCategory?.data?.pagination?.total ?? 0,
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
        heading="Delete SubCategory"
        isDeleting={isDeleting}
        message="Are you sure you want to delete this subCategory?"
      />
    </Flex>
  );
};

export default SubCategory;
