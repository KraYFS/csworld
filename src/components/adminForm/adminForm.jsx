import React, { useState } from 'react';
import styles from './adminForm.module.css';
import WeaponCategoryCard from '../../Ui/weaponCategoryCard/weaponCategoryCard';
import { __BASE_URL__ } from '../../constants/urls';
import { useNavigate, useParams } from 'react-router-dom';

const AdminForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [systemRequirements, setSystemRequirements] = useState('');
    const [assemblyFeatures, setAssemblyFeatures] = useState('');
    const [images, setImages] = useState([]);
    const [temporaryLink, setTemporaryLink] = useState('');
    const [file, setFile] = useState(null);
    const [torrentFile, setTorrentFile] = useState(null);
    const [uploadedImagePaths, setUploadedImagePaths] = useState([]);
    const { name } = useParams();
    const navigate = useNavigate();

    // Обработчики для ввода данных
    const editTitle = (event) => setTitle(event.target.value);
    const editSystemRequirements = (event) => setSystemRequirements(event.target.value);
    const editAssemblyFeatures = (event) => setAssemblyFeatures(event.target.value);
    const editTags = (event) => setTags(event.target.value.split(','));
    const editDescription = (event) => setDescription(event.target.value);

    // Обработчик для загрузки файлов
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files); // Получаем выбранные файлы
        setImages(files);  // Сохраняем файлы
        setTemporaryLink(URL.createObjectURL(files[0]))
    };

    const addFile = (event) => {
        const files = Array.from(event.target.files); // Получаем выбранные файлы
        setFile(files[0])
    }

    const addTorrentFile = (event) => {
        const files = Array.from(event.target.files); // Получаем выбранные файлы
        setTorrentFile(files[0])
    }

    // Обработчик отправки формы
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        // Добавляем текстовые данные в FormData
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tags", tags);  // Преобразуем теги в строку
        
        // Добавляем файлы
        if (name !== 'posts') {
            formData.append("appFile", file);
            formData.append("torrentFile", torrentFile);
            formData.append("assemblyFeatures", assemblyFeatures);
            formData.append("systemRequirements", systemRequirements);
        } else {
            formData.append('author', systemRequirements)
            formData.append('postText', assemblyFeatures)
        }
        images.forEach((image) => {
            formData.append("files", image);
        });

        try {
            const response = await fetch(`${__BASE_URL__}/api/${name}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert(`Успешно создан пост: ${title}`);
                const data = await response.json();

                setUploadedImagePaths(data.pictures);

                navigate(-1);  // Возвращаемся назад
            } else {
                alert("Ошибка при создании поста.");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка при отправке данных.");
        }
    };

    return (
        <div>
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <input onChange={editTitle} type="text" placeholder="Название" value={title} />
                    <input onChange={editDescription} type="text" placeholder="Описание" value={description} />
                    <input onChange={editTags} type="text" placeholder="Теги" value={tags.join(',')} />
                    {
                        name === 'posts' ? <input onChange={editSystemRequirements} type="text" placeholder="Автор" value={systemRequirements} /> : <input onChange={editSystemRequirements} type="text" placeholder="Как установить" value={systemRequirements} />
                    }
                    {
                        name === 'posts' ? <textarea onChange={editAssemblyFeatures} type="text" placeholder="текст поста" value={assemblyFeatures} /> : <input onChange={editAssemblyFeatures} type="text" placeholder="Особенности" value={assemblyFeatures} />
                    }
                    добавить картинки:
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} /> {/* Поле для загрузки нескольких файлов */}
                    {
                        name === 'posts' ? <div></div> :
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                добавить файл:
                                <input type="file" accept="*" onChange={addFile} /> {/* Поле для загрузки  файлов */}
                                добавить торрент файл:
                                <input type="file" accept="*" onChange={addTorrentFile} /> {/* Поле для загрузки торрент файлов */}
                            </div>
                    }
                </div>
                <div className={styles.preview}>
                    {images[0] && <WeaponCategoryCard post='true' title={title} content={tags} img={temporaryLink} />}
                </div>
            </form>
            <button onClick={handleSubmit} className={styles.btn}>Создать</button>
        </div>
    );
}

export default AdminForm;
