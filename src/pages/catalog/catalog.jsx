// import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import SectionTitle from '../../Ui/SectionTitle/sectionTitle';
import SeoText from '../../Ui/seoText/seoText';
import WeaponCategoryElem from '../../Ui/weaponCategoryElem/weaponCategoryElem';
import styles from './catalog.module.css'
import awp from '../../assets/icons/categoryIcon/awp.png'
import img from '../../assets/icons/categoryIcon/awp.png'
import ak from '../../assets/icons/categoryIcon/ak-47.png'
import m4 from '../../assets/icons/categoryIcon/m4a1.png'
import glock from '../../assets/icons/categoryIcon/glock.png'
import galil from '../../assets/icons/categoryIcon/galil.png'
import famas from '../../assets/icons/categoryIcon/famas.png'
import p250 from '../../assets/icons/categoryIcon/p228.png'
import knife from '../../assets/icons/categoryIcon/knives.png'
import usps from '../../assets/icons/categoryIcon/usp.png'
import berettas from '../../assets/icons/categoryIcon/dual-elites.png'
import fiveSeven from '../../assets/icons/categoryIcon/five-seven.png'
import deagle from '../../assets/icons/categoryIcon/deagle.png'
import xm1014 from '../../assets/icons/categoryIcon/xm1014.png'
import mac10 from '../../assets/icons/categoryIcon/mac-10.png'
import tmp from '../../assets/icons/categoryIcon/tmp.png'
import mp5 from '../../assets/icons/categoryIcon/mp5.png'
import upm45 from '../../assets/icons/categoryIcon/ump-45.png'
import p90 from '../../assets/icons/categoryIcon/p90.png'
import aug from '../../assets/icons/categoryIcon/aug.png'
import sg552 from '../../assets/icons/categoryIcon/sg-552.png'
import scout from '../../assets/icons/categoryIcon/scout.png'
import sg550 from '../../assets/icons/categoryIcon/sg-550.png'
import g3sg1 from '../../assets/icons/categoryIcon/g3sg1.png'
import m249 from '../../assets/icons/categoryIcon/m249.png'
import grenades from '../../assets/icons/categoryIcon/grenades.png'
import c4 from '../../assets/icons/categoryIcon/bomb-c4.png'
import shield from '../../assets/icons/categoryIcon/shields.png'
import backpack from '../../assets/icons/categoryIcon/backpacks.png'
import counterterrorists from '../../assets/icons/categoryIcon/counterterrorists.webp'
import terrorists from '../../assets/icons/categoryIcon/terrorists.webp'
import packs from '../../assets/icons/categoryIcon/packs.webp'
import girls from '../../assets/icons/categoryIcon/girls.webp'
import real from '../../assets/icons/categoryIcon/real.webp'
import cso from '../../assets/icons/categoryIcon/cso.webp'
import anime from '../../assets/icons/categoryIcon/anime.webp'
import de from '../../assets/icons/categoryIcon/de.webp'
import cs from '../../assets/icons/categoryIcon/cs.webp'
import awpmaps from '../../assets/icons/categoryIcon/awpmaps.webp'
import aim from '../../assets/icons/categoryIcon/aim.webp'
import fymaps from '../../assets/icons/categoryIcon/fymaps.webp'
import csgomaps from '../../assets/icons/categoryIcon/csgomaps.webp'
import ggmaps from '../../assets/icons/categoryIcon/ggmaps.webp'
import deathrunmaps from '../../assets/icons/categoryIcon/deathrunmaps.webp'
import grenademaps from '../../assets/icons/categoryIcon/grenademaps.webp'
import hnsmaps from '../../assets/icons/categoryIcon/hnsmaps.webp'
import jailmaps from '../../assets/icons/categoryIcon/jailmaps.webp'
import jumpingmaps from '../../assets/icons/categoryIcon/jumpingmaps.webp'
import knifemaps from '../../assets/icons/categoryIcon/knifemaps.webp'
import surfmaps from '../../assets/icons/categoryIcon/surfmaps.webp'
import zombiemaps from '../../assets/icons/categoryIcon/zombiemaps.webp'
import night from '../../assets/icons/categoryIcon/night.webp'
import winter from '../../assets/icons/categoryIcon/winter.webp'
import progamers from '../../assets/icons/categoryIcon/progamers.webp'
import youtubers from '../../assets/icons/categoryIcon/youtubers.webp'
import animelogo from '../../assets/icons/categoryIcon/animelogo.webp'
import csgologo from '../../assets/icons/categoryIcon/csgologo.webp'
import cybersports from '../../assets/icons/categoryIcon/cybersports.webp'
import girlslogo from '../../assets/icons/categoryIcon/girlslogo.webp'
import monochrome from '../../assets/icons/categoryIcon/monochrome.webp'
import textlogo from '../../assets/icons/categoryIcon/textlogo.webp'
import WeaponCategoryCard from '../../Ui/weaponCategoryCard/weaponCategoryCard';
import { useEffect, useState } from 'react';
import Loader from '../../Ui/loader/loader';
import { __BASE_URL__ } from '../../constants/urls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';

