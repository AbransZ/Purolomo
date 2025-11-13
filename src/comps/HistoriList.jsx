import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Spacer,
  Flex,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

function formatLocalDate(dateString) {
  if (!dateString) return "";
  const parts = dateString.split("-");
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function HistoriList({ registros, onDisable, onEdit }) {
  const API_URL = "http://localhost:3001/api";

  const disable = async (idRegistro) => {
    if (
      window.confirm(
        `¿Estas seguro que deseas eliminar este registro ${idRegistro}`
      )
    ) {
      try {
        await axios.patch(`${API_URL}/registros/${idRegistro}/disable`);
        if (onDisable) {
          onDisable(idRegistro);
        }
      } catch (error) {
        console.log("Error al inhabilitar", error);
        alert("Error al inhabilitar registro");
      }
    }
  };

  return (
    <Box
      mt={{ base: 2, md: 4 }}
      bg={"white"}
      p={{ base: 2, md: 4 }}
      borderRadius="md"
    >
      <Heading size={{ base: 5, md: 18 }} mb={{ base: 2, md: 4 }}>
        <Text color={"black"} fontWeight="bold" fontSize={{ base: 20, md: 32 }}>
          Historial de Versiones
        </Text>
      </Heading>
      {registros.length === 0 ? (
        <Text>No hay registros disponibles.</Text>
      ) : (
        registros.map((reg) => (
          <Box key={reg.id} mb={{ base: 2, md: 6 }} borderRadius={10}>
            <Flex
              align="flex-start"
              borderRadius={5}
              bg="gray.300"
              width={{ base: 280, md: 1025 }}
              p={{ base: 2, md: 4 }}
            >
              <VStack
                spacing={{ base: 2, md: 4 }}
                align="start"
                width={{ base: 280, md: 1025 }}
              >
                <HStack
                  justify={"space-between"}
                  spacing={{ base: 2, md: 4 }}
                  pb={{ base: 2, md: 4 }}
                >
                  <Text fontSize={{ base: 10, md: 20 }} fontWeight="bold">
                    Nombre:
                  </Text>
                  <Text fontSize={{ base: 10, md: 20 }}>{reg.nombre} - </Text>
                  <Text fontSize={{ base: 10, md: 20 }} fontWeight="bold">
                    V{reg.version} - {formatLocalDate(reg.fecha)}
                  </Text>
                </HStack>

                <HStack spacing={2}>
                  <Text fontSize={{ base: 10, md: 20 }} fontWeight="bold">
                    Autor:
                  </Text>
                  <Text fontSize={{ base: 10, md: 20 }}>{reg.autor}</Text>

                  <Spacer justifyContent={"space-between"} />

                  <Text fontSize={{ base: 10, md: 20 }} fontWeight="bold">
                    Hash del commit:
                  </Text>
                  <Text fontSize={{ base: 10, md: 20 }}>{reg.hash_git}</Text>
                </HStack>

                <Spacer />
                <HStack width="500" justify="space-between">
                  <Box flexGrow={1} mr={4}>
                    <Text fontSize={{ base: 10, md: 20 }} fontWeight="bold">
                      Descripcion:
                    </Text>
                    <Text
                      fontSize={{ base: 10, md: 20 }}
                      maxWidth={"-moz-max-content"}
                    >
                      {reg.descripcion}
                    </Text>
                  </Box>
                </HStack>
                <HStack spacing={{ base: 10, md: 20 }} alignSelf={"flex-end"}>
                  <Button
                    variant="surface"
                    borderRadius={5}
                    bg={"red.200"}
                    fontSize={{ base: 5, md: 15 }}
                    color={"black"}
                    width={{ base: 50, md: 100 }}
                    height={{ base: 3, md: 8 }}
                    onClick={() => disable(reg.id)}
                  >
                    Eliminar
                  </Button>

                  <Button
                    variant="surface"
                    borderRadius={5}
                    bg={"blue.200"}
                    color={"black"}
                    width={{ base: 50, md: 100 }}
                    height={{ base: 3, md: 8 }}
                    fontSize={{ base: 5, md: 15 }}
                    onClick={() => {
                      console.log("Boton editar clickeado id: ", reg.id);
                      onEdit(reg);
                    }}
                  >
                    Editar
                  </Button>
                </HStack>
              </VStack>
            </Flex>
          </Box>
        ))
      )}
    </Box>
  );
}
export default HistoriList;
