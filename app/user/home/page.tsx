import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Flex, Heading } from "@chakra-ui/react";
export default function Home() {
  return (
    <Flex h={"vh"} w={"vw"} padding={6} direction={"column"} gap={2}>
      <Heading size={"4xl"} fontWeight={"extrabold"}>
        Dashboard
      </Heading>
      <Flex w={"100%"} height={"100%"}>
        <Skeleton variant={"shine"} flex={"1"} boxSize={"100%"}></Skeleton>
      </Flex>
    </Flex>
  );
}
