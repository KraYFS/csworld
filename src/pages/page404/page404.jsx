import { Link } from 'react-router-dom';
import styles from './page404.module.css'

const page404 = () => {
    return (
        <div className={styles.page404}>
            <Link to='/' className={`${styles.link} ${styles.back}`}>Back</Link>
            <span className={styles.text}>404</span>
        </div>
    );
}

export default page404;
