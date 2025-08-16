"use client";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { useMemo, useState } from "react";
import SelectElement from "../Select/Select";
import { IExercise } from "@/types/exercises";
import SliderElement from "../Slider/SingleSlider";
import { TrainingDayState } from "@/app/dashboard/create-training/page";

interface TrainingDayProps {
  dayState: TrainingDayState;
  exercises: IExercise[];
  onDelete: (dayId: number) => void;
  onUpdate: (dayState: TrainingDayState) => void;
}

type EditingType = "series" | "reps";

export default function TrainingDay({
  dayState,
  exercises,
  onDelete,
  onUpdate,
}: TrainingDayProps) {
  const { dayNumber, savedParties, selectedExercises, exerciseDetails } =
    dayState;
  const [open, setOpen] = useState(false);
  const [selectedParties, setSelectedParties] = useState<string[]>(
    dayState.savedParties,
  );
  const [exerciseDialogOpen, setExerciseDialogOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState<string | null>(null);
  const [tempSelectedExercises, setTempSelectedExercises] = useState<string[]>(
    [],
  );
  const [sliderDialogOpen, setSliderDialogOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<string | null>(null);
  const [editingType, setEditingType] = useState<EditingType | null>(null);
  const [tempSliderValue, setTempSliderValue] = useState<number>(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<{
    name: string;
    part: string;
  } | null>(null);
  const [dayDeleteDialogOpen, setDayDeleteDialogOpen] = useState(false);

  const parties = useMemo(() => {
    const allParts = exercises.flatMap((exercise) =>
      exercise.part.map((p) => p.name),
    );
    return [...new Set(allParts)].map((name) => ({ name }));
  }, [exercises]);

  const handleDeleteConfirmation = (exerciseName: string, part: string) => {
    setExerciseToDelete({ name: exerciseName, part });
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setExerciseToDelete(null);
  };

  const handleDeleteExercise = () => {
    if (exerciseToDelete) {
      const newPartExercises = selectedExercises[exerciseToDelete.part].filter(
        (ex) => ex !== exerciseToDelete.name,
      );
      onUpdate({
        ...dayState,
        selectedExercises: {
          ...selectedExercises,
          [exerciseToDelete.part]: newPartExercises,
        },
      });
    }
    handleDeleteClose();
  };

  const handleDayDeleteOpen = () => {
    setDayDeleteDialogOpen(true);
  };

  const handleDayDeleteClose = () => {
    setDayDeleteDialogOpen(false);
  };

  const handleDayDeleteConfirm = () => {
    onDelete(dayState.id);
    handleDayDeleteClose();
  };

  const handleSliderDialogClose = () => {
    setSliderDialogOpen(false);
    setEditingExercise(null);
    setEditingType(null);
  };

  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === "number") {
      setTempSliderValue(value);
    }
  };

  const handleSliderSave = () => {
    if (editingExercise && editingType) {
      onUpdate({
        ...dayState,
        exerciseDetails: {
          ...exerciseDetails,
          [editingExercise]: {
            ...exerciseDetails[editingExercise],
            [editingType]: tempSliderValue,
          },
        },
      });
    }
    handleSliderDialogClose();
  };

  const handleSliderClickOpen = (exerciseName: string, type: EditingType) => {
    setEditingExercise(exerciseName);
    setEditingType(type);
    const currentValue = exerciseDetails[exerciseName]?.[type] || 0;
    setTempSliderValue(currentValue);
    setSliderDialogOpen(true);
  };

  const handleExerciseClickOpen = (part: string) => {
    setCurrentPart(part);
    setTempSelectedExercises(selectedExercises[part] || []);
    setExerciseDialogOpen(true);
  };

  const handleExerciseClose = () => {
    setExerciseDialogOpen(false);
    setCurrentPart(null);
  };

  const handleExerciseSelect = (selection: string[]) => {
    setTempSelectedExercises(selection);
  };

  const handleExerciseSave = () => {
    if (currentPart) {
      onUpdate({
        ...dayState,
        selectedExercises: {
          ...selectedExercises,
          [currentPart]: tempSelectedExercises,
        },
      });
    }
    handleExerciseClose();
  };

  const handleClickOpen = () => {
    setSelectedParties(savedParties);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onUpdate({ ...dayState, savedParties: selectedParties });
    handleClose();
  };

  const selectHandler = (filterValue: string[]) => {
    setSelectedParties(filterValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "1rem",
        marginTop: "2rem",
        pb: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          height: "84px",
          backgroundColor: "#161a1d",
          padding: "1rem 2rem",
          borderRadius: "62px",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontFamily: "Michroma",
            fontSize: "24px",
          }}
          component="h2"
        >
          Dzień {dayNumber}
        </Typography>
        <Button
          sx={{
            position: "absolute",
            top: "50%",
            right: "25px",
            transform: "translateY(-50%)",
            backgroundColor: "transparent",
            border: "2px solid #00af97",
            borderRadius: "31px",
            color: "#FFF",
            fontFamily: "Michroma",
            textTransform: "none",
            p: 1,
            px: 2,
            "&:hover": {
              backgroundColor: "#00af97",
              borderColor: "#00af97",
            },
          }}
          className="training-day__delete-button"
          onClick={handleDayDeleteOpen}
        >
          Usuń
        </Button>
      </Box>

      {savedParties.length > 0 && (
        <Box
          sx={{
            backgroundColor: "#161A1D",
            borderRadius: "31px",
            padding: "1rem 2rem",
            color: "#fff",
            fontFamily: "Michroma",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Michroma",
            }}
          >
            {savedParties.join(" + ")}
          </Typography>
        </Box>
      )}

      <Button
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "#008371",
          border: "2px solid #008371",
          borderRadius: "31px",
          color: "#FFF",
          width: "295px",
          height: "54px",
          mt: 2,
          textTransform: "none",
          fontSize: "16px",
          transition: "background-color 0.3s, border-color 0.3s, color 0.3s",
          fontFamily: "Michroma",
          "&:hover": {
            backgroundColor: "#00af97",
            borderColor: "#00af97",
          },
          "&.Mui-disabled": {
            backgroundColor: "#1d1e20",
            borderColor: "grey",
            color: "grey",
          },
        }}
        className="training-day__set-parts-button"
      >
        {savedParties.length > 0 ? "Edytuj partie" : "Ustal partie"}
      </Button>

      {savedParties.map((party) => (
        <Box
          key={party}
          sx={{
            mt: 2,
            p: 2,
            border: "2px dashed #FDBD32",
            borderRadius: "31px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(22, 21, 21, 0.25)",
              border: "1px solid #FDBD32",
              borderRadius: "31px",
              padding: "1rem 2rem",
              color: "#fff",
              fontFamily: "Michroma",
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Michroma",
              }}
            >
              {party}
            </Typography>
          </Box>

          {selectedExercises[party]?.length > 0 && (
            <Box sx={{ pb: 2 }}>
              {selectedExercises[party]?.map((exerciseName) => (
                <Box
                  key={exerciseName}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                    mt: 2,
                  }}
                >
                  <Typography
                    sx={{
                      flexGrow: 1,
                      backgroundColor: "rgba(0, 185, 160, 0.25)",
                      border: "2px solid #00af97",
                      borderRadius: "31px",
                      p: "1rem 2rem",
                      color: "#fff",
                      textAlign: "center",
                      fontFamily: "Michroma",
                    }}
                  >
                    {exerciseName}
                  </Typography>
                  <Button
                    sx={{
                      ...smallButtonSx,
                      width: "124px",
                      px: 0,
                      backgroundColor: exerciseDetails[exerciseName]?.series
                        ? "rgba(0, 185, 160, 0.25)"
                        : "transparent",
                    }}
                    onClick={() =>
                      handleSliderClickOpen(exerciseName, "series")
                    }
                  >
                    {exerciseDetails[exerciseName]?.series
                      ? `${exerciseDetails[exerciseName].series} series`
                      : "Dodaj serie"}
                  </Button>
                  <Button
                    sx={{
                      ...smallButtonSx,
                      width: "183px",
                      px: 0,
                      backgroundColor: exerciseDetails[exerciseName]?.series
                        ? "rgba(0, 185, 160, 0.25)"
                        : "transparent",
                    }}
                    onClick={() => handleSliderClickOpen(exerciseName, "reps")}
                  >
                    {exerciseDetails[exerciseName]?.reps
                      ? `${exerciseDetails[exerciseName].reps} reps`
                      : "Dodaj powtórzenia"}
                  </Button>
                  <Button
                    disabled
                    sx={{
                      ...smallButtonSx,
                      border: "2px solid grey",
                      color: "grey !important",
                    }}
                  >
                    Edytuj
                  </Button>
                  <Button
                    sx={smallButtonSx}
                    onClick={() =>
                      handleDeleteConfirmation(exerciseName, party)
                    }
                  >
                    Usuń
                  </Button>
                </Box>
              ))}
            </Box>
          )}

          <Button
            onClick={() => handleExerciseClickOpen(party)}
            sx={{
              backgroundColor: "transparent",
              border: "2px solid #00af97",
              borderRadius: "31px",
              color: "#FFF",
              fontFamily: "Michroma",
              textTransform: "none",
              p: 1,
              px: 2,
              "&:hover": {
                backgroundColor: "#00af97",
                borderColor: "#00af97",
              },
            }}
          >
            Dodaj ćwiczenie
          </Button>
        </Box>
      ))}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "rgba(17, 19, 22, 0.9)",
            border: "1px solid rgba(0, 175, 151, 0.3)",
            padding: "20px 30px",
            color: "#fff",
          },
        }}
      >
        <DialogTitle>Wybierz partie mięśniowe</DialogTitle>
        <DialogContent>
          <SelectElement
            optionsToSelect={parties}
            selectHandler={selectHandler}
            selectState={selectedParties}
            id="parties-select"
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#FFF",
              backgroundColor: "transparent",
              border: "1px solid #00af97",
              fontFamily: "Michroma",
              fontSize: "12px",
              "&:hover": { backgroundColor: "#008371" },
            }}
            onClick={handleClose}
          >
            Anuluj
          </Button>
          <Button
            sx={{
              color: "#FFF",
              backgroundColor: "#00af97",
              border: "1px solid #00af97",
              fontFamily: "Michroma",
              fontSize: "12px",
              "&:hover": { backgroundColor: "#008371" },
            }}
            onClick={handleSave}
          >
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={exerciseDialogOpen}
        onClose={handleExerciseClose}
        PaperProps={{
          style: {
            backgroundColor: "rgba(17, 19, 22, 0.9)",
            border: "1px solid rgba(0, 175, 151, 0.3)",
            padding: "20px 30px",
            color: "#fff",
          },
        }}
      >
        <DialogTitle>Wybierz ćwiczenie dla {currentPart}</DialogTitle>
        <DialogContent>
          <SelectElement
            optionsToSelect={
              exercises
                .filter((ex) => ex.part.some((p) => p.name === currentPart))
                .map((ex) => ({ name: ex.name })) ?? []
            }
            selectHandler={handleExerciseSelect}
            selectState={currentPart ? tempSelectedExercises : []}
            id="exercise-select"
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#FFF",
              backgroundColor: "transparent",
              border: "1px solid #00af97",
              fontFamily: "Michroma",
              fontSize: "12px",
              "&:hover": { backgroundColor: "#008371" },
            }}
            onClick={handleExerciseClose}
          >
            Anuluj
          </Button>
          <Button
            sx={{
              color: "#FFF",
              backgroundColor: "#00af97",
              border: "1px solid #00af97",
              fontFamily: "Michroma",
              fontSize: "12px",
              "&:hover": { backgroundColor: "#008371" },
            }}
            onClick={handleExerciseSave}
          >
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={sliderDialogOpen}
        onClose={handleSliderDialogClose}
        PaperProps={{
          style: {
            backgroundColor: "rgba(17, 19, 22, 0.9)",
            border: "1px solid rgba(0, 175, 151, 0.3)",
            padding: "20px 30px",
            color: "#fff",
          },
        }}
      >
        <DialogTitle sx={{ fontFamily: "Michroma", fontSize: "24px" }}>
          {editingType === "series"
            ? "Wybierz liczbę serii"
            : "Wybierz liczbę powtórzeń"}
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "40px 0",
          }}
        >
          <SliderElement
            minRange={0}
            maxRange={editingType === "series" ? 10 : 50}
            sliderHandler={handleSliderChange}
            settedValue={tempSliderValue}
            id="slider"
            label={editingType || ""}
            widthElement={200}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#FFF",
              backgroundColor: "transparent",
              border: "1px solid #00af97",
              fontFamily: "Michroma",
              fontSize: "12px",
              "&:hover": { backgroundColor: "#008371" },
            }}
            onClick={handleSliderDialogClose}
          >
            Anuluj
          </Button>
          <Button
            sx={{
              color: "#FFF",
              backgroundColor: "#00af97",
              border: "1px solid #00af97",
              fontFamily: "Michroma",
              fontSize: "12px",
              "&:hover": { backgroundColor: "#008371" },
            }}
            onClick={handleSliderSave}
          >
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteClose}
        PaperProps={{
          style: {
            backgroundColor: "rgba(17, 19, 22, 0.9)",
            border: "1px solid rgba(0, 175, 151, 0.3)",
            padding: "20px 30px",
            color: "#fff",
          },
        }}
      >
        <DialogTitle sx={{ fontFamily: "Michroma", fontSize: "24px" }}>
          {"Potwierdzenie usunięcia"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: "#fff",
              fontFamily: "Michroma",
              padding: "20px 0",
              lineHeight: "28px",
            }}
          >
            Czy na pewno chcesz usunąć ćwiczenie{" "}
            <span style={{ color: "#fdbd32", textTransform: "uppercase" }}>
              {exerciseToDelete?.name}
            </span>
            ? Ćwiczenie zostanie usunięte z partii{" "}
            <span style={{ color: "#00af97", textTransform: "uppercase" }}>
              {exerciseToDelete?.part}
            </span>
            .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#FFF",
              backgroundColor: "transparent",
              border: "1px solid #00af97",
              fontFamily: "Michroma",
              fontSize: "12px",
              "&:hover": { backgroundColor: "#008371" },
            }}
            onClick={handleDeleteClose}
          >
            Anuluj
          </Button>
          <Button
            sx={{
              color: "#FFF",
              backgroundColor: "#00af97",
              border: "1px solid #00af97",
              fontFamily: "Michroma",
              fontSize: "12px",
              "&:hover": { backgroundColor: "#008371" },
            }}
            onClick={handleDeleteExercise}
          >
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dayDeleteDialogOpen}
        onClose={handleDayDeleteClose}
        PaperProps={{
          style: {
            backgroundColor: "rgba(17, 19, 22, 0.9)",
            border: "1px solid rgba(0, 175, 151, 0.3)",
            padding: "20px 30px",
            color: "#fff",
          },
        }}
      >
        <DialogTitle sx={{ fontFamily: "Michroma", fontSize: "24px" }}>
          {"Potwierdzenie usunięcia"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: "#fff",
              fontFamily: "Michroma",
              padding: "20px 0",
              lineHeight: "28px",
            }}
          >
            Czy na pewno chcesz usunąć{" "}
            <span style={{ color: "#fdbd32", textTransform: "uppercase" }}>
              Dzień {dayNumber}
            </span>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#FFF",
              backgroundColor: "transparent",
              border: "1px solid #00af97",
              fontFamily: "Michroma",
              fontSize: "12px",
              "&:hover": { backgroundColor: "#008371" },
            }}
            onClick={handleDayDeleteClose}
          >
            Anuluj
          </Button>
          <Button
            sx={{
              color: "#FFF",
              backgroundColor: "#00af97",
              border: "1px solid #00af97",
              fontFamily: "Michroma",
              fontSize: "12px",
              "&:hover": { backgroundColor: "#008371" },
            }}
            onClick={handleDayDeleteConfirm}
          >
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const smallButtonSx = {
  backgroundColor: "transparent",
  border: "2px solid #00af97",
  borderRadius: "31px",
  color: "#FFF",
  fontFamily: "Michroma",
  textTransform: "none",
  fontSize: "12px",
  p: "0.5rem 1rem",
  "&:hover": {
    backgroundColor: "#00af97",
  },
};
