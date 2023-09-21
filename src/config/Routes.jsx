import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../screens/home/Home';
import SignIn from '../screens/signIn/SignIn'
import SignUp from '../screens/signUp/SignUp'
import About from '../screens/about/About';
import AdminPanel from '../screens/adminPanel/AdminPanel';
import MemberPanel from '../screens/memberPanel/MemberPanel';





export default function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/SignIn' element={<SignIn />}></Route>
                    <Route path='/SignUp' element={<SignUp />}></Route>
                    <Route path='/About' element={<About />}></Route>
                    <Route path='AdminPanel/*' element={<AdminPanel />}></Route>
                    <Route path='MemberPanel/*' element={<MemberPanel />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}