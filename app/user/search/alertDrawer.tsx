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
              <Flex direction={"column"}>
                <Drawer.Title>{props.data?.nm_alert}</Drawer.Title>
                <Tag.Root
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
              </Flex>
            </Drawer.Header>
            <Drawer.Body>
              <Flex direction={"column"} gap={2}>
                <Heading size={"md"}>Descrição / Instrução</Heading>
                <Text>{props.data?.desc_alert}</Text>
                <Separator />
                <Flex direction={"column"} gap={2}>
                  <Heading size={"md"}>Query</Heading>
                  {props.data?.query_alert == "" ? (
                    <Text truncate={true} color={"fg.muted"}>
                      Não existe query para este alerta.
                    </Text>
                  ) : (
                    <Code variant={"surface"} maxWidth={"full"}>
                      <Text >{props.data?.query_alert}</Text>
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
