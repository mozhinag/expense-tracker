import Transaction from "../models/transactionModel.js";

//@desc Get all transactions
//@route Get/api/transactions
//@access public

export const getTransactions = (async (req, res,next) => {
  
 try {
   const transactions = await Transaction.find();
   return res.status(200).json({
     success: true,
     count: transactions.length,
     data:transactions,
   })
   
 } catch (error) {
   
   return res.status(500).json({
     success: false,
     error:'server error'
   })
  
 }
});
//@desc Add  transactions
//@route Post/api/transaction
//@access public

export const AddTransaction = (async (req, res, next) => {
  
  
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: "Request body is missing",
      });
    }

    const { text, amount } = req.body;

    // If required fields are missing
    if (!text || !amount) {
      return res.status(400).json({
        success: false,
        error: "Please provide both text and amount fields",
      });
    }
    
   const transaction = await Transaction.create(req.body);

   return res.status(201).json({
     success: true,
     data: transaction,
   });
 } catch (error) {
  return res.status(500).json({
    success: false,
    error: "server error",
  });
 }
});
//@desc Delete transactions
//@route DELETE/api/transaction/:id
//@access public

export const DeleteTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: true,
        error: "No transaction found",
      });
    }

     await transaction.deleteOne();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};