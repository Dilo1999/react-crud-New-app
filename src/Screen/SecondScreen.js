import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:5000/items';

function CrudApp() {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get(API_URL);
    setItems(response.data);
  };

  const handleClose = () => {
    setShow(false);
    setNewItem('');
    setNewImage(null);
    setEditId(null);
  };

  const handleShow = () => setShow(true);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', newItem);
    if (newImage) formData.append('image', newImage);

    if (editId) {
      await axios.put(`${API_URL}/${editId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    } else {
      await axios.post(API_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    fetchItems();
    handleClose();
  };

  const handleEdit = (item) => {
    setNewItem(item.name);
    setNewImage(null);
    setEditId(item._id);
    handleShow();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchItems();
  };

  const handleDeleteAll = async () => {
    await axios.delete(API_URL);
    fetchItems();
  };

  const handleImageUpload = (e) => {
    setNewImage(e.target.files[0]);
  };

  return (
    <Container className="mt-5 text-center">
      <h1 className="mb-4">CRUD Application</h1>
      <Button variant="primary" onClick={handleShow} className="mb-3">Add Item</Button>
      <Button variant="danger" onClick={handleDeleteAll} className="mb-3 ms-3">Delete All Data</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.imageUrl && <img src={`http://localhost:5000${item.imageUrl}`} alt="Uploaded" width={100} />}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(item)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Edit Item' : 'Add Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Item</Form.Label>
              <Form.Control type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CrudApp;
