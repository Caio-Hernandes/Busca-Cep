import { Router } from "express";

import {
  searchByCep,
  searchByAddress
} from "../controllers/search.controller";

const router = Router();

router.get("/cep/:cep", searchByCep);
router.get("/address", searchByAddress);

export default router;