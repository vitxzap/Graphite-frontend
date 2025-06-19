"use client"
import { Flex, Button, Card, Center, Field, Stack, Input, Table, Text, Heading, Select, Portal, createListCollection, Separator } from "@chakra-ui/react";
import Header from "../../../components/header";
import DefaultBox from "@/components/defaultBox";
export default function Search() {
	const frameworks = createListCollection({
		items: [
			{ label: "Pepsico MX", value: "react" },
			{ label: "MSD Atlas", value: "vue" },
			{ label: "Heineken BR", value: "angular" },
			{ label: "Pepsico Pilot", value: "svelte" },
		],
	});
	const items = [
		{ id: 1, name: "Check Integration Error", category: "Pepsico MX", price: "Testing..." },
		{ id: 2, name: "Check Syncronization Error", category: "Heineken BR", price: "Testing..." },
		{ id: 3, name: "Check SAP Odata Error", category: "MSD Atlas", price: "Testing..." },
		{ id: 4, name: "High CPU Utilization", category: "Pepsico Pilot", price: "Testing..." },
		{ id: 5, name: "The Memory Pages/sec is too high", category: "AWSBR7PDINTGR19", price: "Testing..." },
		{ id: 6, name: "Check Integration Error", category: "Pepsico MX", price: "Testing..." },
		{ id: 7, name: "Check Syncronization Error", category: "Heineken BR", price: "Testing..." },
		{ id: 8, name: "Check SAP Odata Error", category: "MSD Atlas", price: "Testing..." },
		{ id: 9, name: "High CPU Utilization", category: "Pepsico Pilot", price: "Testing..." },
		{ id: 10, name: "Check Integration Error", category: "Pepsico MX", price: "Testing..." },
		{ id: 11, name: "Check Integration Error", category: "Pepsico MX", price: "Testing..." },
		{ id: 12, name: "Check Syncronization Error", category: "Heineken BR", price: "Testing..." },
		{ id: 13, name: "Check SAP Odata Error", category: "MSD Atlas", price: "Testing..." },
		{ id: 14, name: "High CPU Utilization", category: "Pepsico Pilot", price: "Testing..." },
		{ id: 15, name: "The Memory Pages/sec is too high", category: "AWSBR7PDINTGR19", price: "Testing..." },
		{ id: 16, name: "Check Integration Error", category: "Pepsico MX", price: "Testing..." },
		{ id: 17, name: "Check Syncronization Error", category: "Heineken BR", price: "Testing..." },
		{ id: 18, name: "Check SAP Odata Error", category: "MSD Atlas", price: "Testing..." },
		{ id: 19, name: "High CPU Utilization", category: "Pepsico Pilot", price: "Testing..." },
		{ id: 20, name: "Check Integration Error", category: "Pepsico MX", price: "Testing..." },
	];
	return (
		<Flex minH="vh" maxW="vw" w="vw" direction="column" maxH="vh">
			<Header />
			<Flex w="full" direction="column" height={"dvh"} padding="2" gap={5} maxH={"dvh"}>
				<DefaultBox gap={2}>
					<Flex>
						<Heading>Filtrar</Heading>
                    </Flex>
                    <Separator variant="solid" />
					<Flex gap={4}>
						<Field.Root>
							<Input type="text" size="md" placeholder="Nome" />
						</Field.Root>
						<Field.Root>
							<Select.Root collection={frameworks} size="md">
								<Select.HiddenSelect />
								<Select.Control>
									<Select.Trigger>
										<Select.ValueText placeholder="Select framework" />
									</Select.Trigger>
									<Select.IndicatorGroup>
										<Select.Indicator />
									</Select.IndicatorGroup>
								</Select.Control>
								<Portal>
									<Select.Positioner>
										<Select.Content>
											{frameworks.items.map((framework) => (
												<Select.Item item={framework} key={framework.value}>
													{framework.label}
													<Select.ItemIndicator />
												</Select.Item>
											))}
										</Select.Content>
									</Select.Positioner>
								</Portal>
							</Select.Root>
						</Field.Root>
					</Flex>
				</DefaultBox>
				<DefaultBox>
					<Table.ScrollArea maxH={"2xl"}>
						<Table.Root size="lg" interactive stickyHeader >
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeader>Nome</Table.ColumnHeader>
									<Table.ColumnHeader>Cliente</Table.ColumnHeader>
									<Table.ColumnHeader textAlign="end">Descrição</Table.ColumnHeader>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{items.map((item) => (
									<Table.Row key={item.id} cursor={"pointer"}>
										<Table.Cell>{item.name}</Table.Cell>
										<Table.Cell>{item.category}</Table.Cell>
										<Table.Cell textAlign="end">{item.price}</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table.Root>
					</Table.ScrollArea>
				</DefaultBox>
			</Flex>
		</Flex>
	);
}
