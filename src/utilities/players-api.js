import sendRequest from './send-request'
const STATS_URL = 'https://www.balldontlie.io/api/v1/season_averages'
const SEASON = '2021'
const PLAYERS_URL = 'https://www.balldontlie.io/api/v1/players'

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

export async function getPlayersById(id) {
    let seasonQueryString = `?season=${SEASON}`
    let playerQueryString = id.reduce((total, currId) => total + `&player_ids[]=${currId}`, '')
    console.log(`${STATS_URL}${seasonQueryString}${playerQueryString}`)
    let playersArray = await sendRequest(`${STATS_URL}${seasonQueryString}${playerQueryString}`)
    return playersArray
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