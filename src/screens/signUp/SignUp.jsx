import React from 'react'
import './SignUp.css'
import bgImg from '../../assets/img/bgImg.png'
import logo from '../../assets/img/logo.png'
import accountIcon from '../../assets/img/accountIcon.png'
import passwordIcon from '../../assets/img/passwordIcon.png'
import InputField from '../../components/inputField/InputField'
import emailIcon from '../../assets/img/mailIcon.png'
import Btn from '../../components/btn/Btn'
import CheckBox from '../../components/checkBox/CheckBox'
import { useNavigate } from 'react-router-dom'


export default function SignUp() {
    const navigate = useNavigate()
    return (
        <div className='signUpBox'>
            {/* background img  */}
            <img src={bgImg} className='bgImg' />
            {/* main content  */}
            <img src={logo} className='logoImg' />
            <div className="welcomeHeading">Welcome To</div>
            <div className="text1 subTextSignUp">
                Log in to get in the moment updates on the things that interest you.
            </div>

            <InputField icon={accountIcon} placeholder='Username' />
            <InputField icon={accountIcon} placeholder='Last name' />
            <InputField icon={emailIcon} placeholder='Email' />
            <InputField icon={passwordIcon} placeholder='Password' isPassword={true} />
            <InputField icon={passwordIcon} placeholder='Repeat Password' isPassword={true} />
            <CheckBox onChange={(val) => { }} defaultValue={true} >I agree the terms of privacy policy & terms and conditions </CheckBox>
            <CheckBox onChange={(val) => { }} >By proceeding with the signup process, you acknowledge that you have read, understood this <span style={{ color: 'red' }} >disclaimer</span>, and accepted the risks associated with forex trading. </CheckBox>
            <CheckBox onChange={(val) => { }} >Subscribe for News & Alerts</CheckBox>
            <Btn label='SIGN UP' />

            <div className="text1 accountSignUp">
                Don't have an account? <span onClick={() => navigate('/SignIn')} > Sign In Now</span>
            </div>

        </div>
    )
}
