"use client";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Flex,
  Icon,
  Input,
  InputGroup,
  Portal,
  Text,
  Textarea,
} from "@chakra-ui/react";
import ClientCombobox from "./clientCombobox";
import { LuClipboardPenLine } from "react-icons/lu";
import { CreateAlertInput, DialogProps, formErrorHandler } from "./types";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
const CreateAlertDialog = (props: DialogProps) => {
  const methods = useForm<CreateAlertInput>();
  const [alertData, setAlertData] = useState<CreateAlertInput>();
  const { refetch, isLoading } = useQuery({
    queryKey: ["postAlert", alertData],
    queryFn: async ({ queryKey }) => {
      const [, data] = queryKey;
        const c = await fetch("/api/alert", {
          method: "POST",
          body: JSON.stringify({
            alertName: data.name,
            alertDescription: data.description,
            clientId: data.clientId,
            alertQuery: data.query,
            alertLink: data.link,
          }),
        });
        if (!c.ok) {
          throw new Error("Something went wrong.");
        }
        reset();
        props.onClose();
        return c.status;
    },
    enabled: false,
  });
  const { register, handleSubmit, reset } = methods;
  const [error, setError] = useState<formErrorHandler>();
  const emptyValueMessage = "Este campo não pode estar vazio.";
  const submit = handleSubmit(async (data) => {
    if (!data.name || data.name.startsWith(" ")) {
      setError((prevError) => ({
        ...prevError,
        name: {
          invalid: true,
          message: emptyValueMessage,
        },
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        name: {
          invalid: false,
          message: undefined,
        },
      }));
    }
    if (!data.clientId || data.clientId == 0) {
      setError((prevError) => ({
        ...prevError,
        client: {
          invalid: true,
          message: emptyValueMessage,
        },
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        client: {
          invalid: false,
          message: undefined,
        },
      }));
    }
    if (
      data.name &&
      data.name.startsWith(" ") == false &&
      data.clientId != 0 &&
      data.clientId
    ) {
      setAlertData(data);
    }
  });
  useEffect(() => {
    refetch();
  }, [alertData])
  return (
    <FormProvider {...methods}>
      <form onSubmit={submit}>
        <Dialog.Root open={props.isOpen} scrollBehavior={"inside"} size={"lg"}>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Flex direction={"column"}>
                    <Dialog.Title>Documentar alerta {isLoading.toString()}</Dialog.Title>
                  </Flex>
                </Dialog.Header>
                <Dialog.Body>
                  <Fieldset.Root >
                    <Fieldset.Content>
                      <Field.Root required invalid={error?.name?.invalid}>
                        <Field.Label>
                          <Text fontSize={"sm"}>Nome</Text>
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          type="text"
                          size="sm"
                          {...register("name")}
                          placeholder="Nomeie o alerta"
                        />
                        <Field.ErrorText>
                          {error?.name?.message}
                        </Field.ErrorText>
                      </Field.Root>
                      <Field.Root required invalid={error?.client?.invalid}>
                        <Field.Label>
                          <Text fontSize="sm">Cliente</Text>{" "}
                          <Field.RequiredIndicator />
                        </Field.Label>
                        <ClientCombobox error={error} />
                        <Field.ErrorText>
                          {error?.client?.message}
                        </Field.ErrorText>
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>
                          <Text fontSize="sm">Descrição / Instrução</Text>
                        </Field.Label>
                        <Textarea
                          {...register("description")}
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
                          <Text fontSize={"sm"}>Link</Text>
                        </Field.Label>
                        <InputGroup startAddon="https://">
                          <Input
                            {...register("link")}
                            type="text"
                            size="sm"
                            placeholder="Link relacionados ao alerta"
                          />
                        </InputGroup>
                        <Field.ErrorText></Field.ErrorText>
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>
                          <Text fontSize="sm">Query</Text>
                        </Field.Label>
                        <Textarea
                          fontFamily="mono"
                          size="sm"
                          {...register("query")}
                          placeholder="Query de solução para o alerta"
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
                  <Button colorPalette={"green"} type="submit" onClick={submit} disabled={isLoading} >
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
      </form>
    </FormProvider>
  );
};
export default CreateAlertDialog;
