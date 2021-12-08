import './App.css';
import { useEffect ,useState } from 'react';
import {Bar} from "react-chartjs-2" ;


function App() {
  const [stat , setStat] = useState({}) ;
  const link = "https://data.covid19india.org/state_district_wise.json#" ;
  useEffect(() => {
    fetch(link).then((response) => response.json()).then(data => {
     console.log(data);
     setStat(data) ;
   } )
  }, [])
  const states = Object.keys(stat) 
  console.log(states)
  function dataframe(givenstate){
    const districts = Object.keys(stat.Assam.districtData) ;
    districts.forEach(item => {
      const chartData = {
        labels : ['Confirmed', 'Active', 'Recovered' , 'Deceased'],
        datasets: [
          {
            label: 'Popularity of colours' ,
            data: [item.confirmed , item.active , item.recovered , item.deceased],
            backgroundColor: [
              'rgba(0, 0, 0, 0.6)' ,
              'rgba(255, 0, 0, 0.6)' ,
              'rgba(0, 255, 0, 0.6)' ,
              'rgba(255, 0, 0, 1)' 
            ],
            borderWidth: 1,
          }
      ]
      }
      return (<div>
      <Bar
        data= {chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Covid Stats"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
    </div>)
    })
  }
  return (
    <div className="App">
      {JSON.stringify(stat.Assam.districtData["Baksa"]["active"])}
      {/* {dataframe("Assam")} */}
    </div>
  );
}

export default App;
