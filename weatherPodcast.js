const btn = document.querySelectorAll('.btn')
const north = ["臺北市", "新北市", "基隆市", "桃園市", "新竹縣", "宜蘭縣"]
const central = ["苗栗縣", "臺中市", "彰化縣", "南投縣", "雲林縣"]
const south = ["嘉義市", "嘉義縣", "臺南市", "高雄市", "屏東縣", "澎湖縣"]
const east = ["花蓮縣", "臺東縣"]
const offshore = ["金門縣", "連江縣"]
const weather = document.querySelector('.card-group')


fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-AA300EC1-31BA-465E-B669-6CA2C320A195')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {

        var Json = myJson.records.location
        for (let i = 0; i < Json.length; i++) {
            let city = Json[i].locationName
            let feel = Json[i].weatherElement[3].time[0].parameter.parameterName
            let minT = Json[i].weatherElement[2].time[0].parameter.parameterName
            let maxT = Json[i].weatherElement[4].time[0].parameter.parameterName
            let rain = Json[i].weatherElement[1].time[0].parameter.parameterName

            let img_path
            if (rain <= 10) {
                img_path = "./img/bigSun.png"
            }
            else if (rain > 10 && rain < 30) {
                img_path = "./img/sun.png"
            }
            else {
                img_path = "./img/rain_day.png"
            }

            weather.innerHTML +=
                `
        <div class="card" data-country="${city}">

            <img id="sunny" src="${img_path}" alt="">
            <div class="podcast">
            <h1>${city}</h1>
            <h3>舒適度:${feel}</h3>
            <p>降雨機率:${rain}%</p>
            <p>溫度:${minT}°C ~${maxT}°C </p>
        </div>
        `
        }
    }
    );

function filter(areas) {
    var allCity = document.querySelectorAll('.card')
    for (let index = 0; index < allCity.length; index++) {
        if (areas == 'all') {
            allCity[index].style.display = 'flex'

        } else {
            allCity[index].style.display = 'none'
            
            for (let i = 0; i < areas.length; i++) {
                if (allCity[index].dataset.country == areas[i]) {
                    allCity[index].style.display = 'flex'
                    console.log('123');
                }

            }
        }

    }

}
