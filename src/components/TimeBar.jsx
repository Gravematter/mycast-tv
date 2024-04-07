import { React } from 'react'

function TimeBar({ startHour, barLength }){
    let rows = [];
    let hour = startHour;
    for(let i = 0; i < barLength; i++){
        let ampm = hour >= 12 ? " pm" : " am";
        let displayHour = hour >= 13 ? hour - 12 : hour;
        if(displayHour < 1)
            displayHour += 12;
        rows.push(<th><h2>{Math.floor(displayHour) + (displayHour % 1 == 0 ? ":00" : ":30") + ampm}</h2></th>);
        hour += 0.5;
        if(hour >= 24)
            hour = 0;
    }
    return rows;
}
  
export default TimeBar;