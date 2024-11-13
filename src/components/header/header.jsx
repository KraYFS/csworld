import styles from './header.module.css'
import logo from "../../assets/icons/header_logo.png"
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import openIcon from "./openIcon.svg";

const languages = [
    { value: "ru", label: "Ru" },
    { value: "ua", label: "Ua" },
];

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastedScrollY] = useState(0);
    const [isOpen, setIsOpen] = useState(true);
    const { t, i18n } = useTranslation();
    const ref = useRef(null);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [isOpenLanguageMenu, setIsOpenLanguageMenu] = useState(false);
    const selectRef = useRef(null);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        changeLanguage(language.value); // Call changeLanguage with the selected language value
        setIsOpenLanguageMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpenLanguageMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 20) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setLastedScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const openBurgerMenu = () => {
        setIsOpen((prev) => !prev);
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };

    return (
        <header className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}>
            <div className={styles.header_inner}>
                <Link to='/'><img src={logo} alt="" /></Link>
                <nav className={styles.nav_links}>
                    <Link ref={ref} className={styles.nav_link} to={`/catalog/assemblies`}>{t('assemblies')}</Link>
                    <Link className={styles.nav_link} to='/catalog/weapon models'>{t('weaponModel')}</Link>
                    <Link className={styles.nav_link} to='/catalog/player models'>{t('playerModel')}</Link>
                    <Link className={styles.nav_link} to='/catalog/maps'>{t('maps')}</Link>
                    <Link className={styles.nav_link} to='/catalog/configs'>{t('configs')}</Link>
                    <Link className={styles.nav_link} to='/catalog/graffiti'>{t('graffiti')}</Link>
                    <Link className={styles.nav_link} to='/catalog/sounds'>{t('sounds')}</Link>
                    <Link className={styles.nav_link} to='/catalog/posts'>{t('posts')}</Link>
                </nav>
                <div className={styles.custom_select} ref={selectRef}>
                    <div className={styles.selected_language} onClick={() => setIsOpenLanguageMenu((prev) => !prev)}>
                        <span>{selectedLanguage.label}</span>
                        <span className={`${styles.arrow} ${isOpenLanguageMenu ? styles.open : ""}`}>
                            <img src={openIcon} alt="" />
                        </span>
                    </div>
                    <ul className={`${styles.language_list} ${isOpenLanguageMenu ? styles.show : ""}`}>
                        {languages.map((language) => (
                            <li
                                key={language.value}
                                onClick={() => handleLanguageChange(language)}
                                className={styles.language_item}
                            >
                                {language.label}
                            </li>
                        ))}
                    </ul>
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
                        <select className={styles.language_phone} onChange={(e) => changeLanguage(e.target.value)}>
                            <option value="ua">ua</option>
                            <option value="ru">ru</option>
                        </select>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
