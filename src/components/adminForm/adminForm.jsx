import React, { useEffect, useState } from 'react';
import styles from './adminForm.module.css';
import WeaponCategoryCard from '../../Ui/weaponCategoryCard/weaponCategoryCard';
import { __BASE_URL__ } from '../../constants/urls';
import { useNavigate, useParams } from 'react-router-dom';

const AdminForm = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Проверяем авторизацию при загрузке компонента
        fetch(`${__BASE_URL__}/admin`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                if (!response.ok) throw new Error('Not authorized');
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => {
                console.error(error);
                setError(error.message);
                if (!localStorage.getItem('token')) {
                    setTimeout(() => {
                        navigate('/login');
                    }, 30);  // Обеспечим, что navigate выполнится после рендера
                }  // Перенаправляем на страницу входа, если не авторизован
            });
    }, [navigate]);

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

    // Состояния для второго языка
    const [titleSecondLang, setTitleSecondLang] = useState('');
    const [descriptionSecondLang, setDescriptionSecondLang] = useState('');
    const [tagsSecondLang, setTagsSecondLang] = useState([]);
    const [systemRequirementsSecondLang, setSystemRequirementsSecondLang] = useState('');
    const [assemblyFeaturesSecondLang, setAssemblyFeaturesSecondLang] = useState('');

    const { name } = useParams();

    // Обработчики для ввода данных
    const editTitle = (event) => setTitle(event.target.value);
    const editSystemRequirements = (event) => setSystemRequirements(event.target.value);
    const editAssemblyFeatures = (event) => setAssemblyFeatures(event.target.value);
    const editTags = (event) => setTags(event.target.value.split(','));
    const editDescription = (event) => setDescription(event.target.value);

    // Обработчики для ввода данных на втором языке
    const editTitleSecondLang = (event) => setTitleSecondLang(event.target.value);
    const editDescriptionSecondLang = (event) => setDescriptionSecondLang(event.target.value);
    const editTagsSecondLang = (event) => setTagsSecondLang(event.target.value.split(','));
    const editSystemRequirementsSecondLang = (event) => setSystemRequirementsSecondLang(event.target.value);
    const editAssemblyFeaturesSecondLang = (event) => setAssemblyFeaturesSecondLang(event.target.value);

    // Обработчик для загрузки файлов
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setImages(files);
        setTemporaryLink(URL.createObjectURL(files[0]));
    };

    const addFile = (event) => {
        const files = Array.from(event.target.files);
        setFile(files[0]);
    };

    const addTorrentFile = (event) => {
        const files = Array.from(event.target.files);
        setTorrentFile(files[0]);
    };

    // Обработчик отправки формы
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        // Добавляем текстовые данные в FormData
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tags", tags);
        formData.append("titleSecondLang", titleSecondLang || ""); // передаем пустую строку, если пусто
        formData.append("descriptionSecondLang", descriptionSecondLang || ""); // передаем пустую строку, если пусто
        formData.append("tagsSecondLang", tagsSecondLang || []); // передаем пустой массив, если пусто
        formData.append("author", systemRequirements);
        formData.append("postText", assemblyFeatures);
        formData.append("authorSecondLang", systemRequirementsSecondLang || ""); // аналогично
        formData.append("postTextSecondLang", assemblyFeaturesSecondLang || ""); // аналогично

        if (name !== 'posts') {
            formData.append("appFile", file);
            formData.append("torrentFile", torrentFile);
            formData.append("assemblyFeatures", assemblyFeatures);
            formData.append("systemRequirements", systemRequirements);
            formData.append("assemblyFeaturesSecondLang", assemblyFeaturesSecondLang || "");
            formData.append("systemRequirementsSecondLang", systemRequirementsSecondLang || "");
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
                navigate(-1);
            } else {
                alert("Ошибка при создании поста.");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка при отправке данных.");
        }
    };

    console.log(titleSecondLang);


    return (
        <div>
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <input onChange={editTitle} type="text" placeholder="Название" value={title} />
                    <input onChange={editDescription} type="text" placeholder="Описание" value={description} />
                    <input onChange={editTags} type="text" placeholder="Теги" value={tags.join(',')} />

                    {name === 'posts'
                        ? <input onChange={editSystemRequirements} type="text" placeholder="Автор" value={systemRequirements} />
                        : <input onChange={editSystemRequirements} type="text" placeholder="Как установить" value={systemRequirements} />
                    }

                    {name === 'posts'
                        ? <textarea onChange={editAssemblyFeatures} type="text" placeholder="Текст поста" value={assemblyFeatures} />
                        : <input onChange={editAssemblyFeatures} type="text" placeholder="Особенности" value={assemblyFeatures} />
                    }

                    <input onChange={editTitleSecondLang} type="text" placeholder="Название (второй язык)" value={titleSecondLang} />
                    <input onChange={editDescriptionSecondLang} type="text" placeholder="Описание (второй язык)" value={descriptionSecondLang} />
                    <input onChange={editTagsSecondLang} type="text" placeholder="Теги (второй язык)" value={tagsSecondLang.join(',')} />

                    {name === 'posts'
                        ? <input onChange={editSystemRequirementsSecondLang} type="text" placeholder="Автор (второй язык)" value={systemRequirementsSecondLang} />
                        : <input onChange={editSystemRequirementsSecondLang} type="text" placeholder="Как установить (второй язык)" value={systemRequirementsSecondLang} />
                    }

                    {name === 'posts'
                        ? <textarea onChange={editAssemblyFeaturesSecondLang} type="text" placeholder="Текст поста (второй язык)" value={assemblyFeaturesSecondLang} />
                        : <input onChange={editAssemblyFeaturesSecondLang} type="text" placeholder="Особенности (второй язык)" value={assemblyFeaturesSecondLang} />
                    }

                    добавить картинки:
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} />

                    {name !== 'posts' && (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            добавить файл:
                            <input type="file" accept="*" onChange={addFile} />
                            добавить торрент файл:
                            <input type="file" accept="*" onChange={addTorrentFile} />
                        </div>
                    )}
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
