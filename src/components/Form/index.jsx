import React, { useState, useEffect, useRef } from 'react';
import {fetch} from "whatwg-fetch";
import  './form.css'

export const Form = ({ setAuthorized, token, setToken }) => {

    const firstRender = useRef(true)

    const [disable, setDisabled] = useState(true)

    const [nameError, setNameError] = useState(null)

    const [passError, setPassError] = useState(null)

    const [userName, setUserName] = useState("")

    const [password, setPassword] = useState("")

    

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();

    }



    const handleClick = (e) => {
        e.preventDefault();
        setAuthorized(token)

    }

    useEffect(() => {
        postData('http://emphasoft-test-assignment.herokuapp.com/api-token-auth/', {
            "username": userName,
            "password": password
        }).then(data => {
            setToken(data.token)
            console.log(data.token)

        })
        if (firstRender.current) {
            firstRender.current = false
            return
        }

        setDisabled(formValidation())
    }, [password, userName]);

    const formValidation = () => {
        if (userName === "") {
            setNameError('Имя должно быть заполнено')
            return true
        } else if (password === "") {
            setPassError('Пароль должен быть введен')
            return true
        } else if (setNameError(null)) {
            return false
        } else{
             setPassError(null)
            return false
        }
    }

    return (
        <div>
            <form className="form">
                <div className="form__input">
                    <div className="input">
                        <label>
                            <input value={userName} onChange={e => setUserName(e.target.value)} name='username' placeholder="UserName"/>  
                        </label>
                    </div>
                    <div className="input">
                        <label>
                            <input value={password} onChange={e => setPassword(e.target.value)} name='password' placeholder="Password"/>
                        </label>
                    </div>
                </div>
                <button type="submit" disabled={disable} onClick={(e) => { handleClick(e) }} className="btn">  send  </button>
                <div className="err">{nameError && <p>{nameError}</p>} 
                {passError && <p>{passError}</p>}
                </div>
            </form>
        </div>
    )
}

