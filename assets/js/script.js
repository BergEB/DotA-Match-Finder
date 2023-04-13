fetch('http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=A7E8E7FCD7E40881E79BB9AD53ADE01A?account_id=76561198115356886')
	.then(function (response) {
      return response.json();
    })

async function logJSONData() {
  const response = await fetch("http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=A7E8E7FCD7E40881E79BB9AD53ADE01A?account_id=76561198115356886");
  const jsonData = await response.json();
  console.log(jsonData);
}
    