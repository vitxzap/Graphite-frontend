"use client";
import { Dialog, CloseButton, Flex, Heading, Separator, Text, Field, Select, Input, Textarea, Fieldset, createListCollection, Button, Portal, For, Spinner } from "@chakra-ui/react";
import Header from "../../../components/header";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { resolve } from "path/win32";

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
export default function Create() {
	const { register, handleSubmit, reset, setValue } = useForm<createProblem>();
	const submit = handleSubmit((data) => console.log(data));
	const [loading, setLoading] = useState<boolean>(false);
	const [clientColletion, setclientColletion] = useState<any>();
	const collection = useMemo(() => {
		return createListCollection({
			items: clientColletion ?? [
				{
					nm_client: "No data",
					id_client: null,
				},
			],
			itemToString: (client: client) => client.nm_client,
			itemToValue: (client: client) => client.id_client,
		});
	}, [clientColletion]);
	useEffect(() => {
		async function getHost() {
			try {
				setLoading(true);
				const res = await fetch("/api/client");
				if (!res.ok) {
					throw new Error(`Falha na api, status: ${res.status}`);
				}
				setTimeout(async () => {
					const response: object = await res.json();
					setclientColletion(response);
				}, 2000);
			} catch (err) {
				console.log(err);
			} finally {
				setTimeout(() => setLoading(false), 2000);
			}
		}
		getHost();
		reset();
	}, []);
	return (
		<Flex height="vh" maxW="vw" width="vw" direction="column" overflowX="hidden">
			<Header />
			<Flex direction="column" paddingY="12" alignItems="center" width="full" height="100%">
				<Flex maxW="1/2" gap="4" direction="column" width="83.3333%" border="gray" borderStyle="solid" borderWidth="thin" borderColor="#E4E4E7" borderRadius="sm" padding="6">
					<Flex direction="column" gap="2">
						<Heading size="2xl">Documentar problema</Heading>
						<Text color="fg.muted">Utilize os campos abaixo para documentar um novo alerta.</Text>
					</Flex>
					<Separator variant="solid" />
					<Flex direction="column">
						<form onSubmit={submit}>
							<Fieldset.Root>
								<Fieldset.Content>
									<Field.Root required>
										<Field.Label>
											<Text fontSize="md">Nome </Text> <Field.RequiredIndicator />
										</Field.Label>
										<Input type="text" size="xl" placeholder="Nomeie o problema" {...register("problemName")} />
									</Field.Root>
									<Field.Root>
										<Field.Label>
											<Text fontSize="md">Descrição</Text>
										</Field.Label>
										<Textarea size="xl" placeholder="Descreva o problema" autoresize maxH={190} {...register("problemDescription")} />
										<Field.HelperText>Max 700 caracteres.</Field.HelperText>
									</Field.Root>
									<Field.Root>
										<Field.Label>
											<Text fontSize="md">Selecionar cliente</Text>
										</Field.Label>
										<Select.Root
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
													<Select.ValueText placeholder="Pepsico" />
												</Select.Trigger>
												<Select.IndicatorGroup>
													{loading && <Spinner size={"xs"} color="fg.muted" />}
													<Select.Indicator />
												</Select.IndicatorGroup>
											</Select.Control>

											<Portal>
												<Select.Positioner>
													<Select.Content>
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
									</Field.Root>
									<Dialog.Root placement="center">
										<Dialog.Trigger asChild>
											<Button width="max">
												Documentar problema
											</Button>
										</Dialog.Trigger>
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
														<Button type="submit">Documentar</Button>
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
				</Flex>
			</Flex>
		</Flex>
	);
}
