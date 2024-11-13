import { NavLink, useNavigate } from "react-router-dom";
import style from './adminPanelCsworldEdit.module.css'
import { useEffect, useState } from "react";
import { __BASE_URL__ } from "../../constants/urls";

const AdminPanelCsworldEdit = () => {
    const navigate = useNavigate();
    const [dataLogin, setDataLogin] = useState(null)

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
    
    return (
        <div>
            <header>
                <NavLink className={style.nav_links} to='/adminPanelCatalog/posts'>посты</NavLink>
                <NavLink className={style.nav_links} to='/adminPanelCatalog/assemblies'>сборки</NavLink>
                <NavLink className={style.nav_links} to='/adminPanelCatalog/weapon models'>модели оружия</NavLink>
                <NavLink className={style.nav_links} to='/adminPanelCatalog/player models'>модели игроков</NavLink>
                <NavLink className={style.nav_links} to='/adminPanelCatalog/maps'>карты</NavLink>
                <NavLink className={style.nav_links} to='/adminPanelCatalog/configs'>конфиги</NavLink>
                <NavLink className={style.nav_links} to='/adminPanelCatalog/graffiti'>граффити</NavLink>
                <NavLink className={style.nav_links} to='/adminPanelCatalog/sounds'>звуки</NavLink>
            </header>
        </div>
    );
}

export default AdminPanelCsworldEdit;
