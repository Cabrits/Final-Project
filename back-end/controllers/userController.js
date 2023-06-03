const connection = require('../config');

exports.createUser = async (req, res) => {
    const {user_id, user_name, user_email} = req.body;
    try {
  
      // Insert the new user into the table
      const insertQuery = 'INSERT INTO users (user_id, user_name, user_email) VALUES (?, ?, ?)';
      await executeQuery(insertQuery, [user_id, user_name, user_email]);
  
      // Send a success response indicating that the user was created
      res.json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  };


  // Update user
exports.updateUser = async (req, res) => {
    const userId = req.params.userId;
    const { user_name, user_address } = req.body;
  
    try {
      // Check if the user exists
      const checkQuery = 'SELECT * FROM users WHERE user_id = ?';
      const existingUser = await executeQuery(checkQuery, [userId]);
  
      if (existingUser.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the user's name and/or address
      const updateQuery = 'UPDATE users SET user_name = ?, user_address = ? WHERE user_id = ?';
      await executeQuery(updateQuery, [user_name, user_address, userId]);
  
      // Send a success response indicating that the user was updated
      res.json({ message: 'User updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
  // Add favorite item to user
  exports.addFavoriteItem = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;

    try {
      // Check if the user exists
      const checkUserQuery = 'SELECT * FROM users WHERE user_id = ?';
      const existingUser = await executeQuery(checkUserQuery, [userId]);

      if (existingUser.length === 0) {

        return res.status(404).json({ error: 'User not found' });
        
      }
  
      // Check if the item exists
      const checkItemQuery = 'SELECT * FROM items WHERE item_id = ?';
      const existingItem = await executeQuery(checkItemQuery, [itemId]);
  
      if (existingItem.length === 0) {

        return res.status(404).json({ error: 'Item not found' });
      }
  
      // Add the favorite item to the user
      const addFavouriteQuery = 'INSERT INTO userFavouriteItems (user_id, item_id) VALUES (?, ?)';
      await executeQuery(addFavouriteQuery, [userId, itemId]);
  
      // Send a success response indicating that the item was added to favourites
      res.json({ message: 'Item added to favourites successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
  // Remove favorite item from user
  exports.removeFavoriteItem = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    try {
      // Check if the user exists
      const checkUserQuery = 'SELECT * FROM users WHERE user_id = ?';
      const existingUser = await executeQuery(checkUserQuery, [userId]);
  
      if (existingUser.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the item exists
      const checkItemQuery = 'SELECT * FROM items WHERE item_id = ?';
      const existingItem = await executeQuery(checkItemQuery, [itemId]);
  
      if (existingItem.length === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      // Remove the favourite item from the user
      const removeFavoriteQuery = 'DELETE FROM userFavouriteItems WHERE user_id = ? AND item_id = ?';
      await executeQuery(removeFavouriteQuery, [userId, itemId]);
  
      // Send a success response indicating that the item was removed from favourites
      res.json({ message: 'Item removed from favourites successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
  exports.getUserFavourites = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Get the user's favourite items from the table
      const query = 'SELECT item_id FROM userFavouriteItems WHERE user_id = ?';
      const userFavourites = await executeQuery(query, [userId]);
  
      // Send the user's favourite items as a response
      res.json(userFavourites);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  };

  // Get user
  exports.getUser = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Get the user from the table
      const query = 'SELECT * FROM users WHERE user_id = ?';
      const user = await executeQuery(query, [userId]);
  
      if (user.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send the user data as a response
      res.json(user[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
  // Delete user
  exports.deleteUser = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Check if the user exists
      const checkQuery = 'SELECT * FROM users WHERE user_id = ?';
      const existingUser = await executeQuery(checkQuery, [userId]);
  
      if (existingUser.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Delete the user from the table
      const deleteQuery = 'DELETE FROM users WHERE user_id = ?';
      await executeQuery(deleteQuery, [userId]);
  
      // Send a success response indicating that the user was deleted
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
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