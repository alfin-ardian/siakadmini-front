import React from 'react'
import { Link } from 'react-router-dom'
import { Menu,PageHeader } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';


function Sidebar({halaman}){
    const { SubMenu } = Menu;


    return(
       <div>
        <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Title"
        subTitle="selamat datang"
        />
        <Menu
    style={{ width: 256 }}
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    mode="inline"
  >
    <SubMenu
      key="sub1"
      title={
        <span>
          <MailOutlined />
          <span>Mahasiswa</span>
        </span>
      }
    >
        <Menu.Item><Link to="/">Data Mahasiswa</Link></Menu.Item>
        <Menu.Item><Link to="/AddMahasiswa">Tambah Mahasiswa</Link></Menu.Item>
    </SubMenu>
    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Jurusan">
      <Menu.Item key="5"><Link to="/jurusan">Data Jurusan</Link></Menu.Item>
      <Menu.Item key="6"><Link to="/addJurusan">Tambah Jurusan</Link></Menu.Item>
     
    </SubMenu>
    <SubMenu
      key="sub4"
      title={
        <span>
          <SettingOutlined />
          <span>Mata kuliah</span>
        </span>
      }
    >
      <Menu.Item key="9"><Link to="/matakuliah">Data Mata Kuliah</Link></Menu.Item>
      <Menu.Item key="10"><Link to="/addMatkul">Tambah Mata Kuliah</Link></Menu.Item>
    </SubMenu>
  </Menu>
  </div>
    )
}

export default Sidebar