Vue.component('city-card',{
    props:['city'],
    data: function(){
        return {
            appid: 'bc9ee8be5d9f4f84f2180759fe53b134',
            status:0,
            image:'images/dummy.jpg',
            maxTemp:'Not Available',
            minTemp:'Not Available',
            condition:'Unknown'
            }
    },
    template: `<div class="card m-2" style="width: 19rem;">
                    <img v-bind:src="image" class="card-img-top mt-2" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ city }}</h5>
                        <div v-if="status == 200">
                            <p class="card-text mb-1">Max Temperature: {{maxTemp}}</p>
                            <p class="card-text">Min Temperature: {{minTemp}}</p>
                            <p class="card-text">{{condition}}</p>
                        </div>
                        <div v-else-if="status == 404">
                            <p class="bg-danger-subtle" style="height:76px">Error fetching details, enter a valid name!</p>
                        </div>
                        <div v-else>
                            <p class="card-text mb-1">Max Temperature: {{maxTemp}}</p>
                            <p class="card-text">Min Temperature: {{minTemp}}</p>
                            <p class="card-text">{{condition}}</p>
                        </div>
                        <a @click="getWeather" class="btn btn-warning">Update</a>
                        <a @click="delCity(city)" class="btn btn-danger">Delete</a>
                    </div>
                </div>`,
    methods:{
        getWeather: async function(){
                    let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.appid}`
                    let response = await fetch(url);
                    let output = await response.json();
                    console.log(output);
                    this.status = output.cod;
                    this.minTemp = math.round(output.main.temp_min - 273,2);
                    this.maxTemp = math.round(output.main.temp_max - 273,2);
                    // console.log(output)            
                },
        delCity: function(city){
            this.$emit('delcity', city);
        }
        
    }
})

var app = new Vue({
    el:'#myapp',
    data:{
        city:'',
        addedCities:[]
    },
    methods:{
        addCity: function(){
            this.addedCities.push(this.city);
            this.city = '';
        },
        delCity: function(citytoDel){
            this.addedCities = this.addedCities.filter(function (city){
                return city !== citytoDel;
            });
        }
    },
})