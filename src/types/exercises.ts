export interface ISubpart {
  name: string;
  part: string;
  _id?: string;
}

export interface IPart {
  name: string;
  _id: string;
}

export interface IExercise {
  name: string;
  description: string;
  part: IPart[];
  subpart: ISubpart[];
  classification: number;
  _id: string;
}
