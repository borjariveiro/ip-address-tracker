const form = document.querySelector("#searchForm")
const input = document.querySelector("#searchInput")
const button = document.querySelector("#searchButton")
const ip = document.querySelector("#addressIP")
const locationZP = document.querySelector("#addressLocation")
const addressTimezone = document.querySelector("#addressTimezone")
const isp = document.querySelector("#addressISP")
const searchedIP = input

async function getIpData(ip) {
  const API = `https://geo.ipify.org/api/v1?apiKey=at_w4eNJTImofKjQATDpKSnhvV6wtYMG&ipAddress=${ip}`

  try {
    const ipRequest = await fetch(API)

    if (!ipRequest.ok) {
      throw new Error(ipRequest.status)
    }

    const ipData = await ipRequest.json()

    console.log(ipData)
  } catch (error) {
    console.log(error.message)
  }
}

// getIpData("192.212.174.101")
