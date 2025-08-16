"use client";

import {
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import TrainingDay from "@/components/TrainingDay/TrainingDay";
import { getExercises, addTraining } from "@/actions";
import { IExercise } from "@/types/exercises";

interface ExerciseDetails {
  series: number;
  reps: number;
}

export interface TrainingDayState {
  id: number;
  dayNumber: number;
  savedParties: string[];
  selectedExercises: Record<string, string[]>;
  exerciseDetails: Record<string, ExerciseDetails>;
}

export default function CreateTraining() {
  const [trainingDays, setTrainingDays] = useState<TrainingDayState[]>([]);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [nextId, setNextId] = useState(1);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [trainingName, setTrainingName] = useState("");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      const res = await getExercises();
      if (res.success) {
        setExercises(res.exercises);
      }
    };

    fetchExercises();
  }, []);

  const addTrainingDay = () => {
    if (trainingDays.length < 7) {
      const newDay: TrainingDayState = {
        id: nextId,
        dayNumber: trainingDays.length + 1,
        savedParties: [],
        selectedExercises: {},
        exerciseDetails: {},
      };
      setTrainingDays([...trainingDays, newDay]);
      setNextId(nextId + 1);
    }
  };

  const deleteTrainingDay = (dayIdToDelete: number) => {
    setTrainingDays((currentDays) =>
      currentDays
        .filter((day) => day.id !== dayIdToDelete)
        .map((day, index) => ({ ...day, dayNumber: index + 1 })),
    );
  };

  const updateTrainingDay = (updatedDay: TrainingDayState) => {
    setTrainingDays((currentDays) =>
      currentDays.map((day) => (day.id === updatedDay.id ? updatedDay : day)),
    );
  };

  const handleSaveTraining = async () => {
    const trainingData = {
      name: trainingName,
      days: trainingDays,
    };
    const res = await addTraining(trainingData);

    if (res.success) {
      setSaveDialogOpen(false);
      setTrainingName("");
      setTrainingDays([]);
    }
  };

  const handleCancelTraining = () => {
    setTrainingName("");
    setTrainingDays([]);
    setCancelDialogOpen(false);
  };

  return (
    <Box
      sx={{
        pt: 2,
        mt: 3,
        maxWidth: "1300px",
        margin: "0 auto",
        pb: "100px",
        px: 2,
      }}
    >
      <Box
        sx={{
          transition: "all 0.5s ease-in-out",
          ...(trainingDays.length === 0 && {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "calc(100vh - 250px)",
          }),
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "Michroma",
              textTransform: "uppercase",
              fontSize: "24px",
              textAlign: "center",
              lineHeight: "40px",
            }}
            variant="h5"
            component="h1"
          >
            Kreator treningowy
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            onClick={addTrainingDay}
            disabled={trainingDays.length >= 7}
            sx={{
              backgroundColor: "transparent",
              border:
                trainingDays.length >= 7
                  ? "2px solid grey"
                  : "2px solid #00af97",
              borderRadius: "31px",
              color: trainingDays.length >= 7 ? "grey" : "#FFF",
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
            Dodaj dzień treningowy
          </Button>
        </Box>
      </Box>

      <Box>
        {trainingDays.map((day) => (
          <TrainingDay
            key={day.id}
            dayState={day}
            exercises={exercises}
            onDelete={deleteTrainingDay}
            onUpdate={updateTrainingDay}
          />
        ))}
      </Box>
      {trainingDays.length > 0 && (
        <AppBar
          position="fixed"
          sx={{
            top: "auto",
            bottom: 0,
            backgroundColor: "rgba(17, 19, 22, 0.9)",
            py: 1,
          }}
        >
          <Toolbar sx={{ justifyContent: "center" }}>
            <Button
              onClick={() => setCancelDialogOpen(true)}
              sx={{
                backgroundColor: "transparent",
                border: "2px solid #999",
                borderRadius: "31px",
                color: "#999",
                width: "295px",
                height: "54px",
                textTransform: "none",
                fontSize: "16px",
                fontFamily: "Michroma",
                mr: 2,
                "&:hover": {
                  backgroundColor: "#222",
                  borderColor: "#666",
                  color: "#666",
                },
              }}
            >
              Przerwij
            </Button>
            <Button
              onClick={() => setSaveDialogOpen(true)}
              sx={{
                backgroundColor: "#008371",
                border: "2px solid #008371",
                borderRadius: "31px",
                color: "#FFF",
                width: "295px",
                height: "54px",
                textTransform: "none",
                fontSize: "16px",
                transition:
                  "background-color 0.3s, border-color 0.3s, color 0.3s",
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
            >
              Zapisz
            </Button>
          </Toolbar>
        </AppBar>
      )}
      <Dialog
        open={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(17, 19, 22, 0.9)",
            border: "1px solid rgba(0, 175, 151, 0.3)",
            padding: { xs: "10px 20px", md: "20px 30px" },
            color: "#fff",
            width: "400px",
            m: { xs: 1, md: 2 },
          },
        }}
      >
        <DialogTitle
          sx={{ fontFamily: "Michroma", fontSize: { xs: "18px", md: "24px" } }}
        >
          Nazwij swój trening
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nazwa treningu"
            type="text"
            fullWidth
            variant="standard"
            value={trainingName}
            onChange={(e) => setTrainingName(e.target.value)}
            sx={{
              "& .MuiInput-underline:before": { borderBottomColor: "#00af97" },
              "& .MuiInput-underline:after": { borderBottomColor: "#00af97" },
              "& .MuiInputBase-root": { color: "#FFF" },
              "& .MuiInputLabel-root": { color: "#FFF" },
            }}
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
            onClick={() => setSaveDialogOpen(false)}
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
            onClick={handleSaveTraining}
          >
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(17, 19, 22, 0.9)",
            border: "1px solid rgba(0, 175, 151, 0.3)",
            padding: { xs: "10px 20px", md: "20px 30px" },
            color: "#fff",
            width: "400px",
            m: { xs: 1, md: 2 },
          },
        }}
      >
        <DialogTitle
          sx={{ fontFamily: "Michroma", fontSize: { xs: "18px", md: "24px" } }}
        >
          Czy na pewno chcesz przerwać?
        </DialogTitle>
        <DialogContent>
          <Typography>
            Wszystkie niezapisane zmiany zostaną utracone.
          </Typography>
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
            onClick={() => setCancelDialogOpen(false)}
          >
            Anuluj
          </Button>
          <Button
            sx={{
              color: "#FFF",
              backgroundColor: "#d32f2f",
              border: "1px solid #d32f2f",
              fontFamily: "Michroma",
              fontSize: "12px",
              "&:hover": { backgroundColor: "#b71c1c" },
            }}
            onClick={handleCancelTraining}
          >
            Potwierdź
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
