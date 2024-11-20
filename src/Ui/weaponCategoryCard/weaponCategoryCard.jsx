import { Link } from 'react-router-dom';
import styles from './weaponCategoryCard.module.css'
import WeaponCategoryElem from '../weaponCategoryElem/weaponCategoryElem';

const WeaponCategoryCard = (props) => {
    if (props.edit) {
        return (
            <div className={styles.weaponCategoryCard}>
                <img style={{ width: '335px', borderRadius: '5px' }} src={props.img} alt="" />
                <h2 className={styles.card_title}>{props.title}</h2>
                <div className={styles.filter}>
                    {props.content ? props.content.map((item) => {
                        return <WeaponCategoryElem fontSize='16px' width='48%' name={item} />
                    }) : <div style={{ width: '100%', height: '100%', color: '#fff' }}>Картинки</div>}
                </div>
            </div>
        )
    }
    return (
        <Link to={`/${props.link}`} className={styles.weaponCategoryCard}>
            <img style={{ width: '335px', height: '190px', borderRadius: '5px' }} src={props.img} alt="" />
            <h2 className={styles.card_title}>{props.title}</h2>
            <div className={styles.filter}>
                {props.content ? props.content.map((item) => {
                    return <WeaponCategoryElem fontSize='16px' width='48%' name={item} />
                }) : <div style={{ width: '100%', height: '100%', color: '#fff' }}>Картинки</div>}
            </div>
        </Link>
    );
}

export default WeaponCategoryCard;
