//Steam ID conversion for player identification
const SteamIDConverter = { BASE_NUM: bigInt("76561197960265728"), REGEX_STEAMID64: /^[0-9]{17}$/, REGEX_STEAMID: /^STEAM_[0-5]:[01]:\d+$/, REGEX_STEAMID3: /^\[U:1:[0-9]+\]$/, toSteamID64: function (t) { if (!t || "string" != typeof t) return !1; if (this.isSteamID3(t)) t = this.fromSteamID3(t); else if (!this.isSteamID(t)) throw new TypeError("Parameter must be a SteamID (e.g. STEAM_0:1:912783)"); var e = t.split(":"), i = this.BASE_NUM, r = e[2], n = e[1]; return r && n ? i.plus(2 * r).plus(n).toString() : !1 }, toSteamID: function (t) { if (!t || "string" != typeof t) return !1; if (this.isSteamID3(t)) return this.fromSteamID3(t); if (!this.isSteamID64(t)) throw new TypeError("Parameter must be a SteamID64 (e.g. 76561190000000000)"); var e = this.BASE_NUM, i = bigInt(t), r = i.mod(2).toString(); return i = i.minus(r).minus(e), 1 > i ? !1 : "STEAM_0:" + r + ":" + i.divide(2).toString() }, toSteamID3: function (t) { if (!t || "string" != typeof t) return !1; this.isSteamID(t) || (t = this.toSteamID(t)); var e = t.split(":"); return "[U:1:" + (parseInt(e[1]) + 2 * parseInt(e[2])) + "]" }, fromSteamID3: function (t) { var e = t.split(":"), i = e[2].substring(0, e[2].length - 1); return "STEAM_0:" + i % 2 + ":" + Math.floor(i / 2) }, isSteamID: function (t) { return t && "string" == typeof t ? this.REGEX_STEAMID.test(t) : !1 }, isSteamID64: function (t) { return t && "string" == typeof t ? this.REGEX_STEAMID64.test(t) : !1 }, isSteamID3: function (t) { return t && "string" == typeof t ? this.REGEX_STEAMID3.test(t) : !1 }, profileURL: function (t) { return this.isSteamID64(t) || (t = this.toSteamID64(t)), "http://steamcommunity.com/profiles/" + t } };

const buttonSubmit = document.getElementById('userSearch');
const infoForm = document.getElementById("infoForm");
const steamIDApi = 'https://cors-proxy4.p.rapidapi.com/?url=https%3A%2F%2Fapi.steampowered.com%2FISteamUser%2FGetPlayerSummaries%2Fv2%2F%3Fkey%3D2827282DAF3A52E64919024532E0EBE1%26steamids%3D';
const resolveVanityURL = 'https://cors-proxy4.p.rapidapi.com/?url=api.steampowered.com%2FISteamUser%2FResolveVanityURL%2Fv0001%2F%3Fkey%3D2827282DAF3A52E64919024532E0EBE1%26vanityurl%3D';
const gameID = 'https://cors-proxy4.p.rapidapi.com/?url=https%3A%2F%2Fapi.steampowered.com%2FIPlayerService%2FGetOwnedGames%2Fv0001%2F%3Fkey%3DE73AF6D8FF004CC1716E3F08C637D90C%26steamid%3D%26include_appinfo%3D1';
const matches = 'https://cors-proxy4.p.rapidapi.com/?url=http%3A%2F%2Fapi.steampowered.com%2FIDOTA2Match_570%2FGetMatchHistory%2Fv1%2F%3Fkey%3D2827282DAF3A52E64919024532E0EBE1%26account_id%3D'
const matchInfo = 'https://cors-proxy4.p.rapidapi.com/?url=https%3A%2F%2Fapi.opendota.com%2Fapi%2Fmatches%2F';
const heroInfo = 'https://cors-proxy4.p.rapidapi.com/?url=https%3A%2F%2Fapi.opendota.com%2Fapi%2Fheroes%3F';
const heroJSON = JSON.parse(localStorage.getItem('heroData'));
const openDotaApiKey = '%3Fapi_key%3D23bf869d-aa4c-4723-9039-0bd08f46b75e';

