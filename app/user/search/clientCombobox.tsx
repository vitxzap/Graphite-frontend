"use client";
import {
  Combobox,
  HStack,
  Spinner,
  useFilter,
  Text,
  useListCollection,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
async function fetchAllClients() {
  try {
    const rawData = await fetch("/api/client");
    if (!rawData.ok) {
      throw new Error("Something went wrong");
    }
    const data = await rawData.json();
    return data;
  } catch (err) {
    throw err;
  }
}
type Client = {
  nm_client: string;
  id_client: string;
};
const ClientCombobox = () => {
  const { contains } = useFilter({ sensitivity: "base" });
  const { data, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchAllClients,
  });
  const { collection, filter } = useListCollection<Client>({
    initialItems: data,
    itemToString: (item) => item.nm_client,
    itemToValue: (item) => item.id_client as string,
    filter: contains,
  });
  return (
    <Combobox.Root
      collection={collection}
      openOnClick={true}
      onClick={() => {
        filter("");
      }}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="full"
    >
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content maxHeight={"170px"}>
          {isLoading == true ? (
            <HStack>
              <Spinner size={"xs"} />
              <Text>Carregando...</Text>
            </HStack>
          ) : (
            collection.items.map((item) => (
              <Combobox.Item item={item} key={item.id_client}>
                {item.nm_client}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))
          )}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};

export default ClientCombobox;
