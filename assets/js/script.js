// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://api.steampowered.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

fetch('http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1/?key=2827282DAF3A52E64919024532E0EBE1?account_id=76561198115356886')
  .then(function (response) {
    console.log(response.json());
  })

fetch('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=2827282DAF3A52E64919024532E0EBE1&steamids=76561198115356886')
  .then(function (response) {
    console.log(response.json());
  })

