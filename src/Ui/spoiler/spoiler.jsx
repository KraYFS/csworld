import styles from './spoiler.module.css'
import icon from '../../assets/icons/spoiler_icon.svg'
import { useState } from 'react';

const Spoiler = (props) => {
    const [isClicked, setIsClicked] = useState(false)

    return (
        <div className={styles.spoiler}>
            <div onClick={() => {
                !isClicked ? setIsClicked(true) : setIsClicked(false)
            }} className={styles.spoiler_title}>
                <img className={`${styles.spoiler_icon} ${isClicked ? styles.content_open : styles.content_close}`} src={icon} alt="" />
                {props.title}
            </div>
            <div className={`${styles.spoiler_content} ${isClicked ? styles.visible : styles.hidden}`}>
                {props.text}
            </div>
        </div>
    );
}

export default Spoiler;
