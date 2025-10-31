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
                fontSize={32}
                fontWeight="bold"
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
                                id="nombre_app"
                                placeholder='Nombre de la app'
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                size='xl'
                                fontSize={18}
                            />
                       
                    </GridItem>

                    <GridItem colSpan={1} padding={4}>
                        <Box>
                            <Box p={2} fontSize="20px" fontWeight="bold" color="gray.600">
                                Autor
                            </Box>
                            <Input
                                id="autor"
                                type="text"
                                placeholder="Nombre del autor"
                                value={autor}
                                onChange={(e) => setAutor(e.target.value)}
                                fontSize={18}
                                size='xl'
                            />
                        </Box>
                    </GridItem>
                    <GridItem colSpan={1} padding={4}>
                        {/* Campo Version (Alternativa con Box) */}
                        <Box>
                            <Box p={2} fontSize="20px" fontWeight="bold" color="gray.600">
                                Version
                            </Box>
                            <Input
                                id="version"
                                type="text"
                                placeholder="ej: 1.0.0"
                                value={version}
                                onChange={(e) => setVersion(e.target.value)}
                                fontSize={18}
                                size='xl'
                            />
                        </Box>

                    </GridItem>
                    <GridItem colSpan={1} padding={4}>
                        <Box>
                            <Box p={2} fontSize="20px" fontWeight="bold" color="gray.600">
                                Hash del Commit
                            </Box>
                            <Input
                                id="hash_git"
                                type="text"
                                placeholder="Hash de Git"
                                value={hash}
                                onChange={(e) => setHash(e.target.value)}
                                fontSize={18}
                                size='xl'
                            />
                        </Box>

                    </GridItem>
                    <GridItem colSpan={1} padding={4}>
                        <Box>
                            <Box p={2} fontSize="20px" fontWeight="bold" color="gray.600">
                                Fecha
                            </Box>
                            <Input
                                id="fecha"
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)} // Prop 'setFecha'
                                fontSize={18}
                                size='xl'
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
                                fontSize={18}
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                minHeight="100px"
                                size='xl'
                                
                            />
                        </Box>
                    </GridItem>

                </Grid> {/* Fin de SimpleGrid */}

                {/* Botón */}
                <Button
                    type="submit"
                    bg="#c81d25"
                    color="white"
                    _hover={{ bg: "#f2424bff" }}
                    width="full"
                    height={16}
                    size="lg"
                    mt={4}
                    fontSize={18}
                    borderRadius={10}
                >
                    + Agregar Registro
                </Button>
            </form>
        </Box>
    );
}
export default Formulario;