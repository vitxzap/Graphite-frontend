import {
  CloseButton,
  Drawer,
  Flex,
  Heading,
  Portal,
  Tag,
} from "@chakra-ui/react";
import { LuCircleUser } from "react-icons/lu";
const AlertDrawer = (props: object) => {
  return (
    <Drawer.Root size={"lg"}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content offset={"normal"}>
            <Drawer.Header maxWidth={"10/12"}>
              <Flex direction={"column"}>
                <Drawer.Title></Drawer.Title>
                <Tag.Root
                  size={"lg"}
                  variant={"solid"}
                  colorPalette={"blue"}
                  width={"max-content"}
                >
                  <Tag.StartElement>
                    <LuCircleUser />
                  </Tag.StartElement>
                  <Tag.Label></Tag.Label>
                </Tag.Root>
              </Flex>
            </Drawer.Header>
            <Drawer.Body>
              <Heading>p</Heading>
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
