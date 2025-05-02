import { Order } from "../Model/Order.js";
import { Cart } from "../Model/Cart.js";

export const order = async (req, res) => {
  try {
    let { id } = req.params; //cartId
    let { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let order = await Order.findOne({ cartId: id });
    let cart = await Cart.findOne({ _id: id });

    let total = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    let totalPrice = total * 1.07;

    if (!order) {
      order = new Order({
        cartId: id,
        userId: cart.userId,
        orders: [
          {
            item: cart.items,
            totalPrice: totalPrice.toFixed(2),
            status: "pending",
            date: new Date(),
          },
        ],
        name,
        email,
        phone,
        address,
      });
    } else {
      order.orders.push({
        item: cart.items,
        totalPrice: totalPrice.toFixed(2),
        status: "pending",
        date: new Date(),
      });
      order.name = name;
      order.email = email;
      order.phone = phone;
      order.address = address;
    }

    const latestOrder = order.orders[order.orders.length - 1];

    // 1 userId จะมี cartId 1 อันเป็นของตัวเอง และทุกๆ order จะมี userID กำกับไว้ และมีหลายๆ orders รวมกันเป็นประวัติใน array []
    await order.save();
    res
      .status(200)
      .json({ message: "Order created successfully", order, latestOrder });
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (req, res) => {
  try {
    const { userid } = req.body;
    const order = await Order.findOne({ userId: userid }).exec();
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order found", order: order.orders });
  } catch (error) {
    console.log(error);
  }
};
