import { Box, Flex, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { LuPointer } from 'react-icons/lu';

function HeaderPurolomo() {
    return (
        <Flex bg='red.600' color={'white'} p={4} justify={'space-between'} align='center'>
            <Box p={8}>
                <source />
                <Heading fontSize='32px' color={'white'} alignContent={'center'}>Purolomo, C.A</Heading>
                <Text fontSize={18} color={'white'} opacity={0.9} alignContent={'center}'}>Documentacion de Cambios De Version </Text>
            </Box>


            <HStack spacing={4}>
                <Button
                    variant={'outline'}
                    borderColor={'white'}
                    bg='whiteAlpha.400'
                    borderRadius='lg'
                    fontSize={15}
                    height={12}
                >
                    Ultima Actualizacion</Button>
                <Button
                    fontSize={15}
                    variant={'outline'}
                    borderColor='white'
                    bg={'whiteAlpha.400'}
                    borderRadius='lg'
                    height={12}
                >
                    Historial Completo
                </Button>
            </HStack>
        </Flex>
    )

}
export default HeaderPurolomo;