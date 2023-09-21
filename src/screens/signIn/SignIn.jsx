import React, { useState } from 'react'
import './SignIn.css'
import bgImg from '../../assets/img/bgImg.png'
import logo from '../../assets/img/logo.png'
import accountIcon from '../../assets/img/accountIcon.png'
import passwordIcon from '../../assets/img/passwordIcon.png'
import InputField from '../../components/inputField/InputField'
import Btn from '../../components/btn/Btn'
import { useNavigate } from 'react-router-dom'
import Snack from '../../components/snack/Snack'
import Loader from '../../components/loader/Loader'
import { postData } from '../../config/apiCalls'


export default function SignIn() {

    const navigate = useNavigate()
    let [userData, setUserData] = useState({
        username: '',
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




    const loginUser = () => {
        setIsLoading(true)
        const { username, password } = userData;

        if (username && password) {
            postData('/login', userData).then((response) => {
                if (response.success) {
                    localStorage.setItem("userData", JSON.stringify(response.user));
                    setSnackMsg(response.message);
                    setOpenSnack(true);
                    setSeverity('success')
                    setIsLoading(false)
                    setTimeout(() => {
                        if (response.user?.role?.name === 'admin') {
                            navigate('/AdminPanel')
                        } else {
                            navigate('/MemberPanel')
                        }
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
        <div className='signInBox'>
            {/* background img  */}
            <img src={bgImg} className='bgImg' />
            {/* main content  */}
            <img src={logo} className='logoImg' />
            <div className="welcomeHeading">Welcome To</div>
            <div className="text1 subTextSignIn">
                Log in to get in the moment updates on the things that interest you.
            </div>


            <InputField
                onChange={(e) => setInpValue("username", e.target.value)}
                value={userData.username}
                icon={accountIcon} placeholder='Username' />

            <InputField
                onChange={(e) => setInpValue("password", e.target.value)}
                value={userData.password}
                icon={passwordIcon} placeholder='Password' isPassword={true} />
            <Btn onClick={loginUser} label='SIGN IN' />

            <div className="text1 accountSignIn">
                Don't have an account?
                <span onClick={() => navigate('/SignUp')} > Sign Up Now</span>
            </div>

            <Snack msg={snackMsg} open={openSnack} onClose={handleCloseSnack} severity={severity} />
            <Loader isLoading={isLoading} />
        </div>
    )
}
