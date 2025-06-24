"use client";
import {
  Flex,
  Button,
  Card,
  Center,
  Field,
  Stack,
  Input,
  Table,
  Tag,
  Heading,
  Select,
  Portal,
  createListCollection,
  Separator,
  Drawer,
  CloseButton,
  Skeleton,
} from "@chakra-ui/react";

export default function Search() {
  return (
    <Flex h={"vh"} w={"vw"} padding={6} direction={"column"} gap={2}>
      <Heading size={"4xl"} fontWeight={"extrabold"}>
        Buscar
      </Heading>
      <Flex w={"100%"} height={"100%"}>
        <Skeleton flex={"1"} boxSize={"100%"}></Skeleton>
      </Flex>
    </Flex>
  );
}
