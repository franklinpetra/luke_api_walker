import React, { useState, useEffect } from "react";
import axios from "axios"


const Planets = ({ id, submitState}) => {
    
    const [responseState, setResponseState] = useState(null)
    
    useEffect(() => {
        setResponseState(null)
        axios.get(`http://swapi.dev/api/planets/${id}`) 
            .then(res => {
                setResponseState(res.data)
            })
            .catch(err => setResponseState(false))
    },[submitState])
            
    switch(responseState){
        case null:
            return( 
                <h1>Loading...</h1>
            )
        case false:
            return( 
                <h1>These are not the droids you're looking for</h1>
            )
        default:
            return(
                <div>
                    <h1>{responseState.name}</h1>
                    <h2>Diameter: {responseState.diameter}</h2>
                    <h2>Climate: {responseState.climate}</h2>
                    <h2>Terrain: {responseState.terrain}</h2>
                    <h2>Surface Water: {responseState.surface_water}</h2>
                    <h2>Population: {responseState.population}</h2>
                </div>
            )
    }
    
}   
export default Planets;