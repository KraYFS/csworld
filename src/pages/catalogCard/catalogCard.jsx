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

const CatalogCard = () => {
    const [data, setData] = useState(null)
    // const [images, setImages] = useState(null)
    // const [peculiarities, setPeculiarities] = useState(null)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { id } = useParams()

    // setTimeout(() => {
    //     setImages([{ id: 1, url: image }, { id: 2, url: image }, { id: 3, url: image }, { id: 4, url: image }, { id: 5, url: image }, { id: 6, url: image }, { id: 7, url: image }])
    // setPeculiarities([{ id: 1, text: 'Чистая версия' }, { id: 2, text: 'Русский чат и ник' }, { id: 3, text: 'Для всех версий Windows (от XP до 11)' }, { id: 4, text: 'С игрой по интернету' }, { id: 5, text: 'С умными ботами' }])
    //     setLoad(false)
    // }, 0)

    useEffect(() => {
        fetch(`${__BASE_URL__}/api/assemblies/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, [id])

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
                                    {/* {data.pictures.map(item => console.log(item))} */}
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
                                <SeoText backColor={false} text={data.description} />
                                <div className={styles.peculiarities}>
                                    {data.content.map((text) => {
                                        return (<Peculiarities text={text} />)
                                    })}
                                </div>
                                <div className={styles.btns}>
                                    <DownloadBtn backColor='#6D86FF' text='Скачать' />
                                    <DownloadBtn backColor='#54AB64' text='Скачать' />
                                </div>
                            </div>
                        </div>
                        <Spoiler title='Системные требования'
                            text={data.systemRequirements} />
                        <Spoiler title='Особенности'
                            text={data.assemblyFeatures} />
                    </section>
                </div>
            </div>
        );
    }
}

export default CatalogCard;
