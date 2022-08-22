import React from 'react';
import { EmissionState } from '../Context';
import { road_material } from '../cost_geo';

const PriceEmission = () => {
    const {roadData, priceChange, ghgChange} = EmissionState();
  return (
    <>
        <div><p>Total Cost: Rs. <span style={{color: ((roadData.map((it)=>it.volume*(road_material.find((i)=>i.name===it.name).cost)).reduce((acc,el)=>acc+=el,0))/10000000).toFixed(2)>priceChange?'red': ((roadData.map((it)=>it.volume*(road_material.find((i)=>i.name===it.name).cost)).reduce((acc,el)=>acc+=el,0))/10000000).toFixed(2)<priceChange?'green':'black'}}>{`${((roadData.map((it)=>it.volume*(road_material.find((i)=>i.name===it.name).cost)).reduce((acc,el)=>acc+=el,0))/10000000).toFixed(2)}`}</span>Cr</p></div>
        <div><p>Total CO2 emission <span style={{color: roadData.map((it)=>it.volume*(road_material.find((i)=>i.name===it.name).Carbon_emission)).reduce((acc,el)=>acc+=el,0).toFixed(2)>ghgChange?'red': roadData.map((it)=>it.volume*(road_material.find((i)=>i.name===it.name).Carbon_emission)).reduce((acc,el)=>acc+=el,0).toFixed(2)<ghgChange?'green':'black'}}>{`${roadData.map((it)=>it.volume*(road_material.find((i)=>i.name===it.name).Carbon_emission)).reduce((acc,el)=>acc+=el,0).toFixed(2)}`}</span> tCO2</p></div>
    </>
    
  )
}

export default PriceEmission