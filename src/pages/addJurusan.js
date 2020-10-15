import Axios from 'axios'
import React, { useState } from 'react'
import Sidebar from '../components/sidebar'
import {Col, Row ,message} from 'antd';
import { Form, Button } from 'react-bootstrap';


function AddJurusan(){

    const [form, setForm] = useState()
   
    function save(e){
        e.preventDefault()

        Axios({
            url: 'http://localhost:8000/jurusan',
            method:'POST',
            data: form
        }).then(response=>{
            message.success(response.data.message)
        })
    }

    return(
        <div>
            <Row>
        <Col span={5}>
            <Sidebar />
        </Col>
        <Col span={19}>
        <h1 class='mt-3'>Tambah jurusan</h1>
        <Form onSubmit={save}>
        <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Nama Jurusan
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="text" placeholder="Masukan Nama"
             value={form?.name} onChange={e=>setForm({...form, name:e.target.value})} />
            </Col>
        </Form.Group>
        <Button variant="outline-info" type="submit">Simpan</Button>
                </Form>
                </Col>
                </Row>
        </div>
    )
}

export default AddJurusan