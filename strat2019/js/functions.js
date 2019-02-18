function getTBA(url) {
    var response = $.ajax({
        url: "https://www.thebluealliance.com/api/v3/" + url,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-TBA-Auth-Key',
                'wFLfqneHnQeMApDRSJnAvtS1egVMBQzXxn2E6vGW0DuGy3HhRYztR8tGJvbdBX0G');
        },
        async: false
    }).responseText
    return response == undefined || JSON.parse(response).Errors != undefined ? undefined : JSON.parse(response);
};

function getEventRankings(eventkey) {
    return getTBA('event/' + eventkey + '/rankings');
}


function getTeamEventListKeys(num, year) {
    return getTBA('team/frc' + num + '/events' + (year === undefined ? '' : '/' + year) + '/keys');
}

function TBAEvent(eventkey) {
    return getTBA('event/' + eventkey);
}

function eventOPRS(eventkey) {
    return getTBA('event/' + eventkey + '/oprs');
}

function eventPredict(eventkey) {
    return getTBA('event/' + eventkey + '/predictions');
}
function getMatch(matchkey) {
    return getTBA('match/' + matchkey);
}