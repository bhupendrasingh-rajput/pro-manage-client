import React, { useState, useEffect } from 'react'
import styles from './Forms.module.css';
import nameIcon from '../../Assets/Icons/nameIcon.png';
import mailIcon from '../../Assets/Icons/mailIcon.png';
import passwordIcon from '../../Assets/Icons/passwordIcon.png';
import { userRegister } from '../../Apis/authAPI';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Store/Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';


const RegisterForm = () => {
    const isAuthenticated = useSelector((state) => { return state.user.isAuthenticated });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/')
    }, [navigate, isAuthenticated])

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [inputError, setInputError] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
        setInputError({ ...inputError, [name]: '' });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, password, confirmPassword } = userData;
        let currentErrors = {};

        if (!name.trim()) {
            currentErrors.name = "Name is required!";
        }

        if (!email.trim()) {
            currentErrors.email = "Email is required!";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            currentErrors.email = "Email is invalid!";
        }

        if (!password.trim()) {
            currentErrors.password = "Password is required!";
        } else if (password.length < 5) {
            currentErrors.password = "Password is too short!";
        }

        if (!confirmPassword) {
            currentErrors.confirmPassword = 'Please confirm your password!';
        } else if (password !== confirmPassword) {
            currentErrors.confirmPassword = 'Passwords do not match!';
        }


        if (Object.keys(currentErrors).length > 0) {
            setInputError(currentErrors);
            return;
        }

        dispatch(register({ name, email, password }))

    }
    return (
        <div className={styles.container}>

            <div className={styles.formHeading}>Register</div>

            <form className={styles.form}>
                <div className={styles.inputContainer}>
                    <label className={styles.inputBox}>
                        <img src={nameIcon} alt="name-icon" className={styles.icons} />
                        <input type="text"
                            className={styles.input}
                            placeholder="Name" name='name'
                            onChange={handleChange}
                        />
                    </label>
                    {inputError.name && <p style={{ fontSize: 'xx-small', color: 'red' }}>{inputError.name}</p>}
                </div>


                <div className={styles.inputContainer}>
                    <label className={styles.inputBox}>
                        <img src={mailIcon} alt="mail-icon" className={styles.icons} />
                        <input type="text"
                            className={styles.input}
                            placeholder="Email" name='email'
                            onChange={handleChange}
                        />
                    </label>
                    {inputError.email && <p style={{ fontSize: 'xx-small', color: 'red' }}>{inputError.email}</p>}
                </div>


                <div className={styles.inputContainer}>
                    <label className={styles.inputBox}>
                        <img src={passwordIcon} alt="password-icon" className={styles.icons} />
                        <input type="password"
                            className={styles.input}
                            placeholder="Password" name='password'
                            onChange={handleChange}
                        />
                    </label>
                    {inputError.password && <p style={{ fontSize: 'xx-small', color: 'red' }}>{inputError.password}</p>}
                </div>

                <div className={styles.inputContainer}>
                    <label className={styles.inputBox}>
                        <img src={passwordIcon} alt="password-icon" className={styles.icons} />
                        <input type="password"
                            className={styles.input}
                            placeholder="Confirm Password" name='confirmPassword'
                            onChange={handleChange}
                        />
                    </label>
                    {inputError.confirmPassword && <p style={{ fontSize: 'xx-small', color: 'red' }}>{inputError.confirmPassword}</p>}
                </div>

                <button className={styles.button} onClick={handleSubmit}>Register</button>
            </form>

            <div className={styles.formFooter}>
                <div className={styles.footerText} >Have an account ?</div>
                <button className={styles.button} style={{ color: '#17A2B8', border: '1px solid #17A2B8', backgroundColor: 'white' }} onClick={() => { navigate('/login') }}>Log in</button>
            </div>
            <ToastContainer />

        </div>
    )
}

export default RegisterForm;