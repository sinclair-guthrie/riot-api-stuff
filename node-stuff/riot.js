const express = require('express');
const app = express();
const fetch = require('node-fetch');
const apiCalls = require('./api-calls.js');
require('dotenv').config();

app.get('/request/:summName', (req, res) => {
    let matchHistJSON;
    let privateUid;
    apiCalls.summFetch(req.params.summName)
        .then(data => {
            privateUid = data.accountId;
            return apiCalls.matchHist(privateUid, 10)
                .then(data => {
                    matchHistJSON = data;
                    const promArr = [];
                    matchHistJSON.matches.forEach(x => {
                        promArr.push(apiCalls.matchData(x.gameId)
                            .then(data => {
                                let partId = data.participantIdentities.find(y => y.player.accountId == privateUid).participantId;
                                let teamId = data.participants.find(y => y.participantId == partId).teamId;
                                let winVal = data.teams.find(y => y.teamId == teamId).win;
                                return winVal;
                            })
                            .catch(err => {
                                res.send(err);
                            })
                        )
                    })
                    return Promise.all(promArr)
                        .then(data => {
                            res.set("Access-Control-Allow-Origin", "*");
                            res.send({
                                "UID": privateUid,
                                "matchData": data
                            });
                        })
                        .catch(err => {
                            res.send(err);
                        })
                })
        })
        .catch(err => {
            res.send(err);
        })
})

app.listen(3001);