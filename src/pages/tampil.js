import Axios from 'axios';
import React, {useEffect, useState, useCallback} from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import {Input, message, Pagination} from 'antd';
import Modal from 'antd/lib/modal/Modal'


function Tampil(){
    // const [form, setForm] = useState({nim:100})
    const [datas, setDatas]  = useState()
    const [page, setPage] = useState({visible:false,current: 1, search:''})
    const [formEdit, setFormEdit] = useState()

    const getData = useCallback(()=>{
        Axios
            .get(`http://localhost:8000/jurusan?page=${page.current}&name=${page.search}`)
            .then(response=>{
                setDatas(response.data)
            })
    },[page.current, page.search])

    useEffect(()=>{
        getData()
    },[getData])

    function handlePaginationChange(halaman){
        Axios
        .get(`http://localhost:8000/jurusan?page=${halaman}`)
        .then(response=>{
            setDatas(response.data)
        })
    }

    // function handleSeach(value){
    //     Axios
    //     .get(`http://localhost:8000/jurusan?page=${1}&name=${value}`)
    //     .then(response=>{
    //         setDatas(response.data)
    //     })
    // }

    // function proses(id){
    //     alert(id)
    // }

    function editJurusan(){
        Axios({
            url: `http://localhost:8000/jurusan/${formEdit.id}`,
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
            .delete(`http://localhost:8000/jurusan/${id}`)
            .then(response=>{
                getData()
                message.success(response.data.message)
            })

        //  Axios({
        //     url: `http://localhost:8000/jurusan/${id}`,
        //     method: 'DELETE',
        // }).then(response=>{
        //     message.success(response.data.message)
        // })
    }
    return(
        <div>
            {/* <Input 
            placeholder='nim'
            value={form?.nim}
            onChange={(e)=>setForm({...form, nim:e.target.value})}
            /> */}
            <Header halaman='tampil'/>
            <Link to="/form">pergi ke form</Link>
            {/* <h1>hello world</h1> */}
            {/* <input 
            placeholder='nim'
            value={form?.nim}
            onChange={(e)=>setForm({...form, nim:e.target.value})}
            />
            <br />
            <Input 
            placeholder='nama'
            value={form?.nama}
            onChange={(e)=>setForm({...form, nama:e.target.value})}
            />
            <br />
            {form?.nim} {form?.nama}<br/>
            <Button onClick={()=>proses(111)}>proses</Button>
            <Radio.Group>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group> */}
            <Input onChange={(e)=>setPage({...page, search:e.target.value})}/>
            
            {/* // <Input onChange={(e)=>handleSeach(e.target.value)}/> inni pakai function handdleserch */}
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>no</th>
                        <th>id</th>
                        <th>nama</th>
                        <th>aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {datas?.map((data, index) => (
                    <tr>
                        <td>{index}</td>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>
                        <button onClick={() =>{
                            setPage({...page, visible: true})
                            setFormEdit(data)
                        }}> ubah </button>
                        <button onClick={()=>hapus(data.id)}>hapus</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

        <Pagination 
        current={1}
        pageSize={2}
        total={datas?.total}
        onChange={(e)=> handlePaginationChange(e)}
        current={page.current}
        />

        <Modal
          title="Ubah data"
          visible={page.visible}
          onOk={editJurusan}
          onCancel={()=>setPage({...page, visible: false})}
        >
          <Input 
            placeholder='nama jurusan'
            value={formEdit?.name}
            onChange={(e)=>setFormEdit({...formEdit, name:e.target.value})}
            />
        </Modal>
        </div>
    )
}

export default Tampil