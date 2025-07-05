"use client";
import {
  Button,
  Card,
  Center,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const { status, data } = useSession();
  if (status == "authenticated") {
    router.push("/user/search");
  }
  const handleClick = async () => {
    try {
      await signIn("google", {
        redirect: true,
        callbackUrl: "/user/search",
      });
    } catch (err) {
      throw err;
    }
  };
  return (
    <Center h="vh" w="vw">
      <Card.Root scale={{ base: "0.9", md: "1" }}>
        <Card.Header>
          <Card.Title fontSize="xl">Entrar</Card.Title>
          <Card.Description>
            Use seu E-Mail com o domínio da MC1 para acessar o site.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Button variant="solid" w="full" onClick={handleClick}>
            <FcGoogle /> Entrar com o Google
          </Button>
        </Card.Body>
      </Card.Root>
    </Center>
  );
}
