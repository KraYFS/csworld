import styles from './seoText.module.css'

const SeoText = (props) => {
    return (
        <div style={{maxWidth: `${props.maxWidth}px`}} className={styles.seoText}>
            {props.text}
        </div>
    );
}

export default SeoText;
