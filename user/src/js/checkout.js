import toast from "react-hot-toast";
let isProcessing = false;

export const handleRazorpayPayment = async (selectedAddress, amount, cartItems) => {
    try {
        if (isProcessing) return;
        isProcessing = true;

        const user = JSON.parse(localStorage.getItem("jwello_user"));

        if (!user) {
            toast.error("User not found ❌");
            return;
        }

        if (!amount || amount <= 0) {
            toast.error("Invalid amount ❌");
            return;
        }

        // 🟡 1. SAVE ORDER (₹)
        const saveRes = await fetch("http://localhost:8000/save-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Jewellery Order",
                products: cartItems,
                amount: Number(amount.toFixed(2)),
                customer: user.name,
                email: user.email,
                address: selectedAddress,
                status: "Pending"
            })
        });

        const savedOrder = await saveRes.json();

        if (!savedOrder || !savedOrder._id) {
            toast.error("Order save failed ❌");
            return;
        }

        // 🟡 2. CREATE RAZORPAY ORDER
        console.log("FINAL AMOUNT:", amount);
        const res = await fetch("http://localhost:8000/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: amount }) // ₹
        });

        const data = await res.json();

        console.log("RAZORPAY ORDER:", data);

        const razorpayAmount = data.amount; // paise
        const razorpayOrderId = data.id;

        if (!razorpayAmount || !razorpayOrderId) {
            toast.error("Payment init failed ❌");
            return;
        }

        // 🟡 3. RAZORPAY
        const options = {
            key: "rzp_test_SpMwdOCtOvvVKT",
            amount: razorpayAmount, // paise
            currency: "INR",
            name: "JWELLO",
            description: "Order Payment",
            order_id: razorpayOrderId,

            theme: { color: "#c9a44c" },

            // ✅ SUCCESS
            handler: async function (response) {
                await fetch("http://localhost:8000/update-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: savedOrder._id,
                        paymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        status: "Paid"
                    })
                });

                // clear cart
                const buyNowProduct =
                    JSON.parse(localStorage.getItem("buyNowProduct"));

                if (buyNowProduct) {
                    localStorage.removeItem("buyNowProduct");
                } else {
                    const cartKey = `jwello_cart_${user.email}`;
                    localStorage.removeItem(cartKey);
                }

                toast.success("Payment Successful ✅");
                window.location.href = "/profile";
            },

            // ✅ CANCEL
            modal: {
                ondismiss: async function () {
                    await fetch("http://localhost:8000/update-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: savedOrder._id,
                            status: "Failed"
                        })
                    });

                    toast.error("Payment Cancelled ❌");
                }
            }
        };

        const rzp = new window.Razorpay(options);

        // ✅ FAILED EVENT
        rzp.on("payment.failed", async function (response) {

            console.log("PAYMENT FAILED:", response);

            await fetch("http://localhost:8000/update-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: savedOrder._id,
                    status: "Failed"
                })
            });

            toast.error("Payment Failed ❌");
        });

        rzp.open();

    } catch (err) {
        console.log(err);
        toast.error("Something went wrong ❌");
    } finally {
        isProcessing = false;
    }
};