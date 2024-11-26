import Header from "../../components/header/header";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import cs_slide1 from './cs_slide1.webp'
import cs_slide2 from './cs_slide2.webp'
import cs_slide3 from './cs_slide3.webp'
import cs_slide4 from './cs_slide4.webp'
import cs_slide5 from './cs_slide5.webp'
import styles from './mainPage.module.css'
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { useEffect, useState } from "react";
import Loader from "../../Ui/loader/loader";
import SectionTitle from "../../Ui/SectionTitle/sectionTitle";
import SeoText from "../../Ui/seoText/seoText";
import DownloadBtn from "../../Ui/downloadBtn/downloadBtn";
import Peculiarities from "../../Ui/peculiarities/peculiarities";
import Spoiler from "../../Ui/spoiler/spoiler";
import { __BASE_URL__ } from '../../constants/urls'
import { useTranslation } from 'react-i18next';
import Footer from "../../components/footer/footer";
import ukr from '../../assets/icons/tag/ukraine.svg'
import steam from '../../assets/icons/tag/Steam.svg'
import avatar from '../../assets/icons/tag/avatar.svg'
import windows from '../../assets/icons/tag/Windows.svg'
import antivir from '../../assets/icons/tag/antivir.svg'
import pricel from '../../assets/icons/tag/pricel.svg'
import bots from '../../assets/icons/tag/bots.png'


const MainPage = () => {
    const [load, setLoad] = useState(true)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const images = [{ id: 1, url: cs_slide1 }, { id: 2, url: cs_slide2 }, { id: 3, url: cs_slide3 }, { id: 4, url: cs_slide4 }, { id: 5, url: cs_slide5 }]
    const { t, i18n } = useTranslation();
    const peculiarities = [{ id: 1, img: ukr, text: t('tagsUkrServer') }, { id: 2, text: t('tagsSteam'), img: steam }, { id: 3, text: t('tagsWindows'), img: windows }, { id: 4, text: t('tagsBots'), img: bots }, { id: 5, text: t('tagsAvatar'), img: avatar }]
    

    useEffect(() => {
        fetch(`${__BASE_URL__}/api/posts`)
            .then(response => response.json())
            .then(data => setLoad(data))
    }, [])

    const downloadFile = (fileName) => {
        const fileUrl = `${__BASE_URL__}/api/download/NextClient_CS1.6.exe`;  // Формируем URL для скачивания файла

        // Открываем файл для скачивания
        window.location.href = fileUrl;
    };

    const downloadTorrentFile = (fileName) => {
        const fileUrl = `${__BASE_URL__}/api/download/NextClient_CS1.6.exe.torrent`;  // Формируем URL для скачивания файла

        // Открываем файл для скачивания
        window.location.href = fileUrl;
    };

    if (!load) return <Loader />

    return (
        <div>
            <Header />
            <div className="container">
                <section className="content">
                    <div className={styles.mainPage_inner}>
                        <div className={styles.swiper_gallery}>
                            <Swiper
                                modules={[Thumbs, Navigation]}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                navigation
                                watchSlidesProgress
                                pagination={{ clickable: true }}
                                slidesPerView={1}
                                className={styles.swiper}
                            >
                                {images.map(item => {
                                    return (<SwiperSlide key={item.id}><img style={{ width: '518px' }} src={item.url} alt="" /></SwiperSlide>)
                                })}
                            </Swiper>
                            <Swiper
                                modules={[Thumbs, Pagination]}
                                pagination={{ clickable: true }}
                                onSwiper={setThumbsSwiper}
                                slidesPerView={3}
                                style={{ width: '100%', height: "96px", marginTop: "18px" }}
                            >
                                {images.map(item => {
                                    return (<SwiperSlide key={item.id}><img style={{ width: '162px', height: '95px', borderRadius: '5px' }} src={item.url} alt="" /></SwiperSlide>)
                                })}
                            </Swiper>
                        </div>
                        <div>
                            <SectionTitle title={t('mainPageTitle')} />
                            <SeoText backColor={false} text={t('mainPageSeoText')} />
                            <div className={styles.peculiarities}>
                                {peculiarities.map((item) => {
                                    return (<Peculiarities image={item.img} key={item.id} text={item.text} />)
                                })}
                            </div>
                            <div className={styles.btns}>
                                <DownloadBtn click={downloadFile} backColor='#6D86FF' text={t('downloadBtn')} />
                                <DownloadBtn click={downloadTorrentFile} backColor='#3A824A' text={t('downloadBtn')} />
                            </div>
                        </div>
                    </div>
                    <Spoiler title={t('systemRequirements')}
                        text={(<span>
                            
                            {t('minimal')}
                            <br />
                            {t('opertSystem')}
                            <br />
                            {t('proc')}
                            <br />
                            {t('oper')}
                            <br />
                            {t('video')}
                            <br />
                            {t('hdd')}
                            <br />
                            {t('rek')}
                            <br />
                            {t('rekopertSystem')}
                            <br />
                            {t('rekproc')}
                            <br />
                            {t('rekoper')}
                            <br />
                            {t('rekvideo')}
                            <br />
                            {t('rekhdd')}
                        </span>)} />
                    <Spoiler title={t('assembly')}
                        text={t('assemblyText')} />
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;
