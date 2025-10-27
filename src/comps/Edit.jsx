import { Dialog, Button } from "@chakra-ui/react";
import { useState, useEffect } from 'react';

function EditModal({isOpen, onClose, record, onSave}) {
const[formData,setFormData] = useState({
  nombre:'',
  version: '',
    autor: '',
    hash: '',
    descripcion: '',
    fecha: '',})
    useEffect(()=> {
      if(record){
        setFormData({
          nombre:record.nombre||'',
          version:record.version||'',
          autor:record.autor||'',
          descripcion:record.descripcion||'',
          hash:record.hash_git||'',
          fecha: record.fecha ? record.fecha.split('T')[0] : '',

        })
      }
    },[record])

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 
  const handleSaveChanges = () => {
    
    onSave(record.id, formData); 
  };
  if(!record) return null
  return (
<Dialog.Root open={isOpen} onOpenChange={(detail) => !detail.open && onClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger asChild>
            <Button variant="ghost" size="sm" position="absolute" top="2" right="2">✕</Button>
          </Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Editar Registro (Básico)</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            Aquí irá el formulario de edición...
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <Button variant='ghost'>Cerrar</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
export default EditModal;
