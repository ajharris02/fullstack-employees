import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";
import express from "express";

const router = express.Router();
export default router;

// TODO: this file!

router.get("/", async (req, res, next) => {
  res.send(await getEmployees());
});

router.post("/", async (req, res, next) => {
  if (!req.body) {
    res.status(400).send();
  }
  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) {
    res.status(400).send();
  }
  res.status(201).send(await createEmployee(req.body));
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (isNaN(+id)) {
    res.status(404).send();
  }
  const employee = await getEmployee(id);
  if (!employee) {
    res.status(404).send();
  }
  res.send(employee);
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const employee = await deleteEmployee(id);
  if (!employee) {
    res.status(404).send();
  }
  res.status(204).send();
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!req.body) {
    res.status(400).send();
  }
  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) {
    res.status(400).send();
  }
  const employee = await updateEmployee(req.body, id);
  if (!employee) {
    res.status(404).send();
  }
  res.status(200).send(employee);
});
