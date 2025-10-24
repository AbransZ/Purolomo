import { Box, Text, Heading, VStack, HStack, Spacer } from '@chakra-ui/react';

function formatLocalDate(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function HistoriList({ registros }) {

    return (
        <Box
            mt={10}
            bg={'gray.50'}
            p={5}
            borderRadius='md'>
            <Heading size='xl' mb={8}>
                <Text color={'black'} fontWeight='bold' fontSize={32}>
                    Historial de Versiones
                </Text>
            </Heading>
            {registros.length === 0 ? (
                <Text>No hay registros disponibles.</Text>
            ) : (registros.map((reg) => (               

                <Box
                    key={reg.id}
                    borderBottomWidth="1px"
                    p={4}
                >
                    <VStack spacing={6} align='start'>
                    
                        <HStack justify={'space-between'} spacing={2} pb={8}>
                            <Text fontSize={22} fontWeight='bold'>
                                Nombre:
                            </Text>
                            <Text fontSize={20} >{reg.nombre} - </Text>
                            <Text fontSize={22} fontWeight='bold'>
                                V{reg.version} - {reg.fecha}
                            </Text>
                            
                        </HStack>

                        <HStack spacing={2}>
                            <Text fontSize={18} fontWeight='bold'>
                                Autor:
                            </Text>
                            <Text fontSize={16}>{reg.autor}</Text>

                             <Spacer justifyContent={'space-between'}/>

                           <Text fontSize={18} fontWeight='bold'>
                                Hash del commit:
                            </Text>
                            <Text fontSize={16}>{reg.hash_git}</Text>

                        </HStack>

                        <Spacer/>
                        <HStack>
                            <Text fontSize={18} fontWeight='bold'>
                                Descripcion:
                            </Text>
                            <Text fontSize={16} maxWidth={'-moz-max-content'}>{reg.descripcion}</Text>
                        </HStack>

                    </VStack>
                </Box>
            )
            )
            )
            }
        </Box>
    );
}
export default HistoriList;