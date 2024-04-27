import { React, useState } from 'react'

function ChannelBars({ channels, changeChannel, updatePreview, focusPoint, startPoint, setStartPoint }){
    const colsToDisplay = 6;
    const rowsToDisplay = 3;
    const [activeChannel, setActiveChannel] = useState(0);
    const [startChannel, setStartChannel] = useState(0);
    const [newEpisode, setNewEpisode] = useState("");
    let lastRow = true;
    const endChannel = Math.min(startChannel + rowsToDisplay, channels.length);
    const currenChannels = channels.slice(startChannel, endChannel);
    
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
            }
            else if(activeItem === listItems[i] && activeItem === listItems[listLength - 1] && !lastRow) {
                setStartPoint(startPoint + colsToDisplay);
                document.activeElement.blur();
            }
        };
    };
    const moveFocusLeft = () => {
        const listItems = document.querySelector(("#channel" + activeChannel)).childNodes;
        const activeItem = document.activeElement;
        for(let i = 0; i < listItems.length; i++) {
            if(activeItem === listItems[i] && activeItem !== listItems[1]) {
                listItems[i - 1].focus();
            }
            else if(activeItem === listItems[i] && activeItem === listItems[1] && startPoint !== 0) {
                setStartPoint(startPoint - colsToDisplay);
                document.activeElement.blur();
            }
        };
    };
    const moveFocusUp = () => {
        const listItems = document.querySelector(("#channel" + activeChannel)).childNodes;
        const activeItem = document.activeElement;
        for(let i = 0; i < listItems.length; i++) {
            if(activeItem === listItems[i]  && activeChannel !== 0) {
                const nextChanItems = document.querySelector(("#channel" + (activeChannel - 1))).childNodes;
                nextChanItems[i].focus();
            }
            else if(activeItem === listItems[i] && activeChannel === 0 && startChannel !== 0) {
                setStartChannel(startChannel - rowsToDisplay);
                document.activeElement.blur();
            }
        };
    };
    const moveFocusDown = () => {
        const listItems = document.querySelector(("#channel" + activeChannel)).childNodes;
        const activeItem = document.activeElement;
        for(let i = 0; i < listItems.length; i++) {
            if(activeItem === listItems[i] && activeChannel !== 2) {
                const nextChanItems = document.querySelector(("#channel" + (activeChannel + 1))).childNodes;
                nextChanItems[i].focus();
            }
            else if(activeItem === listItems[i] && activeChannel === 2 && !(endChannel === channels.length)) {
                setStartChannel(startChannel + rowsToDisplay);
                document.activeElement.blur();
            }
        };
    };

    const channelData = currenChannels.map(
        (row, i) => {
            const endpoint = Math.min(startPoint + colsToDisplay, row.playlist.length);
            if(lastRow)
                lastRow = endpoint === row.playlist.length ? true : false;
            const episodes = row.playlist.slice(startPoint, endpoint);
            return(
            <tr key={i} tabIndex={i} className='channel' id={"channel" + i} onKeyDown={handleKeyDown} onFocus={() => {setActiveChannel(i); setNewEpisode(row.eplocation)}} onDoubleClick={() => changeChannel(row.eplocation)}>
                <td className='channelbar'><h2>{row.name}</h2></td>
                {episodes.map(
                    (episode, j) => {
                        const focusRef = i + j === 0 ? focusPoint : null;
                        return(
                        <td key={j} tabIndex={j} ref={focusRef} colSpan={episode.timeslots} className='episode' onFocus={() => updatePreview(episode.title, episode.timespace, episode.description)}><h2>{episode.title}</h2></td>
                    )}
                )}
            </tr>
        )}
    );

    return channelData;
}
  
export default ChannelBars;