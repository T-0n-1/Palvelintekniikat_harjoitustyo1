import express, { Request, Response } from "express";
import dotenv from "dotenv";
import Joi from "joi";
import { Student, studentData, studentsObject } from "../Student";

const router: express.Router = express.Router();
dotenv.config();

// API route to get all students
router.get("/students", (req: Request, res: Response) => {
  const querySchema = Joi.object().unknown(false);
  const { error } = querySchema.validate(req.query);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    const studentsMap = studentsObject.students;
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
// router.post("/updatestudent", (req: Request, res: Response) => {
//   const schema = Joi.object({
//     id: Joi.number().integer().min(1).max(9999).required(),
//     firstName: Joi.string().min(2).max(15).required(),
//     lastName: Joi.string().min(2).max(20).required(),
//     credits: Joi.number().integer().min(0).max(300).required(),
//   }).unknown(false);
//   const { error, value } = schema.validate(req.body);
//   if (error) {
//     res.status(400).json({ error: error.details[0].message });
//   } else {
//     const student = studentsObject.get(value.id);
//     if (student) {
//       oldStudent = { ...student };
//     }
//     student.firstName = value.firstName;
//     student.lastName = value.lastName;
//     student.credits = value.credits;
//     if (oldStudent) {
//       res.json(previous: oldStudent);
//     }
//     res.json(student);

export default router;
