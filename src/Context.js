import React, { createContext, useContext, useState, useEffect,useRef } from 'react';
import { road_template } from './template';
import {roadMaterial} from './options';
import { road_material } from './cost_geo';


const Emission = createContext();

const Context = ({children}) => {


    const[highwayType, setHighwayType] = React.useState("");
    const[roadType, setRoadType] = React.useState("");
    const[roadData, setRoadData] = useState([]);
    const[preSelected, setPreselected] = useState([]);
    const[priceChange, setPriceChange] = useState(0);
    const[ghgChange, setghgChange] = useState(0);
    const multiselectRef = useRef();


    const handleChangeHighway = ((e)=>{
        //const highwayType = road_template.find(i=>i.highway_abbr === e.target.value);
        setHighwayType(e.target.value);
        //setHighwayData(highwayType);
    })

    const handleChangeRoad = ((e)=>{
        //const roadType = highwayData.types.find(i=>i.rtype===e.target.value);
        setRoadType(e.target.value);
        //setRoadData(roadType.rmaterials);
        //setPreSelectedData(roadType.rmaterials);
    })

    const handleChangePreselected =()=> {
        //setPreselected(roadMaterial.filter((i)=>preSelectedData.find((it)=>it.name===i.name)));
        setPreselected(roadMaterial.filter((i)=>((((road_template.find((ia)=>ia.highway_abbr===highwayType)).types).find(ib=>ib.rtype===roadType)).rmaterials).find((it)=>it.name === i.name)))
        //const roadType = highwayData.types.find(i=>i.rtype===e.target.value);
        //setRoadData(roadType.rmaterials);
        setRoadData(road_template.find(i=>i.highway_abbr === highwayType).types.find(i=>i.rtype===roadType).rmaterials);
        setPriceChange((((road_template.find(i=>i.highway_abbr === highwayType).types.find(i=>i.rtype===roadType).rmaterials).map((it)=>it.volume*(road_material.find((i)=>i.name===it.name).cost)).reduce((acc,el)=>acc+=el,0))/10000000).toFixed(2))
        setghgChange((((road_template.find(i=>i.highway_abbr === highwayType).types.find(i=>i.rtype===roadType).rmaterials).map((it)=>it.volume*(road_material.find((i)=>i.name===it.name).Carbon_emission)).reduce((acc,el)=>acc+=el,0))).toFixed(2))
        resetValues();
        //
        //setRoadData(roadMaterial.filter((i)=>roadData.find((it)=>it.name===i.name)));
        
    }

    const resetValues = ()=>{
        multiselectRef.current.resetSelectedValues();
    }

    const changeSelect = (selectedList, selectedItem) =>{
        setRoadData([...roadData, {name: selectedItem.name, volume:0}]);
    }

    const changeRemove = (selectedList, removedItem) =>{
        setRoadData(roadData.filter((i)=>i.name!==removedItem.name));
        //console.log(selectedList);
        //console.log(removedItem);
    }

    useEffect(() => {
      console.log(roadData);
      console.log(preSelected);
    }, [roadData, preSelected]);
    

    return (
        <Emission.Provider value={{
            highwayType, 
            setHighwayType, 
            handleChangeHighway,
            roadType,
            setRoadType,
            roadData,
            setRoadData,
            handleChangeRoad,
            changeSelect,
            changeRemove,
            preSelected,
            handleChangePreselected,
            multiselectRef,
            resetValues,
            priceChange,
            ghgChange
        }}>
            {children}
        </Emission.Provider>
    )
}

export default Context;
export const EmissionState = () =>{
    return useContext(Emission);
}