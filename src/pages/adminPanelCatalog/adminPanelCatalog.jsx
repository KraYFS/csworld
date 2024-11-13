import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { __BASE_URL__ } from "../../constants/urls";
import Loader from "../../Ui/loader/loader";
import WeaponCategoryCard from "../../Ui/weaponCategoryCard/weaponCategoryCard";
import style from './adminPanelCatalog.module.css'
import AdminForm from "../../components/adminForm/adminForm";

const AdminPanelCatalog = () => {
    
    const [dataLogin, setDataLogin] = useState(null)
    const [data, setData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Проверяем авторизацию при загрузке компонента
        fetch(`${__BASE_URL__}/admin`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                if (!response.ok) throw new Error('Not authorized');
                return response.json();
            })
            .then(data => setDataLogin(data))
            .catch(error => {
                navigate('/login');  // Перенаправляем на страницу входа, если не авторизован
                console.error(error);
            });
    }, [navigate]);

    const [isCreate, setIsCreate] = useState(false)
    const { name } = useParams()

    useEffect(() => {
        fetch(`${__BASE_URL__}/api/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, [name])
    if (!data) return <Loader />

    const changeMode = () => {
        !isCreate ? setIsCreate(true) : setIsCreate(false)
    }

    return (
        <div>
            {!isCreate
                ? (
                    <div>
                        <button onClick={changeMode} className={style.btn}>создать новый пост</button>
                        <div className={style.items}>
                            {data.map(item => {
                                return <WeaponCategoryCard link={`edit card/${name}/${item._id}`} key={item._id} content={item.content} title={item.title} img={item.pictures[0]} />
                            })}
                        </div>
                    </div>
                ) :
                <div>
                    <button onClick={changeMode} className={style.btn}>Отмена</button>
                    <AdminForm />
                </div>
            }
        </div>
    );
}

export default AdminPanelCatalog;
