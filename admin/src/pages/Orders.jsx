import React, { useState, useEffect } from 'react'
import Aside from '../Common/Aside'
import axios from "axios";
function Orders() {
    const [orders, setOrders] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [activeTab, setActiveTab] = useState('All')
    const [sortType, setSortType] = useState('default')
    const [sortOrder, setSortOrder] = useState('desc')
    const [customerOrder, setCustomerOrder] = useState('asc')
    const [statusOrder, setStatusOrder] = useState('asc')
    useEffect(() => {
        fetch("http://localhost:8000/orders")
            .then(res => res.json())
            .then(data => {
                setOrders(data.orders || data)
            })
            .catch(err => console.log(err))
    }, [])

    const viewOrder = (order) => {
        setSelectedOrder(order)
        setShowModal(true)
    }

    const deleteOrder = async (id) => {
        const confirmDelete = window.confirm("Delete this order?")

        if (!confirmDelete) return

        try {
            const res = await fetch(`http://localhost:8000/delete-order/${id}`, {
                method: "DELETE"
            })

            const data = await res.json()

            if (data.success) {
                setOrders(prev => prev.filter(order => order._id !== id))
            }

        } catch (err) {
            console.log("Delete error:", err)
        }
    }
    const updateDelivery = async (id, status) => {

        try {

            await axios.put(
                `http://localhost:8000/update-delivery-status/${id}`,
                {
                    deliveryStatus: status
                }
            );

            setOrders(prev =>
                prev.map(order =>
                    order._id === id
                        ? {
                            ...order,
                            deliveryStatus: status
                        }
                        : order
                )
            );

        } catch (err) {

            console.log(err);

        }

    };
    let filteredOrders =
        activeTab === 'All'
            ? [...orders]
            : orders.filter(
                order =>
                    order.status?.toLowerCase() === activeTab.toLowerCase()
            )

    if (sortType === 'amount') {
        filteredOrders.sort((a, b) =>
            sortOrder === 'desc'
                ? b.amount - a.amount
                : a.amount - b.amount
        )
    }

    if (sortType === 'customer') {
        filteredOrders.sort((a, b) =>
            customerOrder === 'asc'
                ? a.customer.localeCompare(b.customer)
                : b.customer.localeCompare(a.customer)
        )
    }
    if (sortType === 'status') {

        const statusPriority = {
            paid: 1,
            pending: 2,
            failed: 3
        }

        filteredOrders.sort((a, b) => {

            const statusA =
                statusPriority[a.status?.toLowerCase()] || 99

            const statusB =
                statusPriority[b.status?.toLowerCase()] || 99

            return statusOrder === 'asc'
                ? statusA - statusB
                : statusB - statusA
        })
    }
    if (sortType === 'date') {
        filteredOrders.sort((a, b) =>
            sortOrder === 'desc'
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date)
        )
    }

    return (
        <div>
            <Aside />

            <div className="admin-main">
                <main className="admin-content">

                    <div className="page-heading">
                        <div>
                            <h1>Orders</h1>
                            <p>Manage and track all customer orders</p>
                        </div>
                    </div>

                    <div className="stat-grid">
                        <div className="stat-card" onClick={() => setActiveTab("All")}>
                            <span>Total Orders</span>
                            <h2>{orders.length}</h2>
                        </div>

                        <div className="stat-card" onClick={() => setActiveTab("Paid")}>
                            <span>Paid</span>
                            <h2>
                                {orders.filter(o => o.status?.toLowerCase() === "paid").length}
                            </h2>
                        </div>

                        <div className="stat-card" onClick={() => setActiveTab("Pending")}>
                            <span>Pending</span>
                            <h2>
                                {orders.filter(o => o.status?.toLowerCase() === "pending").length}
                            </h2>
                        </div>

                        <div className="stat-card" onClick={() => setActiveTab("Failed")}>
                            <span>Failed</span>
                            <h2>
                                {orders.filter(o => o.status?.toLowerCase() === "failed").length}
                            </h2>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.5rem' }}>
                        {['All', 'Paid', 'Pending', 'Failed'].map(tab => (
                            <button key={tab} className={`chart-tab ${activeTab === tab ? "active" : ""}`}
                                onClick={() => setActiveTab(tab)}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="card">
                        <table className="admin-table center-head">
                            <thead>
                                <tr>
                                    <th >Order Name</th>

                                    <th className='center-head'
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            if (sortType === 'customer') {
                                                setCustomerOrder(prev =>
                                                    prev === 'asc' ? 'desc' : 'asc'
                                                )
                                            } else {
                                                setSortType('customer')
                                                setCustomerOrder('asc')
                                            }
                                        }} >
                                        Customer ▲▼
                                    </th>

                                    <th
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            if (sortType === 'amount') {
                                                setSortOrder(prev =>
                                                    prev === 'desc' ? 'asc' : 'desc'
                                                )
                                            } else {
                                                setSortType('amount')
                                                setSortOrder('desc')
                                            }
                                        }}
                                    >
                                        Amount ▲▼
                                    </th>

                                    <th
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {

                                            if (sortType === 'status') {

                                                setStatusOrder(prev =>
                                                    prev === 'asc' ? 'desc' : 'asc'
                                                )

                                            } else {

                                                setSortType('status')
                                                setStatusOrder('asc')
                                            }
                                        }}
                                    >
                                        Status ▲▼
                                    </th>
                                    <th>Delivery</th>
                                    <th
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            if (sortType === 'date') {
                                                setSortOrder(prev =>
                                                    prev === 'desc' ? 'asc' : 'desc'
                                                )
                                            } else {
                                                setSortType('date')
                                                setSortOrder('desc')
                                            }
                                        }}
                                    >
                                        Date ▲▼
                                    </th>

                                    <th className="center-head">Action</th>
                                    <th className="center-head">Delivery Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredOrders.map(order => {
                                    return (
                                        <tr key={order._id}>
                                            <td>{order.name}</td>
                                            <td>{order.customer}</td>
                                            <td>₹{order.amount}</td>

                                            <td>
                                                <span className={`status-badge ${order.status?.toLowerCase()}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="status-badge">
                                                    {order.status?.toLowerCase() === "failed"
                                                        ? "-"
                                                        : order.status?.toLowerCase() === "pending"
                                                            ? "Awaiting Payment"
                                                            : (order.deliveryStatus || "Processing")}
                                                </span>
                                            </td>
                                            <td>
                                                {new Date(order.date).toLocaleString('en-IN', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>

                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="table-btn"
                                                        onClick={() => viewOrder(order)}
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => deleteOrder(order._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>

                                            <td>
                                                {order.status?.toLowerCase() === "paid" && (
                                                    order.deliveryStatus === "Delivered" ? (
                                                        <span className="completed-status">
                                                            ✔ Completed
                                                        </span>
                                                    ) : (
                                                        <select
                                                            className="delivery-select"
                                                            value={order.deliveryStatus || "Packaging"}
                                                            onChange={(e) =>
                                                                updateDelivery(order._id, e.target.value)
                                                            }
                                                        >
                                                            <option>Packaging</option>
                                                            <option>Shipped</option>
                                                            <option>Delivered</option>
                                                        </select>
                                                    )
                                                )}
                                            </td>
                                        </tr>
                                    )


                                })}
                            </tbody>
                        </table>
                    </div>

                    {showModal && selectedOrder && (
                        <div
                            className="order-detail-modal open"
                            onClick={() => setShowModal(false)}
                        >
                            <div
                                className="odm-box"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="odm-head">
                                    <h3>{selectedOrder.name}</h3>

                                    <button
                                        className="odm-close"
                                        onClick={() => setShowModal(false)}
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="odm-body">
                                    <p><strong>Customer:</strong> {selectedOrder.customer}</p>
                                    <p><strong>Amount:</strong> ₹{selectedOrder.amount}</p>
                                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {new Date(selectedOrder.date).toLocaleString('en-IN', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div >
        </div >
    )
}

export default Orders