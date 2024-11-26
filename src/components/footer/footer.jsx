import React from 'react';
import styles from './footer.module.css'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t, i18n } = useTranslation();

    return (
        <footer>
            <div className={styles.footer_inner}>
                <div className={styles.footer_text}>
                   {t('footertext')}
                </div>
                <nav className={styles.footer_nav_links}>
                    <Link to='/information page/User agreement' className={styles.footer_nav_link} href="">{t('footerLinkUser')}</Link>
                    <Link to='/information page/Privacy Policy' className={styles.footer_nav_link} href="">{t('footerLinkPrivacy')}</Link>
                </nav>
                <div className={styles.contact}>
                    <span className={styles.contact_title}>
                        {t('footerFeedback')}
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
