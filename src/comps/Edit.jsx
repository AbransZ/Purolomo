import {
  Dialog,
  Button,
  Box,
  Flex,
  Text,
  Input,
  Textarea,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

function EditModal({ isOpen, onClose, record, onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    version: "",
    autor: "",
    hash_git: "",
    descripcion: "",
    fecha: "",
  });
  useEffect(() => {
    if (record) {
      setFormData({
        nombre: record.nombre || "",
        version: record.version || "",
        autor: record.autor || "",
        descripcion: record.descripcion || "",
        hash_git: record.hash_git || "",
        fecha: record.fecha ? record.fecha.split("T")[0] : "",
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    onSave(record.id, formData);
  };
  if (!record) return null;
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(detail) => {
        if (!detail.open) {
          onClose();
        }
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          maxWidth={{ base: 280, md: 700 }}
          bgColor={"gray.100"}
          borderRadius={10}
        >
          <Dialog.Header>
            <Dialog.Title fontSize={{ base: 15, md: 30 }}>
              Editar Registro (ID: {record.id})
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Flex direction="column" gap={4} p={{ base: 2, md: 4 }}>
              <Grid columns={2} spacing={4}>
                <GridItem colSpan={1} p={{ base: 2, md: 4 }}>
                  <Text
                    mb={{ base: 2, md: 4 }}
                    fontWeight="bold"
                    fontSize={{ base: 10, md: 18 }}
                    width={{ base: 60, md: 250 }}
                  >
                    Nombre de la aplicacion
                  </Text>
                  <Input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    width={{ base: 28, md: 80 }}
                    fontSize={{ base: 10, md: 15 }}
                    borderRadius={5}
                  />
                </GridItem>
                <GridItem colSpan={1} p={{ base: 2, md: 4 }}>
                  <Text
                    mb={{ base: 2, md: 4 }}
                    fontWeight="bold"
                    fontSize={{ base: 10, md: 18 }}
                    width={{ base: 60, md: 250 }}
                  >
                    Autor
                  </Text>
                  <Input
                    name="autor"
                    value={formData.autor}
                    onChange={handleChange}
                    width={{ base: 28, md: 80 }}
                    fontSize={{ base: 10, md: 15 }}
                    borderRadius={5}
                  />
                </GridItem>
                <GridItem colSpan={1} p={{ base: 2, md: 4 }}>
                  <Box flex={1}>
                    <Text
                      mb={{ base: 2, md: 4 }}
                      fontWeight="bold"
                      fontSize={{ base: 10, md: 18 }}
                      width={{ base: 60, md: 250 }}
                    >
                      Versión
                    </Text>
                    <Input
                      name="version"
                      value={formData.version}
                      onChange={handleChange}
                      width={{ base: 28, md: 80 }}
                      fontSize={{ base: 10, md: 15 }}
                      borderRadius={5}
                    />
                  </Box>
                </GridItem>
                <GridItem colSpan={1} p={{ base: 2, md: 4 }}>
                  <Text
                    mb={{ base: 2, md: 4 }}
                    fontWeight="bold"
                    fontSize={{ base: 10, md: 18 }}
                    width={{ base: 60, md: 250 }}
                  >
                    Fecha
                  </Text>
                  <Input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    width={{ base: 28, md: 80 }}
                    fontSize={{ base: 10, md: 15 }}
                    borderRadius={5}
                  />
                </GridItem>
                <GridItem colSpan={1} p={{ base: 2, md: 4 }}>
                  <Text
                    mb={{ base: 2, md: 4 }}
                    fontWeight="bold"
                    fontSize={{ base: 10, md: 18 }}
                    width={{ base: 60, md: 250 }}
                  >
                    Hash Git
                  </Text>
                  <Input
                    name="hash_git"
                    value={formData.hash_git}
                    onChange={handleChange}
                    width={{ base: 28, md: 80 }}
                    fontSize={{ base: 10, md: 15 }}
                    borderRadius={5}
                  />
                </GridItem>
                <GridItem colSpan={1} p={{ base: 2, md: 4 }}>
                  <Text
                    mb={{ base: 2, md: 4 }}
                    fontWeight="bold"
                    fontSize={{ base: 10, md: 18 }}
                    width={{ base: 60, md: 250 }}
                  >
                    Descripción
                  </Text>
                  <Textarea
                    height={100}
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    width={{ base: "220px", md: 600 }}
                    fontSize={{ base: 10, md: 15 }}
                    borderRadius={5}
                  />
                </GridItem>
              </Grid>
            </Flex>
          </Dialog.Body>
          <Dialog.Footer>
            <HStack spacing={3}>
              <Button
                bgColor="blue.200"
                onClick={handleSaveChanges}
                fontSize={{ base: 10, md: 18 }}
                borderRadius={5}
                maxHeight={{ base: 25, md: 40 }}
              >
                Guardar
              </Button>
              <Dialog.CloseTrigger asChild>
                <Button
                  color={"black"}
                  variant="ghost"
                  fontWeight={"bold"}
                  fontSize={{ base: 10, md: 15 }}
                >
                  X
                </Button>
              </Dialog.CloseTrigger>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
export default EditModal;
