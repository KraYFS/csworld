import Header from "../../components/header/header";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import image from './image.png'
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


const MainPage = () => {
    const [load, setLoad] = useState(true)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const images = [{ id: 1, url: image }, { id: 2, url: image }, { id: 3, url: image }, { id: 4, url: image }, { id: 5, url: image }, { id: 6, url: image }, { id: 7, url: image }]
    const peculiarities = [{ id: 1, text: 'Чистая версия' }, { id: 2, text: 'Русский чат и ник' }, { id: 3, text: 'Для всех версий Windows (от XP до 11)' }, { id: 4, text: 'С игрой по интернету' }, { id: 5, text: 'С умными ботами' }]
    
    const { t, i18n } = useTranslation();

    useEffect(() => {
        fetch(`${__BASE_URL__}/api/posts`)
            .then(response => response.json())
            .then(data => setLoad(data))
    }, [])

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
                                    return (<Peculiarities key={item.id} text={item.text} />)
                                })}
                            </div>
                            <div className={styles.btns}>
                                <DownloadBtn backColor='#6D86FF' text={t('downloadBtn')} />
                                <DownloadBtn backColor='#54AB64' text={t('downloadBtn')} />
                            </div>
                        </div>
                    </div>
                    <Spoiler title={t('systemRequirements')}
                        text={(<span>
                            
                            Минимальные:
                            <br />
                            Операционная система: Windows XP и новее
                            <br />
                            Процессор: 500 MHz
                            <br />
                            Оперативная память: 96 MB
                            <br />
                            Видеокарта: 16 MB
                            <br />
                            Место на жестком диске: 1 GB
                            Рекомендуемые:
                            Операционная система: Windows XP и новее
                            <br />
                            Процессор: 800 MHz
                            <br />
                            Оперативная память: 128 MB
                            <br />
                            Видеокарта: 32 MB+
                            <br />
                            Место на жестком диске: 1 GB
                        </span>)} />
                    <Spoiler title={t('assembly')}
                        text={t('assemblyText')} />
                </section>
            </div>
        </div>
    );
}

export default MainPage;
