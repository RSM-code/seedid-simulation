import { Router } from "express";
import { addRevenue } from "../controllers/verifierController";
import { getVerifiers, addVerifier } from "../controllers/VerifierController";


const router: Router = Router();

router.post("/add-revenue", addRevenue);
router.get("/", getVerifiers);
router.post("/", addVerifier);

export default router;
