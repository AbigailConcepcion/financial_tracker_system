import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// 👇 Register Chart.js components globally here
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ✅ Render your app
ReactDOM.render(
  <React.StrictMode>
   
      <App />
    
  </React.StrictMode>,
  document.getElementById("root")
);
