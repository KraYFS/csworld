import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Ui/loader/loader";
import { __BASE_URL__ } from "../../constants/urls";
import style from './CatalogCardEdit.module.css';

const CatalogCardEdit = () => {
    const [data, setData] = useState(null);
    const [isEdit, setIsEditData] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [author, setAuthor] = useState('');
    const [postText, setPostText] = useState('');
    const [authorSecondLang, setAuthorSecondLang] = useState('');
    const [postTextSecondLang, setPostTextSecondLang] = useState('');
    const [newPictures, setNewPictures] = useState([]);
    const [deletedPictures, setDeletedPictures] = useState([]);
    const [titleSecondLang, setTitleSecondLang] = useState('');
    const [descriptionSecondLang, setDescriptionSecondLang] = useState('');
    const [tagsSecondLang, setTagsSecondLang] = useState('');
    const navigate = useNavigate();
    const deleteBlock = useRef(null);
    const { name, id } = useParams();
    const [dataLogin, setDataLogin] = useState(null)


    useEffect(() => {
        fetch(`${__BASE_URL__}/api/${name}/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setNewPictures(data.pictures);
                setTitle(data.title);
                setDescription(data.description);
                setTags(data.content); // Преобразуем массив в строку
                setAuthor(data.author || '');
                setPostText(data.postText || '');
                setTitleSecondLang(data.titleSecondLang);
                setDescriptionSecondLang(data.descriptionSecondLang);
                setTagsSecondLang(data.tagsSecondLang);
                setAuthorSecondLang(data.authorSecondLang || '');
                setPostTextSecondLang(data.postTextSecondLang || '');
            })
            .catch((error) => {
                alert('Ошибка при загрузке данных');
            });
    }, [name, id]);

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

    const editElem = () => {
        setIsEditData(!isEdit);
    };

    const deleteElemStyle = () => {
        deleteBlock.current.className = deleteBlock.current.className === `${style.visible}` ? `${style.hidden}` : `${style.visible}`;
    };

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    const changeDescription = (event) => {
        setDescription(event.target.value);
    };

    const changeTags = (event) => {
        setTags(event.target.value.split(','));
    };

    const changeAuthor = (event) => {
        setAuthor(event.target.value);
    };

    const changePostText = (event) => {
        setPostText(event.target.value);
    };

    const changeTitleSecondLang = (event) => {
        setTitleSecondLang(event.target.value);
    };

    const changeDescriptionSecondLang = (event) => {
        setDescriptionSecondLang(event.target.value);
    };

    const changeTagsSecondLang = (event) => {
        setTagsSecondLang(event.target.value.split(','));
    };

    const changeAuthorSecondLang = (event) => {
        setAuthorSecondLang(event.target.value);
    };

    const changePostTextSecondLang = (event) => {
        setPostTextSecondLang(event.target.value);
    };

    const deleteElem = () => {
        fetch(`${__BASE_URL__}/api/${name}/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if (res.ok) {
                    alert(`Успешно удалён ${data.title}`);
                    navigate(-1);
                } else {
                    alert('Ошибка при удалении');
                }
            });
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('files', file);

        try {
            const response = await fetch(`${__BASE_URL__}/api/${name}/${id}`, {
                method: 'PATCH',
                body: formData,
            });

            if (!response.ok) throw new Error('Ошибка загрузки изображения');
            const result = await response.json();
            return result.url; // URL загруженного изображения
        } catch (error) {
            console.error('Ошибка при загрузке:', error);
            alert('Не удалось загрузить изображение');
            return null;
        }
    };

    const handleImageChange = async (event) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const newImages = [];
        for (let i = 0; i < files.length; i++) {
            const imageUrl = await uploadImage(files[i]);
            if (imageUrl) {
                newImages.push(imageUrl);
            }
        }

        // Обновляем состояние с добавленными изображениями
        setNewPictures((prev) => [...prev, ...newImages]);
    };

    const deleteImg = (index) => {
        const imageToDelete = newPictures[index]; // Получаем URL или имя изображения
        const updatedPictures = newPictures.filter((_, i) => i !== index); // Убираем удалённое изображение из массива
    
        fetch(`${__BASE_URL__}/api/${name}/${id}/deleteImage`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl: imageToDelete }), // Передаем URL картинки для удаления
        })
            .then((res) => {
                if (res.ok) {
                    // Добавляем удалённое изображение в массив deletedPictures
                    setDeletedPictures((prev) => [...prev, imageToDelete]);
                    
                    // Обновляем массив с оставшимися изображениями
                    setNewPictures(updatedPictures);
                } else {
                    res.json().then(data => {
                        alert(data.message || 'Ошибка при удалении картинки');
                    });
                }
            })
            .catch((error) => {
                console.error('Ошибка при удалении:', error);
                alert('Ошибка при удалении картинки');
            });
    };
    
    const saveEdit = () => {
        // Если поле пустое, оставляем начальное значение
        if (title === '') setTitle(data.title);
        if (description === '') setDescription(data.description);
        if (tags === '') setTags(data.content.join(',')); // строка по умолчанию

        // Проверка для второго языка
        if (titleSecondLang === '') setTitleSecondLang(data.titleSecondLang);
        if (descriptionSecondLang === '') setDescriptionSecondLang(data.descriptionSecondLang);
        if (tagsSecondLang === '') setTagsSecondLang(data.tagsSecondLang.join(','));

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('content', tags);
        formData.append('author', author);
        formData.append('postText', postText);
        formData.append('titleSecondLang', titleSecondLang);
        formData.append('descriptionSecondLang', descriptionSecondLang);
        formData.append('tagsSecondLang', tagsSecondLang);
        formData.append('authorSecondLang', authorSecondLang);
        formData.append('postTextSecondLang', postTextSecondLang);

        deletedPictures.forEach(img => {
            formData.append('picturesToDelete', img); // Добавляем каждую картинку как отдельный элемент массива
        });
        
        newPictures.forEach(img => {
            formData.append('pictures', img); // Добавляем каждую картинку как отдельный элемент массива
        });

        fetch(`${__BASE_URL__}/api/${name}/${id}`, {
            method: 'PATCH',
            body: formData, // Отправляем все данные и файлы
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



    if (!data) return <Loader />;

    return (
        <div>
            {isEdit ? (
                <>
                    <div ref={deleteBlock} className={style.hidden}>
                        <button onClick={deleteElem} className={style.btn}>Удалить</button>
                        <button onClick={deleteElemStyle} className={style.btn}>Отмена</button>
                    </div>
                    <button className={style.btn} onClick={editElem}>Редактировать</button>
                    <button className={style.btn} onClick={deleteElemStyle}>Удалить</button>
                    <div className={style.item}>Название: {data.title}</div>
                    <div className={style.item}>Описание: {data.description}</div>
                    {name === 'posts' && (
                        <>
                            <div className={style.item}>Автор: {data.author}</div>
                            <div className={style.item}>Текст поста: {data.postText}</div>
                            <div className={style.item}>Автор (укр): {data.authorSecondLang}</div>
                            <div className={style.item}>Текст поста (укр): {data.postTextSecondLang}</div>
                        </>
                    )}
                    <div className={style.item}>
                        Картинки: {newPictures.map((img, index) => (
                            <div key={index}>
                                <img style={{ width: '300px' }} src={img} alt="" />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <button className={style.btn} onClick={editElem}>Отмена</button>
                    <div className={style.item}>
                        Название: <input className={style.item_input} value={title} onChange={changeTitle} type="text" placeholder='поменять значение "Название"' />
                    </div>
                    <div className={style.item}>
                        Описание: <input className={style.item_input} value={description} onChange={changeDescription} type="text" placeholder='поменять значение "Описания"' />
                    </div>
                    <div className={style.item}>
                        писать теги через запятую (пример: тег1,тег2)
                        <br />
                        Теги: <input className={style.item_input} value={tags} onChange={changeTags} type="text" placeholder='поменять значение "Теги"' />
                    </div>
                    {name === 'posts' && (
                        <>
                            <div className={style.item}>
                                Автор: <input className={style.item_input} value={author} onChange={changeAuthor} type="text" placeholder='поменять значение "Автор"' />
                            </div>
                            <div className={style.item}>
                                Текст поста: <textarea className={style.item_input} value={postText} onChange={changePostText} placeholder='поменять значение "Текст поста"' />
                            </div>
                            <div className={style.item}>
                                Автор (укр): <input className={style.item_input} value={authorSecondLang} onChange={changeAuthorSecondLang} type="text" placeholder='поменять значение "Автор"' />
                            </div>
                            <div className={style.item}>
                                писать теги через запятую (пример: тег1,тег2)
                                <br />
                                Текст поста (укр): <textarea className={style.item_input} value={postTextSecondLang} onChange={changePostTextSecondLang} placeholder='поменять значение "Текст поста"' />
                            </div>
                        </>
                    )}
                    <div className={style.item}>
                        Название (укр): <input className={style.item_input} value={titleSecondLang} onChange={changeTitleSecondLang} type="text" placeholder='поменять значение "Название второго языка"' />
                    </div>
                    <div className={style.item}>
                        Описание (укр): <input className={style.item_input} value={descriptionSecondLang} onChange={changeDescriptionSecondLang} type="text" placeholder='поменять значение "Описание второго языка"' />
                    </div>
                    <div className={style.item}>
                        писать теги через запятую (пример: тег1,тег2)
                        <br />
                        Теги (укр): <input className={style.item_input} value={tagsSecondLang} onChange={changeTagsSecondLang} type="text" placeholder='поменять значение "Теги второго языка"' />
                    </div>
                    <div className={style.item}>
                        Картинки:
                        {newPictures.map((img, index) => (
                            <div key={index}>
                                <img style={{ width: '300px' }} src={img} alt="" />
                                <button onClick={() => deleteImg(index)} className={style.btn}>Удалить</button>
                            </div>
                        ))}
                        <input type="file" multiple onChange={handleImageChange} />
                    </div>
                    <button onClick={saveEdit} className={style.btn}>Сохранить</button>
                </>
            )}
        </div>
    );
};

export default CatalogCardEdit;
