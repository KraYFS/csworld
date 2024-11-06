import { Link } from 'react-router-dom';
import styles from './weaponCategoryCard.module.css'
import img from './img.png'
import WeaponCategoryElem from '../weaponCategoryElem/weaponCategoryElem';

const WeaponCategoryCard = (props) => {
    return (
        <Link to={`/${props.link}`} className={styles.weaponCategoryCard}>
            <img style={{ width: '335px' }} src={img} alt="" />
            <h2 className={styles.card_title}>{props.title}</h2>
            <div className={styles.filter}>
                <WeaponCategoryElem fontSize='16px' width='48%' name='всё для кс 1.6'/>
                <WeaponCategoryElem fontSize='16px' width='48%' name='всё для кс 1.6'/>
                <WeaponCategoryElem fontSize='16px' width='48%' name='всё для кс 1.6'/>
                <WeaponCategoryElem fontSize='16px' width='48%' name='модели оружия скины на оружие'/>
                <WeaponCategoryElem fontSize='16px' width='48%' name='модели оружия скины на оружие'/>
            </div>
        </Link>
    );
}

export default WeaponCategoryCard;
