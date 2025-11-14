import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Grid,
  GridItem,
  NativeSelectRoot,
  NativeSelectField,
} from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";

function Formulario({
  handleSubmit,
  nombre,
  setNombre,
  descripcion,
  setDescripcion,
  autor,
  setAutor,
  version,
  setVersion,
  hash,
  setHash,
  fecha,
  setFecha,
  listaAPP,
}) {
  const options = listaAPP.map((app) => ({
    label: app.nombre_app,
    value: app.nombre_app,
  }));
  return (
    <Box as="section" mt={{ base: 2, md: 8 }}>
      <Heading
        as="h2"
        size={{ base: 10, md: 40 }}
        pb={{ base: 2, md: 4 }}
        borderBottomWidth={{ base: 2, md: 4 }}
        borderColor="gray.200"
        fontSize={{ base: 20, md: 40 }}
        fontWeight="bold"
      >
        Registrar nueva version
      </Heading>

      <form onSubmit={handleSubmit}>
        <Grid columns={2} spacing={{ base: 2, md: 4 }} mb={4}>
          <GridItem colSpan={1} padding={{ base: 2, md: 4 }}>
            <Box
              fontSize={{ base: 10, md: 18 }}
              fontWeight="bold"
              color="gray.600"
              textAlign={{ base: "start", md: "start" }}
            >
              Nombre de la aplicacion
            </Box>
            <NativeSelectRoot>
              <NativeSelectField
                value={nombre}
                placeholder="Selecciona una app"
                fontSize={{ base: 10, md: 18 }}
                width={{ base: 28, md: 80 }}
                size={{ base: 4, md: 8 }}
                onChange={(opcionSeleccionada) => {
                  if (opcionSeleccionada) {
                    setNombre(opcionSeleccionada.value);
                  } else {
                    setNombre("");
                  }
                }}
              >
                <option value="">Selecciona una app</option>
                {listaAPP.map((app) => (
                  <option key={app.nombre_app} value={app.nombre_app}>
                    {app.nombre_app}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
          </GridItem>

          <GridItem colSpan={1} padding={{ base: 2, md: 4 }}>
            <Box
              fontSize={{ base: 10, md: 18 }}
              fontWeight="bold"
              color="gray.600"
              textAlign={{ base: "start", md: "start" }}
            >
              Autor
            </Box>
            <Input
              id="autor"
              type="text"
              placeholder="Nombre del autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              width={{ base: 28, md: 80 }}
              size={{ base: 4, md: 8 }}
              fontSize={{ base: 10, md: 18 }}
              p={{ base: 1, md: 2 }}
            />
          </GridItem>
          <GridItem colSpan={1} padding={{ base: 2, md: 4 }}>
            <Box>
              <Box
                fontSize={{ base: 10, md: 18 }}
                fontWeight="bold"
                color="gray.600"
                textAlign={{ base: "start", md: "start" }}
              >
                Version
              </Box>
              <Input
                id="version"
                type="text"
                placeholder="ej: 1.0.0"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                width={{ base: 28, md: 80 }}
                size={{ base: 4, md: 8 }}
                fontSize={{ base: 10, md: 18 }}
                p={{ base: 1, md: 2 }}
              />
            </Box>
          </GridItem>
          <GridItem colSpan={1} padding={{ base: 2, md: 4 }}>
            <Box>
              <Box
                fontSize={{ base: 10, md: 18 }}
                fontWeight="bold"
                color="gray.600"
                textAlign={{ base: "start", md: "start" }}
              >
                Hash del Commit
              </Box>
              <Input
                id="hash_git"
                type="text"
                placeholder="Hash de Git"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                width={{ base: 28, md: 80 }}
                size={{ base: 4, md: 8 }}
                fontSize={{ base: 10, md: 18 }}
                p={{ base: 1, md: 2 }}
              />
            </Box>
          </GridItem>
          <GridItem colSpan={1} padding={{ base: 2, md: 4 }}>
            <Box>
              <Box
                fontSize={{ base: 10, md: 18 }}
                fontWeight="bold"
                color="gray.600"
                textAlign={{ base: "start", md: "start" }}
              >
                Fecha
              </Box>
              <Input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)} // Prop 'setFecha'
                width={{ base: 28, md: 80 }}
                size={{ base: 4, md: 8 }}
                fontSize={{ base: 10, md: 18 }}
                p={{ base: 1, md: 2 }}
              />
            </Box>
          </GridItem>
          <GridItem colSpan={2} padding={{ base: 2, md: 4 }}>
            <Box>
              <Box
                fontSize={{ base: 10, md: 18 }}
                fontWeight="bold"
                color="gray.600"
                textAlign={{ base: "start", md: "start" }}
              >
                Descripcion
              </Box>
              <Textarea
                id="descripcion"
                fontSize={18}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                minHeight={{ base: 28, md: 40 }}
                size={{ base: 4, md: 30 }}
                p={{ base: 1, md: 2 }}
              />
            </Box>
          </GridItem>
        </Grid>{" "}
        {/* Fin de SimpleGrid */}
        {/* Botón */}
        <Button
          type="submit"
          bg="#c81d25"
          color="white"
          _hover={{ bg: "#f2424bff" }}
          width={{ base: "full", md: "full" }}
          height={{ base: 30, md: 45 }}
          mt={{ base: 2, md: 4 }}
          fontSize={{ base: 10, md: 20 }}
          borderRadius={10}
        >
          + Agregar Registro
        </Button>
      </form>
    </Box>
  );
}
export default Formulario;
