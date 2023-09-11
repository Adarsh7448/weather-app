var app = new Vue({
    el:'#myapp',
    data:{
        city:'',
        appid: 'bc9ee8be5d9f4f84f2180759fe53b134',
        minTemp:0,
        maxTemp:0,
        status:0
    },
    methods:{
        getWeather: async function(){
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.appid}`
            let response = await fetch(url);
            let output = await response.json();
            this.status = output.cod;
            this.minTemp = math.round(output.main.temp_min - 273,2);
            this.maxTemp = math.round(output.main.temp_max - 273,2);
            // console.log(output)            
        }
    },
    computed:{
        avgTemp: function(){
            return (this.maxTemp + this.minTemp)/2;
        }
    }
})