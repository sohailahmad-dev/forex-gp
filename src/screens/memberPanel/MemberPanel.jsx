import React, { useEffect, useState } from 'react';
import '../adminPanel/AdminPanel.css'
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../assets/img/logo.png'
import avatar from '../../assets/img/avatar.png'
import dashboard from '../../assets/img/dashboard.png'
import dashboardActive from '../../assets/img/dashboardActive.png'
import insta1 from '../../assets/img/insta1.png'
import insta1Active from '../../assets/img/insta1Active.png'
import setting from '../../assets/img/setting.png'
import info from '../../assets/img/info.png'
import search from '../../assets/img/search.png'
import msg from '../../assets/img/msg.png'
import bellIcon from '../../assets/img/bellIcon.png'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getData } from '../../config/apiCalls';
import Snack from '../../components/snack/Snack';
import Loader from '../../components/loader/Loader';
import Dashboard1 from '../memberPanelScreens/dashboard-mp/Dashboard1';





export default function MemberPanel() {
    const [deviceType, setDeviceType] = useState('');
    let [menu, setMenu] = useState(false);
    let [activeMenu, setActiveMenu] = useState('ap-navLinks ap-activeMenu');
    let [handleContent, setHandleContent] = useState('ap-rightSide ap-contractContent');
    let [activeScreen, setActiveScreen] = useState('Dashboard');
    let [userData, setUserData] = useState({});

    let [isLoading, setIsLoading] = useState(false);
    let [openSnack, setOpenSnack] = useState(false);
    let [severity, setSeverity] = useState('error')
    let [snackMsg, setSnackMsg] = useState('');

    const handleCloseSnack = () => {
        setOpenSnack(false);
        setSnackMsg('');
        setSeverity('error');
    }

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");

        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            setUserData(data)
        }
    }, [])

    const navigate = useNavigate();

    const btns = [
        {
            label: 'Dashboard',
            icon: dashboard,
            activeIcon: dashboardActive,
            to: 'Dashboard',
            iconWidth: '19px',
            iconHeight: '19px',

        },
        {
            label: 'InstaForex Account',
            icon: insta1,
            activeIcon: insta1Active,
            to: 'Dashboard',
            iconWidth: '19px',
            iconHeight: '17px',
        },

    ]

    const handleBtnClick = (e) => {
        setActiveScreen(e.label);
        navigate(e.to)
        if (deviceType === 'Mobile') {
            setMenu(!menu)
        }
    }

    useEffect(() => {
        menu ? setActiveMenu('ap-navLinks') : setActiveMenu("ap-navLinks ap-activeMenu");
        menu ? setHandleContent('ap-rightSide') : setHandleContent('ap-rightSide ap-contractContent')
    }, [menu])


    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setDeviceType('Mobile');
                setMenu(true)
            } else if (width >= 768 && width < 1024) {
                setDeviceType('Tablet');
            } else {
                setDeviceType('Laptop/Desktop');
            }
        };

        // Initial check on component mount
        handleResize();

        // Add event listener to check on window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        navigate('Dashboard1')
    }, [])

    const handleLogout = () => {
        setIsLoading(true)
        getData(`/logout`).then((response) => {
            if (response.success) {
                setSnackMsg(response.message);
                setSeverity('success')
                setOpenSnack(true);
                setIsLoading(false);
                localStorage.removeItem("userData");
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            } else {
                setSnackMsg(response.message);
                setOpenSnack(true);
                setIsLoading(false)
            }
        })
            .catch((error) => {
                setSnackMsg("Network Error ", error.message);
                setOpenSnack(true);
                setIsLoading(false)
            });
    }



    return (
        <div>
            <div className='ap-main'>
                <div className={activeMenu}>
                    <div>
                        <img src={Logo} className='ap-logo' />
                        <div className="sideBar-Profile-sec">
                            <img src={avatar} className='ap-profile' />
                            <div className="sideBar-profile-name">{userData?.firstname + " " + userData?.lastname}</div>
                            <div className="sideBar-profile-email">{userData?.email}</div>
                        </div>
                        {
                            btns.map((e, i) => {
                                return (
                                    <div key={e.label} onClick={() => handleBtnClick(e)} >
                                        {activeScreen === e.label ? <div className='ap-iconBtnActive' >
                                            <img src={e.activeIcon} alt="icon" width={e.iconWidth} height={e.iconHeight} />
                                            {e.label}
                                        </div> : <div className='ap-iconBtn' >
                                            <img src={e.icon} alt="icon" width={e.iconWidth} height={e.iconHeight} />
                                            {e.label}
                                        </div>}
                                    </div>

                                )
                            })
                        }
                    </div>
                    <div>
                        <div className='ap-iconBtn' >
                            <img src={setting} alt="icon" width='20px' height='20px' />
                            Settings
                        </div>
                        <div className='ap-iconBtn' style={{ marginTop: '-20px' }} >
                            <img src={info} alt="icon" width='20px' height='20px' />
                            Info
                        </div>
                        <div onClick={handleLogout} className='ap-iconBtn' style={{ marginTop: '-20px' }} >
                            <img src={info} alt="icon" width='20px' height='20px' />
                            Logout
                        </div>
                    </div>


                </div>
                {/* Main Content of Screeens  */}
                <div className={handleContent} >
                    <div className="ap-header">
                        <div className='ap-header-left' >
                            <div className="ap-menuIcon" onClick={() => {
                                setMenu(!menu)
                            }}>
                                <MenuIcon sx={{ fontSize: '22px' }} />
                            </div>
                            {activeScreen}
                        </div>
                        <div className="ap-header-right">
                            <div className="ap-searchBox">
                                <input type="text" placeholder='Search' />
                                <img src={search} alt="search" />
                            </div>
                            <div className="ap-header-profile">
                                <div className="ap-header-profile-left">
                                    <div className='ap-header-profile-left-imgBox' >
                                        <img src={avatar} alt="avatar" />
                                        <div />
                                    </div>
                                    <div className="ap-header-profile-left-text">
                                        <div className="ap-header-profile-left-text-name">{userData?.firstname + " " + userData?.lastname}</div>
                                        <div className="ap-header-profile-left-text-role">{userData?.role?.slice(0, 15) ?? 'Role'}</div>
                                    </div>
                                </div>
                                <div className="ap-header-profile-right">
                                    <img src={msg} alt="msgs" />
                                    <div className="ap-header-profile-right-notificationBox">
                                        <img src={bellIcon} alt="notifications" />
                                        <div>2</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Routes>
                        <Route path='Dashboard1' element={<Dashboard1 />}></Route>
                    </Routes>
                </div>

            </div>
            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div>
    )
}