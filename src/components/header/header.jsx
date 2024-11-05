import styles from './header.module.css'
import logo from "../../assets/icons/header_logo.png"
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.header_inner}>
                    <img src={logo} alt="" />
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
            </div>
        </header>
    );
}

export default Header;
