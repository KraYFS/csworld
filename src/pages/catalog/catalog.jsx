// import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import SectionTitle from '../../Ui/SectionTitle/sectionTitle';
import SeoText from '../../Ui/seoText/seoText';
import WeaponCategoryElem from '../../Ui/weaponCategoryElem/weaponCategoryElem';
import styles from './catalog.module.css'
// import awp from '../../assets/icons/weaponIconAwp.png'
// import img from '../../assets/icons/weaponIconAwp.png'
// import ak from '../../assets/icons/ak47.png'
// import m4 from '../../assets/icons/m4.png'
// import glock from '../../assets/icons/glock.png'
// import galil from '../../assets/icons/galil.png'
// import famas from '../../assets/icons/famas.png'
// import p250 from '../../assets/icons/p250.png'
// import knife from '../../assets/icons/knife.png'
// import usps from '../../assets/icons/usps.png'
// import berettas from '../../assets/icons/berettas.png'
// import fiveSeven from '../../assets/icons/fiveSeven.png'
// import deagle from '../../assets/icons/deagle.png'
import WeaponCategoryCard from '../../Ui/weaponCategoryCard/weaponCategoryCard';
import { useEffect, useState } from 'react';
import Loader from '../../Ui/loader/loader';
import { __BASE_URL__ } from '../../constants/urls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../../components/footer/footer';

const Catalog = () => {
    const [data, setData] = useState(null)
    const { name } = useParams()

    useEffect(() => {
        fetch(`${__BASE_URL__}/api/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, [name])

    const { t, i18n } = useTranslation();

    data[0].content
    

    if (name === 'weapon models') {
        if (!data) return <Loader />

        return (
            <div>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('weaponModelTitle')} />
                        <SeoText backColor={true} text={t('weaponModelSeoText')} />
                        <SectionTitle marginTop='40' title={t('sectionTitle')} />
                        {/* <div className={styles.weapon_category}>
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='awp' img={awp} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='ak-47' img={ak} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='M4A1' img={m4} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='glock' img={glock} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='galil' img={galil} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='famas' img={famas} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='p250' img={p250} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='knife' img={knife} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='USP-S' img={usps} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='dual berettas' img={berettas} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='Five-seven' img={fiveSeven} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='Desert-eagle' img={deagle} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                            <WeaponCategoryElem fontSize='28' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        </div> */}
                        <div className={styles.WeaponCategoryCards}>
                            {data.map(item => {
                                return <WeaponCategoryCard link={`catalog card/weapon models/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures[0]} />
                            })}
                        </div>
                    </section>
                </div>
                <Footer />

            </div>
        )
    } else if (name === 'assemblies') {
        if (!data) return <Loader />

        return (
            <div>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('assembliesTitle')} />
                        <SeoText backColor={true} text={t('assembliesSeoText')} />
                        <SectionTitle marginTop='40' title={t('sectionAssembliesTitle')} />
                        <div className={styles.weapon_category}>
                            {/* <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} /> */}
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {data.map(item => {
                                return <WeaponCategoryCard link={`catalog card/assemblies/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures[0]} />
                            })}
                        </div>
                    </section>
                </div>
                <Footer />

            </div>
        )
    } else if (name === 'player models') {
        if (!data) return <Loader />

        return (
            <div>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('playerModelTitle')} />
                        <SeoText backColor={true} text={t('playerModelSeoText')} />
                        <SectionTitle marginTop='40' title={t('sectionPlayerModelTitle')} />
                        <div className={styles.weapon_category}>
                            {/* <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} /> */}
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {i18n.language === 'ru' ? data.map(item => {
                                return <WeaponCategoryCard link={`catalog card/player models/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures[0]} />
                            }) : data.map(item => {
                                return <WeaponCategoryCard link={`catalog card/player models/${item._id}`} key={item._id} content={item.tagsSecondLang} title={item.titleSecondLang} img={item.pictures[0]} />
                            })}
                        </div>
                    </section>
                </div>
                <Footer />

            </div>
        )
    } else if (name === 'maps') {
        if (!data) return <Loader />

        return (
            <div>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('mapsTitle')} />
                        <SeoText backColor={true} text={t('mapsSeoText')} />
                        <SectionTitle marginTop='40' title={t('sectionMapsTitle')} />
                        <div className={styles.weapon_category}>
                            {/* <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} /> */}
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {data.map(item => {
                                return <WeaponCategoryCard link={`catalog card/maps/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures[0]} />
                            })}
                        </div>
                    </section>
                </div>
                <Footer />

            </div>
        )
    } else if (name === 'configs') {
        if (!data) return <Loader />

        return (
            <div>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('configsTitle')} />
                        <SeoText backColor={true} text={t('configsTitleSeoText')} />
                        <SectionTitle marginTop='40' title={t('sectionConfigsTitleTitle')} />
                        <div className={styles.weapon_category}>
                            {/* <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} /> */}
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {data.map(item => {
                                return <WeaponCategoryCard link={`catalog card/configs/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures[0]} />
                            })}
                        </div>
                    </section>
                </div>
                <Footer />

            </div>
        )
    } else if (name === 'graffiti') {
        if (!data) return <Loader />

        return (
            <div>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('graffitiTitle')} />
                        <SeoText backColor={true} text={t('graffitiTitleSeoText')} />
                        <SectionTitle marginTop='40' title={t('sectionGraffitiTitleTitle')} />
                        <div className={styles.weapon_category}>
                            {/* <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} /> */}
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {data.map(item => {
                                return <WeaponCategoryCard link={`catalog card/graffiti/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures[0]} />
                            })}
                        </div>
                    </section>
                </div>
                <Footer />

            </div>
        )
    } else if (name === 'posts') {
        if (!data) return <Loader />

        return (
            <div>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('postTitle')} />
                        <SeoText backColor={true} text={t('postTitleSeoText')} />
                        <SectionTitle marginTop='40' title={t('sectionPostTitleTitle')} />
                        <div className={styles.weapon_category}>
                            {/* <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} /> */}
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {i18n.language === 'ru' ? data.map(item => {
                                return <WeaponCategoryCard link={`catalog card/posts/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures[0]} />
                            }) : data.map(item => {
                                return <WeaponCategoryCard link={`catalog card/posts/${item._id}`} key={item._id} content={item.tagsSecondLang} title={item.titleSecondLang} img={item.pictures[0]} />
                            })}
                        </div>
                    </section>
                </div>
                <Footer />

            </div>
        )
    } else if (name === 'sounds') {
        if (!data) return <Loader />

        return (
            <div>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('soundsTitle')} />
                        <SeoText backColor={true} text={t('soundsTitleSeoText')} />
                        <SectionTitle marginTop='40' title={t('sectionSoundsTitleTitle')} />
                        <div className={styles.weapon_category}>
                            {/* <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} /> */}
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {data.map(item => {
                                return <WeaponCategoryCard link={`catalog card/sounds/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures[0]} />
                            })}
                        </div>
                    </section>
                </div>
                <Footer />

            </div>
        )
    }
}

export default Catalog;
