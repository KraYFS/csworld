import { useEffect, useState } from 'react';
import styles from './loader.module.css'

const Loader = () => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${styles.loader} ${fadeOut ? styles.fadeOut : ''}`}>
            <div>

            </div>
        </div>
    );
}

export default Loader;
