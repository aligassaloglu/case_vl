<template>
    <!-- <div class="flex relative w-100 bg-black h-3">
    </div> -->
    <Keep-alive>
        <div class="w-full h-full rounded-2xl">
            <div id="topsad" class="box bg-slate-50 z-10 flex flex-row items-center justify-center p-3 rounded-lg gap-2">
                <div class="flex flex-col gap-3">
                    <input type="text" v-model="passengerName" class="h-12 w-48  hadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Name">
                    <input type="text" v-model="passengerOrder" class="h-12 w-48  hadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Pickup Order">
                    <div class="flex flex-row mt-1 justify-center gap-4 text-slate-700 text-2xl">
                        <button :class="[isInitialActive ? 'text-slate-500': '']" class="hover:text-slate-500" @click="setMarkerMode('initial')">
                            <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </button>
                        <button :class="[isDestinationActive ? 'text-slate-500': '']" class="hover:text-slate-500" @click="setMarkerMode('destination')">
                            <font-awesome-icon icon="fa-solid fa-location-pin" />
                        </button>
                        <button :class="[isPassengerActive ? 'text-slate-500': '']" class="hover:text-slate-500" @click="setMarkerMode('passanger')">
                            <font-awesome-icon icon="fa-solid fa-map-location" />
                        </button>
                    </div>
                </div>
                <!-- <button type="button" v-on:click="addPassenger" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">Add</button> -->
            </div>
            <div id="map" class=" rounded-3xl"></div>
        </div>
    </Keep-alive>
</template>

