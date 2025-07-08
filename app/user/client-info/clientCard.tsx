import {
  Button,
  Card,
  Center,
  Flex,
  For,
  Grid,
  Spinner,
  Tag,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

type ClientInfo = {
  id_client: number;
  nm_client: string;
  id_server: number;
  num_project: number;
};

async function getClientCardInfo() {
  try {
    const data = await fetch("/api/client");
    if (!data.ok) {
      throw new Error("Something went wrong.");
    }
    const response = await data.json();
    return response;
  } catch (e) {
    throw e;
  }
}

export default function ClientCard(props: any) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["clientCard"],
    queryFn: getClientCardInfo,
  });
  return (
    <Grid w="full" py={2} gap={4} templateColumns={"repeat(auto-fit, minmax(calc(33.333% - 24px), 1fr))"}>
      {isLoading == true ? (
        <Center w="full">
          <Spinner size={"lg"} />
        </Center>
      ) : (
        <For each={data}>
          {(client: ClientInfo) => {
            return (
              <Card.Root h="max" size={"lg"} cursor={"pointer"} _hover={{bg: "bg.muted"}}>
                <Card.Body flexWrap={"wrap"}>
                  <Card.Title truncate>{client.nm_client}</Card.Title>
                  <Flex gap={1} pb={4}>
                    <Tag.Root>  
                      <Tag.Label>Provider</Tag.Label>
                    </Tag.Root>
                    <Tag.Root variant="solid">
                      <Tag.Label>Status</Tag.Label>
                    </Tag.Root>
                  </Flex>
                  <Flex direction={"column"} gap={2}>
                    <Card.Description>
                      Lorem ipsum dolor sit amet
                    </Card.Description>
                  </Flex>
                </Card.Body>
              </Card.Root>
            );
          }}
        </For>
      )}
    </Grid>
  );
}
