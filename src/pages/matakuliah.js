import React, {useState, useEffect} from 'react';
import {Row, Col, message, Input } from 'antd';
import Axios from 'axios'
import Sidebar from '../components/sidebar'
import { Button } from 'react-bootstrap';
import Modal from 'antd/lib/modal/Modal'



function Matakuliah(){

  const [datas, setDatas]  = useState()
  const [page, setPage] = useState({visible:false})
  const [formEdit, setFormEdit] = useState()

  function getData(){
    Axios
        .get('http://localhost:8000/matakuliah')
        .then(response=>{
            setDatas(response.data)
        })
  }

  function hapus(id){
          
    Axios
        .delete(`http://localhost:8000/matakuliah/${id}`)
        .then(response=>{
            getData()
            message.success(response.data.message)
        })
}

function editJurusan(){
  Axios({
      url: `http://localhost:8000/matakuliah/${formEdit.id}`,
      method: 'PUT',
      data: formEdit
  }).then(response=>{
      getData()
      setPage({...page, visible:false})
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
      
        <h1 class='mt-3'>Data Matakuliah</h1>

        <Button variant="outline-info">tambah matakuliah</Button>

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
                        }}>ubah</Button>{' '}
                          <Button variant="outline-danger" onClick={()=>hapus(data.id)}>hapus</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Modal
          title="Ubah data"
          visible={page.visible}
          onOk={editJurusan}
          onCancel={()=>setPage({...page, visible: false})}
        >
          <Input 
            placeholder='nama matakuliah'
            value={formEdit?.name}
            onChange={(e)=>setFormEdit({...formEdit, name:e.target.value})}
            />
        </Modal>
              
      </Col>
    </Row>
      
  </div>
  
  )
}

export default Matakuliah