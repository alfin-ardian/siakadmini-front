import React, { useState,useEffect,useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header'
import { Button, Input, message, Pagination, Spin, Switch } from 'antd';
import Axios from 'axios';
import Modal from 'antd/lib/modal/Modal';

function Tampil(){
    const [ form, setForm ] = useState({nim:1001})
    const [ datas, setDatas ] = useState()
    const [ page, setPage ] = useState({visible:false, current:1, search:'',sort:'id,asc', loading:false})
    const [ formEdit, setFormEdit ] = useState()


    const getData = useCallback(()=>{
        setPage({...page, loading:true})
        Axios
            .get(`http://localhost:8000/mahasiswa`)
            .then(response=>{
                setPage({...page, loading:false})
                setDatas(response.data)
            })
    },[page.current, page.search, page.sort])

    useEffect(()=>{
        getData()
    },[getData])

    function handlePaginationChange(halaman){
        Axios
        .get(`http://localhost:8000/mahasiswa?page=${halaman}`)
        .then(response=>{
            setDatas(response.data)
        })
    }

    function handleSearch(value){
        Axios
        .get(`http://localhost:8000/mahasiswa?page=${1}&name=${value}`)
        .then((response)=>{
            setDatas(response.data)
        })
    }
    
    //const handleSorting = (column, orderby) => {
    function handleSorting(column, orderby){
        Axios
        .get(`http://localhost:8000/mahasiswa?page=${1}&sort=${column},${orderby}`)
        .then(response=>{
            setDatas(response.data)
        })
    }

    function editmahasiswa(){
        Axios({
            url: `http://localhost:8000/mahasiswa/${formEdit.id}`,
            method: 'PUT',
            data: formEdit
        }).then(response=>{
            getData()
            setPage({...page, visible: false})
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

        /*Axios({
            url: `http://localhost:8000/mahasiswa/${id}`,
            method: 'DELETE',
        }).then(response=>{
            message.success(response.data.message)
        })*/
    }

    return(
        <div>
            <Header halaman='tampil' />
            <Link to='/form'>pergi ke form</Link>
            {/*<h1>hello world</h1>
            <div className='row'>
                <div className='col-md-3'>
                    <Input
                        placeholder='nim'
                        value={form?.nim}
                        onChange={(e)=>setForm({...form, nim:e.target.value})}
                    />
                </div>
                <div className='col-md-2'>
                    <Switch size="large" defaultChecked />
                    <Button>ini button</Button>
                </div>
            </div>
            <br />
            <input
                placeholder='nama'
                onChange={(e)=>setForm({...form, nama:e.target.value})}
            />
            <br />
            <span style={{background:'yellow', color:'red', fontSize:24}}>
                {form?.nim}
            </span>
            {form?.nama}<br />
            <button onClick={()=>proses(111)}>proses</button>
            */}

            {/*<input onChange={(e)=>handleSearch(e.target.value)} />*/}
            <input onChange={(e)=>setPage({...page, search:e.target.value})} />

            <Spin spinning={page.loading}>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>ID
                            <button onClick={()=>handleSorting('id','asc')}>asc</button>
                            <button onClick={()=>handleSorting('id','desc')}>desc</button>
                        </th>
                        <th>Nama mahasiswa
                            <button onClick={()=>setPage({...page, sort:'name,asc'})}>asc</button>
                            <button onClick={()=>setPage({...page, sort:'name,desc'})}>desc</button>
                        </th>
                        <th>Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {datas?.data?.map((data, index) =>(
                        <tr>
                            <td>{index+1}</td>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>
                                <img
                                    src={`http://localhost:8000/asset/img/${data.image}`}
                                    alt='ga ada gambar'
                                    style={{width:50}}
                                />
                                </td>
                            <td>
                                <button onClick={()=>{
                                    setPage({...page, visible:true})
                                    setFormEdit(data)
                                }}>Ubah</button>
                                <button onClick={()=>hapus(data.id)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            </Spin>

            <Modal
                title="Ubah data"
                visible={page.visible}
                onOk={editmahasiswa}
                onCancel={()=>setPage({...page, visible: false})}
                >
                    <Input
                        placeholder='nama mahasiswa'
                        value={formEdit?.name}
                        onChange={e=>setFormEdit({...formEdit, name:e.target.value})}
                    />
            </Modal>

        </div>
    )
}

export default Tampil