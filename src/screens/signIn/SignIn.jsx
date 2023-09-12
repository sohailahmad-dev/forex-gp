import React from 'react'
import './SignIn.css'
import bgImg from '../../assets/img/bgImg.png'
import logo from '../../assets/img/logo.png'
import accountIcon from '../../assets/img/accountIcon.png'
import passwordIcon from '../../assets/img/passwordIcon.png'
import InputField from '../../components/inputField/InputField'
import Btn from '../../components/btn/Btn'
import { useNavigate } from 'react-router-dom'


export default function SignIn() {
    const navigate = useNavigate()
    return (
        <div className='signInBox'>
            {/* background img  */}
            <img src={bgImg} className='bgImg' />
            {/* main content  */}
            <img src={logo} className='logoImg' />
            <div className="welcomeHeading">Welcome To</div>
            <div className="text1 subTextSignIn">
                Log in to get in the moment updates on the things that interest you.
            </div>


            <InputField icon={accountIcon} placeholder='Username' />
            <InputField icon={passwordIcon} placeholder='Password' isPassword={true} />
            <Btn onClick={() => navigate('/')} label='SIGN IN' />

            <div className="text1 accountSignIn">
                Don't have an account?
                <span onClick={() => navigate('/SignUp')} > Sign Up Now</span>
            </div>
        </div>
    )
}
