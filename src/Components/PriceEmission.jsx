import React from 'react';
import { EmissionState } from '../Context';
import { road_material } from '../cost_geo';

const PriceEmission = () => {
  const { roadData, priceChange, ghgChange } = EmissionState();
  return (
    <i>
      <i><div style={{ color: "#a98467", fontSize: "26px", fontFamily: 'Open Sans, sans-serif' }}><p>Total Cost: ₹<u><span style={{ color: ((roadData.map((it) => it.volume * (road_material.find((i) => i.name === it.name).cost)).reduce((acc, el) => acc += el, 0)) / 10000000) > priceChange ? 'red' : ((roadData.map((it) => it.volume * (road_material.find((i) => i.name === it.name).cost)).reduce((acc, el) => acc += el, 0)) / 10000000) < priceChange ? 'green' : 'black' }}>{`${((roadData.map((it) => it.volume * (road_material.find((i) => i.name === it.name).cost)).reduce((acc, el) => acc += el, 0)) / 10000000).toFixed(2)}`}</span></u> Cr</p></div></i>
      <i><div style={{ color: "#a98467", fontFamily: 'Open Sans, sans-serif', fontSize: "26px" }}><p>Total CO2 emission: <u><span style={{ color: roadData.map((it) => it.volume * (road_material.find((i) => i.name === it.name).Carbon_emission)).reduce((acc, el) => acc += el, 0) > ghgChange ? 'red' : roadData.map((it) => it.volume * (road_material.find((i) => i.name === it.name).Carbon_emission)).reduce((acc, el) => acc += el, 0) < ghgChange ? 'green' : 'black' }}>{`${roadData.map((it) => it.volume * (road_material.find((i) => i.name === it.name).Carbon_emission)).reduce((acc, el) => acc += el, 0).toFixed(2)}`}</span></u> tCO2</p></div></i>
    </i>

  )
}

export default PriceEmission