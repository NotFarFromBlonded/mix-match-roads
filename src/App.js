import { EmissionState } from "./Context.js";
import Multiselect from "multiselect-react-dropdown";
import { roadMaterial } from "./options";
import SliderComponent from "./Components/SliderComponent.jsx";
import PieChart from "./charts/PieChart.jsx";
import PriceEmission from "./Components/PriceEmission.jsx";

function App() {
  const {
    highwayType,
    handleChangeHighway,
    roadType,
    handleChangeRoad,
    changeSelect,
    changeRemove,
    preSelected,
    handleChangePreselected,
    roadData,
    setRoadData,
    handleChangeReset,
    multiselectRef,
    resetValues,
  } = EmissionState();
  //const [state, setState] = useState([{name:"Bitumen", volume: 10}, {name:"Cement", volume: 12}])
  //const [rs, dispatch] = useReducer(reducer, roadData);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "70px",
            fontFamily: "Rubik Maze",
            marginTop: "22px",
          }}
        >
          CURIOSITY GEN ROADS
        </div>
        <h3 style={{ fontFamily: "Rock Salt" }}>DIY ROADS</h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexFlow: "row nowrap",
          padding: "17px",
        }}
      >
        <select
          style={{
            padding: "12px",
            backgroundColor: "lightgray",
            borderRadius: "23px",
          }}
          name="highwayType"
          onChange={handleChangeHighway}
          value={highwayType === "" ? "" : highwayType}
        >
          <option value="" hidden>
            Choose Highway Type
          </option>
          <option value="NH">National Highway(NH)</option>
          <option value="SH">State Highway(SH)</option>
          <option value="RR">Rural Roadways(RR)</option>
        </select>
        <select
          style={{
            padding: "14px",
            backgroundColor: "lightgray",
            borderRadius: "23px",
            textAlign: "center",
          }}
          name="roadType"
          onChange={handleChangeRoad}
          value={roadType === "" ? "" : roadType}
        >
          <option value="" hidden>
            Choose Road Type
          </option>
          <option value="Rigid">Rigid</option>
          <option value="Flexible">Flexible</option>
          <option value="Geopolymer">Geopolymer</option>
          <option value="Wet Plastic">Wet Plastic</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "space-between",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <button
          style={{ padding: "9px 338px" }}
          onClick={handleChangePreselected}
        >
          Submit
        </button>
        
      </div>
      <div style={{textAlign:"center", fontSize:"30px",marginTop:"20px" }}>
          Add Materials of Your Choice
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "space-between",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: "12px",
        }}
      >
        <Multiselect
          options={
            preSelected.length === 0
              ? []
              : roadMaterial.filter(
                  (i) => !preSelected.find((it) => it.name === i.name)
                )
          }
          ref={multiselectRef}
          onSelect={changeSelect}
          onRemove={changeRemove}
          displayValue="name"
        />
      </div>
      <div
        style={{
          border: "2px solid black",
          marginLeft: "12px",
          marginTop: "22px",
          marginRight: "12px",
          marginBottom: "12px",
          padding: "12px",
          display: "flex",
          flexDirection: "row-reverse",
          alignContent: "space-between",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            color: "#a98467",
            fontSize: "26px",
            fontFamily: "Open Sans, sans-serif",
            textAlign: "center",
          }}
        >
          {preSelected.length === 0 ? (
            ""
          ) : (
            <PieChart
              chartData={roadData}
              type="volume"
              name="% Of Materials"
            />
          )}
        </div>
        <div>
          {preSelected.length === 0 ? (
            ""
          ) : (
            <button classname="resetbutton" style={{ padding: "9px 18px" }} onClick={resetValues}>
              Reset
            </button>
          )}
          {preSelected.length === 0 ? "" : <PriceEmission />}
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
          {preSelected.length === 0 ? (
            ""
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  borderTop: "dotted",
                  borderRight: "solid",
                  borderBottom: "dotted",
                  borderLeft: "solid",
                  padding: "15px 15px",
                }}
              >
                <p
                  style={{
                    color: "#606c38",
                    fontFamily: "Open Sans, sans-serif",
                    fontSize: "26px",
                  }}
                >
                  Original Materials
                </p>
                {roadData.slice(0, preSelected.length).map((it) => {
                  return <SliderComponent rd={it} />;
                })}
              </div>
              <div
                style={{
                  borderTop: "dotted",
                  borderRight: "solid",
                  borderBottom: "dotted",
                  padding: "15px 15px",
                }}
              >
                <p
                  style={{
                    color: "#606c38",
                    fontFamily: "Open Sans, sans-serif",
                    fontSize: "26px",
                  }}
                >
                  Added Materials
                </p>
                {roadData.slice(preSelected.length).map((it) => {
                  return <SliderComponent rd={it} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
