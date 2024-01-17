import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";



const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

