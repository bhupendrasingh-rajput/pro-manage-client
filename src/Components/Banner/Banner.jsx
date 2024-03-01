import React from 'react'
import styles from './Banner.module.css';
import BannerImage from '../../Assets/Images/Banner.png';
const Banner = () => {
    return (
        <div className={styles.bannerContainer}>
                <img src={BannerImage} alt="Banner" className={styles.bannerImage} />
                <div className={styles.textContent}>
                    <div style={{fontSize:'1.3rem',fontWeight:'500'}}>Welcome aboard my friend</div>
                    <div style={{fontSize:'0.9rem',fontWeight:'300'}}>just a couple of clicks and we start</div>
                </div>
        </div>
    )
}

export default Banner