const apiGameKey = 'E73AF6D8FF004CC1716E3F08C637D90C';
const gameList = document.getElementById('game-list');

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'e75986365dmsh407a084da670824p1c8fb5jsn6a71aaab964d',
    'X-RapidAPI-Host': 'cors-proxy4.p.rapidapi.com'
  }
};

//hides the info page
infoForm.classList.add("hidden");
//gets hero data to local storage for id matching
async function getHeroData() {
  const response = await fetch(heroInfo + openDotaApiKey, options);
  const json = await response.json();
  localStorage.setItem('heroData', JSON.stringify(json));
}
getHeroData();


buttonSubmit.addEventListener("click", function (event) {
  event.preventDefault();

  let steamUserID = document.getElementById('userID').value;

  fetch(steamIDApi + steamUserID + gameID, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // removes info page until results are in
      infoForm.classList.remove("hidden");

      // info page
      document.getElementById('steamID').innerText = data.response.players[0].steamid;
      document.getElementById('gameName').innerText = data.response.players[0].personaname;
      document.getElementById('profURL').innerText = data.response.players[0].profileurl;

      // displays Steam avatar
      display_image(data.response.players[0].avatarfull);
    });


  // Match data ((USE 76561198115356886 FOR TESTING, OTHERS MAY NOT HAVE RECENT GAMES))
  let matchID = [];
  fetch(matches + steamUserID, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < 5; i++) {
        // adds 5 most recent matchIDs to matchID array
        matchID.push(data.result.matches[i].match_id)
        document.getElementById('gameList' + (i + 1)).innerText = matchID[i];
        // populates match info
        fetch(matchInfo + matchID[i] + openDotaApiKey, options)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            let playerNumber = -1;
            let heroName = -1;
            // Loop limit is max player count (10)
            for (let k = 0; k < 10; k++) {
              // looks for a matching steam32 id to input id to find player[] index
              if (data.players[k].account_id == (SteamIDConverter.toSteamID3(steamUserID).slice(5, length - 1))) {
                playerNumber = k;
                for (let l = 0; l < heroJSON.length; l++) {
                  if (data.players[k].hero_id == heroJSON[l].id) {
                    heroName = heroJSON[l].localized_name;
                  }
                }
                function teamCheck() {
                  if (data.players[k].isRadiant) {
                    return "Radiant";
                  } else {
                    return "Dire";
                  }
                }
                
                function winCheck() {
                  if (data.players[k].win == 1) {
                    return "Win";
                  }
                  else {
                    return "Loss";
                  }
                }
                let date = new Date(data.start_time * 1000)
                document.getElementById('gameList' + (i + 1)).innerText = "\n" + date.toString() +
                  "\nTeam: " + 
                  teamCheck() 
                  + "\t" + winCheck() + " Score: " + data.radiant_score + "/" + data.dire_score +
                  "\nKDA: " + data.players[k].kills + "/" + data.players[k].deaths + "/" + data.players[k].assists + "\tHero: " + heroName +
                  "\nDamage Dealt: " + data.players[k].hero_damage + "\tHealing: " + data.players[k].hero_healing +
                  "\nLast Hits: " + data.players[k].last_hits + "\tNet Worth: " + data.players[k].net_worth;
                break;
              }
            }
          });
      }
    });
});

// function teamCheck() {
//   if (data.players[k].isRadiant) {
//     return "Radiant";
//   } else {
//     return "Dire";
//   }
// }

// function winCheck() {
//   if (data.players[k].win == 1) {
//     return "Win";
//   }
//   else {
//     return "Loss";
//   }
// }


function display_image(img) {
  document.querySelector(".icon").src = img;
};

// displays game list
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  fetch(gameID, options)
    .then(response => response.json())
    .then(data => {
      gameList.innerHTML = '';
      for (let i = 0; i < 5 && i < data.response.games.length; i++) {
        const game = data.response.games[i];
        const gameName = game.name;
        const listItem = document.createElement('li');
        listItem.textContent = gameName;
        gameList.appendChild(listItem);
      }
    })
    .catch(error => console.log(error));
});


