import { Flex } from "@chakra-ui/react";


export default function DefaultBox(props: { children: React.ReactNode, gap?: number, width?: string, padding?: string }) {
    return (
        <Flex gap={props.gap || 0} direction="column" width={props.width || "full"} border="gray" borderStyle="solid" borderWidth="thin" borderColor={{base: "#E4E4E7", _dark: "#323232"}} borderRadius="md" padding={props.padding || 2}>
            {props.children}
        </Flex>
    );
}