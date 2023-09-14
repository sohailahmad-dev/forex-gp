import React from 'react'
import './Footer.css'
import logo from '../../assets/img/logo.png'
import facebook from '../../assets/img/facebook.png'
import twitter from '../../assets/img/twitter.png'
import youtube from '../../assets/img/youtube.png'
import { Grid } from '@mui/material'

export default function Footer({ bgColor = '#F7F7FF' }) {
    return (
        <div className='footer' style={{ backgroundColor: bgColor }}>
            <Grid container spacing={3}>
                <Grid item sm={4}>
                    <div className='footer-sec1'>
                        <img src={logo} className='footer-logo' />
                        <div className="footer-text1">Find Us On</div>
                        <div className="social-media-links">
                            <img src={facebook} />
                            <img src={twitter} />
                            <img src={youtube} />
                        </div>
                        <div className="footer-text1">Download our app from the stores</div>
                    </div>
                </Grid>
                <Grid item sm={3}>
                    <div className="footer-sec2">
                        <div className="footer-heading">About Us</div>
                        <div className="footer-text">Our Affiliation</div>
                        <div className="footer-text">Trusted E-Wallet</div>
                        <div className="footer-text">Why Live Signal Account?</div>
                        <div className="footer-text">Why GBP/USD?</div>
                        <div className="footer-text">Pound Trading Plan</div>
                        <div className="footer-heading">Community</div>
                        <div className="footer-text">Review & Feedback</div>
                    </div>
                </Grid>
                <Grid item sm={3}>
                    <div className="footer-sec3">
                        <div className="footer-heading">Downloads</div>
                        <div className="footer-text">GP-Forex App</div>
                        <div className="footer-text">PC Metatrader4</div>
                        <div className="footer-text">PC MultiTerminal</div>
                        <div className="footer-text">MT4 Mobile</div>
                        <div className="footer-text">Mobile Quotes</div>
                        <div className="footer-text">DigiKhata App</div>
                        <div className="footer-link1">Frequently Asked <br /> Questions</div>
                    </div>
                </Grid>
                <Grid item sm={2}>
                    <div className="footer-sec4">
                        <div className="footer-heading">External Links</div>
                        <div className="footer-text">Open Trading Account</div>
                        <div className="footer-text">E-Wallet PK</div>
                        <div className="footer-text">Get 30% Bonus</div>
                        <div className="footer-text">IFX Client Cabinet</div>
                        <div className="footer-text">IFX WebTrader</div>
                        <div className="footer-heading">Contact</div>
                        <div className="footer-text2">Email address only - <div>griponpip@gmail.com</div></div>
                        <div className="footer-text2">WhatsApp -  <div>+92 324 7407715</div></div>
                    </div>
                </Grid>
            </Grid>
            <div className="footer-sec5">
                Make your Strong Forex Grip for Planning and Calculations on GBP/USD Pair with our Technical Trading Skills and Achieve your Targets with Self/Copy Attachment through our Live Signal or Master Copy Account.
                <div style={{ height: '5px' }} />
                By proceeding with the signup process, you acknowledge that you have read, understood this <span>disclaimer,</span> and accepted the risks associated with forex trading.
            </div>
        </div>
    )
}
