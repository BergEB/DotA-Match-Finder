const buttonSubmit = document.getElementById('userSearch');
const infoForm = document.getElementById("infoForm");
var steamIDApi = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=2827282DAF3A52E64919024532E0EBE1&steamids=';


//hides the info page
infoForm.classList.add("hidden");


buttonSubmit.addEventListener("click", function (event) {
  event.preventDefault();

  const steamUserID = document.getElementById('userID').value;

  fetch(steamIDApi + steamUserID)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // removes info page
      infoForm.classList.remove("hidden");


document.getElementById('steamID').innerText = data.response.players[0].steamid;
document.getElementById('gameName').innerText = data.response.players[0].personaname;
document.getElementById('profURL').innerText = data.response.players[0].profileurl;


// display_image(data.response.players[0].avatarfull);
    });
  //  document.getElementById('searchForm').reset();
})

/*
function display_image(img) {
  document.querySelector(".fact").src = img;
  document.querySelector(".fact").style.visibility = "visible";
 } */
 


var accountID = 'http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1/?key=2827282DAF3A52E64919024532E0EBE1&account_id=';