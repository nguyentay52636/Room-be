const accountModel = require('../models/account.model');



module.exports = {
  getAccount : async (req,res)=> {
    try {
      const accounts = await accountModel.find();
      return res.status(200).json(accounts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
