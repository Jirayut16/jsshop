import { Cart } from "../Model/Cart.js";

export const getCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ userId: id }).exec();

    res.send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

export const createCart = async (req, res) => {
  try {
    const { userId, items } = req.body;
    // console.log("req.body cart", req.body);

    let cart = await Cart.findOne({ userId }).exec();
    console.log("cart", cart);

    if (!cart) {
      cart = new Cart({ userId, items });
      await cart.save();
    } else {
      items.map((newItem) => {
        const findItem = cart.items.find(
          (itemId) => itemId.productId === newItem.productId
        );
        if (findItem) {
          findItem.quantity += newItem.quantity; //ถ้ามีให้เพิ่มจำนวน
        } else {
          cart.items.push(newItem); //ถ้าไม่มีเพิ่มใหม่
        }
      });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

export const removeItem = async (req, res) => {
  try {
    const { id, productId } = req.params;
    // console.log("req.params", req.params);
    const cart = await Cart.findOneAndUpdate(
      { userId: id },
      { $pull: { items: { productId: productId } } },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({
      message: "Item removed successfully",
      cart: cart,
      deleteProductId: productId,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id, productId } = req.params;
    const { amount } = req.body;
    console.log("req.params edit", req.params);
    console.log("req.body edit", req.body);
    const cart = await Cart.findOneAndUpdate(
      { userId: id, "items.productId": productId },
      { $inc: { "items.$.quantity": amount } },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({
      message: "Quantity updated successfully",
      productId: productId,
      quantity: amount,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params", req.params);
    const cart = await Cart.findOneAndUpdate(
      { userId: id },
      { $set: { items: [] } },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({
      message: "Cart cleared successfully",
      cart: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
