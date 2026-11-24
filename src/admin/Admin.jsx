
import { useEffect, useState } from "react";
import "./Admin.css";
import AdminLogin from "./AdminLogin";

function Admin() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);


    const sendWhatsAppMessage = (appointment, status) => {
        let phone = appointment.phone.replace(/\D/g, "");

        if (phone.startsWith("0")) {
            phone = "963" + phone.substring(1);
        }

        const message =
            status === "confirmed"
                ? `مرحباً ${appointment.name}، نؤكد لك موعدك في عيادة لؤلؤة للعناية بالأسنان بتاريخ ${appointment.date} الساعة ${appointment.time}. نتمنى لك يوماً سعيداً.`
                : `مرحباً ${appointment.name}، نعتذر لإبلاغك بأنه تم إلغاء موعدك في عيادة لؤلؤة للعناية بالأسنان بتاريخ ${appointment.date}. يرجى التواصل معنا لإعادة الحجز.`;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.location.href = url;
    };

    const updateStatus = async (id, status) => {
        try {
            const response = await fetch(
                `/api/appointments/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update appointment");
            }

            const result = await response.json();

            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment._id === id ? result.appointment : appointment
                )
            );
            return true;

        } catch (error) {
            console.error(error);
            alert("تعذر تحديث حالة الحجز.");
            return false;
        }
    };

    const [token, setToken] = useState(
        sessionStorage.getItem("adminToken") || ""
    );

    const handleLogin = (newToken) => {
        sessionStorage.setItem("adminToken", newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("adminToken");
        setToken("");
        setAppointments([]);
    };

    const deleteAppointment = async (id) => {
        const confirmed = window.confirm("هل أنتِ متأكدة من حذف هذا الحجز؟");

        if (!confirmed) return;

        try {
            const response = await fetch(
                `/api/appointments/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete appointment");
            }

            setAppointments((prev) =>
                prev.filter((appointment) => appointment._id !== id)
            );
        } catch (error) {
            console.error(error);
            alert("تعذر حذف الحجز.");
        }
    };


    useEffect(() => {
        fetch("/api/appointments", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load appointments");
                }
                return response.json();
            })
            .then((data) => {
                setAppointments(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);

                if (error.message === "Failed to load appointments") {
                    sessionStorage.removeItem("adminToken");
                    setToken("");
                    setAppointments([]);
                }
            });
    }, [token]);

    if (!token) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    return (
        <div className="admin-page">
            <header className="admin-header">
                <div>
                    <h1>لؤلؤة للعناية بالأسنان</h1>
                    <p>لوحة إدارة العيادة</p>
                </div>
                <div className="admin-header-actions">
                    <span>لوحة التحكم</span>

                    <button onClick={handleLogout} className="admin-logout-btn">
                        تسجيل الخروج
                    </button>
                </div>            </header>

            <main className="admin-content">
                <div className="admin-title">
                    <h2>مرحباً بك في لوحة التحكم</h2>
                    <p>إليكِ ملخص طلبات الحجز في العيادة.</p>
                </div>

                <div className="admin-stats">
                    <div className="admin-stat">
                        <span>إجمالي الحجوزات</span>
                        <h3>{appointments.length}</h3>
                    </div>

                    <div className="admin-stat">
                        <span>قيد الانتظار</span>
                        <h3>
                            {appointments.filter((a) => a.status === "pending").length}
                        </h3>
                    </div>

                    <div className="admin-stat">
                        <span>الحجوزات المؤكدة</span>
                        <h3>
                            {appointments.filter((a) => a.status === "confirmed").length}
                        </h3>
                    </div>
                </div>

                <div className="admin-table-wrapper">
                    <h3>طلبات الحجز</h3>

                    {loading ? (
                        <p className="admin-loading">جاري تحميل الحجوزات...</p>
                    ) : appointments.length === 0 ? (
                        <p className="admin-empty">لا توجد حجوزات حالياً.</p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>الاسم</th>
                                    <th>الهاتف</th>
                                    <th>البريد الإلكتروني</th>
                                    <th>الخدمة</th>
                                    <th>التاريخ</th>
                                    <th>الوقت</th>
                                    <th>الحالة</th>
                                    <th>الإجراءات</th>
                                </tr>
                            </thead>

                            <tbody>
                                {appointments.map((appointment) => (
                                    <tr key={appointment._id}>
                                        <td>{appointment.name}</td>
                                        <td>{appointment.phone}</td>
                                        <td>{appointment.email || "—"}</td>
                                        <td>{appointment.service}</td>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.time}</td>

                                        <td>
                                            <span className="admin-status">
                                                {appointment.status === "pending"
                                                    ? "قيد الانتظار"
                                                    : appointment.status === "confirmed"
                                                        ? "مؤكد"
                                                        : "ملغي"}
                                            </span>
                                        </td>

                                        <td>
                                            <button

                                                onClick={async () => {
                                                    const success = await updateStatus(appointment._id, "confirmed");

                                                    if (success) {
                                                        sendWhatsAppMessage(appointment, "confirmed");
                                                    }
                                                }}

                                            >
                                                تأكيد
                                            </button>

                                            <button

                                                onClick={async () => {
                                                    const success = await updateStatus(appointment._id, "cancelled");

                                                    if (success) {
                                                        sendWhatsAppMessage(appointment, "cancelled");
                                                    }
                                                }}

                                            >
                                                إلغاء
                                            </button>


                                            <button
                                                onClick={() => deleteAppointment(appointment._id)}
                                                className="admin-delete-btn"
                                            >
                                                حذف
                                            </button>

                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );

}

export default Admin;
