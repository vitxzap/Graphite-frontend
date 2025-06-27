"use client";
import {
  Flex,
  For,
  Heading,
  Skeleton,
  Table,
  Text,
  Portal,
  EmptyState,
  DialogRootProvider,
  Dialog,
  VStack,
  useDialog,
  Tag,
  CloseButton,
  Input,
  Button,
  Field,
  Spinner,
  Code,
  InputGroup,
  Icon,
  Textarea,
  Select,
  Fieldset,
  Combobox,
  createListCollection,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { HiPlus } from "react-icons/hi";
import { LuClipboardPenLine, LuSearch } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";
import { TbError404 } from "react-icons/tb";

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
interface createProblem {
  problemName: string;
  problemDescription: string;
  problemQuery?: string;
  clientId?: number;
}
interface client {
  nm_client: string;
  id_client: string;
}
async function fetchAllProblems() {
  try {
    const rawData = await fetch("/api/problem", {
      method: "GET",
    });
    if (!rawData.ok) {
      throw new Error("Something went wrong");
    }
    const data = await rawData.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export default function Search() {
  const dialog = useDialog();
  const { contains } = useFilter({ sensitivity: "base" });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["problems"],
    queryFn: fetchAllProblems,
  });
  const frameworks = createListCollection({
    items: [
      { label: "Pepsico BR", value: "react" },
      { label: "Mondelez BR", value: "vue" },
      { label: "BRF", value: "angular" },
      { label: "CBL", value: "svelte" },
    ],
  });
  const { collection, filter } = useListCollection({
    initialItems: frameworks,
    filter: contains,
  });

  return (
    <Flex h={"vh"} w={"vw"} padding={6} direction={"column"} gap={4}>
      <Dialog.RootProvider value={dialog} scrollBehavior={"inside"} size={"lg"}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Flex direction={"column"}>
                  <Dialog.Title>Documentar alerta</Dialog.Title>
                </Flex>
              </Dialog.Header>
              <Dialog.Body>
                <form>
                  <Fieldset.Root>
                    <Fieldset.Content>
                      <Field.Root required>
                        <Field.Label>
                          <Text fontSize={"sm"}>Nome</Text>
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          type="text"
                          size="sm"
                          placeholder="Nomeie o problema"
                        />
                        <Field.ErrorText></Field.ErrorText>
                      </Field.Root>
                      <Field.Root required>
                        <Field.Label>
                          <Text fontSize="sm">Cliente</Text>{" "}
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <Combobox.Root
                          openOnClick
                          collection={collection}
                          onInputValueChange={(e) => filter(e.inputValue)}
                          width="full"
                        >
                          <Combobox.Control>
                            <Combobox.Input placeholder="Toque para buscar" />
                            <Combobox.IndicatorGroup>
                              <Combobox.ClearTrigger />
                              <Combobox.Trigger />
                            </Combobox.IndicatorGroup>
                          </Combobox.Control>
                          <Combobox.Positioner>
                            <Combobox.Content>
                              <Combobox.Empty>Nada encontrado</Combobox.Empty>
                              {collection.items.map((item: any) => (
                                <Combobox.Item item={item} key={item.value}>
                                  {item.label}
                                  <Combobox.ItemIndicator />
                                </Combobox.Item>
                              ))}
                            </Combobox.Content>
                          </Combobox.Positioner>
                        </Combobox.Root>
                        <Field.ErrorText></Field.ErrorText>
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>
                          <Text fontSize="sm">Descrição / Instrução</Text>
                        </Field.Label>
                        <Textarea
                          size="sm"
                          placeholder="Descreva o problema ou instrua a resolução"
                          autoresize
                          maxH={165}
                          maxLength={700}
                        />
                        <Field.HelperText>Max 700 caracteres.</Field.HelperText>
                      </Field.Root>

                      <Field.Root>
                        <Field.Label>
                          <Text fontSize="sm">Query</Text>
                        </Field.Label>
                        <Textarea
                          fontFamily="mono"
                          size="sm"
                          placeholder="Query de solução para o problema"
                          autoresize
                          maxH={165}
                          maxLength={6000}
                        />
                        <Field.HelperText>
                          Max 6.000 caracteres.
                        </Field.HelperText>
                      </Field.Root>
                    </Fieldset.Content>
                  </Fieldset.Root>
                </form>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="subtle" colorPalette={"red"}>
                    Cancelar
                  </Button>
                </Dialog.ActionTrigger>
                <Button colorPalette={"green"}>
                  <Icon scale={0.8}>
                    <LuClipboardPenLine />
                  </Icon>
                  Documentar
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
      <Heading size={"4xl"} fontWeight={"extrabold"}>
        Buscar alertas
      </Heading>
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
                  onClick={() => {
                    dialog.setOpen(true);
                  }}
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
                      <Table.Cell>{item.desc_problem}</Table.Cell>
                      <Table.Cell>
                        <Tag.Root>
                          <Tag.Label>{item.tb_client.nm_client}</Tag.Label>
                        </Tag.Root>
                      </Table.Cell>
                      <Table.Cell textAlign="end">
                        <Code variant={"surface"}>{item.query_problem}</Code>
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
        {data == undefined && data?.length >= 1 ? (
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
                    A busca pelas documentações não encontrou nenhum dado. Tente
                    novamente mais tarde.
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
