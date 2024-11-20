import React from 'react';
import styles from './footer.module.css'

const Footer = () => {
    return (
        <footer>
            <div className={styles.footer_inner}>
                <div className={styles.footer_text}>
                    &#169;2022-2024 &#171;cs-world.com.ua&#187;-Все дистрибутивы Counter Strike даны на сайте для знакомства
                </div>
                <nav className={styles.footer_nav_links}>
                    <a className={styles.footer_nav_link} href="">Пользовательское соглашение</a>
                    <a className={styles.footer_nav_link} href="">Политика конфидецальности</a>
                </nav>
                <div className={styles.contact}>
                    <span className={styles.contact_title}>
                        Обратная связь
                    </span>
                    <span className=''>
                        admin@cs-world.com.ua
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
