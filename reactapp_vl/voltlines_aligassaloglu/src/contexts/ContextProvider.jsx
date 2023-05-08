import React, { createContext,  useContext,  useRef,  useState } from "react";
import PropTypes  from 'prop-types';

const StateContext = createContext({

})



export const ContextProvider = function({children}) {

    const [duration, setduration] = useState(null);
    const [distance, setdistance] = useState(null);
    const [markerMode, setMarkerMode] = useState(null);
    // const [pickupPoint, setPickupPoint] = useState(null);
    const [passengers, setPassengers] = useState([]);
    const [enrichedPassengers, setEnrichedPassengers] = useState([]);
    const [destination, setDestination] = useState()
    const [initial, setInitial] = useState()
    const packageNameRef = useRef()
    const packageOrderRef = useRef()

    ContextProvider.prototype = {
        children: PropTypes.any
    }

    return(
        <StateContext.Provider
            value={{
                markerMode, setMarkerMode, duration, setdistance, setduration, distance,
                initial, setInitial, destination, setDestination, passengers, setPassengers, packageNameRef, packageOrderRef, enrichedPassengers, setEnrichedPassengers
            }}
        >
            {children}
        </StateContext.Provider>
    )
}


// export default ContextProvider
export const useStateContext = () => useContext(StateContext)
