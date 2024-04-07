import express from "express";
import { api } from "./api";

const app = express();
app.use(api);
app.listen(3002, () => console.log("Started"));

const sample = {
    "currentHour": 13,
    "playtimeSecs": 120,
    "channels" : [{
        "name" : "channel-1",
        "id" : 0,
        "eplocation" : "channel-1/Video1.mp4",
        "playlist" : [{
            "title": "dramaticshow0",
            "description": "A super tense drama like wow man",
            "timespace" : "1-1:30 pm",
            "timeslots" : 1
        },
        {
            "title": "dramaticshow1",
            "description": "A super tense drama like wow man",
            "timespace" : "1:30-2 pm",
            "timeslots" : 1
        },
        {
            "title": "dramaticshow2",
            "description": "A super tense drama like wow man",
            "timespace" : "2-2:30 pm",
            "timeslots" : 1
        },
        {
            "title": "dramaticshow3",
            "description": "A super tense drama like wow man",
            "timespace" : "2:30-3 pm",
            "timeslots" : 1
        },
        {
            "title": "dramaticshow4",
            "description": "A super tense drama like wow man",
            "timespace" : "3-3:30 pm",
            "timeslots" : 1
        },
        {
            "title": "dramaticshow5",
            "description": "A super tense drama like wow man",
            "timespace" : "3:30-4 pm",
            "timeslots" : 1
        }]
    },
    {
        "name" : "channel-2",
        "id" : 1,
        "eplocation" : "channel-2/Video2.mp4",
        "playlist" : [{
            "title": "coolshow0",
            "description": "A cool show for cool people",
            "timespace" : "1-1:30 pm",
            "timeslots" : 1
        },
        {
            "title": "coolshow1",
            "description": "A cool show for cool people",
            "timespace" : "1:30-2 pm",
            "timeslots" : 1
        },
        {
            "title": "coolshow2",
            "description": "A cool show for cool people",
            "timespace" : "2-2:30 pm",
            "timeslots" : 1
        },
        {
            "title": "coolshow3",
            "description": "A cool show for cool people",
            "timespace" : "2:30-3 pm",
            "timeslots" : 1
        },
        {
            "title": "coolshow4",
            "description": "A cool show for cool people",
            "timespace" : "3-3:30 pm",
            "timeslots" : 1
        },
        {
            "title": "coolshow5",
            "description": "A cool show for cool people",
            "timespace" : "3:30-4 pm",
            "timeslots" : 1
        }]
    },
    {
        "name" : "channel-3",
        "id" : 2,
        "eplocation" : "channel-3/Video3.mp4",
        "playlist" : [{
            "title": "funnyshow0",
            "description": "hahahaha so funny lol XD",
            "timespace" : "1-1:30 pm",
            "timeslots" : 1
        },
        {
            "title": "funnyshow1",
            "description": "hahahaha so funny lol XD",
            "timespace" : "1:30-2 pm",
            "timeslots" : 1
        },
        {
            "title": "funnyshow2",
            "description": "hahahaha so funny lol XD",
            "timespace" : "2-2:30 pm",
            "timeslots" : 1
        },
        {
            "title": "funnyshow3",
            "description": "hahahaha so funny lol XD",
            "timespace" : "2:30-3 pm",
            "timeslots" : 1
        },
        {
            "title": "funnyshow4",
            "description": "hahahaha so funny lol XD",
            "timespace" : "3-3:30 pm",
            "timeslots" : 1
        },
        {
            "title": "funnyshow5",
            "description": "hahahaha so funny lol XD",
            "timespace" : "3:30-4 pm",
            "timeslots" : 1
        }]
    }]
};

app.get('/api/data', (req, res) => res.send(sample))