import { EmissionState } from './Context.js';
import Multiselect from 'multiselect-react-dropdown';
import {roadMaterial} from './options';
import SliderComponent from './Components/SliderComponent.jsx';
import PieChart from './charts/PieChart.jsx';
import PriceEmission from './Components/PriceEmission.jsx';



function App() {
  const {highwayType, handleChangeHighway, roadType, handleChangeRoad, changeSelect, changeRemove, preSelected, handleChangePreselected, roadData, setRoadData, handleChangeReset, multiselectRef, resetValues} = EmissionState();
  //const [state, setState] = useState([{name:"Bitumen", volume: 10}, {name:"Cement", volume: 12}])
  //const [rs, dispatch] = useReducer(reducer, roadData);
  
  return (
    <>
      <div>
        <select name="highwayType" onChange={handleChangeHighway} value={highwayType===""?"":highwayType}>
          <option value="" hidden>Choose Highway Type</option>
          <option value="NH">National Highway(NH)</option>
          <option value="SH">State Highway(SH)</option>
          <option value="RR">Rural Roadways(RR)</option>
        </select>
        <select name="roadType" onChange={handleChangeRoad} value={roadType===""?"":roadType}>
          <option value="" hidden>Choose Road Type</option>
          <option value="Rigid">Rigid</option>
          <option value="Flexible">Flexible</option>
          <option value="Geopolymer">Geopolymer</option>
          <option value="Wet Plastic">Wet Plastic</option>
        </select>
        <button onClick={handleChangePreselected}>
          Submit
        </button>
        
      </div>
      <div>
        <Multiselect options = {preSelected.length === 0?[]:roadMaterial.filter((i)=>!preSelected.find(it=>it.name===i.name))} ref= {multiselectRef} onSelect={changeSelect} onRemove = {changeRemove} displayValue = "name"/>
      </div>
      <div>
        {preSelected.length === 0?"":<PieChart chartData={roadData} type="volume" name="% of materials"/>}
      </div>
      <div>
        {preSelected.length === 0?"":<button onClick={resetValues}>Reset</button>}
      {preSelected.length === 0?"":<PriceEmission/>}
        {/*{rs.length === 0?"":rs.map((r)=>{
          return (
            <div key={r.name}>
              <p>{r.name}</p>
              <label>
                <input type = "range" min="0" max="99999" step="0.01" value={r.volume} onChange={(e)=>dispatch({type: "ON_CHANGE", payload: {name:`${r.name}`, volume: parseInt(e.target.value)}})}/>
                {r.volume}
              </label>
            </div>
          );
        })}*/}
        {/*<p>Bitumen</p>
        <label>
          <input type = "range" min="0" max="20" step="1" value={value} onChange={handleValueChange}/>
          {value}
        </label>*/}
        { preSelected.length===0?"":<div style={{display: 'flex'}}><div><p>Original Materials:</p>{roadData.slice(0, preSelected.length).map((it)=>{return (<SliderComponent rd={it}/>)})}</div><div><p>Added Materials:</p>{roadData.slice(preSelected.length,).map((it)=>{return (<SliderComponent rd={it}/>)})}</div></div> }
      </div>
    </>
  );
}

export default App;
