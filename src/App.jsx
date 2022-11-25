import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import "./App.css";
import { Select } from "./Select";

const options = [
  { label: "Light  Magic", hex: "#7142c8" },
  { label: "Angsty Teen Vampire", hex: "#ad191e" },
  { label: "Lips Of The Queen", hex: "#e40bb7" },
  { label: "Lonely Shoreside", hex: "#2e908b" },
  { label: "Ordan's Ghost", hex: "#8690b8" },
  { label: "Olessenhaff", hex: "#1310d8" },
];


function App() {
  const [value, setValue] = useState([])
  return (
    <div className="App">
      <Select value={value} onChange={(val) => setValue(val)} options={options} />
    </div>
  );
}

export default App;
