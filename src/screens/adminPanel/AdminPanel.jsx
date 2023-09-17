import React, { useEffect, useState } from 'react';
import './AdminPanel.css'
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../assets/img/logo.png'
import avatar from '../../assets/img/avatar.png'
import dashboard from '../../assets/img/dashboard.png'
import dashboardActive from '../../assets/img/dashboardActive.png'
import edit from '../../assets/img/edit.png'
import editActive from '../../assets/img/editActive.png'
import user from '../../assets/img/user.png'
import userActive from '../../assets/img/userActive.png'
import setting from '../../assets/img/setting.png'
import info from '../../assets/img/info.png'
import search from '../../assets/img/search.png'
import msg from '../../assets/img/msg.png'
import bellIcon from '../../assets/img/bellIcon.png'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from '../adminPanelScreens/dashboard/Dashboard';
import UserManagement from '../adminPanelScreens/userManagement/UserManagement';
import RoleManagement from '../adminPanelScreens/roleManagement/RoleManagement';
import FeatureManagement from '../adminPanelScreens/featureManagement/FeatureManagement';





export default function AdminPanel() {
    const [deviceType, setDeviceType] = useState('');
    let [menu, setMenu] = useState(false);
    let [activeMenu, setActiveMenu] = useState('ap-navLinks ap-activeMenu');
    let [handleContent, setHandleContent] = useState('ap-rightSide ap-contractContent');
    let [activeScreen, setActiveScreen] = useState('Dashboard');

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
            label: 'User Management',
            icon: user,
            activeIcon: userActive,
            to: 'UserManagement',
            iconWidth: '12px',
            iconHeight: '18px',
        },
        {
            label: 'Roles Management',
            icon: edit,
            activeIcon: editActive,
            to: 'RoleManagement',
            iconWidth: '17px',
            iconHeight: '17px',
        },
        {
            label: 'Feature Management',
            icon: edit,
            activeIcon: editActive,
            to: 'FeatureManagement',
            iconWidth: '17px',
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
        navigate('Dashboard')
    }, [])

    return (
        <div>
            <div className='ap-main'>
                <div className={activeMenu}>
                    <div>
                        <img onClick={() => navigate('/')} src={Logo} className='ap-logo' />
                        <div className="sideBar-Profile-sec">
                            <img src={avatar} className='ap-profile' />
                            <div className="sideBar-profile-name">M.Hamza</div>
                            <div className="sideBar-profile-email">M.hamza@company.com</div>
                        </div>
                        {
                            btns.map((e, i) => {
                                return (
                                    <div key={i} onClick={() => handleBtnClick(e)} >
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
                                        <div className="ap-header-profile-left-text-name">M. Hamza</div>
                                        <div className="ap-header-profile-left-text-role">UX/UI Designer</div>
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
                        <Route path='Dashboard' element={<Dashboard />}></Route>
                        <Route path='UserManagement' element={<UserManagement />}></Route>
                        <Route path='RoleManagement' element={<RoleManagement />}></Route>
                        <Route path='FeatureManagement' element={<FeatureManagement />}></Route>
                    </Routes>
                </div>

            </div>
        </div>
    )
}