const connection = require('../config');

// Get orders by user ID
exports.getOrders = async (req, res) => {
    const { userId } = req.params
    try {
      // Fetch orders based on user ID from the database
      const selectQuery = 'SELECT * FROM orders WHERE user_id = ?';
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
      // Fetch the order and its associated items from the database based on order ID
    const selectQuery = `
    SELECT
        orders.order_id,
        orders.user_id,
        orders.order_total,
        orders.order_date,
        orders.order_user_name,
        orderItems.item_id,
        orderItems.item_amount
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
    const { user_id, order_total, order_user_name, items } = req.body;
    console.log(req.body)
    try {
      // Generate a random order ID
      console.log("saasg1")
        const orderId = Math.floor(Math.random() * 100000);
        console.log("saasg2")
        // Insert the new order into the orders table
        const insertOrderQuery = 'INSERT INTO orders (user_id, order_id, order_total, order_date, order_user_name) VALUES (?, ?, ?, NOW(), ?)';
        console.log("saasg3")
        await executeQuery(insertOrderQuery, [user_id, orderId, order_total, order_user_name]);
        console.log("saasg4")
      // Insert the order items into the orderItems table
      const insertItemQuery = 'INSERT INTO orderItems (order_id, item_id, item_amount ,item_price_at_time) VALUES (?, ?, ?,?)';
      for (const item of items) {
        await executeQuery(insertItemQuery, [orderId, item.item_id, item.quantity, item.item_price_at_time]);
      }

      
      // Send a success response indicating that the order was created
      res.json({ message: 'Order created successfully', order_id: orderId });
      
    
    } catch (err) {
      console.log("wuh")
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