import { AddButton } from "@/components/Button";
import { ActionColumn, DataTable } from "@/components/DataTable";
import { SearchInput } from "@/components/Form";
import { DeleteAlert } from "@/components/Form/Modal";
import {
  useDeleteSpecification,
  useFetchSpecifications,
} from "@/services/service-specification";
import { useStoreHeaderData } from "@/store/headerStore";
import { Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SpecificationForm from "./Form";

const Specification = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const pageFromUrl = Number(urlParams.get("page")) || 1;
  const [pageIndex, setPageIndex] = useState(1);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isFormOpen,
    onClose: onFormClose,
    onOpen: onFormOpen,
  } = useDisclosure();
  const [keyword, setKeyword] = useState<string>("");
  const [id, setId] = useState<number | null>(null);
  const { setHeaderData } = useStoreHeaderData();

  useEffect(() => {
    setHeaderData({
      heading: "Specification",
      description: "Welcome to the specification",
    });
  }, [setHeaderData]);

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
      header: "Header",
      accessorKey: "header",
      cell: ({ row }: any) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.header}{" "}
          </Text>
        );
      },
    },
    {
      header: "Sub Header",
      accessorKey: "subheaders",
      cell: ({ row }: any) => {
        return (
          <Text textTransform={"capitalize"} fontWeight={500}>
            {row.original.subheaders.join(", ")}{" "}
          </Text>
        );
      },
    },

    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: any) => {
        const handleOpen = (id: number) => {
          setId(id);
          onOpen();
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

  const { data: specifications, isPending: isPending } = useFetchSpecifications(
    {
      page: pageFromUrl,
      perPage: 10,
      keyword: "",
    }
  );

  const { mutateAsync: deleteSpecification, isPending: isDeleting } =
    useDeleteSpecification();

  const handleDelete = async () => {
    if (id) {
      await deleteSpecification({ id });
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
          placeholder="Search Specification"
          onSearch={(value) => setKeyword(value)}
          maxW={"300px"}
        />
        <HStack gap={4} align={"center"}>
          <AddButton onClick={onFormOpen} />
        </HStack>
      </HStack>
      <SpecificationForm
        isOpen={isFormOpen}
        onClose={() => {
          onFormClose();
          setId(null);
        }}
        id={id}
      />
      <DataTable
        columns={columns}
        data={specifications?.data.rows ?? []}
        isLoading={isPending}
        count={specifications?.data.count ?? 0}
        pagination={
          specifications?.data.count ?? 0 > 0
            ? {
                manual: true,
                pageCount: specifications?.data?.pagination?.last_page ?? 1,
                totalRows: specifications?.data?.pagination?.total ?? 1,
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
        heading="Delete Specification"
        isDeleting={isDeleting}
        message="Are you sure you want to delete this specification?"
      />
    </Flex>
  );
};

export default Specification;
