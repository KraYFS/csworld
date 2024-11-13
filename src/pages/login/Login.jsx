import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { __BASE_URL__ } from '../../constants/urls';
import styles from './login.module.css'; // Импортируем стили

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${__BASE_URL__}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (!res.ok) throw new Error('Invalid credentials');
            
            const data = await res.json();
            localStorage.setItem('token', data.token); // Сохранение токена
            navigate('/adminPanelCsworldEdit'); // Переход в админку
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username" 
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
