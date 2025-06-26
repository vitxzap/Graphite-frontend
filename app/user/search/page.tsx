"use client";
import DefaultBox from "@/components/defaultBox";
import {
  Flex,
  For,
  Heading,
  Skeleton,
  Table,
  Portal,
  Tag,
  CloseButton,
  Input,
  Button,
  Field,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";

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
  const { data, status, isLoading } = useQuery({
    queryKey: ["problems"],
    queryFn: fetchAllProblems,
  });
  return (
    <Flex h={"vh"} w={"vw"} padding={6} direction={"column"} gap={4}>
      <Heading size={"4xl"} fontWeight={"extrabold"}>
        Buscar
      </Heading>
      <Flex>
        <Flex direction={"row"} width={"full"} gap={4}>
          <Field.Root>
            <Input size={"sm"} placeholder="Buscar..." />
          </Field.Root>
          <Button width={"min"} size={"sm"}>
            <HiPlus />
            Criar
          </Button>
        </Flex>
      </Flex>
      <Flex w={"100%"} height={"100%"} direction={"column"}>
        {isLoading == true ? (
          <Flex width={"full"} align={"center"} justify={"center"}>
            <Spinner size={"md"} />
          </Flex>
        ) : (
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
                      {item.query_problem}
                    </Table.Cell>
                  </Table.Row>
                )}
              </For>
            </Table.Body>
          </Table.Root>
        )}
      </Flex>
    </Flex>
  );
}
