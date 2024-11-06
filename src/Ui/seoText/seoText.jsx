import styles from './seoText.module.css'

const SeoText = (props) => {
    return (
        <div style={{maxWidth: `${props.maxWidth}px`, backgroundColor: `${props.backColor ? '#2163e80f' : ''}`}} className={styles.seoText}>
            {props.text}
        </div>
    );
}

export default SeoText;