const Catalog = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { name } = useParams();

    useEffect(() => {
        fetch(`${__BASE_URL__}/api/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setFilteredData(data)
                setIsLoading(false)
            });
    }, [name])

    const { t, i18n } = useTranslation();

    const findCategoryItem = (name, data) => {
        setIsLoading(true)
        if (name) {
            let filteredItems = data.filter(item => {
                return item.content.some(tag => name.toLowerCase() === tag.toLowerCase())
            })
            setFilteredData(filteredItems)
            setIsLoading(false);
        } else {
            setFilteredData(data)
            setIsLoading(false);
        }
    }

    if (name === 'weapon models') {
        if (!data) return <Loader />

        return (
            <div>
                <Helmet>
                    <meta name="description" content={t('weaponModelMetaDesc')} />
                </Helmet>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('weaponModelTitle')} />
                        <SeoText backColor={true} text={t('weaponModelSeoText')} />
                        <SectionTitle marginTop='40' title={t('sectionTitle')} />
                        <div className={styles.weapon_category}>
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('awp', data)} textTransform='uppercase' fontWeight='500' name='awp' img={awp} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('ak-47', data)} textTransform='uppercase' fontWeight='500' name='Калаш' img={ak} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('M4A1', data)} textTransform='uppercase' fontWeight='500' name='M4A1' img={m4} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('glock', data)} textTransform='uppercase' fontWeight='500' name='glock' img={glock} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('galil', data)} textTransform='uppercase' fontWeight='500' name='galil' img={galil} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('famas', data)} textTransform='uppercase' fontWeight='500' name='famas' img={famas} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('p228', data)} textTransform='uppercase' fontWeight='500' name='p228' img={p250} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('knife', data)} textTransform='uppercase' fontWeight='500' name='knife' img={knife} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('ups', data)} textTransform='uppercase' fontWeight='500' name='USP-S' img={usps} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('dual berettas', data)} textTransform='uppercase' fontWeight='500' name='dual berettas' img={berettas} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('five-seven', data)} textTransform='uppercase' fontWeight='500' name='Five-seven' img={fiveSeven} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('desert-eagle', data)} textTransform='uppercase' fontWeight='500' name='Desert-eagle' img={deagle} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('beneli', data)} textTransform='uppercase' fontWeight='500' name='Beneli m3' img={xm1014} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('xm1014', data)} textTransform='uppercase' fontWeight='500' name='xm1014' img={xm1014} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('mac-10', data)} textTransform='uppercase' fontWeight='500' name='mac-10' img={mac10} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('tmp', data)} textTransform='uppercase' fontWeight='500' name='tmp' img={tmp} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('mp5', data)} textTransform='uppercase' fontWeight='500' name='mp5' img={mp5} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('ump-45', data)} textTransform='uppercase' fontWeight='500' name='ump-45' img={upm45} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('p90', data)} textTransform='uppercase' fontWeight='500' name='p90' img={p90} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('aug', data)} textTransform='uppercase' fontWeight='500' name='aug' img={aug} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('sg-552', data)} textTransform='uppercase' fontWeight='500' name='sg-552' img={sg552} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('scout', data)} textTransform='uppercase' fontWeight='500' name='scout' img={scout} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('sg-550', data)} textTransform='uppercase' fontWeight='500' name='sg-550' img={sg550} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('g3sg1', data)} textTransform='uppercase' fontWeight='500' name='g3sg1' img={g3sg1} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('m249', data)} textTransform='uppercase' fontWeight='500' name='m249' img={m249} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('grenade', data)} textTransform='uppercase' fontWeight='500' name='Grenades' img={grenades} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('c4', data)} textTransform='uppercase' fontWeight='500' name='c4' img={c4} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('shield', data)} textTransform='uppercase' fontWeight='500' name='Shields' img={shield} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('backpack', data)} textTransform='uppercase' fontWeight='500' name='Ранець' img={backpack} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('', data)} textTransform='uppercase' fontWeight='500' name={t('category')} />
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {[...filteredData].reverse().map(item => (
                                <WeaponCategoryCard
                                    link={`catalog card/weapon models/${item._id}`}
                                    key={item._id}
                                    content={i18n.language === 'ru' ? item.content : item.tagsSecondLang}
                                    title={i18n.language === 'ru' ? item.title : item.titleSecondLang}
                                    img={item.pictures[0]}
                                />
                            ))}
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
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('counterterrorists', data)} textTransform='uppercase' fontWeight='500' name='counterterrorists' img={counterterrorists} />
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {[...filteredData].reverse().map(item => (
                                <WeaponCategoryCard
                                    link={`catalog card/assemblies/${item._id}`}
                                    key={item._id}
                                    content={i18n.language === 'ru' ? item.content : item.tagsSecondLang}
                                    title={i18n.language === 'ru' ? item.title : item.titleSecondLang}
                                    img={item.pictures[0]}
                                />
                            ))}
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
                <Helmet>
                    <meta name="description" content={t('playerModelMetaDesc')} />
                </Helmet>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('playerModelTitle')} />
                        <SeoText backColor={true} text={t('playerModelSeoText')} />
                        <SectionTitle marginTop='40' title={t('sectionPlayerModelTitle')} />
                        <div className={styles.weapon_category}>
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('counterterrorists', data)} textTransform='uppercase' fontWeight='500' name='counterterrorists' img={counterterrorists} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('terrorists', data)} textTransform='uppercase' fontWeight='500' name='terrorists' img={terrorists} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('packs', data)} textTransform='uppercase' fontWeight='500' name='packs' img={packs} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('Женщина', data)} textTransform='uppercase' fontWeight='500' name={`${t('grirlsTag')}`} img={girls} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('real', data)} textTransform='uppercase' fontWeight='500' name='real' img={real} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('cso', data)} textTransform='uppercase' fontWeight='500' name='cso' img={cso} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('anime', data)} textTransform='uppercase' fontWeight='500' name='anime' img={anime} />
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {[...filteredData].reverse().map(item => (
                                <WeaponCategoryCard
                                    link={`catalog card/player models/${item._id}`}
                                    key={item._id}
                                    content={i18n.language === 'ru' ? item.content : item.tagsSecondLang}
                                    title={i18n.language === 'ru' ? item.title : item.titleSecondLang}
                                    img={item.pictures[0]}
                                />
                            ))}
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
                <Helmet>
                    <meta name="description" content={t('mapsMetaDesc')} />
                </Helmet>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('mapsTitle')} />
                        <SeoText backColor={true} text={t('mapsSeoText')} />
                        <SectionTitle marginTop='40' title={t('sectionMapsTitle')} />
                        <div className={styles.weapon_category}>
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('de', data)} textTransform='uppercase' fontWeight='500' name='de' img={de} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('cs', data)} textTransform='uppercase' fontWeight='500' name='cs' img={cs} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('awpmaps', data)} textTransform='uppercase' fontWeight='500' name='awpmaps' img={awpmaps} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('aim', data)} textTransform='uppercase' fontWeight='500' name='aim' img={aim} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('fymaps', data)} textTransform='uppercase' fontWeight='500' name='fymaps' img={fymaps} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('csgomaps', data)} textTransform='uppercase' fontWeight='500' name='csgomaps' img={csgomaps} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('ggmaps', data)} textTransform='uppercase' fontWeight='500' name='ggmaps' img={ggmaps} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('deathrunmaps', data)} textTransform='uppercase' fontWeight='500' name='deathrunmaps' img={deathrunmaps} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('grenademaps', data)} textTransform='uppercase' fontWeight='500' name='grenademaps' img={grenademaps} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('hnsmaps', data)} textTransform='uppercase' fontWeight='500' name='hnsmaps' img={hnsmaps} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('jailmaps', data)} textTransform='uppercase' fontWeight='500' name='jailmaps' img={jailmaps} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('jumpingmaps', data)} textTransform='uppercase' fontWeight='500' name='jumpingmaps' img={jumpingmaps} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('knifemaps', data)} textTransform='uppercase' fontWeight='500' name='knifemaps' img={knifemaps} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('surfmaps', data)} textTransform='uppercase' fontWeight='500' name='surfmaps' img={surfmaps} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('zombiemaps', data)} textTransform='uppercase' fontWeight='500' name='zombiemaps' img={zombiemaps} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('night', data)} textTransform='uppercase' fontWeight='500' name='night' img={night} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('winter', data)} textTransform='uppercase' fontWeight='500' name='winter' img={winter} />
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {[...filteredData].reverse().map(item => (
                                <WeaponCategoryCard
                                    link={`catalog card/maps/${item._id}`}
                                    key={item._id}
                                    content={i18n.language === 'ru' ? item.content : item.tagsSecondLang}
                                    title={i18n.language === 'ru' ? item.title : item.titleSecondLang}
                                    img={item.pictures[0]}
                                />
                            ))}
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
                <Helmet>
                    <meta name="description" content={t('confgisMetaDesc')} />
                </Helmet>
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('configsTitle')} />
                        <SeoText backColor={true} text={t('configsTitleSeoText')} />
                        <SectionTitle marginTop='40' title={t('sectionConfigsTitleTitle')} />
                        <div className={styles.weapon_category}>
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('progamers', data)} textTransform='uppercase' fontWeight='500' name='progamers' img={progamers} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('youtubers', data)} textTransform='uppercase' fontWeight='500' name='youtubers' img={youtubers} />
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {[...filteredData].reverse().map(item => (
                                <WeaponCategoryCard
                                    link={`catalog card/configs/${item._id}`}
                                    key={item._id}
                                    content={i18n.language === 'ru' ? item.content : item.tagsSecondLang}
                                    title={i18n.language === 'ru' ? item.title : item.titleSecondLang}
                                    img={item.pictures[0]}
                                />
                            ))}
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
                <Helmet>
                    <meta name="description" content={t('graffitiMetaDesc')} />
                </Helmet>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title={t('graffitiTitle')} />
                        <SeoText backColor={true} text={t('graffitiTitleSeoText')} />
                        <SectionTitle marginTop='40' title={t('sectionGraffitiTitleTitle')} />
                        <div className={styles.weapon_category}>
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('animelogo', data)} textTransform='uppercase' fontWeight='500' name='animelogo' img={animelogo} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('csgologo', data)} textTransform='uppercase' fontWeight='500' name='csgologo' img={csgologo} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('cybersports', data)} textTransform='uppercase' fontWeight='500' name='cybersports' img={cybersports} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('girlslogo', data)} textTransform='uppercase' fontWeight='500' name='girlslogo' img={girlslogo} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('monochrome', data)} textTransform='uppercase' fontWeight='500' name='monochrome' img={monochrome} />
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('textlogo', data)} textTransform='uppercase' fontWeight='500' name='textlogo' img={textlogo} />
                        </div>
                        <div className={styles.WeaponCategoryCards}>
                            {[...filteredData].reverse().map(item => (
                                <WeaponCategoryCard
                                    link={`catalog card/graffiti/${item._id}`}
                                    key={item._id}
                                    content={i18n.language === 'ru' ? item.content : item.tagsSecondLang}
                                    title={i18n.language === 'ru' ? item.title : item.titleSecondLang}
                                    img={item.pictures[0]}
                                />
                            ))}
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
                <Helmet>
                    <meta name="description" content={t('postsMetaDesc')} />
                </Helmet>
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
                            {[...filteredData].reverse().map(item => (
                                <WeaponCategoryCard
                                    link={`catalog card/posts/${item._id}`}
                                    key={item._id}
                                    content={i18n.language === 'ru' ? item.content : item.tagsSecondLang}
                                    title={i18n.language === 'ru' ? item.title : item.titleSecondLang}
                                    img={item.pictures[0]}
                                />
                            ))}
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
                            <WeaponCategoryElem fontSize='18' click={() => findCategoryItem('girl', data)} textTransform='uppercase' fontWeight='500' name='girl' img={girls} />
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
                            {[...filteredData].reverse().map(item => (
                                <WeaponCategoryCard
                                    link={`catalog card/sounds/${item._id}`}
                                    key={item._id}
                                    content={i18n.language === 'ru' ? item.content : item.tagsSecondLang}
                                    title={i18n.language === 'ru' ? item.title : item.titleSecondLang}
                                    img={item.pictures[0]}
                                />
                            ))}
                        </div>
                    </section>
                </div>
                <Footer />

            </div>
        )
    }
}

export default Catalog;
