import React, { useState, useEffect } from 'react';
import { fetch } from "whatwg-fetch";

const User = ({ token }) => {
    const [resData, setData] = useState([]);

    const [sortData, setSortData] = useState([]);

    const [error, setError] = useState("");

    const [value, setValue] = useState("");

    const [sortUp, setSortUp] = useState(true);

    useEffect(() => {
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



        postData('https://emphasoft-test-assignment.herokuapp.com/api/v1/users/')
            .then(data => {
                setData(data);
                setSortData(data);
            })
            .catch((e) => console.error(e.message));
    }, [token]);


    const sortDataUp = (data) => data.sort((a, b) => a.id - b.id);
    const sortDataDown = (data) => data.sort((a, b) => b.id - a.id);
    const handleSort = () => {
        const data = sortUp ? sortDataUp(sortData) : sortDataDown(sortData);
        setSortData(data);
        setSortUp(!sortUp);
    };


    const handleChangeName = (e) => {
        const res = resData.filter((u) => u.username.toLowerCase().includes(e.target.value.toLowerCase())
        );
    
    setSortData(res);
    setValue(e.target.value)
}


// const searchData = resData.length && resData.filter(u => u.username.toLowerCase().includes(value.toLowerCase()))
// const data = value ? searchData : resData
// console.log(data, "data")



return (
    <div className="User">
        <input onChange={(e) => handleChangeName(e)} />
        <button onClick={handleSort}>SortID</button>
        <ul>
            {
                sortData.map(user => {
                    return (
                        <li key={user.id}>
                            <span>UserName: {user.username} userID: {user.id}</span>
                        </li>
                    )
                })
            }
        </ul>
    </div>
);
}

export default User;
