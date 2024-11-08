import { ActionColumn, DataTable, StatusSwitch } from "@/components/DataTable";

import { DeleteAlert } from "@/components/Form/Modal";

import { AddButton } from "@/components/Button";
import { SearchInput } from "@/components/Form";
import { useDeleteColor, useFetchColor } from "@/services/service-color";
import { useStoreHeaderData } from "@/store/headerStore";
import { Box, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ColorForm from "./Form";

const Color = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const pageFromUrl = Number(urlParams.get("page")) || 1;

  const [pageIndex, setPageIndex] = useState(1);

  const { data: color, isPending: isLoading } = useFetchColor({
    page: pageFromUrl,
  });
  const [id, setId] = useState<number | null>(null);

  const [keyword, setKeyword] = useState<string>("");
  const { setHeaderData } = useStoreHeaderData();

  useEffect(() => {
    setHeaderData({
      heading: "Color",
      description: "Welcome to the color",
    });
  }, [setHeaderData]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();

  const { mutateAsync: deleteColor, isPending: isDeleting } = useDeleteColor();
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
            {row.original.name}
          </Text>
        );
      },
    },

    {
      header: "Hex Code",
      accessorKey: "hex_value",
      cell: ({ row }: any) => {
        const { hex_value } = row.original;
        return (
          <Box
            boxSize={12}
            bg={hex_value}
            borderRadius={5}
            boxShadow={"md"}
            mx={"auto"}
          />
        );
      },
    },

    {
      header: "Status",
      accessorKey: "is_active",
      enableSorting: false,

      cell: ({ row }: any) => {
        const { is_active, id } = row.original;
        return (
          <StatusSwitch id={id as string} isActive={is_active} model="color" />
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
      await deleteColor({ id });
      onClose();
      setId(null);
    }
  };

  return (
    <Flex flexDir={"column"} gap={4}>
      <HStack justify={"space-between"} align={"center"} mb={4}>
        <SearchInput
          placeholder="Search Color"
          onSearch={(value) => setKeyword(value)}
          maxW={"300px"}
        />
        <HStack gap={4} align={"center"}>
          <AddButton onClick={onFormOpen} />
        </HStack>
      </HStack>
      <ColorForm
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
        data={color?.data.rows ?? []}
        count={color?.data.count ?? 0}
        isLoading={isLoading}
        pagination={
          color?.data.count ?? 0 > 10
            ? {
                manual: true,
                pageCount: color?.data?.pagination?.last_page ?? 1,
                totalRows: color?.data?.pagination?.total ?? 0,
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
        heading="Delete Color"
        isDeleting={isDeleting}
        message="Are you sure you want to delete this color?"
      />
    </Flex>
  );
};

export default Color;
