const form = document.querySelector("#searchForm")
const input = document.querySelector("#searchInput")
const button = document.querySelector("#searchButton")
const ip = document.querySelector("#addressIP")
const locationZP = document.querySelector("#addressLocation")
const addressTimezone = document.querySelector("#addressTimezone")
const isp = document.querySelector("#addressISP")
const error = document.querySelector("#error")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const ipSearched = input.value
  getIpData(ipSearched)
})

async function getIpData(ip) {
  const API = `https://geo.ipify.org/api/v1?apiKey=at_w4eNJTImofKjQATDpKSnhvV6wtYMG&ipAddress=${ip}`

  try {
    const ipRequest = await fetch(API)

    if (!ipRequest.ok) {
      throw new Error(ipRequest.status)
    }

    const ipData = await ipRequest.json()

    showIpData(ipData)

    error.innerHTML = ""

    showMap(ipData.location.lat, ipData.location.lng)
  } catch (error) {
    showError()
    console.log(error.message)
  }
}

function showError() {
  error.innerHTML = "Enter a valid public ip"
}

function showIpData(ipData) {
  ip.textContent = ipData.ip
  locationZP.textContent = `${ipData.location.city}, ${ipData.location.country} ${ipData.location.postalCode}`
  addressTimezone.textContent = `UTC ${ipData.location.timezone}`
  isp.textContent = ipData.isp
}

function showMap(lat, lng) {
  var mymap = L.map("mapid").setView([lat, lng], 13)

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYm9yamFyaXZlaXJvIiwiYSI6ImNrc2h2bzk0YzF5NnEzMm8zM203cTJyOTMifQ.5sXm4VzYvQKvEWFhv6fhBg",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: "your.mapbox.access.token",
    }
  ).addTo(mymap)

  var myIcon = L.icon({
    iconUrl: "images/icon-location.svg",
  })

  var marker = L.marker([lat, lng], { icon: myIcon }).addTo(mymap)
}
