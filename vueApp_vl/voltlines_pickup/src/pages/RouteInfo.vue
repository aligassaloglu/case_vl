<template>
    <div class="w-100 min-h-full flex flex-col gap-5 items-center justify-center">
        <div class="flex gap-2">
            <h1 class="font-extrabold">Total Trip Distance:</h1>
            <p>
                {{ routeDetails.routeDistance }}
            </p>
        </div>
        <div class="flex gap-2">
            <h1 class="font-extrabold">Total Route Duration:</h1>
            <p>
                {{ routeDetails.routeDuration }}
                hours
            </p>
        </div>
        <div class="flex gap-2">
            <h1 class="font-extrabold">Average Route Duration of Passengers:</h1>
            <p>
                {{ routeDetails.avgTripDuration }}
                minutes
            </p>
        </div>
    </div>
</template>




<script>

    import { routeDetails } from '../data/eventBus';
    export default{
        name:"RouteInfo",
        data(){
            return{
                routeDetails
            }
        }

    }

</script>