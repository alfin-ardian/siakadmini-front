import React, {useState, useEffect} from 'react';
import {Row, Col, Input, message, AutoComplete } from 'antd';
import Axios from 'axios'
import Sidebar from '../components/sidebar'
import { Button, Form } from 'react-bootstrap';
import Modal from 'antd/lib/modal/Modal'



function Beranda(){

  const [datas, setDatas]  = useState()
  const [page, setPage] = useState({visible:false})
  const [form, setForm] = useState()
  const [formEdit, setFormEdit] = useState()
  

  function getData(){
    Axios
        .get('http://localhost:8000/mahasiswa')
        .then(response=>{
            setDatas(response.data)
        })
  }

  function editMahasiswa(){
    Axios({
        url: `http://localhost:8000/mahasiswa/${formEdit.id}`,
        method: 'PUT',
        data: formEdit
    }).then(response=>{
        getData()
        setPage({...page, visible:false})
        message.success(response.data.message)
    })
  }
  

    function hapus(id){   
      Axios
          .delete(`http://localhost:8000/mahasiswa/${id}`)
          .then(response=>{
              getData()
              message.success(response.data.message)
          })
    }
    useEffect(()=>{
      getData()
    },[])


  return(
    <div>
       <Row>
      <Col span={5}>
        <Sidebar />
      </Col>
      <Col span={19}>
      
        <h1 class='mt-3'>Data Mahasiswa</h1>

        <AutoComplete
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={500}
          style={{ width: 500 }}
          class='mt-3'
        >
          <Input.Search size="large" placeholder="input here" />
        </AutoComplete>

        <table className='table table-striped table-hover mt-3'>
                <thead>
                    <tr>
                        <th>no</th>
                        <th>nama</th>
                        <th>jurusan</th>
                        <th>aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {datas?.map((data, index) => (
                    <tr>
                        <td>{index+1}</td>
                        <td>{data.name}</td>
                        <td>{data.jurusan?.name}</td>
                        <td>
                        <Button variant="outline-info" onClick={() =>{
                            setPage({...page, visible: true})
                            setFormEdit(data)
                        }}> ubah </Button>{' '}
                         <Button variant="outline-danger" onClick={()=>hapus(data.id)}>hapus</Button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
            <Modal
              title="Edit Mahasiswa"
              visible={page.visible}
              onOk={editMahasiswa}
              onCancel={()=>setPage({...page, visible: false})}
            >
              <Input placeholder='nama' value={formEdit?.name} onChange={e=>setForm({...form, name:e.target.value})}/> <br/>
              <Input placeholder='gender' value={formEdit?.gender} onChange={e=>setForm({...form, gender:e.target.value})}/> <br/>
              <Form>
                <Row>
                  <Col mx="auto">
                    <Form.Control placeholder="First name" />
                  </Col>
                  <Col>
                    <Form.Control placeholder="Last name" />
                  </Col>
                </Row>
              </Form>
            
            </Modal>
      </Col>
    </Row>
      
  </div>
  
  )
}

export default Beranda