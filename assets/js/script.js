async function logJSONData() {
  const response = await fetch("http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=2827282DAF3A52E64919024532E0EBE1?account_id=76561198115356886");
  const jsonData = await response.json();
  console.log(jsonData);
}

async function logJSONData0() {
  const response0 = await fetch("http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=2827282DAF3A52E64919024532E0EBE1?account_id=76561198115356886");
  const jsonData0 = await response0.json();
  console.log(jsonData0);
}
    