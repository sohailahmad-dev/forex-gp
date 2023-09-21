import React, { useEffect, useState } from 'react'
import './SignUp.css'
import bgImg from '../../assets/img/bgImg.png'
import logo from '../../assets/img/logo.png'
import accountIcon from '../../assets/img/accountIcon.png'
import passwordIcon from '../../assets/img/passwordIcon.png'
import emailIcon from '../../assets/img/mailIcon.png'
import InputField from '../../components/inputField/InputField'
import Btn from '../../components/btn/Btn'
import CheckBox from '../../components/checkBox/CheckBox'
import { useNavigate } from 'react-router-dom'
import { postData } from '../../config/apiCalls'
import Snack from '../../components/snack/Snack'
import Loader from '../../components/loader/Loader'


export default function SignUp() {

    const navigate = useNavigate()
    let [confirmPassword, setConfirmPassword] = useState('');
    let [agreeToTerms, setAgreeToTerms] = useState(true);
    let [disclaimer, setDisclaimer] = useState(false);
    let [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    })

    let [isLoading, setIsLoading] = useState(false);
    let [openSnack, setOpenSnack] = useState(false);
    let [severity, setSeverity] = useState('error')
    let [snackMsg, setSnackMsg] = useState('');

    const handleCloseSnack = () => {
        setOpenSnack(false);
        setSnackMsg('');
        setSeverity('error');
    }




    const registerUser = () => {
        setIsLoading(true)
        const { firstname, lastname, username, password, email } = userData;

        if (firstname && lastname && username && password && email && confirmPassword) {
            if (agreeToTerms) {
                if (disclaimer) {
                    if (password === confirmPassword) {
                        // api call 
                        postData('/register', userData).then((response) => {
                            if (response.success) {
                                setSnackMsg(response.message);
                                setOpenSnack(true);
                                setSeverity('success')
                                setIsLoading(false)
                                setTimeout(() => {
                                    navigate('/SignIn')
                                }, 2000)
                            } else {
                                setSnackMsg(response.message);
                                setOpenSnack(true);
                                setIsLoading(false)

                            }
                        })
                            .catch((error) => {
                                setSnackMsg(error.message);
                                setOpenSnack(true);
                                setIsLoading(false)

                            });


                    } else {
                        setSnackMsg('Password does not match with Repeat Password')
                        setOpenSnack(true)
                        setIsLoading(false)

                    }
                } else {
                    setSnackMsg('Please acknowledge that you understood disclaimer')
                    setOpenSnack(true)
                    setIsLoading(false)

                }
            }
            else {
                setSnackMsg('Please Agree to Terms and Conditons')
                setOpenSnack(true)
                setIsLoading(false)

            }
        } else {
            setSnackMsg('Required Fields are missing!')
            setOpenSnack(true)
            setIsLoading(false)

        }
    }

    const setInpValue = (key, value) => {
        userData[key] = value;
        setUserData({ ...userData })
    }



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

            <InputField
                onChange={(e) => setInpValue("username", e.target.value)}
                value={userData.username}
                icon={accountIcon} placeholder='Username' />

            <InputField
                onChange={(e) => setInpValue("firstname", e.target.value)}
                value={userData.firstname}
                icon={accountIcon} placeholder='First name' />

            <InputField
                onChange={(e) => setInpValue("lastname", e.target.value)}
                value={userData.lastname}
                icon={accountIcon} placeholder='Last name' />

            <InputField
                onChange={(e) => setInpValue("email", e.target.value)}
                value={userData.email}
                icon={emailIcon} placeholder='Email' />

            <InputField
                onChange={(e) => setInpValue("password", e.target.value)}
                value={userData.password}
                icon={passwordIcon} placeholder='Password' isPassword={true} />

            <InputField
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                icon={passwordIcon} placeholder='Repeat Password' isPassword={true} />

            <CheckBox
                onChange={(val) => setAgreeToTerms(val)}
                defaultValue={agreeToTerms}
            >I agree the terms of privacy policy & terms and conditions </CheckBox>

            <CheckBox
                onChange={(val) => setDisclaimer(val)}
            > By proceeding with the signup process, you acknowledge that you have read, understood this <span style={{ color: 'red' }} >disclaimer</span>, and accepted the risks associated with forex trading. </CheckBox>

            <CheckBox
                onChange={(val) => { }}
            >Subscribe for News & Alerts</CheckBox>

            <Btn label='SIGN UP' onClick={registerUser} />

            <div className="text1 accountSignUp">
                Don't have an account? <span onClick={() => navigate('/SignIn')} > Sign In Now</span>
            </div>

            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />


        </div>
    )
}
