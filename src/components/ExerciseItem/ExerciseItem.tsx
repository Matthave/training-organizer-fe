import { deleteExercise } from "@/actions";
import { IExercise } from "@/types/exercises";
import { Button } from "@mui/material";

interface IExerciseItemProps {
  exercise: IExercise;
  onExerciseDeleted: () => void;
  onEditExercise: (exercise: IExercise) => void;
}

const classificationMap: { [key: number]: string } = {
  0: "E",
  1: "D",
  2: "C",
  3: "B",
  4: "A",
  5: "S",
};

export default function ExerciseItem({
  exercise,
  onExerciseDeleted,
  onEditExercise,
}: IExerciseItemProps) {
  const { name, subpart, description, classification, _id } = exercise;
  const handleDelete = async () => {
    const res = await deleteExercise(_id);

    if (res.success && onExerciseDeleted) {
      onExerciseDeleted();
    }
  };

  return (
    <div className="exerciseItem">
      <h3 className="exerciseItem_name">{name}</h3>
      <div className="exerciseItem_content">
        <div className="exerciseItem_subparts">
          {subpart.map((s) => (
            <div key={s._id} className="exerciseItem_subpart">
              {s.name}
            </div>
          ))}
        </div>
        <p className="exerciseItem_description">{description}</p>
        <p className="exerciseItem_classification">
          {classificationMap[classification]}
        </p>
      </div>
      <div className="exerciseItem__actions">
        <Button onClick={() => onEditExercise(exercise)}>
          Edytuj ćwiczenie
        </Button>
        <Button onClick={handleDelete}>Usuń ćwiczenie</Button>
      </div>
    </div>
  );
}
