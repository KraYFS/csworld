import styles from './downloadBtn.module.css'

const DownloadBtn = (props) => {
    return (
        <button onClick={props.click} className={styles.btn} style={{backgroundColor: props.backColor}}>
            {props.text}
        </button>
    );
}

export default DownloadBtn;
