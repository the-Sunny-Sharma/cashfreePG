import { app } from "./app.js";
import { Cashfree } from "cashfree-pg";

Cashfree.XClientId = process.env.CASHFREE_API_KEY;
Cashfree.XClientSecret = process.env.CASHFREE_API_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
