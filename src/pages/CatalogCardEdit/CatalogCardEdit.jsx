import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Ui/loader/loader";
import { __BASE_URL__ } from "../../constants/urls";
import style from './CatalogCardEdit.module.css'

const CatalogCardEdit = () => {
    const [data, setData] = useState(null)
    const [isEdit, setIsEditData] = useState(true)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { name } = useParams()
    const { id } = useParams()

    useEffect(() => {
        fetch(`${__BASE_URL__}/api/${name}/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, [name])

    const editElem = () => {
        setIsEditData(false)
    }

    const cancleEdit = () => {
        setIsEditData(true)
    }

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    const changeDescription = (event) => {
        setDescription(event.target.value);
    };

    const saveEdit = () => {
        if (title === '') {
            setTitle(data.title)
        }
        if (description === '') {
            setTitle(data.description)
        }
        fetch(`${__BASE_URL__}/api/${name}/${id}`, {
            method: 'PATCH',
            headers: { // исправлено на headers
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Ошибка при обновлении данных');
            }
            return res.json();
        })
        .then((data) => {
            setData(data);
            setIsEditData(true);
        })
        .catch((error) => {
            alert('Ошибка:', error);
        });
    };

    if (!data) return <Loader />

    if (isEdit) {
        return (
            <div>
                <button className={style.btn} onClick={editElem}>Редактировать</button>
                <div className={style.item}>
                    Название: {data.title}
                </div>
                <div className={style.item}>
                    Описание: {data.description}
                </div>
                <div className={style.item}>
                    Картинки: {data.pictures.map(img => {
                        return (<img style={{ width: '300px' }} src={img} alt="" />)
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <button className={style.btn} onClick={cancleEdit}>Отмена</button>
                <div className={style.item}>
                    Название: {data.title}
                    <input className={style.item_input} onChange={changeTitle} type="text" placeholder='поменять значение "Название"' />
                </div>
                <div className={style.item}>
                    Описание: {data.description}
                    <input className={style.item_input} onChange={changeDescription} type="text" placeholder='поменять значение "Описания"' />
                </div>
                <div className={style.item}>
                    Картинки: {data.pictures.map(img => {
                        return (<img style={{ width: '300px' }} src={img} alt="" />)
                    })}
                </div>
                <button className={style.btn} onClick={cancleEdit}>Отмена</button>
                <button className={style.btn} onClick={saveEdit}>Сохранить</button>
            </div>
        )
    }
}

export default CatalogCardEdit;
