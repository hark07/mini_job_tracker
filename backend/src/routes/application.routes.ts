import { Router } from "express";
import * as controller from "../controllers/application.controller";
import { validate, applicationSchema } from "../middlewares/validate";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validate(applicationSchema), controller.create);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;