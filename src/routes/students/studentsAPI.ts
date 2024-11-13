import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Joi from "joi";
import { Student, studentData, studentsObject } from "../../Student";

const router: express.Router = express.Router();
dotenv.config();

// API route to get all students
router.get("/students", (req: Request, res: Response) => {
  const querySchema = Joi.object().unknown(false);
  const { error } = querySchema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    const studentsMap = studentsObject.getAll();
    const arrayOfStudents = Array.from(studentsMap.values());
    res.json(arrayOfStudents);
  }
});

// API route to get a student by id
router.get("/students/:id", (req: Request, res: Response) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).max(9999),
  }).unknown(false);
  const { error } = schema.validate(req.params);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    const student = studentsObject.get(Number(req.params.id));
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ id: -1, firstName: "", lastName: "", credits: 0 });
    }
  }
});

// API route to POST a new student
router.post("/newstudent", (req: Request, res: Response) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(15).required(),
    lastName: Joi.string().min(2).max(20).required(),
    credits: Joi.number().integer().min(0).max(300).required(),
  }).unknown(false);
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    const student: Student = new Student(
      studentData.length + 1,
      value.firstName,
      value.lastName,
      value.credits,
    );
    studentsObject.add(student);
    res.json(student);
  }
});

// API route to PUT a new student
router.put("/modifystudent", (req: Request, res: Response) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).max(9999).required(),
    firstName: Joi.string().min(2).max(15),
    lastName: Joi.string().min(2).max(20),
    credits: Joi.number().integer().min(0).max(300),
  }).unknown(false);
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    if (!studentsObject.get(value.id)) {
      res.status(404).json({ id: -1, firstName: "", lastName: "", credits: 0 });
    } else {
      const student: Student = studentsObject.get(value.id)!;
      Object.assign(student, value);
      studentsObject.put(student);
      res.json(student);
    }
  }
});

// API route to DELETE a new student
router.delete("/deletestudent/:id", (req: Request, res: Response) => {
  const schema = Joi.object({
    id: Joi.number().integer().min(1).max(9999),
  }).unknown(false);
  const { value, error } = schema.validate(req.params);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    if (!studentsObject.get(value.id)) {
      res.status(404).json({ id: -1, firstName: "", lastName: "", credits: 0 });
    } else {
      const student: Student = studentsObject.get(value.id)!;
      res.json(student);
      studentsObject.remove(student.id);
    }
  }
});

//Route for fetching all fruits from App2
router.get("/fruits", (req: Request, res: Response) => {
  const querySchema = Joi.object().unknown(false);
  const { error } = querySchema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    fetch(
      `http://${process.env.SERVERNAME}:${process.env.SERVERPORT}/api/fruits`,
    )
      .then((rawReturn) => rawReturn.json())
      .then((jsonObject) => {
        console.log(jsonObject);
        return jsonObject;
      })
      .then((jsonObject) => res.json(jsonObject));
  }
});

export default router;
