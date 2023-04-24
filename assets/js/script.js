const buttonSubmit = document.getElementById('userSearch');
const infoForm = document.getElementById("infoForm");
var steamIDApi = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=2827282DAF3A52E64919024532E0EBE1&steamids=';
var gameID = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=E73AF6D8FF004CC1716E3F08C637D90C&steamid=&include_appinfo=1';

const apiGameKey = 'E73AF6D8FF004CC1716E3F08C637D90C';
const gameList = document.getElementById('game-list');

//hides the info page
infoForm.classList.add("hidden");

buttonSubmit.addEventListener("click", function (event) {
  event.preventDefault();

  const steamUserID = document.getElementById('userID').value;

  fetch(steamIDApi + steamUserID + gameID)
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
});

function display_image(img) {
  document.querySelector(".icon").src = img;
};

// displays game list

buttonSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  const searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=E73AF6D8FF004CC1716E3F08C637D90C&steamid=&include_appinfo=1`)
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
});