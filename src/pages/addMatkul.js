import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar'
import {Col, Row ,message,Select} from 'antd';
import { Form, Button } from 'react-bootstrap';


function AddMatkul(){

    const [form, setForm] = useState()
    const [jurusans, setJurusans]  = useState()
    const { Option } = Select;

    function save(e){
        e.preventDefault()

        Axios({
            url: 'http://localhost:8000/matakuliah',
            method:'POST',
            data: form
        }).then(response=>{
            message.success(response.data.message)
        })
    }

    function getJurusan(){
        Axios
            .get('http://localhost:8000/jurusan')
            .then(response=>{
                setJurusans(response.data)
            })
      }


      useEffect(()=>{
        getJurusan()
      },[])


    return(
        <div>
            <Row>
        <Col span={5}>
            <Sidebar />
        </Col>
        <Col span={19}>
        <h1 class='mt-3'>Tambah matakuliah</h1>
        <Form onSubmit={save}>
        <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Id
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="int" placeholder="Masukan Id"
             value={form?.id} onChange={e=>setForm({...form, id:e.target.value})} />
            </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
            Nama matakuliah
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="text" placeholder="Masukan Nama"
             value={form?.name} onChange={e=>setForm({...form, name:e.target.value})} />
            </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Jurusan
                </Form.Label>
                <Col sm={10}>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Pilih Jurusan"
                >   {jurusans?.map((jurusan, index) => (
                    <Option  value={index} onChange={e=>setForm({...form, id_jurusan:e.target.value})}>{jurusan.name}</Option>
                    ))}
                </Select>
                </Col>
                </Form.Group>
        <Button variant="outline-info" type="submit">Simpan</Button>
                </Form>
                </Col>
                </Row>
        </div>
    )
}

export default AddMatkul