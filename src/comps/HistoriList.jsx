import { Box, Text, Heading, VStack, HStack, Spacer } from '@chakra-ui/react';

function formatLocalDate(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function HistoriList({ sortedRegistros }) {

    return (
        <Box
            mt={10}
            bg={'gray.50'}
            p={5}
            borderRadius='md'>
            <Heading size='xl' mb={8}>
                <Text color={'black'} fontWeight='bold' fontSize={22}>
                    Historial de Versiones
                </Text>
            </Heading>
            {sortedRegistros.length === 0 ? (
                <Text>No hay registros disponibles.</Text>
            ) : (sortedRegistros.map((reg) => (

                

                <Box
                    key={reg.id}
                    borderBottomWidth="1px"
                    p={4}
                >
                    <VStack spacing={6} align='start'>
                    
                        <HStack justify={'space-between'} spacing={2} pb={8}>
                            <Text fontSize={18} fontWeight='bold'>
                                Nombre:
                            </Text>
                            <Text fontSize={16} >{reg.nombre} - </Text>
                            <Text fontSize={18} fontWeight='bold'>
                                V{reg.version} - {formatLocalDate(reg.fecha)}
                            </Text>
                            <Text fontSize={16}> </Text>
                        </HStack>

                        <HStack spacing={2}>
                            <Text fontSize={16} fontWeight='bold'>
                                Autor:
                            </Text>
                            <Text fontSize={14}>{reg.autor}</Text>

                             <Spacer justifyContent={'space-between'}/>

                           <Text fontSize={16} fontWeight='bold'>
                                Hash del commit:
                            </Text>
                            <Text fontSize={14}>{reg.hash}</Text>

                        </HStack>

                        <Spacer/>
                        <HStack>
                            <Text fontSize={16} fontWeight='bold'>
                                Descripcion:
                            </Text>
                            <Text fontSize={14} maxWidth={'-moz-max-content'}>{reg.descripcion}</Text>
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