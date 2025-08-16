import { deleteExercise } from "@/actions";
import { IExercise } from "@/types/exercises";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

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
  const { name, subpart, description, classification, _id, part } = exercise;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const res = await deleteExercise(_id);

    if (res.success && onExerciseDeleted) {
      onExerciseDeleted();
    }
  };

  const handleConfirmDelete = async () => {
    await handleDelete();
    handleClose();
  };

  return (
    <>
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
          <Button onClick={() => onEditExercise(exercise)}>Edytuj</Button>
          <Button onClick={handleClickOpen}>Usuń</Button>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "rgba(17, 19, 22, 0.9)",
            border: "1px solid rgba(0, 175, 151, 0.3)",
            padding: "20px 30px",
            color: "#fff",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontFamily: "Michroma", fontSize: "24px" }}
        >
          {"Potwierdzenie usunięcia"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              color: "#fff",
              fontFamily: "Michroma",
              padding: "20px 0",
              lineHeight: "28px",
            }}
          >
            Czy na pewno chcesz usunąć ćwiczenie{" "}
            <span style={{ color: "#fdbd32", textTransform: "uppercase" }}>
              {name}
            </span>
            ? Ćwiczenie zostanie usunięte z partii{" "}
            <span style={{ color: "#00af97", textTransform: "uppercase" }}>
              {part.map((p) => p.name).join(", ")}
            </span>
            .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            autoFocus
            sx={{
              color: "#FFF",
              backgroundColor: "transparent",
              border: "1px solid #00af97",
              fontFamily: "Michroma",
              fontSize: "12px",
              "&:hover": { backgroundColor: "#008371" },
            }}
          >
            Anuluj
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            autoFocus
            sx={{
              color: "#FFF",
              backgroundColor: "#00af97",
              border: "1px solid #00af97",
              fontFamily: "Michroma",
              fontSize: "12px",
              "&:hover": { backgroundColor: "#008371" },
            }}
          >
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
