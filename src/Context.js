import React, { createContext, useContext, useState, useEffect,useRef } from 'react';
import { road_template } from './template';
import {roadMaterial} from './options';
import { road_material } from './cost_geo';
import {sgwa} from './sgwa.js';


const Emission = createContext();

const Context = ({children}) => {


    const[highwayType, setHighwayType] = React.useState("");
    const[roadType, setRoadType] = React.useState("");
    const[roadData, setRoadData] = useState([]);
    const[preSelected, setPreselected] = useState([]);
    const[priceChange, setPriceChange] = useState(0);
    const[ghgChange, setghgChange] = useState(0);
    const[feas, setFeas] = useState(false);
    const[strength, setStrength] = useState(0);
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
        setPriceChange((((road_template.find(i=>i.highway_abbr === highwayType).types.find(i=>i.rtype===roadType).rmaterials).map((it)=>it.volume*(road_material.find((i)=>i.name===it.name).cost)).reduce((acc,el)=>acc+=el,0))/10000000))
        setghgChange((((road_template.find(i=>i.highway_abbr === highwayType).types.find(i=>i.rtype===roadType).rmaterials).map((it)=>it.volume*(road_material.find((i)=>i.name===it.name).Carbon_emission)).reduce((acc,el)=>acc+=el,0))))
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

    const calculateStrength = (e)=>{
        setStrength(roadData.map((it)=>{
            if(it.volume!==0){
                if(it.name === "Cement"){
                    let a = sgwa.find((i)=>i.name === it.name);
                    return a.specificGravity + 1.65*a.waterAbsorption;
                }
                if(it.name === "Bitumen"){
                    let a = sgwa.find((i)=>i.name === it.name);
                    return a.specificGravity + 1.65*a.waterAbsorption;
                }
                if(it.name === "polypropylene"){
                    let a = sgwa.find((i)=>i.name === it.name);
                    return a.specificGravity + 1.65*a.waterAbsorption;
                }
                if(it.name === "Gravel"){
                    let a = sgwa.find((i)=>i.name === it.name);
                    return a.specificGravity + 1.65*a.waterAbsorption;
                }
                if(it.name === "Steel Reinforcement"){
                    let a = sgwa.find((i)=>i.name === it.name);
                    return a.specificGravity + 1.65*a.waterAbsorption;
                }
                if(it.name === "Aggregate"){
                    let a = sgwa.find((i)=>i.name === it.name);
                    return a.specificGravity + 1.65*a.waterAbsorption;
                }
                if(it.name === "Sand"){
                    let a = sgwa.find((i)=>i.name === it.name);
                    return a.specificGravity + 1.65*a.waterAbsorption;
                }
                if(it.name === "NaOH pellets"){
                    let a = sgwa.find((i)=>i.name === it.name);
                    return a.specificGravity + 1.65*a.waterAbsorption;
                }
                if(it.name === "GeoPolymer"){
                    let a = sgwa.find((i)=>i.name === it.name);
                    return a.specificGravity + 1.65*a.waterAbsorption;
                }
                if(it.name === "GeoTextile"){
                    let a = sgwa.find((i)=>i.name === it.name);
                    return a.specificGravity + 1.65*a.waterAbsorption;
                }
                if(it.name === "PolyesterFibre"){
                    let a = sgwa.find((i)=>i.name === it.name);
                    return a.specificGravity + 1.65*a.waterAbsorption;
                }
                if(it.name === "FlyAsh"){
                    let a = sgwa.find((i)=>i.name === it.name);
                    return a.specificGravity + 1.65*a.waterAbsorption;
                }
            }
        }).reduce((acc,el)=>acc+=el, 0))
    }

    useEffect(() => {
      console.log(roadData);
      console.log(preSelected);
    }, [roadData, preSelected]);

    useEffect(()=>{
        setFeas(roadData.length!==0?roadData.map((it)=>{
            if(it.name==='Bitumen'){
                if(it.volume<15.54){
                    return false
                }else
                {
                    return true
                }
            }else if(it.name ==='Gravel'){
                if(it.volume<34){
                    return false
                }else{
                    return true
                }
            }else if(it.name ==='Cement'){
                if(it.volume>1200){
                    return false
                }else{
                    return true
                }
            }else if(it.name === 'Steel Reinforcement'){
                if(it.volume>400){
                    return false
                } else {
                    return true
                }
            }else if(it.name==="Aggregate"){
                if(it.volume<21000||it.volume>35000){
                    return false
                }else{
                    return true
                }
            }else if(it.name==="polypropylene"){
                if(it.volume>1200){
                    return false
                }else{
                    return true
                }
            }
        }).includes(false, 0):"ok")
    }, [roadData]);
    

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
            ghgChange,
            feas,
            setFeas,
            calculateStrength,
            strength
        }}>
            {children}
        </Emission.Provider>
    )
}

export default Context;
export const EmissionState = () =>{
    return useContext(Emission);
}