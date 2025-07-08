"use client";

import { Center, Field, Flex, Heading, Input, InputGroup } from "@chakra-ui/react";
import ClientCard from "./clientCard";
import { LuSearch } from "react-icons/lu";

export default function ShowClientInfo() {
  return (
    <Flex w={"vw"} padding={6} direction={"column"} gap={4}>
      <Heading size={"4xl"} fontWeight={"extrabold"}>
        Clientes
      </Heading>
      <Flex direction={"column"} w={"full"} gap={2}>
        <Flex>
          <Field.Root>
            <InputGroup startElement={<LuSearch />}>
              <Input size={"sm"} placeholder="Buscar..." />
            </InputGroup>
          </Field.Root>
        </Flex>
        <ClientCard />
      </Flex>
    </Flex>
  );
}
