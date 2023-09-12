import React, { useState } from 'react'
import './Home.css'
import NavBar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'
import Group311 from '../../assets/img/Group311.png'
import { Grid } from '@mui/material'
import Btn from '../../components/btn/Btn'
import card from '../../assets/img/card.png'
import Group323 from '../../assets/img/Group323.png'
import Image4 from '../../assets/img/Image4.png'
import Image5 from '../../assets/img/Image5.png'
import Group320 from '../../assets/img/Group320.png'
import Group326 from '../../assets/img/Group326.png'
import Image2 from '../../assets/img/Image2.png'
import Image3 from '../../assets/img/Image3.png'
import Slider from '../../components/slider/Slider'


export default function Home() {
    let [activeLink, setActiveLink] = useState('Margin Trading')

    return (
        <div>
            <NavBar />
            <Slider />
            <section>
                <div className="home-sec2">
                    <div className="home-sec2-heading">Secure Growth, Remarkable Achievements: Start Small, Earn Big</div>
                    <div className="home-sec2-decoration">
                        <div />
                        <img src={Group311} />
                    </div>
                    <div className="home-sec2-text">
                        Unveil the power of a pound trading plan and experience the  efficiency of single pair trading, all conveniently accessible in a single  place. Elevate your trading journey with us today
                    </div>
                </div>
            </section>
            <section>
                <div className="home-sec3">
                    <div className="home-sec3-heading">Your Main and Essential Trading Tool - Pound Trading Plan</div>
                    <div className="home-sec3-text">
                        About 80% of your Trading Success depends on your pre-calculated trading risk: reward with the market analysis skills, you also need a trading plan according to your startup capacity, profit targets, self aggression and trading habits. <span>Pound Trading Plan</span> help you to resolve this issue in 3 different categories
                        according to you. Choose one of your favorite Stuff here:
                    </div>
                    <div className="home-sec3-links">
                        <div
                            onClick={() => setActiveLink('Margin Trading')}
                            className={activeLink === 'Margin Trading' ? 'home-sec3-link-active' : 'home-sec3-link'}
                        >Margin Trading</div>
                        <div
                            onClick={() => setActiveLink('Backup Trading')}
                            className={activeLink === 'Backup Trading' ? 'home-sec3-link-active' : 'home-sec3-link'}
                        >Backup Trading</div>
                        <div
                            onClick={() => setActiveLink('Pound Trading')}
                            className={activeLink === 'Pound Trading' ? 'home-sec3-link-active' : 'home-sec3-link'}
                        >Pound Trading</div>
                    </div>
                    <div className="home-sec3-items">
                        {activeLink === 'Margin Trading' && <div>
                            <Grid container spacing={3}>
                                <Grid item sm={5}>
                                    <div className="home-sec3-item1">
                                        <div className="home-sec3-item1-text">
                                            Grow your account smartly without risking it all. Start small, aim high with our '<span>Mega Trade Margin.</span>' We offer pre-calculated Stop Loss and Take Profit for account-safe trading. No account-washing tactics, just profitable trades. Elevate your trading  strategy with us.
                                        </div>
                                        <div className="home-sec3-item1-middle">
                                            <Btn label='Create Your Plan' className='home-sec3-item1-btn' />
                                            <div className="home-sec3-item1-link">Get details</div>
                                        </div>
                                        <div className="home-sec3-item1-lowerText">
                                            With an easy calculation according to market range, Margin Traders with low aggression can create their Trading Plan on 4-Decimal
                                            Price Units from Minimum 100-Pip Trade Margin to Maximum 1000-Pip and plan their limitless targets accordingly.
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item sm={7}>
                                    <div className="home-sec3-item1-imgs">
                                        <div className="home-sec3-item1-blueDiv"></div>
                                        <img src={card} alt="card" className="home-sec3-item1-img1" />
                                        <img src={Group323} alt="Group323" className="home-sec3-item1-img2" />
                                        <img src={Image4} alt="Image4" className="home-sec3-item1-img3" />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        }
                        {activeLink === 'Backup Trading' && <div>
                            <Grid container spacing={5}>
                                <Grid item sm={5}>
                                    <div className="home-sec3-item1">
                                        <div className="home-sec3-item2-text">
                                            Achieve maximum returns per trade usingx <span>'Mini Trade Margin'</span> with minimal startup. No Stop Loss or Take Profit restrictions. Unlock exceptional return ratios today.
                                        </div>
                                        <div className="home-sec3-item2-middle">
                                            <Btn label='Create Your Plan' className='home-sec3-item2-btn' />
                                            <div className="home-sec3-item2-link">Read More</div>
                                        </div>
                                        <div className="home-sec3-item2-lowerText">
                                            For the Aggressive Trader: Instant, High Targets from 1/1 to 1/10+ Risk-Reward. Craft your Plan on 4-Decimal Prices with Trade
                                            Margin of 25 to 100 Pips. Unleash Limitless Potential.
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item sm={7}>
                                    <div className="home-sec3-item2-imgs">
                                        <div className="home-sec3-item2-blueDiv"><div /></div>
                                        <img src={Group320} alt="Group320" className="home-sec3-item2-img1" />
                                        <img src={Image5} alt="Image5" className="home-sec3-item2-img2" />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        }
                        {activeLink === 'Pound Trading' && <div>
                            <Grid container spacing={5}>
                                <Grid item sm={5}>
                                    <div className="home-sec3-item1">
                                        <div className="home-sec3-item2-text">
                                            Achieve Margin and Backup Trading at the same time with <span>Multi Management</span> in 2 different Trading Accounts.
                                        </div>
                                        <div className="home-sec3-item2-middle">
                                            <Btn label='Create Your Plan' className='home-sec3-item3-btn' />
                                            <div className="home-sec3-item2-link">Read More</div>
                                        </div>
                                        <div className="home-sec3-item2-lowerText">
                                            Unlocking Advanced Trading Potential: MT4 MultiTerminal empowers traders with varying aggression levels to seamlessly manage 2 or more trading accounts concurrently. This approach enables the pursuit of both Margin and Backup Targets simultaneously, all facilitated through the efficiency of Multi Management.
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item sm={7}>
                                    <div className="home-sec3-item3-imgs">
                                        <div className="home-sec3-item3-grayDiv"><div /></div>
                                        <img src={Group326} alt="Group326" className="home-sec3-item3-img1" />
                                        <img src={Image2} alt="Image2" className="home-sec3-item3-img2" />
                                        <img src={Image3} alt="Image3" className="home-sec3-item3-img3" />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        }
                    </div>
                </div>
            </section>
            <Footer bgColor='#F1F1FB' />
        </div>
    )
}
