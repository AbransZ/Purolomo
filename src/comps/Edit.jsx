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
  GridItem
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
        <Dialog.Content maxWidth={"2xl"} bgColor={"gray.100"} borderRadius={10}>
          <Dialog.Header>
            <Dialog.Title fontSize={26}>
              Editar Registro (ID: {record.id})
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Flex direction="column" gap={4} p={2}>
              <Grid columns={2} spacing={4}>
                <GridItem colSpan={1} p={2}>
                  <Text mb={1} fontWeight="bold" fontSize={18} width={"md"}p={2} >
                    Nombre de la aplicacion
                  </Text>
                  <Input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    fontSize={18}
                    size={"xl"}
                    borderRadius={5}
                  />     
                </GridItem>    
                <GridItem colSpan={1} p={2}>
                  <Text mb={1} fontWeight="bold" fontSize={18} p={2}>
                  Autor
                  </Text>
                  <Input
                    name="autor"
                    value={formData.autor}
                    onChange={handleChange}
                    fontSize={18}
                    size={"lg"}
                    borderRadius={5}
                  />
                </GridItem>
              
              <GridItem colSpan={1} p={2}>
                <Box flex={1}>
                  <Text mb={1} fontWeight="bold" fontSize={18}p={2}>
                  Versión
                  </Text>
                  <Input
                    name="version"
                    value={formData.version}
                    onChange={handleChange}
                    fontSize={18}
                    size={"lg"}
                    borderRadius={5}
                  />
                </Box>
                </GridItem>
                <GridItem colSpan={1} p={2}>
                  <Text mb={1} fontWeight="bold" fontSize={18}p={2}>
                  Fecha
                  </Text>
                  <Input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    fontSize={18}
                    borderRadius={5}
                  />
                </GridItem>
              <GridItem colSpan={1} p={2}>
                <Text mb={1} fontWeight="bold" fontSize={18}p={2}>
                Hash Git
                </Text>
                <Input
                  name="hash_git"
                  value={formData.hash_git}
                  onChange={handleChange}
                  fontSize={18}
                  borderRadius={5}
                />
              </GridItem>
              <GridItem colSpan={1} p={2}>
                <Text mb={2} fontWeight="bold" fontSize={18}p={2}>
                Descripción
                </Text>
                <Textarea
                  height={100}
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  fontSize={18}
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
                fontSize={18}
                borderRadius={5}
                maxHeight={"2xl"}
              >
               Guardar Cambios
              </Button>
              <Dialog.CloseTrigger asChild>
              <Button
                color={"black"}
                variant="ghost"
                fontWeight={"bold"}
                fontSize={20}
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
