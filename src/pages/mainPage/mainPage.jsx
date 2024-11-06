import Header from "../../components/header/header";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import image from './image.png'
import styles from './mainPage.module.css'
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { useState } from "react";
import Loader from "../../Ui/loader/loader";
import SectionTitle from "../../Ui/SectionTitle/sectionTitle";
import SeoText from "../../Ui/seoText/seoText";
import DownloadBtn from "../../Ui/downloadBtn/downloadBtn";
import Peculiarities from "../../Ui/peculiarities/peculiarities";
import Spoiler from "../../Ui/spoiler/spoiler";

const MainPage = () => {
    const [load, setLoad] = useState(true)
    const [images, setImages] = useState(null)
    const [peculiarities, setPeculiarities] = useState(null)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    setTimeout(() => {
        setImages([{ id: 1, url: image }, { id: 2, url: image }, { id: 3, url: image }, { id: 4, url: image }, { id: 5, url: image }, { id: 6, url: image }, { id: 7, url: image }])
        setPeculiarities([{ id: 1, text: 'Чистая версия' }, { id: 2, text: 'Русский чат и ник' }, { id: 3, text: 'Для всех версий Windows (от XP до 11)' }, { id: 4, text: 'С игрой по интернету' }, { id: 5, text: 'С умными ботами' }])
        setLoad(false)
    }, 50)

    if (load) {
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
                                    {images.map(item => {
                                        return (<SwiperSlide key={item.id}><img style={{width: '518px'}} src={item.url} alt="" /></SwiperSlide>)
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
                                <SectionTitle title='Скачать КС 1.6 - Counter-Strike 1.6 бесплатно' />
                                <SeoText backColor={false} text='Скачать КС 1.6 на русском языке можно бесплатно и безопасно с нашего сайта. CS 1.6 скачивается максимальной быстро с помощью прямой ссылки, торрента либо Яндекс Диска. Несмотря на то, что со времен первой Counter Strike 1.6 прошло более 20 лет, легендарная классика до сих пор актуальна. Перед вами находится полностью чистая версия игры, с оригинальными моделями игровых персонажей и вооружения. Сборка находится под современной защитой от вредоносных файлов и любого типа рекламы, в том числе текстовой. Поиск включает огромное количество серверов самых разных модификаций, а при выключенном интернете можно потренироваться с ботами. Поторопитесь скачать легендарную Контр Страйк 1.6 любым удобным способом, после чего дождитесь установки и приступайте к сражениям. Русифицированная версия клиента является самой популярной, поэтому она находится на главной странице, при этом у нас доступно много других сборок.' />
                                <div className={styles.peculiarities}>
                                    {peculiarities.map((item) => {
                                        return (<Peculiarities key={item.id} text={item.text} />)
                                    })}
                                </div>
                                <div className={styles.btns}>
                                    <DownloadBtn backColor='#6D86FF' text='Скачать' />
                                    <DownloadBtn backColor='#54AB64' text='Скачать' />
                                </div>
                            </div>
                        </div>
                        <Spoiler title='Системные требования'
                            text='
                        Минимальные:
                        Операционная система Windows XP и новее
                        Процессор 500 MHz
                        Оперативная память 96 MB
                        Видеокарта 16 MB
                        Место на жестком диск 1 GB
                        Рекомендуемые:
                        Операционная система Windows XP и новее
                        Процессор 800 MHz
                        Оперативная память 128 MB
                        Видеокарта 32 MB+
                        Место на жестком диск 1 GB'/>
                        <Spoiler title='Особенности'
                            text='
                        Данная сборка кс 1.6 легко открывается даже на слабых устройствах. Системные требования не отличаются от стандартной контры. Поэтому повеселиться на серверах вместе с друзьями смогут даже обладатели компьютеров на базе Windows XP или Vista. Есть дополнительный контент, который не нагружает систему. Также разработчики убрали некоторые данные. Загруженная контра запускается пустой, без конфигов, что тоже позволяет минимизировать нагрузку.Патч GSClient дает гарантии отсутствия вирусов и различных ошибок. Вы сможете заходить на сервера и будете иметь минимальный пинг. Последнее обновление устраняет все неполадки и делает контру лучше.Также стабильности игре предает эмулятор Стим. Любой желающий сможет зайти на официальные адреса и играть с теми, кто купил шутер за деньги. Список доступных адресов сильно увеличивается, как и количество адекватных людей.'/>
                    </section>
                </div>
            </div>
        );
    }
}

export default MainPage;
