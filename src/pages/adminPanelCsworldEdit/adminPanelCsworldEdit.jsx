import { NavLink } from "react-router-dom";
import style from './adminPanelCsworldEdit.module.css'

const AdminPanelCsworldEdit = () => {
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
                <NavLink className={style.nav_links} to='/adminPanelCatalog/posts'>статьи</NavLink>
            </header>
        </div>
    );
}

export default AdminPanelCsworldEdit;
