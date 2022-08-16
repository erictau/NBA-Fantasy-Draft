import sendRequest from './send-request'
const STATS_URL = 'https://www.balldontlie.io/api/v1/season_averages'
const SEASON = '2021'
const PLAYERS_URL = 'https://www.balldontlie.io/api/v1/players'


export async function getPlayersById(idArray) {
    // Expects idArray to be an array of player ids
    let seasonQueryString = `?season=${SEASON}`
    let playerQueryString = idArray.reduce((total, currId) => total + `&player_ids[]=${currId}`, '')
    let playersArray = await sendRequest(`${STATS_URL}${seasonQueryString}${playerQueryString}`)
    playersArray.data.forEach(async function(player) {
        let playerInfo = await sendRequest(`${PLAYERS_URL}/${player.player_id}`)
        player.first_name = playerInfo.first_name
        player.last_name = playerInfo.last_name
        player.position = playerInfo.position
        player.team = playerInfo.team.abbreviation
    })
    return playersArray.data
}

export async function getOnePlayerById(id) {
    let seasonQueryString = `?season=${SEASON}`
    let playerQueryString = `&player_ids[]=${id}`
    let player = await sendRequest(`${STATS_URL}${seasonQueryString}${playerQueryString}`)
    player = player.data[0]
    let playerInfo = await sendRequest(`${PLAYERS_URL}/${player.player_id}`)
    player.first_name = playerInfo.first_name
    player.last_name = playerInfo.last_name
    player.position = playerInfo.position
    player.team = playerInfo.team.abbreviation
    return player
}


/* Functions below this point were created to pre-process the API and extract data to be used in the project. This helps avoid the need to perform large fetch requests to the 'Ball Don't Lie API' which could easily result in 429 responses (Bad Request) due to overloading the API server. */
// Function was used to grab all player ID's to seed the database with 2021 data. 
export async function getAllPlayerIds() {
    // Per the API, there are 38 total pages of 100 players each. We will loop through and obtain every player. Loop through in increments of less than 10 pages at a time to avoid overloading the fetch request to the API.
    let allPlayers = []
    for (let i = 31; i <= 38; i++ ) {
        let players = (await sendRequest(`${PLAYERS_URL}?per_page=100&page=${i}`)).data
        allPlayers = allPlayers.concat(players)
    }
    return allPlayers.map(player => player.id)
}

// Used to update the "playersThisSeason" array of IDs. 
export async function sortPlayersByStats(playerIdArray, scoringSystem) {
    let thisSeasonsStats = []
    let counter = 0;
    // Run the fetch requests in intervals of 3 seconds to avoid overloading the API with requests.
    let interval = setInterval(async function() {
        let results = await getPlayersById(playerIdArray.slice(counter, counter + 40 ))
        
        results.data.forEach(player => {
            thisSeasonsStats.push(player)
        })
        // Rough estimate on stat scoring. Sets initial order of players showing up on draft page. 
        thisSeasonsStats.sort((a,b) => (scoringSystem.pts * (b.pts - a.pts) + scoringSystem.reb * (b.reb - a.reb) + scoringSystem.ast * (b.ast - a.ast) + scoringSystem.stl * (b.stl - a.stl)) + scoringSystem.blk * (b.blk - a.blk))
        counter += 40
        let ids = thisSeasonsStats.map(player => player.player_id)
        if (counter > playerIdArray.length + 50) clearInterval(interval)
    }, 3000)
    return playerIdArray
}