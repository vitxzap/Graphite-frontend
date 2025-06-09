"use client";
import { Select, Portal, createListCollection } from "@chakra-ui/react";
import { useMemo, useState, useEffect } from "react";
import storage from "local-storage";
export default function CreateSelectInput(props: any) {
	const [dataLoaded, setDataLoaded] = useState([]);
	const [value, setValue] = useState<any>({
		filter: props.data.filter,
		value: undefined,
		item: [{}],
	});
	const [hostId, setHostId] = useState<number | undefined>(undefined);
	const [isEnable, setIsEnable] = useState<boolean>(false);
	const items = useMemo(() => {
		return createListCollection({
			items: dataLoaded ?? [],
			itemToString: (data) => data.name,
			itemToValue: (data) => data.name,
		});
	}, [dataLoaded]);
	useEffect(() => {
		async function preloadData() {
			if (props.data.filter == "host") {
				const res = await fetch(`/api/host`, {
					method: "GET",
				});
				const response = await res.json();
				setDataLoaded(response);
				setIsEnable(false);
			}
		}
		preloadData();
	}, []);

	useEffect(() => {
		async function loadFilter() {
			if (value.filter == "host") {
				storage("hostId", value.item[0].id);
			}
		}
		loadFilter();
	}, [value]);

	useEffect(() => {
		async function loadHostById() {
			if (props.data.filter == "server" && hostId != undefined) {
				const res = await fetch(`/api/server?id=${hostId}`, {
					method: "GET",
				});
				const response = await res.json();
				setDataLoaded(response);
			}
		}
		loadHostById();
	}, [hostId]);

	return (
		<Select.Root
			onClick={() => {
				const id = storage("hostId");	
				setHostId(id);
			}}
			collection={items}
			value={value.value}
			onValueChange={(e) => {
				setValue({
					filter: props.data.filter,
					value: e.value,
					item: e.items,
				});
			}}
			maxW="45%"
			disabled={isEnable}
			size="lg">
			<Select.HiddenSelect />
			<Select.Label fontSize="md">{props.data.title}</Select.Label>
			<Select.Control>
				<Select.Trigger>
					<Select.ValueText placeholder="Selecione" />
				</Select.Trigger>
				<Select.IndicatorGroup>
					<Select.Indicator />
				</Select.IndicatorGroup>
			</Select.Control>
			<Portal>
				<Select.Positioner>
					<Select.Content>
						{items.items.map((item: any) => (
							<Select.Item item={item} key={item.name}>
								{item.name}
								<Select.ItemIndicator />
							</Select.Item>
						))}
					</Select.Content>
				</Select.Positioner>
			</Portal>
		</Select.Root>
	);
}
