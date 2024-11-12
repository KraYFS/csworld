import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Ui/loader/loader";
import { __BASE_URL__ } from "../../constants/urls";
import style from './CatalogCardEdit.module.css'

const CatalogCardEdit = () => {
    const [data, setData] = useState(null)
    const [isEdit, setIsEditData] = useState(true)
    const [title, setTitle] = useState('')
    const [newPictures, setNewPictures] = useState([])
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
    const [newUrls, setNewUrls] = useState('')  // Строка для ввода ссылок через запятую
    const navigate = useNavigate()
    const deleteBlock = useRef(null)
    const { name } = useParams()
    const { id } = useParams()

    useEffect(() => {
        fetch(`${__BASE_URL__}/api/${name}/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setNewPictures(data.pictures); // Устанавливаем начальные картинки
            });
    }, [name])

    const editElem = () => {
        isEdit ? setIsEditData(false) : setIsEditData(true)
    }

    const deleteElemStyle = () => {
        deleteBlock.current.className === `${style.visible}`
            ? deleteBlock.current.className = `${style.hidden}`
            : deleteBlock.current.className = `${style.visible}`
    }

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    const changeDescription = (event) => {
        setDescription(event.target.value);
        
    };
    
    const changeTags = (event) => {
        setTags(event.target.value.split(','));
        console.log(tags);
    };

    const deleteElem = () => {
        fetch(`${__BASE_URL__}/api/${name}/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })

        alert(`Успешно удалён ${data.title}`)
        navigate(-1)
    }

    const saveEdit = () => {
        if (title === '') {
            setTitle(data.title)
        }
        if (description === '') {
            setDescription(data.description)
        }
        fetch(`${__BASE_URL__}/api/${name}/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description,
                pictures: newPictures,
                content: tags
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

    const deleteImg = (index) => {
        const updatedPictures = newPictures.filter((_, i) => i !== index); // Удаляем картинку по индексу
        setNewPictures(updatedPictures);
    };



    if (!data) return <Loader />

    if (isEdit) {
        return (
            <div>
                <div ref={deleteBlock} className={style.hidden}>
                    <button onClick={deleteElem} className={style.btn}>Удалить</button>
                    <button onClick={deleteElemStyle} className={style.btn}>Отмена</button>
                </div>
                <button className={style.btn} onClick={editElem}>Редактировать</button>
                <button className={style.btn} onClick={deleteElemStyle}>Удалить</button>
                <div className={style.item}>
                    Название: {data.title}
                </div>
                <div className={style.item}>
                    Описание: {data.description}
                </div>
                <div className={style.item}>
                    Картинки: {data.pictures.map((img, index) => {
                        return (
                            <div key={index}>
                                <img style={{ width: '300px' }} src={img} alt="" />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <button className={style.btn} onClick={editElem}>Отмена</button>
                <div className={style.item}>
                    Название: {data.title}
                    <input className={style.item_input} onChange={changeTitle} type="text" placeholder='поменять значение "Название"' />
                </div>
                <div className={style.item}>
                    Описание: {data.description}
                    <input className={style.item_input} onChange={changeDescription} type="text" placeholder='поменять значение "Описания"' />
                </div>
                <div className={style.item}>
                    теги: {data.content.map(tag => tag)}
                    <input className={style.item_input} onChange={changeTags} type="text" placeholder='поменять значение "Теги"' />
                </div>
                <div className={style.item}>
                    Картинки: {newPictures.map((img, index) => {
                        return (
                            <div key={index}>
                                <img style={{ width: '300px' }} src={img} alt="" />
                                <button onClick={() => deleteImg(index)} className={style.btn}>Удалить картинку</button>

                            </div>
                        )
                    })}
                </div>
                <div className={style.item}>
                </div>
                <button className={style.btn} onClick={saveEdit}>Сохранить</button>
            </div>
        )
    }
}

export default CatalogCardEdit;
