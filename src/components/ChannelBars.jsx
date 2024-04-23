import { React, useState, useRef, useEffect } from 'react'

function ChannelBars({ channels, changeChannel, updatePreview }){
    
    const [activeChannel, setActiveChannel] = useState(0);
    const [newEpisode, setNewEpisode] = useState("");
    const focusPoint = useRef(null);
    const handleKeyDown = (e) => {
        if(e.key === 'ArrowRight') {
            moveFocusRight();
        };
        if(e.key === 'ArrowLeft') {
            moveFocusLeft();
        };
        if(e.key === 'ArrowUp') {
            moveFocusUp();
        };
        if(e.key === 'ArrowDown') {
            moveFocusDown();
        };
        if(e.key === 'Enter') {
            changeChannel(newEpisode);
        };
    };
    const moveFocusRight = () => {
        const listItems = document.querySelector(("#channel" + activeChannel)).childNodes;
        const activeItem = document.activeElement;
        for(let i = 0; i < listItems.length; i++) {
            const listLength = listItems.length
           if(activeItem === listItems[i] && activeItem !== listItems[listLength - 1]) {
                listItems[i + 1].focus();
           };
        };
    };
    const moveFocusLeft = () => {
        const listItems = document.querySelector(("#channel" + activeChannel)).childNodes;
        const activeItem = document.activeElement;
        for(let i = 0; i < listItems.length; i++) {
           if(activeItem === listItems[i] && activeItem !== listItems[0]) {
                listItems[i - 1].focus();
           };
        };
    };
    const moveFocusUp = () => {
        const listItems = document.querySelector(("#channel" + activeChannel)).childNodes;
        const nextChanItems = document.querySelector(("#channel" + Math.max(activeChannel - 1, 0))).childNodes;
        const activeItem = document.activeElement;
        for(let i = 0; i < listItems.length; i++) {
           if(activeItem === listItems[i]) {
            nextChanItems[i].focus();
           };
        };
    };
    const moveFocusDown = () => {
        const listItems = document.querySelector(("#channel" + activeChannel)).childNodes;
        const nextChanItems = document.querySelector(("#channel" + (activeChannel + 1))).childNodes;
        const activeItem = document.activeElement;
        for(let i = 0; i < listItems.length; i++) {
           if(activeItem === listItems[i]) {
            nextChanItems[i].focus();
           };
        };
    };

    const channelData = channels.map(
        (row, i) => {return(
            <tr key={i} tabIndex={i} className='channel' id={"channel" + i} onKeyDown={handleKeyDown} onFocus={() => {setActiveChannel(i); setNewEpisode(row.eplocation)}} onDoubleClick={() => changeChannel(row.eplocation)}>
                <td className='channelbar'><h2>{row.name}</h2></td>
                {row.playlist.map(
                    (episode, j) => {return(i + j === 0 ?
                        <td key={j} tabIndex={j} ref={focusPoint} colSpan={episode.timeslots} className='episode' onFocus={() => updatePreview(episode.title, episode.timespace, episode.description)}><h2>{episode.title}</h2></td>
                        :
                        <td key={j} tabIndex={j} colSpan={episode.timeslots} className='episode' onFocus={() => updatePreview(episode.title, episode.timespace, episode.description)}><h2>{episode.title}</h2></td>
                    )}
                )}
            </tr>
        )}
    );

    useEffect(() => {
        if (focusPoint.current) {
            focusPoint.current.focus();
        }
    }, []);

    return channelData;
}
  
export default ChannelBars;