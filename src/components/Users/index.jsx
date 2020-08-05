import React, { useState, useEffect } from 'react';



const User = ({ token }) => {
 
    const [resData, setData] = useState([]);

    const [error, setError] = useState("")

    const [value, setValue] = useState("")

    async function postData(url = '') {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });
        const r = await response.json();
        console.log(r)
        return r

    }

    useEffect(() => {
        const res = postData('http://emphasoft-test-assignment.herokuapp.com/api/v1/users/')
            .then(data => {
                return setData(data)
            }).catch(e => setError(e.message));
    }, [token]);


    const handleChangeName = (e) =>{
        setValue(e.target.value)
    }
        
    const searchData = resData.length && resData.filter(u => u.username.toLowerCase().includes(value))
    const data = value ? searchData : resData
    console.log(data,"data")

    return (
        <div className="User">
            <input onChange={(e)=>handleChangeName(e)}/>
            <ul>
                {
                    data.sort((a, b) => a.id - b.id).map(user => {
                        return (
                            <li key={user.id}>
                                <span>User Name: {user.username}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default User;
