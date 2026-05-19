import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aside from "../Common/Aside";
import Swal from "sweetalert2";
/* ADMIN PROFILE */
function AdminProfile() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {

        localStorage.removeItem("admin");

        navigate("/admin-login");

    };

    return (
        <div className="admin-profile">
            <div className="profile-avatar" onClick={() => setShowDropdown(!showDropdown)}>  A</div>

            <div className="profile-info" onClick={() => setShowDropdown(!showDropdown)}>
                <strong>Admin</strong>
                <span>Super Admin</span>
            </div>

            {showDropdown && (
                <div className="profile-dropdown">
                    <button onClick={() => navigate("/profile")}>My Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

/* INVENTORY PAGE */
function Inventory() {
    const [inventory, setInventory] = useState([]);
    // const handleAdd = async () => {

    //     const { value: newName } =
    //         await Swal.fire({
    //             title: "Add Inventory Item",
    //             input: "text",
    //             inputLabel: "Enter product name",
    //             inputPlaceholder: "Product name",
    //             showCancelButton: true,
    //             confirmButtonColor: "#c9a227"
    //         });
    //     if (!newName) return;
    //     toast.success("Item added successfully");

    // };
    const handleEdit = async (item) => {

        const updatedStock = prompt("Enter new stock:", item.stock);

        if (updatedStock === null) return;

        try {

            await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/products/${item._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        stock: Number(updatedStock)
                    })
                }
            );

            setInventory(prev =>
                prev.map(p =>
                    p._id === item._id
                        ? {
                            ...p,
                            stock: Number(updatedStock)
                        }
                        : p
                )
            );

        } catch (err) {

            console.log(err);

        }

    }

    const handleDelete = async (item) => {

        const confirmDelete =
            window.confirm(
                `Delete ${item.name}?`
            );

        if (!confirmDelete) return;

        try {

            await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/products/${item._id}`,
                {
                    method: "DELETE"
                }
            );

            setInventory(prev =>
                prev.filter(
                    p => p._id !== item._id
                )
            );

        } catch (err) {

            console.log(err);

        }

    };
    useEffect(() => {

        fetch("${import.meta.env.VITE_BACKEND_URL}/products")
            .then(res => res.json())
            .then(data => {
                setInventory(data)
            })
            .catch(err => console.log(err))

    }, [])
    return (
        <div>
            <Aside />

            <div className="admin-main">
                {/* TOPBAR */}
                <header className="admin-topbar">
                    <div className="topbar-left">
                        <button className="sidebar-toggle">☰</button>
                    </div>

                    <div className="topbar-right">
                        <AdminProfile />
                    </div>
                </header>

                {/* CONTENT */}
                <main className="admin-content">
                    <div className="page-heading">
                        <div>
                            <h1>Inventory</h1>
                            <p>Stock levels and alerts</p>
                        </div>

                        {/* <div className="heading-actions">
                            <button className="btn-admin-primary" onClick={handleAdd}>
                                + Add Category
                            </button>
                        </div> */}
                    </div>

                    {/* GRID */}
                    <div className="inventory-grid">
                        {inventory.map((item) => (
                            <div className="inventory-card" key={item._id}>
                                <div className="inventory-top">
                                    <div className="ca-icon">

                                        <img src={`${import.meta.env.VITE_BACKEND_URL}${item.images?.[0]}`} alt={item.name} className="inventory-img" />

                                    </div>

                                    <div className="ca-info">
                                        <strong>{item.name}</strong>
                                        <span>Category: {item.category}</span>
                                        <span>Available Stock: {item.stock}</span>
                                    </div>
                                </div>

                                <div className="inventory-status">

                                    {item.stock <= 0 ? (
                                        <span style={{ color: "red" }}>Out Of Stock</span>

                                    ) : item.stock <= 5 ? (
                                        <span style={{ color: "orange" }}>Low Stock</span>
                                    ) : (
                                        <span style={{ color: "green" }}>In Stock</span>
                                    )}

                                </div>

                                <div className="ca-actions">
                                    <button className="act-btn" onClick={() => handleEdit(item)}>Edit</button>
                                    <button className="act-btn del" onClick={() => handleDelete(item)}>Del</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div >
        </div >
    );
}

export default Inventory;