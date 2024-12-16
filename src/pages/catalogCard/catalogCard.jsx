import Header from "../../components/header/header";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import image from './image.png'
import styles from './catalogCard.module.css'
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import React, { useEffect, useState } from "react";
import Loader from "../../Ui/loader/loader";
import SectionTitle from "../../Ui/SectionTitle/sectionTitle";
import SeoText from "../../Ui/seoText/seoText";
import DownloadBtn from "../../Ui/downloadBtn/downloadBtn";
import Peculiarities from "../../Ui/peculiarities/peculiarities";
import Spoiler from "../../Ui/spoiler/spoiler";
import { useParams } from "react-router-dom";
import { __BASE_URL__ } from "../../constants/urls";
import { useTranslation } from 'react-i18next';
import Footer from "../../components/footer/footer";


const CatalogCard = () => {
    const [data, setData] = useState(null)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { id } = useParams()
    const { name } = useParams()
    const { t, i18n } = useTranslation();


    useEffect(() => {
        fetch(`${__BASE_URL__}/api/${name}/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, [id])

    const downloadTorrentFile = (fileName) => {
        const fileUrl = `${__BASE_URL__}/api/download${data.files[1][0]}`;  // Формируем URL для скачивания файла

        // Открываем файл для скачивания
        window.location.href = fileUrl;
    };


    const downloadFile = (fileName) => {
        const fileUrl = `${__BASE_URL__}/api/download${data.files[0][0]}`;  // Формируем URL для скачивания файла

        // Открываем файл для скачивания
        window.location.href = fileUrl;
    };

    const checkParagraph = (text) => {
        return text.split('%$20').map((paragraph, index) => {
            return <React.Fragment key={index}>
                {paragraph}
                <br />
            </React.Fragment>
        })
    }

    if (!data) {
        return (
            <Loader />
        )
    } else {
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
                                    {data.pictures.map(img => {
                                        return (<SwiperSlide><img style={{ width: '500px' }} src={img} alt="" /></SwiperSlide>)
                                    })}
                                </Swiper>
                                <Swiper
                                    modules={[Thumbs, Pagination]}
                                    pagination={{ clickable: true }}
                                    onSwiper={setThumbsSwiper}
                                    slidesPerView={3}
                                    style={{ width: '100%', height: "96px", marginTop: "18px" }}
                                >
                                    {data.pictures.map(img => {
                                        return (<SwiperSlide><img style={{ width: '162px', height: '95px', borderRadius: '5px' }} src={img} alt="" /></SwiperSlide>)
                                    })}
                                </Swiper>
                            </div>
                            <div>
                                <SectionTitle title={i18n.language === 'ua' ? data.titleSecondLang : data.title} />
                                <SeoText maxWidth='1000px' backColor={false} text={i18n.language === 'ua' ? data.descriptionSecondLang : data.description} />
                                <div className={styles.peculiarities}>
                                    {i18n.language === 'ua' ? data.tagsSecondLang.map((text) => {
                                        return (<Peculiarities text={text} />)
                                    }) : data.content.map((text) => {
                                        return (<Peculiarities text={text} />)
                                    })}
                                </div>
                                <div className={styles.btns}>
                                    {name !== 'posts'
                                        ?
                                        <>
                                            <DownloadBtn click={downloadFile} backColor='#6D86FF' text={t('downloadBtn')} />
                                        </>
                                        : null}
                                    {name === 'assemblies' && (
                                        <>
                                            <DownloadBtn click={downloadTorrentFile} backColor='#54AB64' text={t('downloadBtn')} />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        {
                            name === 'assemblies'
                                ? <Spoiler title={t('systemRequirements')} text={checkParagraph(data.systemRequirements)} />
                                : name === 'posts'
                                    ? <Spoiler title="Автор" text={data.author} />
                                    : <Spoiler title={t('howDownload')} text={i18n.language === 'ua' ? checkParagraph(data.systemRequirementsSecondLang) : checkParagraph(data.systemRequirements)} />
                        }
                        {
                            name === 'assemblies'
                                ? null
                                : name === 'posts'
                                    ? <Spoiler post="true" image text={checkParagraph(data.postText)} />
                                    : name === 'maps'
                                        ? <Spoiler title={t('systemRequirements')} text={checkParagraph(data.systemRequirements)} />
                                        : null
                        }
                    </section>
                </div>
                <Footer />
            </div>
        );
    }
}

export default CatalogCard;
