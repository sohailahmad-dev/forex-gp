import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import avatar from '../../../assets/img/avatar.png'
import dIcon1 from '../../../assets/img/dIcon1.png'
import dIcon2 from '../../../assets/img/dIcon2.png'
import dIcon3 from '../../../assets/img/dIcon3.png'
import dIcon4 from '../../../assets/img/dIcon4.png'
import { Grid } from '@mui/material'

export default function Dashboard() {

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
            <div className="ap-statistics">
                <Grid container spacing={5} >
                    <Grid item sm={3} xs={10}>
                        <div className="ap-statistics-item">
                            <div className="ap-statistics-item-iconBox">
                                <img src={dIcon1} alt="icon" />
                            </div>
                            <div>
                                <div className="ap-statistics-text1">Lorem</div>
                                <div className="ap-statistics-text2">$22k</div>
                                <div className="ap-statistics-text3">+10.80%</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item sm={3} xs={10}>
                        <div className="ap-statistics-item">
                            <div className="ap-statistics-item-iconBox">
                                <img src={dIcon2} alt="icon" />
                            </div>
                            <div>
                                <div className="ap-statistics-text1">Lorem</div>
                                <div className="ap-statistics-text2">$10k</div>
                                <div className="ap-statistics-text3">+05.80%</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item sm={3} xs={10}>
                        <div className="ap-statistics-item">
                            <div className="ap-statistics-item-iconBox">
                                <img src={dIcon3} alt="icon" />
                            </div>
                            <div>
                                <div className="ap-statistics-text1">Lorem</div>
                                <div className="ap-statistics-text2">15</div>
                                <div className="ap-statistics-text3">+10.80%</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item sm={3} xs={10}>
                        <div className="ap-statistics-item">
                            <div className="ap-statistics-item-iconBox">
                                <img src={dIcon4} alt="icon" />
                            </div>
                            <div>
                                <div className="ap-statistics-text1">Lorem</div>
                                <div className="ap-statistics-text2">03</div>
                                <div className="ap-statistics-text3">+10.80%</div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
