import express from "express";
import Dagger from "../models/dagger.model.js";
import mongoose from "mongoose";
import {
  getDaggers,
  createDaggers,
  updateDagger,
  deleteDagger,
} from "../controllers/dagger.controller.js";

const router = express.Router();

router.get("/", getDaggers);
router.post("/", createDaggers);
router.put("/:id", updateDagger);
router.delete("/:id", deleteDagger);

export default router;
