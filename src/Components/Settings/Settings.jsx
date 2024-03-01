import React, { useState } from 'react';
import styles from './Settings.module.css';
import nameIcon from '../../Assets/Icons/nameIcon.png'
import passwordIcon from '../../Assets/Icons/passwordIcon.png'
import { updateUser } from '../../Store/Slices/userSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const Settings = () => {
    const dispatch = useDispatch();

    const [updateData, setUpdateData] = useState({
        name: localStorage.getItem('name'),
        oldPassword: '',
        newPassword: ''
    })

    const [inputError, setInputError] = useState({
        oldPassword: '',
        newPassword: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
        setInputError({});
    }

    const handleUpdate = async (updateData) => {
        if (updateData.newPassword && !updateData.oldPassword) {
            setInputError({
                oldPassword: '* Old password is required!',
                newPassword: ''
            });
            return;
        }
        dispatch(updateUser(updateData))
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>Settings</div>
            <div className={styles.mainContainer}>
                <label className={styles.inputContainer}>
                    <img src={nameIcon} alt="name-icon" className={styles.icons} />
                    <input type="text"
                        className={styles.input}
                        placeholder="Name" name='name'
                        value={updateData.name}
                        onChange={handleChange}
                    />
                </label>

                <label className={styles.inputContainer}>
                    <img src={passwordIcon} alt="password-icon" className={styles.icons} />
                    <input type="password"
                        className={styles.input}
                        placeholder='Old Password' name='oldPassword'
                        value={updateData.oldPassword}
                        onChange={handleChange}
                    />
                </label>
                <p className={styles.errorMessage} id={inputError.oldPassword ? styles.error : ''}>{inputError.oldPassword}</p>

                <label className={styles.inputContainer}>
                    <img src={passwordIcon} alt="password-icon" className={styles.icons} />
                    <input type="password"
                        className={styles.input}
                        placeholder="New Password" name='newPassword'
                        value={updateData.newPassword}
                        onChange={handleChange}
                    />
                </label>

                <button className={styles.button} onClick={() => { handleUpdate(updateData) }}>Update</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Settings;