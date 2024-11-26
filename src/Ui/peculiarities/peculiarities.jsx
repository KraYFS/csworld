import styles from './peculiarities.module.css'

const Peculiarities = (props) => {
    return (
        <div className={styles.peculiarities}>
            {props.image && <img src={props.image} alt="" />}
            {props.text}
        </div>
    );
}

export default Peculiarities;
