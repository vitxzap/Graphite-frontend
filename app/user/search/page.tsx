"use client";
import {
  Flex,
  For,
  Heading,
  Table,
  EmptyState,
  VStack,
  Tag,
  Input,
  Button,
  Field,
  Text,
  Spinner,
  Code,
  InputGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { HiPlus } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";
import { TbError404 } from "react-icons/tb";
import CreateAlertDialog from "./createAlertDialog";

type Problem = {
  nm_problem: string;
  id_problem: number;
  desc_problem: string;
  query_problem: string;
  tb_client: {
    id_client: number;
    nm_client: string;
  };
};
async function fetchAllAlerts() {
  try {
    const rawData = await fetch("/api/problem", {
      method: "GET",
    });
    if (!rawData.ok) {
      throw new Error("Something went wrong");
    }
    const data = await rawData.json();
    if (data.length == 0) {
      return 0;
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export default function Search() {
  const { open, onOpen, onClose } = useDisclosure();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["problems"],
    queryFn: fetchAllAlerts,
  });
  return (
    <Flex h={"vh"} w={"vw"} padding={6} direction={"column"} gap={4}>
      <Heading size={"4xl"} fontWeight={"extrabold"}>
        Buscar alertas
      </Heading>
      <CreateAlertDialog isOpen={open} onClose={onClose} />
      <Flex w={"100%"} height={"100%"} direction={"column"}>
        {isLoading == true && isError == false ? (
          <Flex
            width={"full"}
            align={"center"}
            height={"full"}
            justify={"center"}
            gap={5}
          >
            <Spinner size={"lg"} />
          </Flex>
        ) : (
          <></>
        )}
        {isLoading == false && isError == true ? (
          <Flex
            height={"full"}
            width={"full"}
            align={"center"}
            justify={"center"}
          >
            <EmptyState.Root color={"red"} size={"lg"}>
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <TbError404 color="red" />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title>
                    Algo não saiu como esperado...
                  </EmptyState.Title>
                  <EmptyState.Description>
                    Verifique sua conexão de internet. Caso esteja normal,
                    relaxa que o problema é com a gente.
                  </EmptyState.Description>
                </VStack>
              </EmptyState.Content>
            </EmptyState.Root>
          </Flex>
        ) : (
          <></>
        )}
        {isLoading == false && isError == false && data.length > 0 ? (
          <Flex direction={"column"} width={"full"} height={"full"} gap={4}>
            <Flex>
              <Flex direction={"row"} width={"full"} gap={4}>
                <Field.Root>
                  <InputGroup startElement={<LuSearch />}>
                    <Input size={"sm"} placeholder="Buscar..." />
                  </InputGroup>
                </Field.Root>
                <Button
                  width={"min"}
                  size={"sm"}
                  colorPalette={"green"}
                  onClick={onOpen}
                >
                  <HiPlus />
                  Nova Documentação
                </Button>
              </Flex>
            </Flex>
            <Table.Root
              size="md"
              variant={"outline"}
              rounded={"sm"}
              interactive
              stickyHeader
            >
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Nome</Table.ColumnHeader>
                  <Table.ColumnHeader>Description</Table.ColumnHeader>
                  <Table.ColumnHeader>Cliente</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">Query</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <For each={data}>
                  {(item: Problem, index) => (
                    <Table.Row key={index} cursor={"pointer"}>
                      <Table.Cell>{item.nm_problem}</Table.Cell>
                      <Table.Cell maxWidth={"36em"}>
                        <Text truncate>{item.desc_problem}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Tag.Root>
                          <Tag.Label>{item.tb_client.nm_client}</Tag.Label>
                        </Tag.Root>
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        <Code variant={"surface"} maxWidth={"25em"}>
                          <Text truncate={true}>{item.query_problem}</Text>
                        </Code>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </For>
              </Table.Body>
            </Table.Root>
          </Flex>
        ) : (
          <></>
        )}
        {data == 0 ? (
          <Flex
            height={"full"}
            width={"full"}
            align={"center"}
            justify={"center"}
          >
            <EmptyState.Root color={"ActiveCaption"} size={"lg"}>
              <EmptyState.Content>
                <EmptyState.Indicator color={"InactiveCaptionText"}>
                  <MdErrorOutline />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title>
                    Parece que não há nada aqui...
                  </EmptyState.Title>
                  <EmptyState.Description>
                    <Flex direction={"column"} align={"center"} justify={"center"}  gap={3}>
                      <Text maxW={"60%"}>
                        A busca pelas documentações não encontrou nenhum dado.
                        Tente novamente mais tarde, ou crie uma nova
                        documentação!
                      </Text>
                      <Button
                        width={"min"}
                        size={"sm"}
                        colorPalette={"green"}
                        onClick={onOpen}
                      >
                        <HiPlus />
                        Nova Documentação
                      </Button>
                    </Flex>
                  </EmptyState.Description>
                </VStack>
              </EmptyState.Content>
            </EmptyState.Root>
          </Flex>
        ) : (
          <></>
        )}
      </Flex>
    </Flex>
  );
}
