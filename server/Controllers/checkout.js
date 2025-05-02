import "dotenv/config";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SK);
import { Order } from "../Model/Order.js";

export const checkout = async (req, res) => {
  try {
    // 1 เอาข้อมูล order มา
    const { orderLatestId, orderid } = req.body;
    let getOrder = await Order.findOne({ _id: orderid }).exec();
    const orderIdToPayment = getOrder.orders.find(
      (order) => order.id === orderLatestId
    );

    if (!orderIdToPayment) {
      return res.status(400).json({ message: "order not found" });
    }

    //2 สร้าง checkout session ด้วย stripe
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: {
        order_id: "" + orderIdToPayment._id,
        name: orderIdToPayment.item.map((item) => item.name).join(", "),
        email: getOrder.email,
        phone: getOrder.phone,
        address: getOrder.address,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "thb",
            product_data: {
              name: orderIdToPayment.item.map((item) => item.name).join(", "),
              description:
                "Thank you for your order with us please enter 4242 4242 4242 4242 as the card number",
            },
            unit_amount: Math.round(orderIdToPayment.totalPrice * 100),
          },
        },
      ],
      mode: "payment",
      return_url: `https://jsshop.vercel.app/checkout/complete/{CHECKOUT_SESSION_ID}/${orderid}`,
    });

    const getCustomer = await stripe.customers.list();
    if (
      !getCustomer.data
        .map((item) => item.email && item.name)
        .includes(getOrder.email && getOrder.name)
    ) {
      const createCustomer = await stripe.customers.create({
        name: getOrder.name,
        email: getOrder.email,
        metadata: { order_id: "" + orderIdToPayment._id },
      });
    }

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
  }
};

export const checkoutStatus = async (req, res) => {
  try {
    const { session_id, order_id } = req.params;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const orderId = session.metadata.order_id;

    if (session.status !== "complete" || !orderId) {
      return res.status(400).json({
        message: "Something went wrong with your order or order not found",
      });
    }
    let getOrder = await Order.findOne({ _id: order_id }).exec();
    const result = await Order.findOneAndUpdate(
      {
        _id: getOrder._id,
        "orders._id": orderId, //หา orders_id ใน array ที่ตรงกับ orderId ที่รับมา จาก ในorder_id
      },
      {
        $set: {
          "orders.$.status": "paid",
        }, //จากนั้น set status ==> "paid"
      },
      { new: true }
    );

    res.json({ message: "Payment success", status: session.status });
  } catch (error) {
    console.log(error);
  }
};

export const getDashboard = async (req, res) => {
  try {
    const balance = await stripe.balance.retrieve();
    const getCustomer = await stripe.customers.list();
    const saleReport = await Order.aggregate([
      { $unwind: "$orders" }, // แยกออเดอร์ออกจาก Array
      { $match: { "orders.status": "paid" } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 }, // นับจำนวนออเดอร์
          totalSales: { $sum: "$orders.totalPrice" }, // รวมยอดขายทั้งหมด
        },
      },
    ]);
    const totalItemsSale = await Order.aggregate([
      { $unwind: "$orders" },
      { $unwind: "$orders.item" },
      { $match: { "orders.status": "paid" } },
    ]);
    const bestSeller = await Order.aggregate([
      { $unwind: "$orders" },
      { $unwind: "$orders.item" },
      { $match: { "orders.status": "paid" } },
      {
        $group: {
          _id: "$orders.item.name", // จับกลุ่มตามชื่อสินค้า
          totalSold: { $sum: "$orders.item.quantity" }, // รวมจำนวนสินค้าที่ขาย
          image: { $first: "$orders.item.image" },
          price: {
            $sum: {
              $multiply: ["$orders.item.quantity", "$orders.item.price"],
            },
          },
        },
      },
      { $sort: { totalSold: -1 } }, // เรียงจากมากไปน้อย
      { $limit: 5 }, // เอาแค่ 5 อันดับแรก
    ]);

    const salesByDate = await Order.aggregate([
      { $unwind: "$orders" },
      { $match: { "orders.status": "paid" } }, // นับเฉพาะออเดอร์ที่จ่ายเงินแล้ว
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$orders.date" } },
          totalSales: { $sum: "$orders.totalPrice" }, // รวมยอดขายในแต่ละวัน
        },
      },
      { $sort: { _id: 1 } }, // เรียงตามวันที่
      { $limit: 7 },
    ]);
    const revenueByProduct = await Order.aggregate([
      { $unwind: "$orders" },
      { $unwind: "$orders.item" },
      { $match: { "orders.status": "paid" } },
      {
        $group: {
          _id: "$orders.item.name",
          totalRevenue: {
            $sum: {
              $multiply: ["$orders.item.quantity", "$orders.item.price"],
            },
          },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 }, // เอาแค่ 5 อันดับแรก
    ]);
    const topCustomers = await Order.aggregate([
      { $unwind: "$orders" },
      { $match: { "orders.status": "paid" } },
      {
        $group: {
          _id: "$userId",
          totalSpent: { $sum: "$orders.totalPrice" },
          name: { $first: "$name" },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      balance: balance.pending[0].amount / 100,
      customer: getCustomer.data.length,
      saleReport: saleReport,
      totalItemsSale: totalItemsSale.length,
      bestSeller: bestSeller,
      salesByDate: salesByDate,
      revenueByProduct: revenueByProduct,
      topCustomers: topCustomers,
    });
  } catch (error) {
    console.log(error);
  }
};
