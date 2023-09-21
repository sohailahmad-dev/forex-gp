import React, { useEffect, useState } from 'react'
import './Dashboard1.css'
import avatar from '../../../assets/img/avatar.png'
import mp1 from '../../../assets/img/mp1.png'
import mp2 from '../../../assets/img/mp2.png'
import mp3 from '../../../assets/img/mp3.png'

import { Grid } from '@mui/material'

export default function Dashboard1() {

    let [userData, setUserData] = useState({});

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");

        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            setUserData(data)
        }
    }, [])
    return (
        <div className='dashboard-ap'>
            <div className="dashboard-pd">
                <img src={avatar} alt="avatar" />
                <div>
                    <div className="dashboard-pd-heading">
                        <span>Hello, </span>{userData?.firstname + " " + userData?.lastname}
                    </div>
                    <div className="dashboard-pd-subHeading">Check your activities in this dashboard.</div>
                </div>
            </div>
            <div className="mp-statistics">
                <Grid container spacing={5} >
                    <Grid item sm={4} xs={10}>
                        <div className="mp-statistics-item">
                            <img src={mp1} alt="icon" />
                        </div>
                    </Grid>
                    <Grid item sm={4} xs={10}>
                        <div className="mp-statistics-item">
                            <img src={mp2} alt="icon" />
                        </div>
                    </Grid>
                    <Grid item sm={4} xs={10}>
                        <div className="mp-statistics-item" style={{ borderRight: 'none' }}>
                            <img src={mp3} alt="icon" />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
