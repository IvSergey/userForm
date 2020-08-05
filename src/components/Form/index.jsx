import React, { useState, useEffect } from 'react';


export const Form = ({ setAuthorized, token, setToken }) => {

    const [userName, setUserName] = useState("")

    const [password, setPassword] = useState("")

    const [error, setError] = useState("");



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


    // "username": "test_super",
    // "password": "Nf<U4f<rDbtDxAPn"

    const handleChangeUser = (e) => {
        if (e.target.value.trim().length > 0) {
            setUserName(e.target.value);
            setError("");
        } else {
            setError("Поле должно быть заполнено")
        }

    }

    const handleChangePassword = (e) => {
        if (e.target.value.trim().length > 0) {
            setPassword(e.target.value);
            setError("");
        } else {
            setError("Поле должно быть заполнено")
        }

    }

    const handleClick = (e) => {
        e.preventDefault();
        token ? setAuthorized(token) : setError('Вы не авторизованы')
    }

    useEffect(() => {
        postData('http://emphasoft-test-assignment.herokuapp.com/api-token-auth/', {
            "username": userName,
            "password": password
        }).then(data => {
            setToken(data.token)
            console.log(data.token)

        }).catch(e => setError(e.message));
    }, [password, userName]);

    return (
        <div>
            <form>
                <div>
                    <label>
                        <input value={userName} onChange={(e) => handleChangeUser(e)} name='username' />  UserName
                    </label>
                </div>
                <div>
                    <label>
                        <input value={password} onChange={(e) => handleChangePassword(e)} name='password' />Password
                    </label>
                </div>
                <button onClick={(e) => { handleClick(e) }}>  send  </button>
                {error && <div>{`${error}`}</div>}
            </form>
        </div>
    )
}

