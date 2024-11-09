import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { __BASE_URL__ } from "../../constants/urls";
import Loader from "../../Ui/loader/loader";
import WeaponCategoryCard from "../../Ui/weaponCategoryCard/weaponCategoryCard";
import style from './adminPanelCatalog.module.css'

const AdminPanelCatalog = () => {
    const [data, setData] = useState(null)
    const { name } = useParams()

    useEffect(() => {
        fetch(`${__BASE_URL__}/api/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, [name])
    if (!data) return <Loader />

    return (
        <div className={style.items}>
            {data.map(item => {
                return <WeaponCategoryCard link={`edit card/${name}/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures[0]} />
            })}
        </div>
    );
}

export default AdminPanelCatalog;
