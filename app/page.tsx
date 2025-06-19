"use client";
import { Button, Card, Center, Field, Stack, Input, defineConfig } from "@chakra-ui/react";
import { PasswordInput  } from "@/components/ui/password-input";
import { RiArrowRightLine } from "react-icons/ri";
import { useState } from "react";
import { toaster, Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
export default function Home() {
	const [password, setPassword] = useState<any>();
	const router = useRouter();
	
	return (
		<Center h="vh" bg="white" color="black">
			<Toaster />
			<Card.Root maxW="" scale={{base: "0.9", md: "1"}}  >
				<Card.Header>
					<Card.Title fontSize="xl">Entrar no sistema</Card.Title>
					<Card.Description>Preencha os dados para acessar o site.</Card.Description>
				</Card.Header>
				<Card.Body>
					<Stack gap="4" w="full">
						<Field.Root>
							<Field.Label>E-mail</Field.Label>
							<Input size="lg"  type="email" />
						</Field.Root>
						<Field.Root>
							<Field.Label>Senha</Field.Label>
							<PasswordInput size="lg" w="md" value={password} onChange={(e) => setPassword(e.target.value)} />
						</Field.Root>
					</Stack>
				</Card.Body>
				<Card.Footer justifyContent="flex-end">
					<Button
						variant="solid"
						onClick={() => {
							toaster.create({
								description: "Em desenvolvimento.",
								type: "info",
							});
							setTimeout(() => {
								router.push("/user/home");
							}, 500);
						}}>
						Entrar <RiArrowRightLine />
					</Button>
				</Card.Footer>
			</Card.Root>
		</Center>
	);
}
