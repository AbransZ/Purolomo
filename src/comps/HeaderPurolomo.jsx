import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";
import { generateHistoryPDF } from "../utils/pdfGenerator.js";
import logoPurolomo from "../img/LOGO-PUROLOMO.png";

function HeaderPurolomo({ registros }) {
  const handleGeneratePDF = () => {
    if (registros.length && registros.length > 0) {
      generateHistoryPDF(registros);
    } else {
      alert("No hay registros para generar el PDF.");
    }
  };
  return (
    <Flex
      bg="red.600"
      color={"white"}
      p={{ base: 2, md: 4 }}
      justify={"space-between"}
      align={{ base: "top", md: "center" }}
    >
      <Box p={{ base: 2, md: 2 }}>
        <HStack>
          <Box
            bg={"white"}
            borderRadius={10}
            width={{ base: 36, md: 200 }}
            display="flex"
            justifyContent="center"
            alignItems={{ base: "top", md: "center" }}
          >
            <Image
              src={logoPurolomo}
              alt="Logo-Purolomo"
              objectFit="contain"
              borderRadius="10"
              align={{ base: "top", md: "centers" }}
            />
          </Box>

          <VStack align="start">
            <Heading
              fontSize={{ base: "15px", md: "35px" }}
              color={"white"}
              alignContent={"center"}
            >
              Purolomo, C.A
            </Heading>
            <Text
              fontSize={{ base: "10px", md: "18px" }}
              color={"white"}
              opacity={0.9}
              textAlign={"left"}
            >
              Documentacion de Cambios De Version{" "}
            </Text>
          </VStack>
        </HStack>
      </Box>

      <HStack spacing={{ base: 4, md: 6 }}>
        <Button
          p={{ base: 2, md: 4 }}
          variant={"outline"}
          borderColor={"white"}
          bg="whiteAlpha.400"
          borderRadius="lg"
          fontSize={{ base: 10, md: 18 }}
          height={{ base: 8, md: 50 }}
          onClick={handleGeneratePDF}
        >
          Generar Reporte
        </Button>
      </HStack>
    </Flex>
  );
}

export default HeaderPurolomo;
