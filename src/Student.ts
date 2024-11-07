export class Student {
  private _id!: number;
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  private _firstName!: string;
  public get firstName(): string {
    return this._firstName;
  }
  public set firstName(value: string) {
    this._firstName = value;
  }

  private _lastName!: string;
  public get lastName(): string {
    return this._lastName;
  }
  public set lastName(value: string) {
    this._lastName = value;
  }

  private _credits!: number;
  public get credits(): number {
    return this._credits;
  }
  public set credits(value: number) {
    this._credits = value;
  }

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    credits: number,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.credits = credits;
  }
}

export class Students {
  private students: Map<number, Student>;

  constructor(initData: Map<number, Student>) {
    this.students = new Map(initData);
  }

  // Used for POST protocol
  public add(student: Student): Student | undefined {
    const oldStudent: Student | undefined = this.students.get(student.id);
    this.students.set(student.id, student);
    return oldStudent;
  }

  // Used for PUT protocol
  public put(student: Student): Student | undefined {
    return this.add(student);
  }
}
