"use client";
import {
  Flex,
  For,
  Heading,
  EmptyState,
  VStack,
  Tag,
  Table,
  Input,
  Button,
  Field,
  Text,
  Spinner,
  Code,
  InputGroup,
  useDisclosure,
  Portal,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { HiPlus } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";
import { TbError404 } from "react-icons/tb";
import CreateAlertDialog from "./createAlertDialog";
import AlertDrawer from "./alertDrawer";
import { useState } from "react";
import { Alert } from "./types";

async function fetchAllAlerts() {
  try {
    const rawData = await fetch("/api/alert", {
      method: "GET",
    });
    if (!rawData.ok) {
      throw new Error("Something went wrong");
    }
    const data = await rawData.json();
    if (data.length == 0) {
      return [];
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export default function Search() {
  const { open, onOpen, onClose } = useDisclosure();
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const {
    open: AlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["alerts"],
    queryFn: fetchAllAlerts,
  });
  return (
    <Flex
      h={"vh"}
      w={"vw"}
      overflowY={"hidden"}
      padding={6}
      maxH={"vh"}
      direction={"column"}
      gap={4}
    >
      <Heading size={"4xl"} fontWeight={"extrabold"}>
        Buscar alertas
      </Heading>
      <Portal>
        <CreateAlertDialog isOpen={open} onClose={onClose} />
        <AlertDrawer
          isOpen={AlertOpen}
          onClose={onAlertClose}
          data={selectedAlert}
        />
      </Portal>
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
          <Flex direction={"column"} width={"full"} h={"100%"} gap={4}>
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
            <Flex
              direction={"column"}
              width={"full"}
              height={"100%"}
              overflowY={"auto"}
            >
              <Table.ScrollArea
                display={"flex"}
                style={{ maxHeight: "82%" }}
                rounded={"md"}
                borderWidth={"1px"}
              >
                <Table.Root
                  size="md"
                  variant={"outline"}
                  interactive
                  stickyHeader={true}
                >
                  <Table.Header zIndex={1}>
                    <Table.Row>
                      <Table.ColumnHeader>Nome</Table.ColumnHeader>
                      <Table.ColumnHeader>Description</Table.ColumnHeader>
                      <Table.ColumnHeader>Cliente</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="end">
                        Query
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <For each={data}>
                      {(item: Alert, index) => (
                        <Table.Row
                          key={index}
                          cursor={"pointer"}
                          onClick={() => {
                            onAlertOpen();
                            setSelectedAlert(item);
                          }}
                        >
                          <Table.Cell>{item.nm_alert}</Table.Cell>
                          <Table.Cell maxWidth={"36em"}>
                            {item.desc_alert.length == 0 ? (
                              <Text color={"fg.muted"}>Sem descrição</Text>
                            ) : (
                              <Text truncate maxW={"80%"}>
                                {item.desc_alert}
                              </Text>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            <Tag.Root>
                              <Tag.Label>{item.tb_client.nm_client}</Tag.Label>
                            </Tag.Root>
                          </Table.Cell>
                          <Table.Cell textAlign="end">
                            {item.query_alert == "" ? (
                              <Text color={"fg.muted"}>Sem query</Text>
                            ) : (
                              <Code variant={"surface"}>
                                <Text maxWidth={"20vw"} truncate>
                                  {item.query_alert}
                                </Text>
                              </Code>
                            )}
                          </Table.Cell>
                        </Table.Row>
                      )}
                    </For>
                  </Table.Body>
                </Table.Root>
              </Table.ScrollArea>
            </Flex>
          </Flex>
        ) : (
          <></>
        )}
        {data == "" && isLoading == false ? (
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
                    <Flex
                      direction={"column"}
                      align={"center"}
                      justify={"center"}
                      gap={3}
                    >
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
