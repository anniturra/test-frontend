import React, { useEffect, useState } from "react";
import axios from 'axios';

function ComboBox() {

    const [region, setRegion] = useState([]);
    const [province, setProvince] = useState([]);
    const [commune, setCommune] = useState([]);
    const [street, setStreet] = useState([]);

    useEffect(()=>{
      getRegion()
    },[]);
  
    const getRegion = async () => {
      const res = await axios.get('http://localhost:8000/api/region');
      setRegion(res.data);
    }

    const handlerRegion = async (e) => {
      const option = e.target.value;
        if(option >= 1){
            const res = await axios.get(`http://localhost:8000/api/province/${option}`);
            setProvince(res.data);
        }
    }

    const handlerProvince = async (e) => {
      const option = e.target.value;
        if(option >= 1){
            const res = 
            await axios.get(`http://localhost:8000/api/commune/${option}`);
            setCommune(res.data);
        }
    }

    const handlerCommune = async (e) => {
      const option = e.target.value;
      if(option >= 1){
        const res = await axios.get(`http://localhost:8000/api/street/${option}`);
        setStreet(res.data);
    }
    }

    return (
        <div class="row">

        <div class="col-sm">
          <h5>Seleccione una región</h5>
          <select name="region" onClick={handlerRegion}>
              <option value={-1}>Seleccione una región:</option>
              {region.map(item => (<option value={item.id}>{item.name}</option>))}  
          </select>
        </div>

        <div class="col-sm">
        <h5>Seleccione una provincia</h5>
        <select name="province" onClick={handlerProvince}>
              <option value={-1}>Seleccione una provincia:</option>
              {province.map(item => (<option value={item.id}>{item.name}</option>))}  
          </select>
        </div>

        <div class="col-sm">
        <h5>Seleccione una comuna</h5>
        <select name="province" onClick={handlerCommune}>
              <option value={-1}>Seleccione una comuna:</option>
              {commune.map(item => (<option value={item.id}>{item.name}</option>))}  
          </select>
        </div>

        <div class="col-sm">
        <button type="button" class="btn btn-dark">Buscar Calles</button>
        </div>

        <div class="row">
        <table class="table">
        <thead>
            <tr>
            <th scope="col">Calles</th>
            </tr>
        </thead>
        <tbody>
          {street.map(item => (<tr>{item.name}</tr>))}
        </tbody>
        </table>
        </div>

      </div>

      

    )
}

export default ComboBox;
