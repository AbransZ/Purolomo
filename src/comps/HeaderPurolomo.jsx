import { Box, Flex, Heading, Text, Button, HStack, Image, VStack } from '@chakra-ui/react';
import{generateHistoryPDF} from '../utils/pdfGenerator.js';

function HeaderPurolomo({registros}) {

    const handleGeneratePDF = () => {
        if (registros.length && registros.length > 0) {
            generateHistoryPDF(registros);
    }else{
        alert("No hay registros para generar el PDF.");
    }
    }
    return (
        <Flex bg='red.600' color={'white'} p={8} justify={'space-between'} align='center'>
            <Box p={1}>
                <HStack>
                    <Box bg={'white'}borderRadius={10} width={180} height={65} display='flex' justifyContent='center' alignItems='center'>
                         <Image src='/src/img/LOGO PUROLOMO png.png' alt='Logo-Purolomo' boxSize='220px' objectFit='contain' borderRadius='10'/>
                    </Box>
                   
                    <VStack align='start'>
                        <Heading fontSize='32px' color={'white'} alignContent={'center'}>Purolomo, C.A</Heading>
                        <Text fontSize={18} color={'white'} opacity={0.9} alignContent={'center}'}>Documentacion de Cambios De Version </Text>
                    </VStack>

                </HStack>

            </Box>


            <HStack spacing={4}>
                <Button
                    variant={'outline'}
                    borderColor={'white'}
                    bg='whiteAlpha.400'
                    borderRadius='lg'
                    fontSize={15}
                    height={12}
                    onClick={handleGeneratePDF}
                >
                    Generar Reporte</Button>
               
            </HStack>
        </Flex>
    )

}


export default HeaderPurolomo;