import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Router, navigate, Link } from '@reach/router';
import Planets from './Planets';
import People from './People';
import Starships from './Starships';

function AppComponent() {
    const[inputState, setInputState] = useState({
    type:"people",
    id:""
    })
    const[submitState, setSubmitState] =useState(false)

    const onChangeHandler = e => {
    setInputState({
        ...inputState,
        [e.target.name]:e.target.value
    })
    }

    const onSubmitHandler = async event => {
    event.preventDefault()
    await navigate(`/${inputState.type}/${inputState.id}`)
    setSubmitState(!submitState)
    }

    return(
            <div>
                <form className = "mt-2" onSubmit={onSubmitHandler}>
                <div className = "form-row align-items-bottom">
                    <div className="form-group col-5">
                    <label htmlFor="type">What StarWars objects would you like to Query today? </label>
                    <select onChange={onChangeHandler} name="type" id="type" className="custom-select" defaultValue="none">
                        <option value="people">People</option>
                        <option value="planets">Planets</option>
                        <option value="starships">Starships</option>
                    </select>
                    </div>
                    <div className = "form-group col-5">
                        <label htmlFor="api_id">ID</label>
                        <input name = "id" type="text" className="form-control" id="api-id" placeholder="Pick a number! Any Number!" onChange={onChangeHandler} />
                    </div>
                    <div className = "form-group col mb-0 mt-4">
                        <button className="button"  type="submit">Let's Go</button>
                        
                        
                    </div>
                    </div>
                </form>
                <Router>
                    <People submitState={submitState} path= "/people/:id"/>
                    <Planets submitState={submitState} path= "/planets/:id"/>
                    <Starships submitState={submitState} path= "/starships/:id"/>
                </Router>
            </div>
    )
}
export default AppComponent;