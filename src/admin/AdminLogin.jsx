
import { useState } from "react";

function AdminLogin({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            onLogin(data.token);
        } catch (error) {
            setError(error.message || "فشل تسجيل الدخول.");
        }
    };

    return (
        <div className="admin-login">
            <form onSubmit={handleLogin}>
                <h2>تسجيل دخول المدير</h2>

                <label>اسم المستخدم</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label>كلمة المرور</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p>{error}</p>}

                <button type="submit">تسجيل الدخول</button>
            </form>
        </div>
    );
}

export default AdminLogin;
