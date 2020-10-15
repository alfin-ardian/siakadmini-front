import { Radio, Select, Upload } from 'antd';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header'

function Form(){
    const [ form, setForm ] = useState()
    const [ jurusans, setJurusans ] = useState()

    const {Option} = Select

    useEffect(()=>{
        Axios
            .get(`http://localhost:8000/jurusan`)
            .then(response=>{
                setJurusans(response.data)
            })
    },[])

    function save(e){
        e.preventDefault()
        
        Axios({
            url:'http://localhost:8000/mahasiswa',
            method: 'POST',
            data: form
        }).then(response=>{
            alert(response.data.message)
        })
    }

    function handleUpload(info){
        if (info.file.status === 'uploading') {
          return;
        }
        if (info.file.status === 'done') {
            setForm({...form, image:info.file.name})
        }
      };

    return(
        <div>
            <Header halaman='form' />
            <Link to='/'>pergi ke tampil</Link>

            <form onSubmit={save}>
                <input value={form?.id} onChange={e=>setForm({...form, id:e.target.value})} />
                <input value={form?.name} onChange={e=>setForm({...form, name:e.target.value})} />
                <br />
                    <Radio.Group onChange={(e)=>setForm({...form, sex:e.target.value})} value={form?.sex}>
                        <Radio value='pria'>Pria</Radio>
                        <Radio value='wanita'>Wanita</Radio>
                    </Radio.Group>
                <br />
                
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="pilih agama"
                    onChange={(e)=>setForm({...form, religion:e})}
                >
                    <Option value="Islam">Islam</Option>
                    <Option value="Khatolik">Khatolik</Option>
                    <Option value="Protestan">Protestan</Option>
                    <Option value="Hindu">Hindu</Option>
                    <Option value="Buddha">Buddha</Option>
                    <Option value="Konghuchu">Konghuchu</Option>
                </Select> <br />

                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="pilih agama"
                    onChange={(e)=>setForm({...form, jurusan_id:e})}
                >
                    
                    {jurusans?.data.map((data, index) =>(
                        <Option key={index} value={data.id}>{data.name}</Option>
                    ))}
                </Select>

                <Upload
                    name="image"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="http://localhost:8000/mahasiswa/upload"
                    method='post'
                    onChange={handleUpload}
                >
                    {form?.image ?
                        <img src={`http://localhost:8000/asset/img/${form.image}`} alt='' style={{ width:50}} />
                    : 'Tambah'}
                </Upload>

                <button type='submit'>tambah</button>
            </form>
        </div>
    )
}

export default Form