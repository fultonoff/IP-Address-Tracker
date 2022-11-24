

//Default Map

var map = L.map('map').setView([34.04915, -118.09462], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var leafletIcon = L.icon({
    iconUrl: `./images/icon-location.svg`,
})

var marker = L.marker([34.04915, -118.09462], {
    icon: leafletIcon
}).addTo(map);


//On loading

window.addEventListener('load', e =>{
    const getYourIp = async()=>{
        const req = await fetch('https://api.ipify.org/?format=json')
        const data = await req.json()

        const {ip} = data

        console.log(data, ip)
        getIp(ip)
    }

    getYourIp()

})



const inputValue = document.querySelector('.search')
const form = document.querySelector('.search-box')
const hiroContainer = document.querySelector('.hiro-container')

/////////////////////////////////
//On submit
form.addEventListener('submit', e => {
    e.preventDefault()
    let query = inputValue.value
    if(!query) return;
    var container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }
  map = ''  
    
    
    
    
    
    getIp(query)

})



const getIp = async (query) => {

    var container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }

    const req = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_26PmK0MF5i6I1pTWlSKfhbalisf4p&ipAddress=${query}`)
    const data = await req.json()

    const {
        ip,
        location,
        domains,
        isp,
        as
    } = data

    let markup = `
    <li class = "item">
        <span class = "title"> Ip Adress </span> <span class = "description"> ${ip} </span> </li>

        <li class = "item">
        <span class = "title"> Location </span> <span class = "description">${location.region}, ${location.country} </span></li>

        <li class= "item">
        <span class= "title"> TimeZone </span> <span class= "description"> UTC ${location.timezone}</span></li>

        <li class= "item">
        <span class = "title"> ISP </span> <span class="description"> ${isp} ${as.name} </span> </li>
    
    `


    hiroContainer.innerHTML = markup

    const lat = `${location.lat}`
    const lng = `${location.lng}`

     
    
     var map = L.map('map').setView([lat, lng], 10);

     

     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 13,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     }).addTo(map);

     var leafletIcon = L.icon({
         iconUrl: `./images/icon-location.svg`,
     })

     var marker = L.marker([lat, lng], {
         icon: leafletIcon
     })

     var marker = L.marker([lat, lng], {
         icon: leafletIcon
     }).addTo(map);

     
    

     
    
}




//'https://api.ipfy.org/?format=json'



