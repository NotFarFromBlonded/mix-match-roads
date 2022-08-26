import React,{useEffect, useState} from 'react';
import { EmissionState } from '../Context';

const SliderComponent = (props) => {
    const {roadData, setRoadData, feas} = EmissionState();
  return (
    <div style={{ fontFamily: 'Open Sans, sans-serif' }}>
        <p>{props.rd.name}</p>
        <label>
            <input type = "range" min = "0" max="50000" step="0.01" style={{color:"pink"}} value={props.rd.volume} onChange={(e)=>setRoadData(roadData.map((it)=>{if(it.name===props.rd.name){return {name:`${props.rd.name}`, volume:parseFloat(e.target.value)}}else{return it}}))}/>
            {props.rd.volume}
        </label>
    </div>
  )
}

export default SliderComponent
