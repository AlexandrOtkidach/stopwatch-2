import React, {useState} from 'react';
import DisplayComponent from './components/DisplayComponent';
import BtnComponent from './components/BtnComponent';
import './App.css';
import { render } from '@testing-library/react';

function App() {
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  const start = () => {
    run();
    setStatus(1)
    setInterv(setInterval(run, 10));
  };

  let updateMs = time.ms, updateS = time.s, updateM = time.m, updateH = time.h;

  const run = () => {
    if (updateM === 60){
      updateH++;
      updateM = 0;
    }
    if (updateS === 60){
      updateM++
      updateS = 0;
    }
    if (updateMs === 100){
      updateS++
      updateMs = 0;
    }
    updateMs++;
    return setTime({ms:updateMs, s:updateS, m:updateM, h:updateH});
  };

  const wait = () => {
    clearInterval(interv);
    setStatus(2);
  };
  
  const resume = () => start();

  const stop = () => {
    clearInterval(interv);
    setStatus(0);
    return setTime({ms:0, s:0, m:0, h:0});
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(2);
    return setTime({ms:0, s:0, m:0, h:0});
  };

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <DisplayComponent time={time}/>
          <BtnComponent status={status} wait={wait} reset={reset}  stop={stop}  resume={resume} start={start}/>
        </div>
      </div>
    </div>
  );
}

export default App;
