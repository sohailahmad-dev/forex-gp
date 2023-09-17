import { NavLink, useNavigate } from "react-router-dom";
import './NavBar.css';
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/img/logo.png'
import FAQ from '../../assets/img/FAQ.png'
import Btn from "../btn/Btn";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Dialog, Grid } from "@mui/material";
import icon1 from '../../assets/img/icon1.png'
import icon2 from '../../assets/img/icon2.png'
import icon3 from '../../assets/img/icon3.png'
import icon4 from '../../assets/img/icon4.png'
import icon5 from '../../assets/img/icon5.png'
import icon6 from '../../assets/img/icon6.png'
import icon7 from '../../assets/img/icon7.png'
import icon11 from '../../assets/img/icon11.png'
import icon12 from '../../assets/img/icon12.png'
import icon13 from '../../assets/img/icon13.png'
import icon14 from '../../assets/img/icon14.png'
import icon15 from '../../assets/img/icon15.png'
import icon16 from '../../assets/img/icon16.png'
import icon17 from '../../assets/img/icon17.png'
import icon18 from '../../assets/img/icon18.png'
import icon19 from '../../assets/img/icon19.png'
import icon20 from '../../assets/img/icon20.png'
import icon21 from '../../assets/img/icon21.png'
import icon22 from '../../assets/img/icon22.png'





