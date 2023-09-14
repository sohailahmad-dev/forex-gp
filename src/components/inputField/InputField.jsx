import React, { useState } from 'react'
import './InputField.css'
import hideIcon from '../../assets/img/hideIcon.png'

export default function InputField({ icon, placeholder, isPassword, onChange }) {

    let [type, setType] = useState('text')

    const handleType = () => {
        type === 'text' ? setType('password') : setType('text')
    }

    useState(() => {
        if (isPassword) {
            setType('password')
        }
    }, [])

    return (
        <div className='inputBox' >
            <div className='leftBox' >
                <img className='iconMain' src={icon} />
                <input onChange={onChange} placeholder={placeholder} type={type} />
            </div>
            {isPassword && <img onClick={handleType} style={{ cursor: 'pointer' }} className='iconMain' src={hideIcon} />}
        </div>
    )
}

// https://sale-push-website.vercel.app/stats
