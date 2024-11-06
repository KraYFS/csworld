import styles from './header.module.css'
import logo from "../../assets/icons/header_logo.png"
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [isAtTop, setIsAtTop] = useState(true)
    const [lastScrollY, setLastedScrollY] = useState(0)

    const handleScroll = () => {
        const currentScrollY = window.scrollY

        if (currentScrollY === 0) {
            setIsAtTop(true)
        } else {
            setIsAtTop(false)
        }

        if (currentScrollY > lastScrollY && currentScrollY > 20) {
            setIsVisible(false)
        } else {
            setIsVisible(true)
        }
        setLastedScrollY(currentScrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <header className={`${styles.header} ${isVisible ? styles.visible : styles.hidden} ${isAtTop ? styles.atTop : ''}`}>
            <div className={styles.header_inner}>
                <Link to='/'><img src={logo} alt="" /></Link>
                <nav className={styles.nav_links}>
                    <Link className={styles.nav_link} to='/'>Зборки кс 1.6</Link>
                    <Link className={styles.nav_link} to='/'>моделі зброї</Link>
                    <Link className={styles.nav_link} to='/'>моделі гравців</Link>
                    <Link className={styles.nav_link} to='/'>карти</Link>
                    <Link className={styles.nav_link} to='/'>конфіги</Link>
                    <Link className={styles.nav_link} to='/'>графіті</Link>
                    <Link className={styles.nav_link} to='/'>звуки</Link>
                    <Link className={styles.nav_link} to='/'>статті</Link>
                </nav>
                <div className={styles.language}>
                    <span>ua</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
