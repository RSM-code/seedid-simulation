import { Router } from "express";
import { addRevenue } from "../controllers/verifierController";

const router: Router = Router();

router.post("/add-revenue", addRevenue);

export default router;
