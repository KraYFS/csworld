import styles from './header.module.css';
import logo from "../../assets/icons/header_logo.webp";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import openIcon from "./openIcon.svg";
import uaIcon from "./ua_lang.svg";
import config from "../../assets/icons/menu/config.svg"
import graffiti from "../../assets/icons/menu/graffiti.svg"
import maps from "../../assets/icons/menu/maps.png"
import playerModel from "../../assets/icons/menu/player_models.svg"
import post from "../../assets/icons/menu/post.svg"
import weaponModel from "../../assets/icons/menu/weapon_models.svg"

const languages = [
    { value: "ua", label: "Ua" },
    { value: "ru", label: "Ru" },
];

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastedScrollY] = useState(0);
    const [isOpen, setIsOpen] = useState(true);
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [isOpenLanguageMenu, setIsOpenLanguageMenu] = useState(false);
    const selectRef = useRef(null);
    const name = useParams()

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('selectedLanguage', lng);
    };

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        changeLanguage(language.value);
        setIsOpenLanguageMenu(false);
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            const language = languages.find(lang => lang.value === savedLanguage);
            if (language) {
                setSelectedLanguage(language);
                changeLanguage(savedLanguage);
            }
        }
    }, []);

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

    useEffect(() => {
        setIsOpen((prev) => !prev);
        document.body.style.overflowY = 'auto';
        document.documentElement.style.overflowY = 'auto';
    }, [name])

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
        document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
        document.documentElement.style.overflowY = isOpen ? 'hidden' : 'auto';
    };

    return (
        <header className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}>
            <div className={styles.header_inner}>
                <Link to='/'><img src={logo} alt="" /></Link>
                <nav className={styles.nav_links}>
                    {/* <Link ref={ref} className={styles.nav_link} to={`/catalog/assemblies`}>{t('assemblies')}</Link> */}
                    <Link className={styles.nav_link} to='/catalog/weapon models'><img src={weaponModel} alt="" />{t('weaponModel')}</Link>
                    <Link className={styles.nav_link} to='/catalog/player models'><img src={playerModel} alt="" />{t('playerModel')}</Link>
                    <Link className={styles.nav_link} to='/catalog/maps'><img src={maps} alt="" />{t('maps')}</Link>
                    <Link className={styles.nav_link} to='/catalog/configs'><img src={config} alt="" />{t('configs')}</Link>
                    <Link className={styles.nav_link} to='/catalog/graffiti'><img src={graffiti} alt="" />{t('graffiti')}</Link>
                    {/* <Link className={styles.nav_link} to='/catalog/sounds'>{t('sounds')}</Link> */}
                    <Link className={styles.nav_link} to='/catalog/posts'><img src={post} alt="" />{t('posts')}</Link>
                </nav>
                <div className={styles.custom_select} ref={selectRef}>
                    <div className={styles.selected_language} onClick={() => setIsOpenLanguageMenu((prev) => !prev)}>
                        {selectedLanguage.label === 'Ua' ? (
                            <>
                                <img src={uaIcon} alt="" />
                                <span>{selectedLanguage.label}</span>
                            </>
                        ) : (
                            <span>{selectedLanguage.label}</span>
                        )}
                        <span className={`${styles.arrow} ${isOpenLanguageMenu ? styles.open : ""}`}>
                            <img src={openIcon} alt="" />
                        </span>
                    </div>
                    <ul className={`${styles.language_list} ${isOpenLanguageMenu ? styles.show : ""}`}>
                        {languages.map((language) => (
                            language.label === 'Ua' ? (
                                <li
                                    key={language.value}
                                    onClick={() => handleLanguageChange(language)}
                                    className={styles.language_item}
                                >
                                    <img src={uaIcon} alt="" />
                                    {language.label}
                                </li>
                            ) : (
                                <li
                                    key={language.value}
                                    onClick={() => handleLanguageChange(language)}
                                    className={styles.language_item}
                                >
                                    {language.label}
                                </li>
                            )
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
                        {/* <Link ref={ref} className={styles.nav_link} to={`/catalog/assemblies`}>Зборки кс 1.6</Link> */}
                        <Link className={styles.nav_link} to='/catalog/weapon models'>моделі зброї</Link>
                        <Link className={styles.nav_link} to='/catalog/player models'>моделі гравців</Link>
                        <Link className={styles.nav_link} to='/catalog/maps'>карти</Link>
                        <Link className={styles.nav_link} to='/catalog/configs'>конфіги</Link>
                        <Link className={styles.nav_link} to='/catalog/graffiti'>графіті</Link>
                        {/* <Link className={styles.nav_link} to='/catalog/sounds'>звуки</Link> */}
                        <Link className={styles.nav_link} to='/catalog/posts'>статті</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
