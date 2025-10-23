// En: src/comps/Form.jsx

// 1. Importamos SOLO los componentes que SÍ funcionan y necesitamos
import {
    Box,
    Heading,
    Input,
    Textarea,
    Button,
    Grid,
    GridItem
} from '@chakra-ui/react';

function Formulario({
    handleSubmit,
    nombre, setNombre,
    descripcion, setDescripcion,
    autor, setAutor,
    version, setVersion,
    hash, setHash,
    fecha, setFecha, 
}) {

    return (
        <Box as='section' mt={6}>
            <Heading
                as="h2"
                size="md"
                pb={3}
                mb={6}
                borderBottomWidth="2px"
                borderColor="gray.200"
            >
                Registrar nueva version
            </Heading>

            <form onSubmit={handleSubmit}>
                <Grid columns={2} spacing={4} mb={4}>

                    <GridItem colSpan={1} padding={4}>
                      
                            <Box p={2} fontSize="20px" fontWeight="bold" color="gray.600">
                                Nombre de la aplicacion
                            </Box>
                            <Input
                                id="nombreApp"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                size='xl'
                                fontSize={18}
                            />
                       
                    </GridItem>

                    <GridItem colSpan={1} padding={4}>
                        <Box>
                            <Box p={2} fontSize="sm" fontWeight="bold" color="gray.600">
                                Autor
                            </Box>
                            <Input
                                id="autor"
                                type="text"
                                placeholder="Nombre del autor"
                                value={autor}
                                onChange={(e) => setAutor(e.target.value)}
                                size='md'
                            />
                        </Box>
                    </GridItem>
                    <GridItem colSpan={1} padding={4}>
                        {/* Campo Version (Alternativa con Box) */}
                        <Box>
                            <Box p={2} fontSize="sm" fontWeight="bold" color="gray.600">
                                Version
                            </Box>
                            <Input
                                id="version"
                                type="text"
                                placeholder="ej: 1.0.0"
                                value={version}
                                onChange={(e) => setVersion(e.target.value)}
                                size='md'
                            />
                        </Box>

                    </GridItem>
                    <GridItem colSpan={1} padding={4}>
                        <Box>
                            <Box p={2} fontSize="sm" fontWeight="bold" color="gray.600">
                                Hash del Commit
                            </Box>
                            <Input
                                id="hash"
                                type="text"
                                placeholder="Hash de Git"
                                value={hash}
                                onChange={(e) => setHash(e.target.value)}
                                size='md'
                            />
                        </Box>

                    </GridItem>
                    <GridItem colSpan={1} padding={4}>
                        <Box>
                            <Box p={2} fontSize="sm" fontWeight="bold" color="gray.600">
                                Fecha
                            </Box>
                            <Input
                                id="fecha"
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)} // Prop 'setFecha'
                                size='md'
                            />
                        </Box>

                    </GridItem>
                    <GridItem colSpan={2} padding={4}>
                        <Box>
                            <Box p={2} fontSize="20px" fontWeight="bold" color="gray.600">
                                Descripcion
                            </Box>
                            <Textarea
                                id="descripcion"
                                fontSize={14}
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                minHeight="100px"
                                size='md'
                            />
                        </Box>
                    </GridItem>

                </Grid> {/* Fin de SimpleGrid */}

                {/* Botón */}
                <Button
                    type="submit"
                    bg="#c81d25"
                    color="white"
                    _hover={{ bg: "#a0171e" }}
                    width="full"
                    size="lg"
                    mt={4}
                >
                    + Agregar Registro
                </Button>
            </form>
        </Box>
    );
}
export default Formulario;