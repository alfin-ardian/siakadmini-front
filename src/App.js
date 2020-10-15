import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Beranda from './pages/beranda'
import Jurusan from './pages/jurusan'
import Matakuliah from './pages/matakuliah'
import AddMahasiswa from './pages/addMahasiswa'
import AddJurusan from './pages/addJurusan'
import AddMatkul from './pages/addMatkul'
import Tampil from './pages/tampil'
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
    return(
        <BrowserRouter>
            <Switch>
               <Route exact path="/" component={Beranda}/>
               <Route path="/jurusan" component={Jurusan}/>
               <Route path="/matakuliah" component={Matakuliah}/>
               <Route path="/addMahasiswa" component={AddMahasiswa}/>
               <Route path="/addJurusan" component={AddJurusan}/>
               <Route path="/addMatkul" component={AddMatkul}/>
               <Route path="/tampil" component={Tampil}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App