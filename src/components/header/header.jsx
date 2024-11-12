import styles from './header.module.css'
import logo from "../../assets/icons/header_logo.png"
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastedScrollY] = useState(0)
    const [isOpen, setIsOpen] = useState(true)
    const ref = useRef(null)

    const handleScroll = () => {
        const currentScrollY = window.scrollY

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

    const openBurgerMenu = () => {
        isOpen === true ? setIsOpen(false) : setIsOpen(true)

        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }

    return (
        <header className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}>
            <div className={styles.header_inner}>
                <Link to='/'><img src={logo} alt="" /></Link>
                <nav className={styles.nav_links}>
                    <Link ref={ref} className={styles.nav_link} to={`/catalog/assemblies`}>Зборки кс 1.6</Link>
                    <Link className={styles.nav_link} to='/catalog/weapon models'>моделі зброї</Link>
                    <Link className={styles.nav_link} to='/catalog/player models'>моделі гравців</Link>
                    <Link className={styles.nav_link} to='/catalog/maps'>карти</Link>
                    <Link className={styles.nav_link} to='/catalog/configs'>конфіги</Link>
                    <Link className={styles.nav_link} to='/catalog/graffiti'>графіті</Link>
                    <Link className={styles.nav_link} to='/catalog/sounds'>звуки</Link>
                    <Link className={styles.nav_link} to='/catalog/posts'>статті</Link>
                </nav>
                <div className={styles.language}>
                    <span>ua</span>
                </div>
                <div onClick={openBurgerMenu} className={styles.header_menu_burger_btn}>
                    <div className={styles.header_menu_burger_line}></div>
                    <div className={styles.header_menu_burger_line}></div>
                    <div className={styles.header_menu_burger_line}></div>
                </div>
                <div className={styles.header_menu_burger}>
                    <nav className={`${styles.nav_links_burger} ${isOpen === false ? styles.opened : styles.closed}`}>
                        <div onClick={openBurgerMenu} className={styles.header_menu_burger_btn_close}>
                            <div className={styles.header_menu_burger_left_line_close}></div>
                            <div className={styles.header_menu_burger_right_line_close}></div>
                        </div>
                        <Link ref={ref} className={styles.nav_link} to={`/catalog/assemblies`}>Зборки кс 1.6</Link>
                        <Link className={styles.nav_link} to='/catalog/weapon models'>моделі зброї</Link>
                        <Link className={styles.nav_link} to='/catalog/player models'>моделі гравців</Link>
                        <Link className={styles.nav_link} to='/catalog/maps'>карти</Link>
                        <Link className={styles.nav_link} to='/catalog/configs'>конфіги</Link>
                        <Link className={styles.nav_link} to='/catalog/graffiti'>графіті</Link>
                        <Link className={styles.nav_link} to='/catalog/sounds'>звуки</Link>
                        <Link className={styles.nav_link} to='/catalog/posts'>статті</Link>
                        <div className={styles.language}>
                            <span>ua</span>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
