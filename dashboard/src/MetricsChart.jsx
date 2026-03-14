import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";

export default function MetricsChart(){

  const [data,setData] = useState([]);

  useEffect(()=>{
    const interval = setInterval(async ()=>{
      const res = await fetch("http://localhost/metrics");
      const json = await res.json();

      setData(d => [...d.slice(-10), {
        time: new Date().toLocaleTimeString(),
        requests: json.requests
      }]);

    },2000);

    return () => clearInterval(interval);
  },[]);

  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="time"/>
      <YAxis/>
      <Tooltip/>
      <Line type="monotone" dataKey="requests"/>
    </LineChart>
  );
}