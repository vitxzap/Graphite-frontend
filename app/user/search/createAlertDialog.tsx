import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Flex,
  Icon,
  Input,
  Portal,
  Text,
  Textarea,
} from "@chakra-ui/react";
import ClientCombobox from "./clientCombobox";
import { LuClipboardPenLine } from "react-icons/lu";
import { DialogProps } from "./types";
const CreateAlertDialog = (props: DialogProps) => {
  return (
    <Dialog.Root open={props.isOpen} scrollBehavior={"inside"} size={"lg"}>
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
                        placeholder="Nomeie o alerta"
                      />
                      <Field.ErrorText></Field.ErrorText>
                    </Field.Root>
                    <Field.Root required>
                      <Field.Label>
                        <Text fontSize="sm">Cliente</Text>{" "}
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <ClientCombobox />
                      <Field.ErrorText></Field.ErrorText>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>
                        <Text fontSize="sm">Descrição / Instrução</Text>
                      </Field.Label>
                      <Textarea
                        size="sm"
                        placeholder="Descreva o alerta ou instrua a resolução"
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
                        placeholder="Query de solução para o alerta"
                        autoresize
                        maxH={165}
                        maxLength={6000}
                      />
                      <Field.HelperText>Max 6.000 caracteres.</Field.HelperText>
                    </Field.Root>
                  </Fieldset.Content>
                </Fieldset.Root>
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="subtle"
                  colorPalette={"red"}
                  onClick={props.onClose}
                >
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
              <CloseButton onClick={props.onClose} size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default CreateAlertDialog;
