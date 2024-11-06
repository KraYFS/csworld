import styles from './sectionTitle.module.css'

const SectionTitle = (props) => {
    return (
        <h1 style={{marginTop: `${props.marginTop}px`}} className={styles.title}>
            {props.title}
        </h1>
    );
}

export default SectionTitle;
