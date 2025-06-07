"use client";
import { Select, Portal, createListCollection } from "@chakra-ui/react";
import { useMemo, useState, useEffect } from "react";
export default function CreateSelectInput(props: any) {
	console.log(props.data);
	const [dataLoaded, setDataLoaded] = useState([]);
	const items = useMemo(() => {
		return createListCollection({
			items: dataLoaded ?? [],
            itemToString: (data) => data.name,
            itemToValue: (data) => data.name
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
            }
            else if (props.data.filter == "server") {
                const res = await fetch("/api/server?id=", {
                    method: "GET",
                })
            }
		}
		preloadData();
	}, []);

	return (
		<Select.Root collection={items} maxW="45%" size="lg">
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
