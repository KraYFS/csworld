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


    if (name === 'weapon models') {
        if (!data) return <Loader />

        return (
            <div>
                <Header />
                <div className="container">
                    <section className="content">
                        <SectionTitle title='Модели оружия для CS 1.6 - Скины оружия на КС 1.6' />
                        <SeoText backColor={true} text='Раздел сайта, посвященный моделям оружия из игры CS 1.6, является местом, где игроки могут найти подробную информацию о различных видах оружия, используемых в игре. Здесь представлены различные виды огнестрельного и холодного оружия, а также гранаты и дополнительное снаряжение.В разделе содержатся следующие подразделы:Основное оружие: здесь представлены все основные виды оружия, доступные для игроков, такие как пистолеты-пулеметы, штурмовые винтовки, снайперские винтовки, дробовики и т. д.Второстепенное оружие: включает пистолеты и револьверы, которые игроки могут использовать в качестве дополнительного оружия.Холодное оружие: ножи и топоры, используемые в ближнем бою.Гранаты: раздел содержит информацию о всех типах гранат, доступных в игре, включая дымовые, осколочные и световые гранаты.Дополнительное снаряжение: включает различные предметы, которые могут помочь игроку в игре, такие как броню, наушники, очки ночного видения и т.д.Каждый подраздел содержит подробное описание оружия, включая его характеристики, стоимость, способы получения, а также скриншоты и видеоматериалы из игры.' />
                        <SectionTitle marginTop='40' title='Скачать модели оружия КС 1.6' />
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
                                return <WeaponCategoryCard link={`catalog card/weapon models/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures[0]} />
                            })}
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
                        <SectionTitle title='Сборки CS 1.6' />
                        <SeoText backColor={true} text='Откройте для себя мир современных сборок для легендарной игры Counter-Strike 1.6. Наша коллекция сборок предназначена для того, чтобы преобразить ваш опыт игры, добавив новые возможности, карты, режимы и улучшения в оригинальную игровую формулу. Вас ждут уникальные модификации, которые подчеркнут ваш стиль игры и позволят вам соревноваться на новом уровне. Мы собрали для вас только лучшие сборки, которые прошли тщательный отбор и тестирование на стабильность и производительность.
                        Каждая сборка предлагает свой уникальный набор модов и настроек, которые помогут вам достичь максимального удовольствия от игры. Независимо от того, вы новичок или опытный ветеран, вы обязательно найдете сборку, которая подходит именно вам. Погрузитесь в атмосферу бесконечных сражений, улучшите свои навыки и вместе с нами создайте уникальные игровые моменты.
                        Наша команда постоянно обновляет и дополняет коллекцию сборок, чтобы предложить вам самые свежие и интересные варианты. Мы следим за последними трендами и рекомендациями игрового сообщества, чтобы удовлетворить все ваши потребности и желания. У нас вы найдете не только классические сборки, но и инновационные подходы к игровому процессу.
                        Не упустите шанс улучшить вашу игру и присоединиться к мировому сообществу игроков Counter-Strike 1.6. Наши сборки помогут вам ощутить всю глубину и динамику этой увлекательной игры. Присоединяйтесь к нам сегодня и окунитесь в мир бесконечных возможностей и незабываемых моментов вместе с нами.' />
                        <SectionTitle marginTop='40' title='Скачать cборки CS 1.6' />
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
                        <SectionTitle title='Модели игроков для CS 1.6 - Скины игроков на КС 1.6' />
                        <SeoText backColor={true} text='Модели игроков в Counter-Strike 1.6 являются ключевым элементом игрового процесса, определяющим внешний облик и стиль игроков на поле боя. Скины игроков предлагают возможность кастомизации внешнего вида персонажей, делая игровой процесс еще более увлекательным и индивидуальным. От классических военных форм до фантастических и экзотических костюмов, скины игроков позволяют каждому игроку выразить свою индивидуальность и предпочтения. Выбирайте из разнообразия дизайнов, чтобы создать уникальный облик своего персонажа и выделиться среди других игроков.' />
                        <SectionTitle marginTop='40' title='Скачать модели игроков КС 1.6' />
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
                                return <WeaponCategoryCard link={`catalog card/player models/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures[0]} />
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
                        <SectionTitle title='Скачать карты для КС 1.6' />
                        <SeoText backColor={true} text='Модели игроков в Counter-Strike 1.6 являются ключевым элементом игрового процесса, определяющим внешний облик и стиль игроков на поле боя. Скины игроков предлагают возможность кастомизации внешнего вида персонажей, делая игровой процесс еще более увлекательным и индивидуальным. От классических военных форм до фантастических и экзотических костюмов, скины игроков позволяют каждому игроку выразить свою индивидуальность и предпочтения. Выбирайте из разнообразия дизайнов, чтобы создать уникальный облик своего персонажа и выделиться среди других игроков.' />
                        <SectionTitle marginTop='40' title='Скачать карты для КС 1.6' />
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
    }
}

export default Catalog;
