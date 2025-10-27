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



function HistoriList({ registros,onDisable,onEdit }) {

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
    <Box mt={10} bg={"white"} p={5} borderRadius="md">
      <Heading size="xl" mb={8}>
        <Text color={"black"} fontWeight="bold" fontSize={32}>
          Historial de Versiones
        </Text>
      </Heading>
      {registros.length === 0 ? (
        <Text>No hay registros disponibles.</Text>
      ) : (
        registros.map((reg) => (
          <Box key={reg.id} borderBottomWidth="1px" p={4} borderRadius={10}>
            <Flex align="flex-start" borderRadius={5} bg="gray.300" p={5}>
              <VStack spacing={6} align="start">
                <HStack justify={"space-between"} spacing={2} pb={8}>
                  <Text fontSize={22} fontWeight="bold">
                    Nombre:
                  </Text>
                  <Text fontSize={20}>{reg.nombre} - </Text>
                  <Text fontSize={22} fontWeight="bold">
                    V{reg.version} - {formatLocalDate(reg.fecha)}
                  </Text>
                </HStack>

                <HStack spacing={2}>
                  <Text fontSize={18} fontWeight="bold">
                    Autor:
                  </Text>
                  <Text fontSize={16}>{reg.autor}</Text>

                  <Spacer justifyContent={"space-between"} />

                  <Text fontSize={18} fontWeight="bold">
                    Hash del commit:
                  </Text>
                  <Text fontSize={16}>{reg.hash_git}</Text>
                </HStack>

                <Spacer />
                <HStack width="500" justify="space-between">
                  <Box flexGrow={1} mr={4}>
                    <Text fontSize={18} fontWeight="bold">
                      Descripcion:
                    </Text>
                    <Text fontSize={16} maxWidth={"-moz-max-content"}>
                      {reg.descripcion}
                    </Text>
                  </Box>

                  <HStack spacing={2} alignSelf={"flex-end"}>
                    <Button
                      variant="surface"
                      borderRadius={5}
                      bg={"red.200"}
                      fontSize={14}
                      color={"black"}
                      onClick={() => disable(reg.id)}
                    >
                      Eliminar
                    </Button>

                    <Button
                      variant="surface"
                      borderRadius={5}
                      bg={"blue.200"}
                      fontSize={14}
                      color={"black"}
                      onClick={()=> {
                        console.log('Boton editar clickeado id: ',reg.id)
                        onEdit(reg)}}
                      
                    >
                      Editar
                    </Button>
                  </HStack>
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
