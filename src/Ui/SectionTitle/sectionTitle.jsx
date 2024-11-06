import styles from './sectionTitle.module.css'

const SectionTitle = (props) => {
    return (
        <h1 className={styles.title}>
            {props.title}
        </h1>
    );
}

export default SectionTitle;
