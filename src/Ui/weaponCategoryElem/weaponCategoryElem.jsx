import { Link } from 'react-router-dom';
import styles from './weaponCategoryElem.module.css'

const WeaponCategoryElem = (props) => {
    return (
        <div onClick={props.click} to={props.link} style={{ fontSize: `${props.fontSize}px`, fontWeight: `${props.fontWeight}`, textTransform: props.textTransform , width: props.width}} className={styles.weaponCategoryElem}>
            {props.img ? <img className={styles.weaponCategoryElemIcon} src={props.img} alt="" /> : ''}
            {props.name}
        </div>
    );
}

export default WeaponCategoryElem;
