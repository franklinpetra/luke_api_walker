import React, { useState, useEffect } from "react";
import { navigate, Link } from "@reach/router";
import axios from "axios"
import logo from './obi.jpg';
import img from 'react-image';


const People = ({ id, submitState}) => {
    
    const [responseState, setResponseState] = useState(null)
    const clickHandler =() => {
        navigate("/homeworld/" + responseState.people_id)
    }
    useEffect(() => {
        setResponseState(null)
        axios.get(`http://swapi.dev/api/people/${id}`) 
            .then(res => {
                const {data:personData} = res;
                return axios.get(personData.homeworld)
                    .then(worldResp => {
                        const {data: worldData} = worldResp
                        setResponseState({
                            'name' : personData.name,
                            'height' :  personData.height,
                            'mass' : personData.mass,
                            'hair_color' :  personData.hair_color,
                            'world' : responseState.terrain,
                            'planet': responseState.homeworld,
                            'terrain':  worldData.terrain
                        })
                    })
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
                    <h2>Height: {responseState.height}</h2>
                    <h2>Mass: {responseState.mass}</h2>
                    <h2>Hair Color: {responseState.hair_color}</h2>
                    {/* <h2 onClick={clickHandler}>Planet: {responseState.planet}</h2> */}
                    <h2>World: {responseState.terrain}</h2>
                    {/* <h2>Planet: {responseState.homeworld}</h2> */}
                </div>
            )
    }
    
}   
export default People;