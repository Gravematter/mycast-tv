import express, { json } from "express";
import { api } from "./api";

const app = express();
app.use(api);
app.listen(3002, () => console.log("Started"));

//Takes the hour (in 24 hour format) and returns the timeslot string to be displayed for it.
function getTimeSpace(hour){
    let displayHour = hour >= 13 ? hour - 12 : hour;
    if(displayHour < 1)
        displayHour += 12;
    let startT = Math.floor(displayHour) + (displayHour % 1 == 0 ? "" : ":30");
    let endT = displayHour % 1 == 0 ? (Math.floor(displayHour) + ":30") : (Math.ceil(displayHour) == 13 ? 1 : Math.ceil(displayHour));
    let ampm = hour >= 12 ? " pm" : " am";
    return (startT + "-" + endT + ampm);
};

//get the current hour block
function getCurrentHour(date){
    let currentHour = date.getHours();
    if(date.getMinutes() >= 30)
        currentHour += 0.5;
    return currentHour;
};

//get the amount of seconds between the current hour block and the current time
function getPlayTime(date){
    let secs = date.getSeconds();
    if(date.getMinutes() < 30)
        secs += date.getMinutes() * 60;
    else
        secs += (date.getMinutes() - 30) * 60;
    return secs;
};

//this is where you can start building the actual data that will be returned when the API is called.
app.get('/api/data', (req, res) => {
    res.send({
        "currentHour" : getCurrentHour(new Date()),
        "playtimeSecs": getPlayTime(new Date())
    });
});

//this is the path for the dummy data I'm using for testing
app.get('/api/testing', (req, res) => res.send({
    "currentHour" : 13,
    "playtimeSecs": 120,
    "channels" : [{
        "name" : "channel-1",
        "id" : 0,
        "eplocation": "channel-1/Video1.mp4",
        "playlist" : buildPlaylist("dramaticshow", "A super tense drama like wow man")
    },
    {
        "name" : "channel-2",
        "id" : 1,
        "eplocation": "channel-2/Video2.mp4",
        "playlist" : buildPlaylist("coolshow", "A cool show for cool people")
    },
    {
        "name" : "channel-3",
        "id" : 2,
        "eplocation": "channel-3/Video3.mp4",
        "playlist" : buildPlaylist("funnyshow", "hahahaha so funny lol XD")
    }]
}));

function buildPlaylist(title, desc){
    const pList : any[] = [];
    let hour = 13;
    for(let i = 0; i < 6; i++){
        const entry = {
            'title' : title + i,
            "description": desc,
            "timespace" : getTimeSpace(hour),
            "timeslots" : 1
        };
        pList.push(entry);
        hour += 0.5;
    };
    return pList;
};