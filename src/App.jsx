import { useState, useCallback, useEffect, useRef } from "react";

// import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [number, setNumberAllowed] = useState(false);
  const [char, setCharAllowed] = useState(false);
  const [pass, setPassword] = useState("");

  // useRef Hook
  const passwordRef=useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += "()/*-+_@&$#%";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass)
  }, [length, number, char, setPassword])

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(pass)
  },[pass])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, char, passwordGenerator])
  return (
    
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-2 my-8 text-orange-400 bg-gray-600">
        <h1 className="text-white text-center my-2 py-1 p">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            value={pass}
            readOnly
            ref={passwordRef}
          />

          <button onClick={copyPasswordToClipBoard} className="outline-none bg-blue-600 text-white px-3 py-0.5 rounded-md focus:ring-1 shadow-lg transform active:scale-125 transition-transform">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center">
            <input 
            type="checkbox" 
            defaultChecked={number}
            id="numberInput"
            onChange={()=>{
              setNumberAllowed((prev)=>!prev);
            }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center">
          <input 
            type="checkbox" 
            defaultChecked={char}
            id="numberInput"
            onChange={()=>{
              setCharAllowed((prev)=>!prev);
            }}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
          
        </div>
      </div>
    
  );
}

export default App;
