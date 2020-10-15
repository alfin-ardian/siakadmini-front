import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar'
import {Col, Row, Select ,message} from 'antd';
import { Form, Button } from 'react-bootstrap';


function AddMahasiswa(){

  const [form, setForm] = useState()
  const [jurusans, setJurusans]  = useState()
  const [matkuls, setMatkuls]  = useState()
    const { Option } = Select;

    function save(e){
        e.preventDefault()

        Axios({
            url: 'http://localhost:8000/mahasiswa',
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

      function getMatkul(){
        Axios
            .get('http://localhost:8000/matakuliah')
            .then(response=>{
                setMatkuls(response.data)
            })
      }

      useEffect(()=>{
        getJurusan()
        getMatkul()
      },[])
      
    return(
        <div>
            <Row>
        <Col span={5}>
            <Sidebar />
        </Col>
        <Col span={19}>
        <h1 class='mt-3'>Tambah Mahasiswa</h1>
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
            Nama
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="text" placeholder="Masukan Nama"
             value={form?.name} onChange={e=>setForm({...form, name:e.target.value})} />
            </Col>
        </Form.Group>
        <fieldset>
            <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
                Jenis Kelamin
            </Form.Label>
            <Col sm={10}>
                <Form.Check
                type="radio"
                label="Laki-laki"
                value={form?.gender} 
                onChange={e=>setForm({...form, gender:e.target.value})}
                />
                <Form.Check
                type="radio"
                label="Perempuan"
                value={form?.gender} 
                onChange={e=>setForm({...form, gender:e.target.value})}
                />
                    </Col>
                    </Form.Group>
                </fieldset>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Jurusan
                </Form.Label>
                <Col sm={10}>
                <Select
                    onChange={e=>setForm({...form, id_jurusan:e})}
                    showSearch
                    style={{ width: 200 }}
                    placeholder={"Pilih Jurusan"}
                >   {jurusans?.map((jurusan, index) => (
                    <Option key={index}  value={jurusan?.id} >{jurusan.name}</Option>
                    ))}
                </Select>
                </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Mata Kuliah
                </Form.Label>

                
                <Col sm={10}>
                <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="pilih mata kuliah"
                optionLabelProp="label"
            >   {matkuls?.map((data, index) => (
                <Option value={index} label={data.name}>
                <div className="demo-option-label-item">
                {data.name}
                </div>
                </Option>
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

export default AddMahasiswa