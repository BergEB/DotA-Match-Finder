




const buttonSubmit = document.getElementById('userSearch');
var steamIDApi = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=2827282DAF3A52E64919024532E0EBE1&steamids=';

buttonSubmit.addEventListener("click", function (event) {
  event.preventDefault();

  const steamUserID = document.getElementById('userID').value;

  fetch(steamIDApi + steamUserID)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
document.getElementById('hi').innerText = data.response.players[0].personaname;
// display_image(data.response.players[0].avatarfull);
    });
  //  document.getElementById('searchForm').reset();
})


/*
function display_image(img) {
  document.querySelector(".fact").src = img;
  document.querySelector(".fact").style.visibility = "visible";
 } */
 
 