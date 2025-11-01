import express from 'express';
import { getTransactions,AddTransaction,DeleteTransactions } from '../controllers/transactionController.js';

const router = express.Router();

router.route("/").get(getTransactions).post(AddTransaction);

router.route("/:id").delete(DeleteTransactions);


export default router;

