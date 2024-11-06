import styles from './downloadBtn.module.css'

const DownloadBtn = (props) => {
    return (
        <button className={styles.btn} style={{backgroundColor: props.backColor}}>
            {props.text}
        </button>
    );
}

export default DownloadBtn;
