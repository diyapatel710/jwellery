import React, { useState, useEffect } from 'react'
import Aside from '../Common/Aside'
import { useNavigate } from 'react-router-dom'
function Categories() {
    const [categories, setCategories] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [newCategory, setNewCategory] = useState("")
    const [newImage, setNewImage] = useState("")
    const [editIndex, setEditIndex] = useState(null)
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryProducts, setCategoryProducts] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/categories-count")
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCategories(data.categories)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const icons = {
        Rings: "💍",
        Necklaces: "📿",
        Earrings: "✨",
        Bracelets: "⌚",
        Bangles: "⭕",
        Pendants: "🏅"
    }

    const handleSave = async () => {
        if (!newCategory.trim()) return

        if (editIndex !== null) {
            await fetch(`http://localhost:8000/edit-category/${categories[editIndex]._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newCategory,
                    image: newImage
                })
            })
        } else {
            await fetch("http://localhost:8000/add-category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newCategory,
                    image: newImage
                })
            })
        }

        window.location.reload()
    }

    return (
        <div>
            <Aside />

            <div className="admin-main">
                <main className="admin-content">

                    <div className="page-heading">
                        <div>
                            <h1>Categories</h1>
                            <p>Manage jewellery categories</p>
                        </div>

                        <button
                            className="btn-admin-primary"
                            onClick={() => {
                                setShowModal(true)
                                setEditIndex(null)
                                setNewCategory("")
                                setNewImage("")
                            }}
                        >
                            + Add Category
                        </button>
                    </div>

                    <div className="cat-admin-grid">
                        {categories.map((item, index) => (
                            <div key={index} className="cat-admin-card" onClick={async () => {
                                setSelectedCategory(item.name)
                                const res = await fetch("http://localhost:8000/products")
                                const data = await res.json()
                                const filtered = data.filter(
                                    p => p.category?.toLowerCase() === item.name.toLowerCase())
                                setCategoryProducts(filtered)
                            }}>

                                <div className="ca-icon">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt=""
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                objectFit: 'cover',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    ) : (
                                        icons[item.name] || "📦"
                                    )}
                                </div>

                                <div className="ca-info">
                                    <strong>{item.name}</strong>
                                    <span>{item.count || 0} products</span>
                                </div>

                                <div className="ca-actions">

                                    <button
                                        className="table-btn"
                                        onClick={() => {
                                            setNewCategory(item.name)
                                            setNewImage(item.image || "")
                                            setEditIndex(index)
                                            setShowModal(true)
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={async () => {
                                            await fetch(`http://localhost:8000/delete-category/${item._id}`, {
                                                method: "DELETE"
                                            })
                                            window.location.reload()
                                        }}
                                    >
                                        Del
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>

                    {showModal && (
                        <div className="order-detail-modal">
                            <div className="odm-box">

                                <div className="odm-head">
                                    <h3>{editIndex !== null ? "Edit Category" : "Add Category"}</h3>

                                    <button
                                        className="odm-close"
                                        onClick={() => setShowModal(false)}
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="odm-body">

                                    <input
                                        type="text"
                                        placeholder="Category name"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        className="lf-input"
                                    />

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="lf-input"
                                        style={{ marginTop: '12px' }}
                                        onChange={(e) => {
                                            const file = e.target.files[0]
                                            if (file) {
                                                const reader = new FileReader()
                                                reader.onloadend = () => {
                                                    setNewImage(reader.result)
                                                }
                                                reader.readAsDataURL(file)
                                            }
                                        }}
                                    />

                                    <div style={{
                                        marginTop: '20px',
                                        display: 'flex',
                                        gap: '10px'
                                    }}>
                                        <button
                                            className="btn-admin-primary"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                </main>
                {selectedCategory && (
                    <div
                        className="order-detail-modal"
                        onClick={() => setSelectedCategory(null)}
                    >

                        <div
                            className="odm-box"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <div className="odm-head">

                                <h3>
                                    {selectedCategory} Products
                                </h3>

                                <button
                                    className="odm-close"
                                    onClick={() => setSelectedCategory(null)}
                                >
                                    ✕
                                </button>

                            </div>

                            <div className="odm-body">

                                {categoryProducts.length > 0 ? (

                                    categoryProducts.map((p) => (

                                        <div key={p._id} style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "15px",
                                            marginBottom: "20px"
                                        }}>

                                            <img src={`http://localhost:8000${p.images?.[0]}`} alt={p.name} style={{
                                                width: "70px",
                                                height: "70px",
                                                objectFit: "cover",
                                                borderRadius: "10px"
                                            }} />
                                            <div>
                                                <strong>{p.name}</strong>
                                                <p>₹{p.price}</p>
                                                <span>Stock: {p.stock}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (<p>No products found.</p>)}
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </div >
    )
}

export default Categories