const connection = require('../config');

// Get orders by user ID
exports.getOrders = async (req, res) => {
    const { userId } = req.params
    try {
      // Fetch orders based on user ID from the database
      const selectQuery = 'SELECT * FROM orders WHERE order_user_id = ?';
      const orders = await executeQuery(selectQuery, [userId]);
  
      // Send the orders as a response
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };

// Get a specific order by order ID
exports.getOrderItems = async (req, res) => {
  const { orderId } = req.params;
  try {
    const selectQuery = `
      SELECT
        orders.order_id,
        orders.order_user_id,
        orders.order_total,
        orders.order_date,
        orders.order_user_name,
        orders.order_user_email,
        orders.order_user_address,
        orders.order_card_number,
        orders.order_card_expiration,
        orders.order_card_ccv,
        orderItems.item_id,
        orderItems.item_amount,
        orderItems.item_price_at_time
      FROM
        orders
      JOIN
        orderItems ON orders.order_id = orderItems.order_id
      WHERE
        orders.order_id = ?
    `;
    const order = await executeQuery(selectQuery, [orderId]);

    // Send the order as a response
    if (order.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(order);
    }
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  const {
    order_user_id,
    order_user_name,
    order_user_email,
    order_user_address,
    order_cardNumber,
    order_cardExpiration,
    order_cardCcv,
    order_total,
    items,
  } = req.body;

  try {
    // Generate a random order ID
    const orderId = `${order_user_id}-${Math.floor(Math.random() * 100000)}`;
    console.log(orderId)
    console.log(Math.floor(Math.random() * 100000))
    // Insert the new order into the orders table
    const insertOrderQuery =
      'INSERT INTO orders (order_user_id, order_id, order_total, order_date, order_user_name, order_user_email, order_user_address, order_card_number, order_card_expiration, order_card_ccv) VALUES (?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?)';
    await executeQuery(insertOrderQuery, [
      order_user_id,
      orderId,
      order_total,
      order_user_name,
      order_user_email,
      order_user_address,
      order_cardNumber,
      order_cardExpiration,
      order_cardCcv,
    ]);

    // Insert the order items into the orderItems table
    const insertItemQuery =
      'INSERT INTO orderItems (order_id, item_id, item_amount, item_price_at_time) VALUES (?, ?, ?, ?)';
    for (const item of items) {
      console.log(item)
      await executeQuery(insertItemQuery, [
        orderId,
        item.item_id,
        item.item_amount,
        item.item_price_at_time,
      ]);
    }

    // Send a success response indicating that the order was created
    res.json({ message: 'Order created successfully', order_id: orderId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};


  // Helper function to execute a SQL query
  function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
      connection.query(query, params, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }