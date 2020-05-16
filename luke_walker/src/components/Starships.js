import React, { useState, useEffect } from "react";
import { navigate, Link } from "@reach/router";
import axios from "axios"
import logo from './obi.jpg';
import img from 'react-image';


const Starships = ({ id, submitState}) => {
    
    const [responseState, setResponseState] = useState(null)
    useEffect(() => {
        setResponseState(null)
        axios.get(`http://swapi.dev/api/starships/${id}`) 
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
                <div classname="img">
                    <h1>These are not the droids you're looking for</h1>
                    <div className="App">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                </div>
            )
        default:
            return(
                <div>
                    <h1>{responseState.name}</h1>
                    <h2>Crew: {responseState.crew}</h2>
                    <h2>Manufacturer: {responseState.manufacturer}</h2>
                    <h2>Model: {responseState.model}</h2>
                    <h2>Starship Class: {responseState.starship_class}</h2>
                    <h2>Passengers: {responseState.passengers}</h2>
                </div>
            )
    }
    
}   
export default Starships;