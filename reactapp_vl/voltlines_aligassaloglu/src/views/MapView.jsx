import React, { useMemo, useRef, useState } from 'react'
import { GoogleMap, useLoadScript, MarkerF, PolylineF, DistanceMatrixService } from '@react-google-maps/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TopBarMap from '../components/TopBarMap';
import SideBarMap from '../components/SideBarMap';
import { useStateContext } from '../contexts/ContextProvider';

/* eslint-disable prefer-destructuring */
/* eslint-disable spaced-comment */
/* eslint-disable no-shadow */
const MapView = function() {
    const MySwal = withReactContent(Swal)
    const {markerMode, setduration, setdistance, passengers,
        setPassengers, setEnrichedPassengers, packageNameRef, packageOrderRef, initial, setInitial, destination, setDestination } = useStateContext();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'Enter Your Google Maps Api Key  Here'
    })

    const coords = useMemo(()=>({lat: 40.994986, lng: 29.027703}), [])
    const options = useMemo(()=> ({
        disableDefaultUI: true,
        clickableIcons: false
    }))

    const setEnrichedDataPassenger = (value) =>{
        setEnrichedPassengers(prevArray=> [{
            pickupPointOrder: packageOrderRef.current.value,
            name: packageNameRef.current.value,
            tripDuration: value,
        }, ...prevArray])
    }

    const google = window.google
    const distancematrix = (origin,destination) =>{
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
              origins: [origin],
              destinations: [destination],
              travelMode: 'DRIVING',
              unitSystem: google.maps.UnitSystem.METRIC,
            },
            (response, status) => {
              if (status === 'OK') {
                setEnrichedDataPassenger((response.rows[0].elements[0].duration.value/60).toFixed(2))
              } else {
                console.error('Distance Matrix Error:', status);
              }
            }
        );
    }
    //passanger info


    const setInitialPosition = (latLng) => {
        setInitial(latLng)
    }
    const setDestinationPosition = (latLng) => {
        setDestination(latLng)
    }

    const addPassanger = (latLng) =>{
        if(!initial || !destination){
            MySwal.fire({
                text: 'Please first set initial and destination points',
                icon: 'warning',
                confirmButtonText: 'proceed'
            })
            return
        }
        if(!packageNameRef.current.value || !packageOrderRef.current.value){
            MySwal.fire({
                text: 'Please make sure that Passenger name and order are valid!',
                icon: 'error',
                confirmButtonText: 'ok'
            })
            return
        }
        if(passengers.length > 9){
            MySwal.fire({
                text: 'Note that amount of passangers exceed 9',
                icon: 'warning',
                confirmButtonText: 'proceed'
            })
        }
        distancematrix(latLng, destination)
        setPassengers(prevArray=> [{
            name: packageNameRef.current.value,
            pickUpPoint: latLng
        },  ...prevArray])
        distancematrix(latLng, destination)
    }

    const addMarker = (value) => {
        const latLng = {lat:parseFloat(value.latLng.lat()), lng:parseFloat(value.latLng.lng())}
        switch (markerMode) {
            case "initial":
                setInitialPosition(latLng)
                break;
            case "destination":
                setDestinationPosition(latLng)
                break;
            case "passenger":
                addPassanger(latLng)
                break;
            default:
                break
        }
    }

    const setTotalDistance = (distance)=> setdistance(distance)
    const setTotalTime = (time) => setduration(time)
    const setTotalTimeandDistance = (el) =>{
        let duration = el.rows[0].elements[0].duration
        //exception
        if(duration.value > 7200){
            MySwal.fire({
                text: 'Note that total trip duration exceeds 2 hours!',
                icon: 'warning',
                confirmButtonText: 'proceed'
            })
        }
        setTotalDistance(el.rows[0].elements[0].distance.text)
        setTotalTime((duration.value/60/60).toFixed(3))
    }

    return (
        <div className=''>
            {isLoaded ? (
                <GoogleMap
                    onClick={(el)=>addMarker(el)}
                    center={coords}
                    zoom={19}
                    mapContainerClassName='min-h-full map-view rounded-xl'
                    options={options}
                >
                    <div className='z-10 absolute  ' style={{top:"18%", left: "50%", transform: "translateX(-50%) translateY(-50%)"}}>
                        <TopBarMap/>
                    </div>
                    <div className='absolute z-10 right-3 md:top-1 max-md:bottom-1/2 '>
                        <SideBarMap/>
                    </div>

                    <PolylineF path={[initial, destination]} />
                    {passengers.map(el=><MarkerF  position={el.pickUpPoint} />)}
                    <MarkerF  position={initial} />
                    <MarkerF  position={destination} />
                    <DistanceMatrixService
                        options={{
                                destinations: [destination],
                                origins: [initial],
                                travelMode: "DRIVING",
                                }}
                        callback = {(response) => {setTotalTimeandDistance(response)}}
                    />
                </GoogleMap>
            ) :
            (
                <div className='flex justify-center items-center'>Loading...</div>
            )}
        </div>
    )
}

export default MapView