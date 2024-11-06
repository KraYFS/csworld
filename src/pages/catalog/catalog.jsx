// import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import SectionTitle from '../../Ui/SectionTitle/sectionTitle';
import SeoText from '../../Ui/seoText/seoText';
import WeaponCategoryElem from '../../Ui/weaponCategoryElem/weaponCategoryElem';
import styles from './catalog.module.css'
import img from '../../assets/icons/weaponIconAwp.png'
import WeaponCategoryCard from '../../Ui/weaponCategoryCard/weaponCategoryCard';

const Catalog = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <section className="content">
                    <SectionTitle title='Модели оружия для CS 1.6 - Скины оружия на КС 1.6' />
                    <SeoText backColor={true} text='Раздел сайта, посвященный моделям оружия из игры CS 1.6, является местом, где игроки могут найти подробную информацию о различных видах оружия, используемых в игре. Здесь представлены различные виды огнестрельного и холодного оружия, а также гранаты и дополнительное снаряжение.В разделе содержатся следующие подразделы:Основное оружие: здесь представлены все основные виды оружия, доступные для игроков, такие как пистолеты-пулеметы, штурмовые винтовки, снайперские винтовки, дробовики и т. д.Второстепенное оружие: включает пистолеты и револьверы, которые игроки могут использовать в качестве дополнительного оружия.Холодное оружие: ножи и топоры, используемые в ближнем бою.Гранаты: раздел содержит информацию о всех типах гранат, доступных в игре, включая дымовые, осколочные и световые гранаты.Дополнительное снаряжение: включает различные предметы, которые могут помочь игроку в игре, такие как броню, наушники, очки ночного видения и т.д.Каждый подраздел содержит подробное описание оружия, включая его характеристики, стоимость, способы получения, а также скриншоты и видеоматериалы из игры.' />
                    <SectionTitle marginTop='40' title='Скачать модели оружия КС 1.6' />
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
                        <WeaponCategoryCard link='catalog card' title='Модель АК-47 Кровавый спорт'/>
                        <WeaponCategoryCard link='catalog card' title='Модель АК-47 Кровавый спорт'/>
                        <WeaponCategoryCard link='catalog card' title='Модель АК-47 Кровавый спорт'/>
                        <WeaponCategoryCard link='catalog card' title='Модель АК-47 Кровавый спорт'/> 
                        <WeaponCategoryCard link='catalog card' title='Модель АК-47 Кровавый спорт'/>
                        <WeaponCategoryCard link='catalog card' title='Модель АК-47 Кровавый спорт'/>
                        <WeaponCategoryCard link='catalog card' title='Модель АК-47 Кровавый спорт'/>
                        <WeaponCategoryCard link='catalog card' title='Модель АК-47 Кровавый спорт'/>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Catalog;
