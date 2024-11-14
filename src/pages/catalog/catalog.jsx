// import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import SectionTitle from '../../Ui/SectionTitle/sectionTitle';
import SeoText from '../../Ui/seoText/seoText';
import WeaponCategoryElem from '../../Ui/weaponCategoryElem/weaponCategoryElem';
import styles from './catalog.module.css'
import img from '../../assets/icons/weaponIconAwp.png'
import WeaponCategoryCard from '../../Ui/weaponCategoryCard/weaponCategoryCard';
import { useEffect, useState } from 'react';
import Loader from '../../Ui/loader/loader';
import { __BASE_URL__ } from '../../constants/urls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Catalog = () => {
    // const [data, setData] = useState(null)
    // const { name } = useParams()

    // useEffect(() => {
    //     fetch(`${__BASE_URL__}/api/${name}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setData(data);
    //         });
    // }, [name])

    const { t, i18n } = useTranslation();

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
                        <div className={styles.weapon_category}>
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
                            <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                            <WeaponCategoryElem fontSize='36' textTransform='uppercase' fontWeight='500' name='awp' img={img} />
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {/* {data.map(item => {
                                return <WeaponCategoryCard link={`catalog card/weapon models/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures[0]} />
                            })} */}
                        </div>
                    </section>
                </div>
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
                                return <WeaponCategoryCard link={`catalog card/player models/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures} />
                            }): data.map(item => {
                                return <WeaponCategoryCard link={`catalog card/player models/${item._id}`} key={item._id} content={item.tagsSecondLang} title={item.titleSecondLang} img={item.pictures} />
                            })}
                        </div>
                    </section>
                </div>
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
                                return <WeaponCategoryCard link={`catalog card/posts/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures} />
                            }): data.map(item => {
                                return <WeaponCategoryCard link={`catalog card/posts/${item._id}`} key={item._id} content={item.tagsSecondLang} title={item.titleSecondLang} img={item.pictures} />
                            })}
                        </div>
                    </section>
                </div>
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
                                return <WeaponCategoryCard link={`catalog card/sounds/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures} />
                            })}
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default Catalog;
