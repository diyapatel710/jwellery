import React, { useState, useEffect } from 'react'
import Aside from '../Common/Aside'
import toast from "react-hot-toast";
function Products() {

    const [showModal, setShowModal] = useState(false)
    const [editId, setEditId] = useState(null)
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        metal: '',
        price: '',
        stock: '',
        status: 'in-stock'
    })
    useEffect(() => {
        fetchProducts()

    }, [])

    const fetchProducts = async () => {

        try {
            const res = await fetch("http://localhost:8000/products")
            const data = await res.json()

            setProducts(data)
        } catch (err) {

            console.log(err)

        }

    }
    const handleEdit = (product) => {

        setProductData({
            name: product.name || '',
            category: product.category || '',
            metal: product.metal || '',
            price: product.price || '',
            stock: product.stock || '',
            status: product.status || 'in-stock'
        })
        setEditId(product._id)

        setShowModal(true)

    }
    const handleSaveProduct = async () => {

        if (productData.name === '') {

            toast.error("Enter product name");

            return

        }
        const updatedData = {

            ...productData,

            status:
                Number(productData.stock) <= 0
                    ? "out-of-stock"
                    : "in-stock"

        }
        try {
            if (editId !== null) {
                await fetch(`http://localhost:8000/products/${editId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedData)
                })
            } else {
                await fetch("http://localhost:8000/products", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedData)
                })
            }
            await fetchProducts()

            setProductData({
                name: '',
                category: '',
                metal: '',
                price: '',
                stock: '',
                status: 'in-stock'
            })

            setEditId(null)

            setShowModal(false)

        } catch (err) {

            console.log(err)

        }

    }

    const handleDelete = async (id) => {

        try {

            await fetch(`http://localhost:8000/products/${id}`, {
                method: "DELETE"
            })

            fetchProducts()

        } catch (err) {

            console.log(err)

        }
    }

    useEffect(() => {

        const params = new URLSearchParams(location.search);

        if (params.get("add") === "true") {

            setShowModal(true);

        }

    }, [location]);
    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.metal.toLowerCase().includes(search.toLowerCase())
    )
    return (
        <div>

            <Aside />

            <div className="admin-main">

                <main className="admin-content">

                    <div className="page-heading">

                        <div>

                            <h1>Products</h1>

                            <p>Manage your jewellery inventory</p>

                        </div>

                        <button
                            className="btn-admin-primary"
                            onClick={() => {

                                setShowModal(true)

                                setEditId(null)

                                setProductData({
                                    name: '',
                                    category: '',
                                    metal: '',
                                    price: '',
                                    stock: '',
                                    status: 'in-stock'
                                })

                            }}
                        >
                            + Add Product
                        </button>

                    </div>

                    <div className="products-card">
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "20px"
                        }}>

                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    padding: "12px",
                                    width: "300px",
                                    borderRadius: "10px",
                                    border: "1px solid #ddd",
                                    fontSize: "15px"
                                }}
                            />

                        </div>
                        <table className="products-table">

                            <thead>

                                <tr>

                                    <th>Product</th>

                                    <th>Category</th>

                                    <th>Metal</th>

                                    <th>Price</th>

                                    <th>Stock</th>

                                    <th>Sales</th>

                                    <th>Status</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredProducts.map((p) => (
                                    <tr key={p._id}>
                                        <td>
                                            <div className="prod-img-cell">
                                                <div className="prod-thumb">
                                                    <img src={`http://localhost:8000${p.images?.[0]}`} alt={p.name} className="prod-thumb-img" />
                                                </div>
                                                <div className="prod-name">
                                                    <strong>{p.name}</strong>
                                                    <span>  SKU: {p._id.slice(-6)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{p.category || "Jewellery"}</td>
                                        <td>{p.metal || "Gold"}</td>
                                        <td>₹{p.price}</td>
                                        <td>

                                            {p.stock || 0}
                                            {
                                                (p.stock || 0) === 0 ? (

                                                    <div style={{
                                                        color: "#EF4444",
                                                        fontSize: "12px",
                                                        fontWeight: "600",
                                                        marginTop: "4px"
                                                    }}>
                                                        Out of Stock
                                                    </div>

                                                ) : (p.stock || 0) <= 5 ? (

                                                    <div style={{
                                                        color: "#F59E0B",
                                                        fontSize: "12px",
                                                        fontWeight: "600",
                                                        marginTop: "4px"
                                                    }}>
                                                        Low Stock
                                                    </div>

                                                ) : null
                                            }

                                        </td>
                                        <td>{p.salesCount || 0} units</td>
                                        <td>
                                            <span className={`stock-badge ${p.status}`}>
                                                {p.status || "in-stock"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="prod-actions">
                                                <button className="act-btn" onClick={() => handleEdit(p)}>
                                                    Edit
                                                </button>
                                                <button className="act-btn del" onClick={() => {
                                                    const confirmDelete = window.confirm(
                                                        "Are you sure you want to delete this product?");
                                                    if (confirmDelete) {
                                                        handleDelete(p._id);
                                                    }
                                                }} >Del
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {showModal && (
                        <div className="modal-overlay" onClick={() => setShowModal(false)}>

                            <div className="modal" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-head">
                                    <h3>  {editId ? 'Edit Product' : 'Add New Product'}</h3>
                                    <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                                </div>
                                <div className="modal-body">
                                    <input className="modal-input" placeholder="Product Name" value={productData.name}
                                        onChange={(e) => setProductData({
                                            ...productData, name: e.target.value
                                        })} />

                                    <select className="modal-input" value={productData.category} onChange={(e) =>
                                        setProductData({
                                            ...productData, category: e.target.value
                                        })}>
                                        <option value="">Select Category</option>
                                        <option value="rings">Rings</option>
                                        <option value="bracelets">Bracelets</option>
                                        <option value="necklaces">Necklaces</option>
                                        <option value="earrings">Earrings</option>
                                        <option value="bangles">Bangles</option>
                                        <option value="pendants">Pendants</option>
                                    </select>

                                    <input className="modal-input" placeholder="Metal" value={productData.metal} onChange={(e) =>
                                        setProductData({
                                            ...productData, metal: e.target.value
                                        })} />

                                    <input type="number" className="modal-input" placeholder="Price" value={productData.price} onChange={(e) =>
                                        setProductData({
                                            ...productData,
                                            price: e.target.value
                                        })} />

                                    <input type="number" className="modal-input" placeholder="Stock" value={productData.stock} onChange={(e) =>
                                        setProductData({
                                            ...productData, stock: e.target.value
                                        })} />

                                    <select className="modal-input" value={productData.status} onChange={(e) =>
                                        setProductData({
                                            ...productData,
                                            status: e.target.value
                                        })}>
                                        <option value="in-stock">In Stock</option>
                                        <option value="out-of-stock">Out Of Stock</option>
                                    </select>
                                </div>

                                <div className="modal-footer">

                                    <button className="act-btn" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>

                                    <button className="btn-admin-primary" onClick={handleSaveProduct}>
                                        {editId ? 'Update Product' : 'Save Product'}
                                    </button>
                                </div>
                            </div>
                        </div>

                    )}

                </main>

            </div >

        </div >
    )
}

export default Products