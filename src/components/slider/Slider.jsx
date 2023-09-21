import React, { useEffect, useState } from 'react';
import slider1 from '../../assets/img/slider1.png'
import slider2 from '../../assets/img/slider2.png'
import slider3 from '../../assets/img/slider3.png'
import rectangle from '../../assets/img/rectangle.png'
import image1 from '../../assets/img/image1.png'
import Btn from '../btn/Btn'
import './Slider.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Slider() {

    let [currentSlide, setCurrentSlide] = useState(1);
    const slides = 3;

    const changeSlide = () => {
        (currentSlide === slides) ? setCurrentSlide(1) : setCurrentSlide(currentSlide + 1);
    }

    useEffect(() => {
        let interval = setInterval(changeSlide, 5000);

        return () => clearInterval(interval);
    })

    const handlePreviousSlide = () => {
        if (currentSlide === 1) {
            setCurrentSlide(slides)
        } else {
            setCurrentSlide(currentSlide - 1)
        }
    }

    const handleNextSlide = () => {
        if (currentSlide === slides) {
            setCurrentSlide(1)
        } else {
            setCurrentSlide(currentSlide + 1)
        }
    }


    return (
        <>
            <div className='sliderStyle'>
                {currentSlide === 1 && <div className='slideStyle' >
                    <img src={rectangle} className='slide-leftImg' />
                    <img src={slider1} className='slide-rightImg' />
                    <div className='slide-content' >
                        <div className="slide-heading">
                            Unlock the Secrets of GBP/ USD Trading: <span>Enhance Your Forex Expertise for Free!</span>
                        </div>
                        <div className="slide-text">From Basic to Advance free Technical Planning, Calculation and Trading Analysis skills on Price Action through Videos and Articles to make your Grip Stronger on Single Pair</div>
                        <div className="slide-btns">
                            <Btn label='Access Now' className='slide-btn' />
                            <div className="slide-link">Read More</div>
                        </div>
                    </div>
                    <div className="slider-arrows">
                        <div onClick={handlePreviousSlide} className='slider-arrow-left'>
                            <ArrowBackIosIcon fontSize='large' />
                        </div>
                        <div onClick={handleNextSlide} className='slider-arrow-right'>
                            <ArrowForwardIosIcon fontSize='large' />
                        </div>
                    </div>
                    {/* <div className="slider-bubbles-box">
                        <div className='slider-bubble'>We<div className='slider-bubble-active' /></div>
                        <div className='slider-bubble'><div className='slider-bubble-active' /></div>
                        <div className='slider-bubble'><div className='slider-bubble-active' /></div>
                    </div> */}


                </div>}
                {currentSlide === 2 && <div className='slideStyle' >
                    <img src={rectangle} className='slide-leftImg' />
                    <img src={image1} className='slide-centerImg' />
                    <img src={slider2} className='slide-rightImg' />
                    <div className='slide-content' >
                        <div className="slide-heading" style={{ fontSize: '40px' }}>
                            Empower Your Self-Trading with  <span>Real-Time Signals</span>
                        </div>
                        <div className="slide-text">An advanced way of receiving Daily Signals for Self Trading through Investor Password on GBP/USD. The margin is fully secure with proper TP/SL targets according to our Pound Trading Plan</div>
                        <div className="slide-btns">
                            <Btn label='Join Trade' className='slide-btn' />
                            <div className="slide-link">Read More</div>
                        </div>

                    </div>
                    <div className="slider-arrows">
                        <div onClick={handlePreviousSlide} className='slider-arrow-left'>
                            <ArrowBackIosIcon fontSize='large' />
                        </div>
                        <div onClick={handleNextSlide} className='slider-arrow-right'>
                            <ArrowForwardIosIcon fontSize='large' />
                        </div>
                    </div>
                </div>}
                {currentSlide === 3 && <div className='slideStyle' >
                    <img src={rectangle} className='slide-leftImg' />
                    <img src={slider3} className='slide-rightImg' />
                    <div className='slide-content' >
                        <div className="slide-heading" style={{ fontSize: '40px' }}>
                            Master the Markets through Copy  <span>Trading Excellence</span>
                        </div>
                        <div className="slide-text">Achieve your Pound Trading Plan targets by automatically following our Master Copy Account trading and safely earn without any
                            effort.</div>
                        <div className="slide-btns">
                            <Btn label='Copy Now' className='slide-btn' />
                            <div className="slide-link">Read More</div>
                        </div>
                    </div>
                    <div className="slider-arrows">
                        <div onClick={handlePreviousSlide} className='slider-arrow-left'>
                            <ArrowBackIosIcon fontSize='large' />
                        </div>
                        <div onClick={handleNextSlide} className='slider-arrow-right'>
                            <ArrowForwardIosIcon fontSize='large' />
                        </div>
                    </div>
                </div>}
            </div>

        </>
    )
}

