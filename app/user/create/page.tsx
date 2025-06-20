"use client";
import { Dialog, CloseButton, Flex, Heading, Separator, Text, Field, Select, Input, Textarea, Fieldset, createListCollection, Button, Portal, For, Spinner } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import Header from "../../../components/header";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import DefaultBox from "@/components/defaultBox";
interface createProblem {
	problemName: string;
	problemDescription: string;
	problemQuery?: string;
	clientId?: number;
}
interface client {
	nm_client: string;
	id_client: string;
}
interface formError {
	isErr?: boolean;
	data?: {
		message?: string;
	};
}
type formValidation = {
	dialog: {
		isReadyToOpen?: boolean;
	};
};

export default function Create() {
	const { register, handleSubmit, reset, setValue } = useForm<createProblem>();
	const emptyInputErrorMessage = "Esse campo não pode estar vazio.";
	const [nameError, setNameError] = useState(false);
	const [clientError, setClientError] = useState(false);
	const [validateForm, setValidateForm] = useState<formValidation>({
		dialog: {
			isReadyToOpen: false,
		},
	});
	const submit = handleSubmit(async (data) => {
		const fetchData = new Promise(async (resolve, reject) => {
			try {
				const c = await fetch("/api/create", {
					method: "POST",
					body: JSON.stringify({
						problemName: data.problemName,
						problemDescription: data.problemDescription,
						problemQuery: data.problemQuery,
						clientId: data.clientId,
					}),
				});
				resolve(null)
			} catch (err) {
				reject(err);
			}
		});
		toaster.promise(fetchData, {
			success: {
				title: "Sucesso!"
			},
			loading: {
				title: "Criando..."
			},
			error: {
				title: "Erro"
			}
		});
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [clientColletion, setClientColletion] = useState<any>();
	const collection = useMemo(() => {
		return createListCollection({
			items: clientColletion ?? [
				{
					nm_client: "Não foi possível buscar os clientes.",
					id_client: null,
				},
			],
			itemToString: (client: client) => client.nm_client,
			itemToValue: (client: client) => client.id_client,
		});
	}, [clientColletion]);
	useEffect(() => {
		async function getClient() {
			try {
				setLoading(true);
				const res = await fetch("/api/client");
				const response: object = await res.json();
				setClientColletion(response);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				toaster.create({
					type: "error",
					title: "Erro ao buscar clientes na api.",
				})
				throw err;
			}
		}
		getClient();
		reset();
	}, []);
	return (
		<Flex direction="column">
			<Header />
			<Toaster />
			<Flex direction="column" height={"max-content"} justifyContent="center" alignItems="center" padding={2}>
				<DefaultBox width="1/2" gap={4} padding="6">
					<Flex direction="column" gap="2">
						<Heading size="2xl">Documentar problema</Heading>
						<Text color="fg.muted">Utilize os campos abaixo para documentar um novo alerta.</Text>
					</Flex>
					<Separator variant="solid" />
					<Flex direction="column">
						<form onSubmit={submit}>
							<Fieldset.Root>
								<Fieldset.Content>
									<Field.Root required invalid={nameError}>
										<Field.Label>
											<Text fontSize="md">Nome </Text> <Field.RequiredIndicator />
										</Field.Label>
										<Input type="text" size="xl" placeholder="Nomeie o problema" {...register("problemName")} />
										<Field.ErrorText>{emptyInputErrorMessage}</Field.ErrorText>
									</Field.Root>
									<Field.Root>
										<Field.Label>
											<Text fontSize="md">Descrição / Instrução</Text>
										</Field.Label>
										<Textarea size="xl" placeholder="Descreva o problema ou instrua a resolução" autoresize maxH={165} maxLength={700} {...register("problemDescription")} />
										<Field.HelperText>Max 700 caracteres.</Field.HelperText>
									</Field.Root>
									<Field.Root required invalid={clientError}>
										<Field.Label>
											<Text fontSize="md">Cliente</Text> <Field.RequiredIndicator />
										</Field.Label>
										<Select.Root
											size={"lg"}
											collection={collection}
											disabled={loading}
											onValueChange={(e) => {
												const id = Number(e.value);
												setValue("clientId", id);
											}}>
											<Select.HiddenSelect />
											<Select.Label />
											<Select.Control>
												<Select.Trigger>
													<Select.ValueText placeholder="Nome do cliente" />
												</Select.Trigger>
												<Select.IndicatorGroup>
													{loading && <Spinner size={"xs"} color="fg.muted" />}
													<Select.Indicator />
												</Select.IndicatorGroup>
											</Select.Control>
											<Portal>
												<Select.Positioner>
													<Select.Content maxH="170px">
														<For each={collection.items}>
															{(client, index) => (
																<Select.Item item={client} key={index}>
																	{client.nm_client}
																</Select.Item>
															)}
														</For>
													</Select.Content>
												</Select.Positioner>
											</Portal>
										</Select.Root>
										<Field.ErrorText>{emptyInputErrorMessage}</Field.ErrorText>
									</Field.Root>
									<Field.Root>
										<Field.Label>
											<Text fontSize="md">Query</Text>
										</Field.Label>
										<Textarea fontFamily="mono" size="xl" placeholder="Query de solução para o problema" autoresize maxH={165} maxLength={6000} {...register("problemQuery")} />
										<Field.HelperText>Max 6.000 caracteres.</Field.HelperText>
									</Field.Root>
									<Button
										width="max"
										onClick={() => {
											const catchData = handleSubmit((data) => {
												setNameError(false);
												setClientError(false);
												if (data.problemName == undefined || data.problemName == "") {
													setNameError(true);
												}
												if (data.problemName == undefined || data.problemName == "" || data.clientId == undefined || data.clientId == 0) {
													toaster.create({
														closable: true,
														type: "error",
														description: "Existem campos vazios no formulário.",
													});
												}
												if (data.clientId == undefined || data.clientId == 0) {
													setClientError(true);
												}
												if (data.problemName != "" && data.problemName != undefined && data.clientId != 0 && data.clientId != undefined) {
													setClientError(false);
													setNameError(false);
													setValidateForm({ dialog: { isReadyToOpen: true } });
												}
											});
											catchData();
										}}>
										Documentar problema
									</Button>
									<Dialog.Root placement="center" open={validateForm.dialog.isReadyToOpen} onOpenChange={(e) => setValidateForm({ dialog: { isReadyToOpen: e.open } })}>
										<Portal>
											<Dialog.Backdrop />
											<Dialog.Positioner>
												<Dialog.Content>
													<Dialog.Header>
														<Dialog.Title>Confirmação</Dialog.Title>
													</Dialog.Header>
													<Dialog.Body>
														<p>Antes de documentar o problema, certifique-se de que preencheu corretamente todos os campos disponíveis.</p>
													</Dialog.Body>
													<Dialog.Footer>
														<Dialog.ActionTrigger asChild>
															<Button variant="outline">Revisar</Button>
														</Dialog.ActionTrigger>
														<Button type="submit" onClick={submit} colorPalette={"green"}>
															Documentar
														</Button>
													</Dialog.Footer>
													<Dialog.CloseTrigger asChild>
														<CloseButton size="md" />
													</Dialog.CloseTrigger>
												</Dialog.Content>
											</Dialog.Positioner>
										</Portal>
									</Dialog.Root>
								</Fieldset.Content>
							</Fieldset.Root>
						</form>
					</Flex>
				</DefaultBox>
			</Flex>
		</Flex>
	);
}
