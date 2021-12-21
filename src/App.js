/* eslint-disable react-hooks/exhaustive-deps */
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

import React, { useRef, useState } from 'react';
import './App.css';
const rrweb = require('rrweb');

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef();

  let stopFn = null;
  let replayInstance = null;
  let events = [];

  const start = () => {
    stopFn = rrweb.record({
      emit(event) {
        // 将 event 存入 events 数组中
        events.push(event);
        console.log(event);
      },
    });
  };

  const replay = () => {
    stopFn();
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        if (replayInstance) {
          return;
        }
        replayInstance = new rrwebPlayer({
          target: videoRef.current, // 可以自定义 DOM 元素
          // 配置项
          props: {
            events,
          },
        });
      }
    }, 1);
  };

  return (
    <div className="App">
      <div className="btn-wrap">
        <button onClick={() => start()}>开始录制</button>
        <button onClick={() => replay()}>回放</button>
      </div>
      <div className="textArea-wrap">
        <textarea rows="10" cols="50">
          这里是一个文本输入框
        </textarea>
      </div>
      {isPlaying ? 
        <div id="replay" ref={videoRef} /> 
        : null}
    </div>
  );
}

export default App;
