import Header from "../../components/header/header";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import image from './image.png'
import styles from './catalogCard.module.css'
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { useEffect, useState } from "react";
import Loader from "../../Ui/loader/loader";
import SectionTitle from "../../Ui/SectionTitle/sectionTitle";
import SeoText from "../../Ui/seoText/seoText";
import DownloadBtn from "../../Ui/downloadBtn/downloadBtn";
import Peculiarities from "../../Ui/peculiarities/peculiarities";
import Spoiler from "../../Ui/spoiler/spoiler";
import { useParams } from "react-router-dom";
import { __BASE_URL__ } from "../../constants/urls";

const CatalogCard = () => {
    const [data, setData] = useState(null)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { id } = useParams()
    const { name } = useParams()

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
                                        return (<SwiperSlide><img style={{ width: '518px' }} src={img} alt="" /></SwiperSlide>)
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
                                <SectionTitle title={data.title} />
                                <SeoText maxWidth='1000px' backColor={false} text={data.description} />
                                <div className={styles.peculiarities}>
                                    {data.content.map((text) => {
                                        return (<Peculiarities text={text} />)
                                    })}
                                </div>
                                {name !== 'posts'
                                    ? <div className={styles.btns}>
                                        <DownloadBtn click={downloadFile} backColor='#6D86FF' text='Скачать' />
                                        <DownloadBtn click={downloadTorrentFile} backColor='#54AB64' text='Скачать' />
                                    </div> : null}
                            </div>
                        </div>
                        {
                            name === 'assemblies' ? <Spoiler title='Системные требования' text={data.systemRequirements} /> : name === 'posts' ? <Spoiler title='Автор' text={data.systemRequirements} /> : <Spoiler title='как установить?' text={data.systemRequirements} />
                        }
                        {
                            name === 'assemblies' ? <Spoiler title='Особенности' text={data.assemblyFeatures} /> : name === 'posts' ? <Spoiler post='true' text={data.systemRequirements} /> : name === 'maps' ? < Spoiler title='Особености' text={data.systemRequirements} /> : < Spoiler title='Анимация' text={data.systemRequirements} />
                        }
                    </section>
                </div>
            </div>
        );
    }
}

export default CatalogCard;
