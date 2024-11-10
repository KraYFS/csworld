import React, { useState } from 'react';
import styles from './adminForm.module.css'
import WeaponCategoryCard from '../../Ui/weaponCategoryCard/weaponCategoryCard';
import { __BASE_URL__ } from '../../constants/urls';
import { useParams } from 'react-router-dom';


const AdminForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])
    const [systemRequirements, setSystemRequirements] = useState('')
    const [assemblyFeatures, setAssemblyFeatures] = useState('')
    const [images, setImages] = useState([]);
    const { name } = useParams()

    const editTitle = (event) => {
        setTitle(event.target.value)
    }

    const editTags = (event) => {
        setTags(event.target.value.split(','))
    }

    const editDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files); // Преобразуем FileList в массив
        const newImages = files.map((file) => URL.createObjectURL(file)); // Создаём временные URL для всех файлов
        setImages((prevImages) => [...prevImages, ...newImages]); // Добавляем новые URL к существующим
    };

    const saveEdit = () => {
        fetch(`${__BASE_URL__}/api/${name}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description,
                content: tags,
                pictures: images,
                systemRequirements: 'test',
                assemblyFeatures: 'test'
            })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Ошибка при создании данных');
                }
                return res.json();
            })
            .then((data) => {
                alert(`Успешно создан пост: ${title}`)
            })
            .catch((error) => {
                alert('Ошибка:', error);
            });
    };

    return (
        <div>
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <input onChange={editTitle} type="text" placeholder='Название' />
                    <input onChange={editDescription} type="text" placeholder='Описание' />
                    <input onChange={editTags} type="text" placeholder='Теги' />
                    <input type="text" placeholder='Как установить' />
                    <input type="text" placeholder='Анимация' />
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} /> {/* Поле для загрузки нескольких файлов */}
                </div>
                <div className={styles.preview}>
                    <WeaponCategoryCard link='/' title={title} content={tags} img={images[0]} />
                </div>
            </form>
            <button onClick={saveEdit} className={styles.btn}>Создать</button>
        </div>
    );
}

export default AdminForm;
