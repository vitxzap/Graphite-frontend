import {
  CloseButton,
  Drawer,
  Flex,
  Heading,
  Portal,
  Text,
  Tag,
  Separator,
  Code,
  Clipboard,
  IconButton,
  Popover,
  DataList,
} from "@chakra-ui/react";

import { LuCircleUser } from "react-icons/lu";
import { Alert } from "./types";
type AlertProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Alert | null;
};
const AlertDrawer = (props: AlertProps) => {
  return (
    <Drawer.Root size={"lg"} open={props.isOpen} onOpenChange={props.onClose}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content offset={"normal"}>
            <Drawer.Header maxWidth={"10/12"}>
              <Flex direction={"column"} gap={1}>
                <Drawer.Title>{props.data?.nm_alert}</Drawer.Title>
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <Tag.Root
                      cursor={"pointer"}
                      _hover={{ bgColor: "blue.emphasized" }}
                      size={"lg"}
                      variant={"solid"}
                      colorPalette={"blue"}
                      width={"max-content"}
                    >
                      <Tag.StartElement>
                        <LuCircleUser />
                      </Tag.StartElement>
                      <Tag.Label>{props.data?.tb_client.nm_client}</Tag.Label>
                    </Tag.Root>
                  </Popover.Trigger>
                  <Portal>
                    <Popover.Positioner>
                      <Popover.Content>
                        <Popover.Arrow />
                        <Popover.Body>
                          <Popover.Title fontWeight="medium">
                            <Heading size={"sm"}>
                              {props.data?.tb_client.nm_client}
                            </Heading>
                          </Popover.Title>
                          <Flex mt={2}>
                            <DataList.Root size="sm">
                              <DataList.Item>
                                <DataList.ItemLabel>Host</DataList.ItemLabel>
                                <DataList.ItemValue>
                                  {props.data?.tb_client.tb_server.tb_host.nm_host}
                                </DataList.ItemValue>
                              </DataList.Item>
                              <DataList.Item>
                                <DataList.ItemLabel>Server</DataList.ItemLabel>
                                <DataList.ItemValue>
                                  {props.data?.tb_client.tb_server.nm_server}
                                </DataList.ItemValue>
                              </DataList.Item>
                              <DataList.Item>
                                <DataList.ItemLabel>Provider</DataList.ItemLabel>
                                <DataList.ItemValue>
                                  {props.data?.tb_client.tb_server.tb_host.tb_cloud_provider.nm_cloud_provider}
                                </DataList.ItemValue>
                              </DataList.Item>
                            </DataList.Root>
                          </Flex>
                        </Popover.Body>
                      </Popover.Content>
                    </Popover.Positioner>
                  </Portal>
                </Popover.Root>
              </Flex>
            </Drawer.Header>
            <Drawer.Body>
              <Flex direction={"column"} gap={2}>
                <Heading size={"xl"}>Descrição / Instrução</Heading>
                <Text>{props.data?.desc_alert}</Text>
                <Separator />
                <Flex direction={"column"} gap={2}>
                  <Flex gap={2}>
                    <Heading size={"xl"}>Query</Heading>
                    <Clipboard.Root value={props.data?.query_alert}>
                      <Clipboard.Trigger asChild>
                        <IconButton variant="surface" size="xs" scale={0.9}>
                          <Clipboard.Indicator />
                        </IconButton>
                      </Clipboard.Trigger>
                    </Clipboard.Root>
                  </Flex>
                  {props.data?.query_alert == "" ? (
                    <Text truncate={true} color={"fg.muted"}>
                      Não existe query para este alerta.
                    </Text>
                  ) : (
                    <Code variant={"surface"} p={2} maxWidth={"full"}>
                      <Text>{props.data?.query_alert}</Text>
                    </Code>
                  )}
                </Flex>
              </Flex>
            </Drawer.Body>
            <Drawer.Footer></Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="md" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default AlertDrawer;
