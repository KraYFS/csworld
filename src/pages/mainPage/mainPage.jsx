import Header from "../../components/header/header";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import image from './image.png'
import styles from './mainPage.module.css'
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import Loader from "../../Ui/loader/loader";
import SectionTitle from "../../Ui/SectionTitle/sectionTitle";
import SeoText from "../../Ui/seoText/seoText";
import DownloadBtn from "../../Ui/downloadBtn/downloadBtn";

const MainPage = () => {
    const [load, setLoad] = useState(true)
    const [data, setData] = useState(null)

    setTimeout(() => {
        setData([{ id: 1, url: image }, { id: 2, url: image }])
        setLoad(false)
    }, 1500)

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
                            <Swiper
                                modules={[Pagination, Navigation]}
                                navigation
                                pagination={{ clickable: true }}
                                slidesPerView={1}
                                className={styles.swiper}>
                                {data.map(item => {
                                    return (<SwiperSlide key={item.id}><img src={item.url} alt="" /></SwiperSlide>)
                                })}
                            </Swiper>
                            <div>
                                <SectionTitle title='Скачать КС 1.6 - Counter-Strike 1.6 бесплатно' />
                                <SeoText maxWidth='850' text='Скачать КС 1.6 на русском языке можно бесплатно и безопасно с нашего сайта. CS 1.6 скачивается максимальной быстро с помощью прямой ссылки, торрента либо Яндекс Диска. Несмотря на то, что со времен первой Counter Strike 1.6 прошло более 20 лет, легендарная классика до сих пор актуальна. Перед вами находится полностью чистая версия игры, с оригинальными моделями игровых персонажей и вооружения. Сборка находится под современной защитой от вредоносных файлов и любого типа рекламы, в том числе текстовой. Поиск включает огромное количество серверов самых разных модификаций, а при выключенном интернете можно потренироваться с ботами. Поторопитесь скачать легендарную Контр Страйк 1.6 любым удобным способом, после чего дождитесь установки и приступайте к сражениям. Русифицированная версия клиента является самой популярной, поэтому она находится на главной странице, при этом у нас доступно много других сборок.' />
                                <div className={styles.btns}>
                                    <DownloadBtn backColor='#6D86FF' text='Скачать'/>
                                    <DownloadBtn backColor='#54AB64' text='Скачать'/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default MainPage;
