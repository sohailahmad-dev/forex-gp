import React from 'react'
import './About.css'
import NavBar from '../../components/navBar/NavBar'
import tradeImg from '../../assets/img/Trade.png'
import poundIcon from '../../assets/img/poundIcon.png'
import analyticsIcon from '../../assets/img/Analytics.png'
import practicIcon from '../../assets/img/Practice.png'
import EasyImg from '../../assets/img/Easy.png'
import Excellence from '../../assets/img/Excellence.png'
import Nurturing from '../../assets/img/Nurturing.png'
import partners1 from '../../assets/img/partners1.png'
import instaforex from '../../assets/img/instaforex.png'
import pmex from '../../assets/img/pmex.png'
import { Grid } from '@mui/material'
import Btn from '../../components/btn/Btn'
import Footer from '../../components/footer/Footer'

export default function About() {

    const aboutItems = [
        {
            icon: tradeImg,
            heading: 'Single Pair Trading on GBP/USD',
            description: 'Get the detailed Technical Market Analysis & Price Action Setup'
        },
        {
            icon: poundIcon,
            heading: 'Pound Trading Plan',
            description: 'Get the detailed Technical Market Analysis & Price Action Setup'
        },
        {
            icon: analyticsIcon,
            heading: 'GBP/USD Analytics',
            description: 'Get the detailed Technical Market Analysis & Price Action Setup'
        },
        {
            icon: practicIcon,
            heading: 'Theoretical and Practical Materials',
            description: 'Get the detailed Technical Market Analysis & Price Action Setup'
        },
    ]
    const aboutSection3Items = [
        {
            heading: 'Trader Area',
            description: '"Trader Area" se website ke members ko fast aur secure trading tools ki asani, guidance, aur live trading facility milti hai.',
            bgColor: '#bdffb3',
            borderColor: '#96FF44'
        },
        {
            heading: 'Urdu/English Support',
            description: 'Hum automatic emails, WhatsApp support, call back service aur F.A.Qs ki sahoolat Urdu aur English dono zubanon mein provide kerte hain.',
            bgColor: ' #ffb5b3',
            borderColor: '#FF4A44'
        },
        {
            heading: 'GP-Forex App',
            description: '“GP-Forex App" se rozana daily announcements aur trade alerts hasil karein. Tez aur asaan "Trader Area" access. Self-copy trading ko mazeed simple banaye.',
            bgColor: ' #ccceff',
            borderColor: '#2B72C2'
        },
    ]
    return (
        <div>
            <NavBar />
            {/* main Content  */}
            <section>
                <div className='about-hero' >Who We Are</div>
                <div className='about-a'>
                    <div className='about-heading'>Mastering GBP/USD: Your Gateway to Profitable Forex Trading</div>
                    <div className='about-text'>With over 15 years of market experience in online forex trading since 2006, we are committed to helping forex traders achieve significant targets with minimal capital. Our tailored skills and services for the "GBP/USD" pair ensure a secure, user-friendly, and unique trading experience. Join us to simplify your path to success in the forex market</div>
                </div>
            </section>
            <section >
                <div className="cus-div" id='about-skew2'>
                    <div className="skew-helper-up"></div>
                </div>
                <div className="cus-div" id='about-skew3'>
                    <div className="about-content">
                        <div className='heading about-heading-mobile'  >
                            Our distinct valuable services
                        </div>
                        <Grid container className='skewed-content-alignment'>
                            <Grid item md={8}  >
                                <Grid container spacing={3}>
                                    {
                                        aboutItems.map((item, index) => {
                                            return (
                                                <Grid key={index} item md={6}>
                                                    <div className="about-item">
                                                        <div className="about-item-icon">
                                                            <img src={item.icon} alt='trade' />
                                                        </div>
                                                        <div className="about-item-content">
                                                            <div className="about-item-content-heading">{item.heading}</div>
                                                            <div className="about-item-content-text">{item.description}</div>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>

                            </Grid>
                            <Grid item md={1} />
                            <Grid item md={3} >
                                <div className='heading about-heading-extra'  >
                                    Our distinct valuable <br /> services
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className="skew-helper-down" ></div>
            </section>
            <section>
                <div className='about-section-3'>
                    <div className="heading">Our Facilities</div>
                    <div className="about-sec3-mainContent">
                        {aboutSection3Items.map((item, index) => {
                            return (
                                <div key={index} className="about-sec3-item">
                                    <Grid container>
                                        <Grid item sm={4}>
                                            <div className="about-sec3-item-heading" style={{ backgroundColor: item.bgColor }}>
                                                <div className='about-sec3-item-heading-border' style={{ backgroundColor: item.borderColor, color: item.borderColor }}>.</div>
                                                <div className='about-sec3-item-heading-content' >{item.heading}</div>
                                            </div>
                                        </Grid>
                                        <Grid item sm={8}>
                                            <div className="about-sec3-item-description">{item.description}</div>
                                        </Grid>
                                    </Grid>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            <section>
                <div className="about-section-4">
                    <div className="heading">Why Choose Us</div>
                    <div className="about-text about-sec4-text">Earning client trust is paramount; that's why millions opt for us. Here's why we're a premier choice for online trading services.</div>
                    <div className="about-sec4-mainContent">
                        <Grid container spacing={5}>
                            <Grid item sm={4}>
                                <div className="about-sec4-item">
                                    <div className="about-section4-iconBox">
                                        <div className="about-section4-icon">
                                            <img src={EasyImg} />
                                        </div>
                                        <div className="about-sec4-icon-text">01</div>
                                    </div>
                                    <div>
                                        <div className="about-sec4-item-heading">Keeping it simple</div>
                                        <div className="about-sec4-item-description">Our goal is to eliminate obstacles and ensure online trading and investing are within reach for all, offering simplicity and clarity. Our user-friendly platform and communication approach reflect our commitment to keeping things straightforward.</div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item sm={4}>
                                <div className="about-sec4-item about-sec4-item2" >
                                    <div className="about-section4-iconBox">
                                        <div className="about-section4-icon">
                                            <img src={Excellence} />
                                        </div>
                                        <div className="about-sec4-icon-text">02</div>
                                    </div>
                                    <div>
                                        <div className="about-sec4-item-heading">Striving for excellence</div>
                                        <div className="about-sec4-item-description">Our goal is to surpass expectations by placing you at the heart of each choice. We're committed to delivering top-notch user experience and prioritizing your privacy.</div>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item sm={4}>
                                <div className="about-sec4-item">
                                    <div className="about-section4-iconBox">
                                        <div className="about-section4-icon">
                                            <img src={Nurturing} />
                                        </div>
                                        <div className="about-sec4-icon-text">03</div>
                                    </div>
                                    <div>
                                        <div className="about-sec4-item-heading">Empowering you</div>
                                        <div className="about-sec4-item-description">Many refrain from investing due to inexperience and limited knowledge. We aim to change that. Our platform offers user-friendly tools, a wealth of educational resources, and unwavering support, ensuring you embark confidently on your investment journey.</div>
                                    </div>
                                </div>
                            </Grid>

                        </Grid>

                    </div>
                </div>
            </section>
            <section>
                <div className="about-sec-5">
                    <div className="about-sec5-circle"></div>
                    <Grid container>
                        <Grid item sm={8}>
                            <div className="about-sec5-header">
                                <div className="heading">Introducing Our Partners</div>
                                <div className="about-text about-sec4-text">Get to know our affiliates who contribute to our success and vision. Learn about the driving forces behind our endeavors in this dedicated section.</div>
                            </div>
                        </Grid>
                        <Grid item sm={4}>
                            <img src={partners1} className='about-sec5-header-img' />
                        </Grid>
                    </Grid>
                    <div className="about-sec5-body">
                        <Grid container spacing={4}>
                            <Grid item sm={6}>
                                <div className="about-sec5-item">
                                    <div className="about-sec5-item-heading">InstaForex</div>
                                    <div className="about-sec5-item-description">InstaForex was founded in 2007 by the InstaFintech group of companies. After the registration, the broker signed contracts with MetaQuotes Software, the leading provider of online trading software, and the largest news providers, like eSignal, Reuters, etc. In the first months of its activity, the broker entered into an agreement with large Western counterparties providing access to the foreign exchange market. This marked the start of the InstaForex brokerage company. <span> See more</span></div>
                                    <div className="about-sec5-item-logoBox">
                                        <img src={instaforex} width='200px' />
                                    </div>
                                    <div className="about-sec5-item-lower-text">
                                        For fast and trusted USD to PKR exchange, our recommended E-Wallets are <span>CHANGERIX</span> and <span>PakTransfer</span>
                                    </div>
                                </div>
                                <Btn label='Learn More'
                                    style={{
                                        width: 'auto',
                                        height: 'auto',
                                        padding: '20px 60px',
                                        margin: '40px auto'
                                    }}
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <div className="about-sec5-item">
                                    <div className="about-sec5-item-heading">PMEX</div>
                                    <div className="about-sec5-item-description" style={{ paddingRight: '30px' }}>Pakistan Mercantile Exchange Limited (PMEX) is the country’s first and only demutualized commodity futures exchange, licensed and regulated by the Securities and Exchange Commission of Pakistan (SECP). Based on a sophisticated multi-dimensional infrastructure and state-of-the-art technology, PMEX offers a complete suite of services i.e. trading, clearing & settlement and custody as well as back office, all under one roof. <span> See more</span></div>
                                    <div className="about-sec5-item-logoBox">
                                        <img src={pmex} width='160px' />
                                    </div>
                                    <div className="about-sec5-item-lower-text">
                                        Our affiliated brokers <span>DEL (Dawood Equities Limited)</span> & <span>OBOX Gold</span> are listed with PMEX. <br /> <font>.</font>
                                    </div>
                                </div>
                                <Btn label='Learn More'
                                    style={{
                                        width: 'auto',
                                        height: 'auto',
                                        padding: '20px 60px',
                                        margin: '40px auto'
                                    }}
                                />
                            </Grid>

                        </Grid>
                    </div>



                </div>
            </section >
            <div style={{ height: '30px' }} />
            <Footer />
        </div >
    )
}
