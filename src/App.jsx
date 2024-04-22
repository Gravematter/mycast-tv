import { React, useState, useRef, useEffect, useCallback } from 'react'
import './App.css'
import axios from 'axios';
import screenfull from 'screenfull';
import VideoEmbed from "./components/VideoEmbed.jsx";
import TimeBar from "./components/TimeBar.jsx";
import ChannelBars from "./components/ChannelBars.jsx";

function App() {

  //app components
  const [dataCall, setDataCall] = useState({"channels": [{"playlist": [{}]}]});
  const [currentChannel, setCurrentChannel] = useState(0);
  const [epTitle, setepTitle] = useState("");
  const [epTime, setepTime] = useState("");
  const [epDesc, setepepDesc] = useState("");

  function updatePreview(newTitle, newTime, newDesc) {
    setepTitle(newTitle);
    setepTime(newTime);
    setepepDesc(newDesc);
  };

  function changeChannel(newEplocation){
    setvidLocation(newEplocation);
    setIsReady(false);
    handleFullscreen();
  };

  function getMaxEps() {
    let maxEps = 0;
    dataCall.channels.forEach(i => {maxEps = Math.max(maxEps, i.playlist.reduce((pSum, j) => pSum + j.timeslots, 0))});
    return maxEps;
  };

  //vidplayers components
  const [vidLocation, setvidLocation] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [currentPlayTime, setCurrentPlayTime] = useState(0);
  const playerRef = useRef(null);

  const onReady = useCallback(() => {
    if (!isReady) {
      playerRef.current.seekTo(currentPlayTime, "seconds");
      setIsReady(true);
    }
  }, [isReady]);

  const handleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request(playerRef.current.wrapper);
    }
  };

  useEffect(() => {
    const loadDataCall = async () =>{
      const response = await axios.get(`/api/testing`);
      const newData = response.data;
      setDataCall(newData);
      setepTitle(newData.channels[currentChannel].playlist[0].title);
      setepTime(newData.channels[currentChannel].playlist[0].timespace);
      setepepDesc(newData.channels[currentChannel].playlist[0].description);
      setvidLocation(newData.channels[currentChannel].eplocation);
      setCurrentPlayTime(newData.playtimeSecs);
      playerRef.current.seekTo(newData.playtimeSecs, "seconds");
    };
    loadDataCall();
  }, []);

  return (
    <>
      <div className='apparea'>
        <div>
          <table className='topbar'><tbody>
            <tr>
              <td width={"50%"}>
                <h1>{epTitle}</h1>
                <h1>{epTime}</h1>
                <h2>{epDesc}</h2>
              </td>
              <td width={"50%"} className='vidbox' onDoubleClick={() => handleFullscreen()}>
                <VideoEmbed embedId={vidLocation} playerRef={playerRef} onReady={onReady} />
              </td>
            </tr>
            </tbody></table>
        </div>
        <div>
          <table className='schedule'><tbody>
            <tr className='timebar'>
              <th><h2>Today</h2></th>
              <TimeBar startHour={dataCall.currentHour} barLength={getMaxEps()} />
            </tr>
            <ChannelBars channels={dataCall.channels} changeChannel={changeChannel} updatePreview={updatePreview} />
            </tbody></table>
        </div>
      </div>
    </>
  )
};

export default App
