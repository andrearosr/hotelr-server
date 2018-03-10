import { Router } from "express";

import hotel from "./hotel";

const router = new Router();
router.use(hotel);

export default router;
