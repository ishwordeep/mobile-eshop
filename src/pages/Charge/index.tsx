import { AddButton } from "@/components/Button";
import { ActionColumn, DataTable } from "@/components/DataTable";
import { SearchInput } from "@/components/Form";
import { DeleteAlert } from "@/components/Form/Modal";
import { useDeleteCharge, useFetchCharges } from "@/services/service-delivery";
import { useStoreHeaderData } from "@/store/headerStore";
import { Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChargeForm from "./Form";

const Charge = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const pageFromUrl = Number(urlParams.get("page")) || 1;
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    setPageIndex(pageFromUrl);
  }, [pageFromUrl]);

  const {
    data: charge,
    isPending: isLoading,
    isFetching,
  } = useFetchCharges({
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

  const { mutateAsync: deleteCharge, isPending: isDeleting } =
    useDeleteCharge();
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
      header: "Address",
      accessorKey: "address",
      cell: ({ row }: any) => {
        return <Text> {row.original.address} </Text>;
      },
    },
    {
      header: "Charge",
      accessorKey: "charge",
      cell: ({ row }: any) => {
        return <Text>{row.original.charge}</Text>;
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
      await deleteCharge({ id });
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
      <ChargeForm
        isOpen={isFormOpen}
        onClose={() => {
          onFormClose();
          setId(null);
        }}
        id={id}
      />
      <DataTable
        columns={columns}
        data={charge?.data.rows ?? []}
        isLoading={isLoading || isFetching}
        count={charge?.data.count ?? 0}
        pagination={
          charge?.data.count ?? 0 > 0
            ? {
                manual: true,
                pageCount: charge?.data?.pagination?.last_page ?? 1,
                totalRows: charge?.data?.pagination?.total ?? 1,
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

export default Charge;