export default function NavBar({ active }) {
    let [menu, setMenu] = useState('true');
    let [activeMenu, setActiveMenu] = useState('navLinks');
    let [openLiveSignal, setOpenLiveSignal] = useState(false);
    let [openGBPLinks, setOpenGBPLinks] = useState(false);
    let [activeLink, setActiveLink] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        menu ? setActiveMenu('navLinks') : setActiveMenu("navLinks active")
    }, [menu])

    useEffect(() => {
        setActiveLink(active)
    }, [])

    const handleLiveSignalLinks = () => {
        setOpenLiveSignal(false)
    }
    const handleGBPLinks = () => {
        setOpenGBPLinks(false)
    }

    const LiveSignalLinks = () => {
        return (
            <Dialog
                open={openLiveSignal}
                PaperProps={{
                    style: {
                        position: 'absolute',
                        top: '18px',
                        left: '48%',
                        width: '200px',
                        padding: '0px 25px'
                    },
                }}
                BackdropProps={{
                    style: {
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                    },
                }}
            >
                <div>
                    <div onClick={() => handleLiveSignalLinks()} className="dialog-link1">
                        <div className="dialog-iconBox">
                            <img src={icon1} />
                        </div>
                        <div style={{ color: "#7B7B7B" }}>Trade Results</div>
                    </div>
                    <div onClick={() => handleLiveSignalLinks()} className="dialog-link2">
                        <div className="dialog-iconBox">
                            <img src={icon2} />
                        </div>
                        <div >Live Monitoring</div>
                    </div>
                    <div onClick={() => handleLiveSignalLinks()} className="dialog-link2">
                        <div className="dialog-iconBox">
                            <img src={icon3} />
                        </div>
                        <div >Closed Account</div>
                    </div>
                    <div onClick={() => handleLiveSignalLinks()} className="dialog-link2">
                        <div className="dialog-iconBox">
                            <img src={icon4} />
                        </div>
                        <div >Trade Ratio</div>
                    </div>
                    <div onClick={() => handleLiveSignalLinks()} className="dialog-link2">
                        <div className="dialog-iconBox">
                            <img src={icon5} />
                        </div>
                        <div >Weekly Status</div>
                    </div>
                    <div onClick={() => handleLiveSignalLinks()} className="dialog-link1">
                        <div className="dialog-iconBox">
                            <img src={icon6} />
                        </div>
                        <div >Self Trading</div>
                    </div>
                    <div onClick={() => handleLiveSignalLinks()} className="dialog-link1">
                        <div className="dialog-iconBox">
                            <img src={icon7} />
                        </div>
                        <div >Copy Trading</div>
                    </div>
                </div>
            </Dialog>
        )
    }

    const GBPLinks = () => {
        return (
            <Dialog
                open={openGBPLinks}
                PaperProps={{
                    style: {
                        position: 'absolute',
                        top: '18px',
                        left: '35%',
                        width: '570px',
                        padding: '0px 20px'
                    },
                }}
                BackdropProps={{
                    style: {
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                    },
                }}
            >
                <div className="GBPLinks-style">
                    <div style={{ width: '150px' }}>
                        <div onClick={() => handleGBPLinks()} className="dialog-link3">
                            <div className="dialog-iconBox">
                                <img src={icon11} />
                            </div>
                            <div style={{ color: "#7B7B7B" }}>Pound Trading Plan</div>
                        </div>
                        <div onClick={() => handleGBPLinks()} className="dialog-link4">
                            <div className="dialog-iconBox">
                                <img src={icon12} />
                            </div>
                            <div >Margin Trading</div>
                        </div>
                        <div onClick={() => handleGBPLinks()} className="dialog-link4">
                            <div className="dialog-iconBox">
                                <img src={icon13} />
                            </div>
                            <div >Backup Trading</div>
                        </div>
                        <div onClick={() => handleGBPLinks()} className="dialog-link4">
                            <div className="dialog-iconBox">
                                <img src={icon14} />
                            </div>
                            <div >Multi Trading</div>
                        </div>
                    </div>
                    <div style={{ width: '150px' }}>
                        <div onClick={() => handleGBPLinks()} className="dialog-link3">
                            <div className="dialog-iconBox">
                                <img src={icon15} />
                            </div>
                            <div>Trading Skills</div>
                        </div>
                        <div onClick={() => handleGBPLinks()} className="dialog-link4">
                            <div className="dialog-iconBox">
                                <img src={icon16} />
                            </div>
                            <div >GBP/USD Basic</div>
                        </div>
                        <div onClick={() => handleGBPLinks()} className="dialog-link4">
                            <div className="dialog-iconBox">
                                <img src={icon17} />
                            </div>
                            <div >GBP/USD Advance</div>
                        </div>
                        <div onClick={() => handleGBPLinks()} className="dialog-link4">
                            <div className="dialog-iconBox">
                                <img src={icon18} />
                            </div>
                            <div >Articles</div>
                        </div>
                    </div>
                    <div style={{ width: '170px' }}>
                        <div onClick={() => handleGBPLinks()} className="dialog-link3">
                            <div className="dialog-iconBox">
                                <img src={icon19} />
                            </div>
                            <div >Trading Tools</div>
                        </div>
                        <div onClick={() => handleGBPLinks()} className="dialog-link4">
                            <div className="dialog-iconBox">
                                <img src={icon20} />
                            </div>
                            <div >Risk-Reward “Fibo”</div>
                        </div>
                        <div onClick={() => handleGBPLinks()} className="dialog-link4">
                            <div className="dialog-iconBox">
                                <img src={icon21} />
                            </div>
                            <div >Essential Trading
                                Tools</div>
                        </div>
                        <div onClick={() => handleGBPLinks()} className="dialog-link4">
                            <div className="dialog-iconBox">
                                <img src={icon22} />
                            </div>
                            <div >Create Plan</div>
                        </div>
                    </div>
                </div>

            </Dialog>
        )
    }

    return (
        <>
            <div className="navBar">
                <img onClick={() => navigate('/')} src={logo} className="logo-nb" />

                <div>
                    <div className={activeMenu}>
                        <div
                            className={activeLink === 'About Us' ? "link-nb" : "link-nb1"}
                            onClick={() => {
                                navigate('/About')
                            }
                            }
                        >About Us</div>
                        <div
                            className="link-nb1"
                            onClick={() => {
                                setOpenLiveSignal(!openLiveSignal)
                            }} > Live Signal Account  <KeyboardArrowDownIcon fontSize="small" /> </div>
                        <div
                            className="link-nb1"
                            onClick={() => {
                                setOpenGBPLinks(!openGBPLinks)
                            }} > GBP/USD <KeyboardArrowDownIcon fontSize="small" /> </div>
                        <div
                            className="link-nb"
                            onClick={() => navigate('/SignIn')} >Join Trade</div>
                        <Btn
                            className='btn' label="Trader Area" />
                        <img onClick={() => navigate('/AdminPanel')} src={FAQ} className="faq-nb" />
                    </div>
                    <div className="icon">
                        {menu ? <MenuIcon onClick={() => setMenu(!menu)} /> : <CloseIcon onClick={() => setMenu(!menu)} />}
                    </div>
                </div>
                {LiveSignalLinks()}
                {GBPLinks()}
            </div>
        </>
    )
} 