<script>






    import {enrichedPassengerData, passangers, routeDetails} from '../data/eventBus'

    export default {
        name: 'MapView',
        data(){
            return{
                passengerName: null,
                passengerOrder: null,
                markerMode: "initial",
                passangers: passangers,
                enrichedPassengerData: enrichedPassengerData,
                isInitialActive: true,
                isDestinationActive: false,
                isPassengerActive: false
            }
        },
        methods:{
            sendData() {
                const data = 'Hello, world!';
                this.$router.push({ name: 'TableView', params: { data } });
            },
            setMarkerMode(val){
                this.isDestinationActive = false
                this.isPassengerActive = false
                this.isInitialActive = false
                if(val == "initial") this.isInitialActive = true
                if(val == "destination") this.isDestinationActive = true
                if(val == "passanger") this.isPassengerActive = true
                this.markerMode = val
            },
            showAlert(message,iconType) {
                this.$swal({
                    icon: iconType,
                    text: message,
                    confirmButtonText: 'Proceed'
                });
            },
            mapFunctions(){
                (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
                ({key: "AIzaSyBKqMWKsFFVOAyLxhGActATMDeg-mNHFi8", v: "weekly"})
                let map;
                let initialMarker;
                let destinationMarker;
                let polyline;

                async function initMap() {
                    const { Map } = await google.maps.importLibrary("maps");
                    //@ts-ignore
                    map = new Map(document.getElementById("map"), {
                        center: { lat: -34.397, lng: 150.644 },
                        zoom: 14,
                    });
                    google.maps.event.addListener(map, "click", (event) => {
                        addMarker(event.latLng, map);
                    });
                }

                initMap();

                const calculateDistanceAndDuration = async (origin, destination) => {
                    const service = new google.maps.DistanceMatrixService();

                    return new Promise((resolve, reject) => {
                        service.getDistanceMatrix(
                            {
                            origins: [origin],
                            destinations: [destination],
                            travelMode: google.maps.TravelMode.DRIVING
                            },
                            (response, status) => {
                            if (status === 'OK') {
                                const distance = response.rows[0].elements[0].distance.text;
                                const duration = response.rows[0].elements[0].duration;
                                console.log(response)
                                resolve({distance,duration});
                            } else {
                                console.error('Error:', status);
                                reject();
                            }
                            }
                        );
                    });
                }

                const setPolyline = async (map) =>{
                    if(!initialMarker || !destinationMarker) return;
                    if (polyline){
                        polyline.setMap(null);
                    }
                    const initialPosition = initialMarker.getPosition();
                    const destinationPosition = destinationMarker.getPosition();
                    const polylineCoordinates = [
                        initialPosition,
                        destinationPosition
                    ];

                    polyline = new google.maps.Polyline({
                        path: polylineCoordinates,
                        geodesic: true,
                        strokeColor: '#FF0000', // Set the color of the polyline
                        strokeWeight: 2 // Set the thickness of the polyline
                    });
                    calculateDistanceAndDuration(initialPosition, destinationPosition).then((routeDetail)=>{
                        if(routeDetail.duration.value > 7200){
                            this.showAlert('Note that the trip duration exceeds 2 hours!', 'warning')
                        }
                        routeDetails.routeDistance = routeDetail.distance
                        routeDetails.routeDuration = (routeDetail.duration.value/60/60).toFixed(2)
                    })
                    polyline.setMap(map);
                }
                const setInitialPosition = (latLng, map) =>{
                    if(initialMarker) {
                        this.showAlert('Initial Position is Already Set! If you want to change it drag the Initial marker', 'warning')
                        return
                    }
                    initialMarker = new google.maps.Marker({
                        position: latLng ,
                        map,
                        animation: google.maps.Animation.DROP,
                        draggable:true,
                        title: "Initial Position",
                    });
                    google.maps.event.addListener(initialMarker, 'dragend', ()=> setPolyline(map));
                    setPolyline(map)
                }
                const setDestinationPosition = (latLng, map) =>{
                    if(destinationMarker){
                        this.showAlert('Destination Position is Already Set! If you want to change it drag the destination marker', 'warning')
                        return
                    }
                    destinationMarker = new google.maps.Marker({
                        position: latLng ,
                        map,
                        animation: google.maps.Animation.DROP,
                        draggable:true,
                        title: "Initial Position",
                    });
                    setPolyline(map)
                    google.maps.event.addListener(destinationMarker, 'dragend',()=> setPolyline(map));
                }
                const addPassenger = (latLng, map) =>{
                    if(this.passangers.length > 9){
                        this.showAlert('Note that amount of passangers exceed 9', 'warning')
                    }
                    if(!initialMarker || !destinationMarker){
                        this.showAlert('Please Set the initial and destination positions first', 'warning')
                        return
                    }
                    if(!this.passengerName || !this.passengerOrder){
                        this.showAlert('Please input correct Name and pickup Order Values!', 'warning')
                        return
                    }
                    new google.maps.Marker({
                        position: latLng,
                        map,
                        animation: google.maps.Animation.DROP,
                        draggable:false,
                        title: (`Passenger Order ${this.passengerOrder}`),
                    });

                    const pickupLocation = {
                        lat: latLng.lat,
                        lng: latLng.lng,
                    };
                    const passengerInfo = {
                        name: this.passengerName,
                        pickUpPoint: pickupLocation, // location object
                    };

                    const destinationPosition = destinationMarker.getPosition()

                    calculateDistanceAndDuration(latLng, destinationPosition).then((routeDetails)=>{
                        console.log("passanger destination",routeDetails)
                        this.enrichedPassengerData.push({
                            ...passengerInfo, // existing passengerInfo
                            pickUpPointOrder: this.passengerOrder,
                            tripDuration: (routeDetails.duration.value/60).toFixed(2),
                        })
                        this.passangers.push(passengerInfo)
                        // enrichedPassengerData = this.enrichedPassengerData
                        avgPassengerDuration(enrichedPassengerData)
                    })
                }
                const avgPassengerDuration = (passengers) =>{
                    let totalTime
                    passengers.forEach(element => {
                        console.log(element)
                        totalTime += element.tripDuration
                    });
                    totalTime = (totalTime/passangers.length)
                    routeDetails.avgTripDuration = totalTime
                }
                const addMarker = (latLng, map) => {
                    switch (this.markerMode) {
                        case "initial":
                            setInitialPosition(latLng, map)
                            break;
                        case "destination":
                            setDestinationPosition(latLng, map)
                            break;

                        case "passanger":
                            addPassenger(latLng, map)
                            break;
                        default:
                            break;
                    }
                }
            },
        },
        mounted(){
            this.mapFunctions()
        },
    }

</script>


<style>
#map {
  height: 100%;
}
.box {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>
