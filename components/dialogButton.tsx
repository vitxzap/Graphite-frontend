import { Dialog, Button, Portal, CloseButton } from "@chakra-ui/react";

type dialogProps = {
    title?: string
    description?: string
    buttonLabel?: string
    cancelButtonLabel?: string
    actionButtonLabel?: string
    actionButtonFunction?: (params: any) => any
}
export default function DialogButton(props: dialogProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button size="lg">{props.buttonLabel}</Button>
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
                            <Dialog.Title>Confirme os dados</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
                            <p>{props.description}</p>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
                                <Button variant="outline">{props.cancelButtonLabel}</Button>
							</Dialog.ActionTrigger>
							<Dialog.ActionTrigger>
                                <Button onClick={() => { }} type="submit">{props.actionButtonLabel}</Button>
							</Dialog.ActionTrigger>
						</Dialog.Footer>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
