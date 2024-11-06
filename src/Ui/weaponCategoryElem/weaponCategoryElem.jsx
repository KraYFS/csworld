import { Link } from 'react-router-dom';
import styles from './weaponCategoryElem.module.css'

const WeaponCategoryElem = (props) => {
    return (
        <Link to={props.link} style={{ fontSize: `${props.fontSize}px`, fontWeight: `${props.fontWeight}`, textTransform: props.textTransform , width: props.width}} className={styles.weaponCategoryElem}>
            {props.img ? <img className={styles.weaponCategoryElemIcon} src={props.img} alt="" /> : ''}
            {props.name}
        </Link>
    );
}

export default WeaponCategoryElem;
