"use client";

import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import SelectElement from "@/components/Select/Select";
import SliderElement from "@/components/Slider/Slider";
import CheckboxesTags from "@/components/Autocomplete/autocomplete";
import { useState, useMemo, useEffect } from "react";
import { addExercise, getExercises, editExercise } from "@/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ISubpart, IExercise } from "@/types/exercises";
import ExerciseItem from "@/components/ExerciseItem/ExerciseItem";

const partOptions = [
  { name: "Nogi", part: "Nogi" },
  { name: "Plecy", part: "Plecy" },
  { name: "Barki", part: "Barki" },
  { name: "Klatka piersiowa", part: "Klatka piersiowa" },
  { name: "Biceps", part: "Biceps" },
  { name: "Triceps", part: "Triceps" },
  { name: "Brzuch", part: "Brzuch" },
  { name: "Łydki", part: "Łydki" },
  { name: "Przedramiona", part: "Przedramiona" },
];

const subpartOptions = [
  // Klatka piersiowa
  {
    name: "Góra klatki piersiowej (część obojczykowa)",
    part: "Klatka piersiowa",
  },
  {
    name: "Środek klatki piersiowej (część mostkowa)",
    part: "Klatka piersiowa",
  },
  { name: "Dół klatki piersiowej (część brzuszna)", part: "Klatka piersiowa" },
  { name: "Mięsień piersiowy mniejszy", part: "Klatka piersiowa" },

  // Barki
  { name: "Przedni akton barków (część obojczykowa)", part: "Barki" },
  { name: "Boczny akton barków (część barkowa)", part: "Barki" },
  { name: "Tylny akton barków (część grzebieniowa)", part: "Barki" },

  // Plecy - kaptur
  { name: "Górna część kaptura", part: "Plecy" },
  { name: "Środkowa część kaptura", part: "Plecy" },
  { name: "Dolna część kaptura", part: "Plecy" },

  // Plecy - najszerszy grzbietu
  { name: "Górne włókna mięśnia najszerszego grzbietu", part: "Plecy" },
  { name: "Dolne włókna mięśnia najszerszego grzbietu", part: "Plecy" },

  // Plecy - inne mięśnie
  { name: "Mięsień równoległoboczny", part: "Plecy" },
  { name: "Mięsień obły większy", part: "Plecy" },
  { name: "Mięsień obły mniejszy", part: "Plecy" },
  { name: "Prostownik grzbietu (odcinek piersiowy)", part: "Plecy" },
  { name: "Prostownik grzbietu (odcinek lędźwiowy)", part: "Plecy" },
  { name: "Mięsień czworoboczny lędźwi", part: "Plecy" },

  // Ramiona - biceps
  { name: "Głowa krótka (przyśrodkowa) bicepsa", part: "Biceps" },
  { name: "Głowa długa (boczna) bicepsa", part: "Biceps" },
  { name: "Mięsień ramienny (brachialis)", part: "Biceps" },
  {
    name: "Mięsień ramienno-promieniowy (brachioradialis)",
    part: "Przedramiona",
  },

  // Ramiona - triceps
  { name: "Głowa długa tricepsa", part: "Triceps" },
  { name: "Głowa boczna tricepsa", part: "Triceps" },
  { name: "Głowa przyśrodkowa tricepsa", part: "Triceps" },

  // Przedramiona
  { name: "Zginacze nadgarstka", part: "Przedramiona" },
  { name: "Prostowniki nadgarstka", part: "Przedramiona" },
  { name: "Pronatory (nawracacze)", part: "Przedramiona" },
  { name: "Supinatory (odwracacze)", part: "Przedramiona" },

  // Brzuch
  { name: "Górna część mięśnia prostego brzucha", part: "Brzuch" },
  { name: "Dolna część mięśnia prostego brzucha", part: "Brzuch" },
  { name: "Mięśnie skośne zewnętrzne", part: "Brzuch" },
  { name: "Mięśnie skośne wewnętrzne", part: "Brzuch" },
  { name: "Mięsień poprzeczny brzucha", part: "Brzuch" },

  // Nogi - czworogłowy uda
  { name: "Mięsień prosty uda (rectus femoris)", part: "Czworogłowy uda" },
  {
    name: "Mięsień obszerny boczny (vastus lateralis)",
    part: "Czworogłowy uda",
  },
  {
    name: "Mięsień obszerny przyśrodkowy (vastus medialis)",
    part: "Czworogłowy uda",
  },
  {
    name: "Mięsień obszerny pośredni (vastus intermedius)",
    part: "Czworogłowy uda",
  },

  // Nogi - tylna taśma
  { name: "Dwugłowy uda - głowa długa", part: "Tył uda" },
  { name: "Dwugłowy uda - głowa krótka", part: "Tył uda" },
  { name: "Mięsień półścięgnisty", part: "Tył uda" },
  { name: "Mięsień półbłoniasty", part: "Tył uda" },

  // Pośladki
  { name: "Mięsień pośladkowy wielki", part: "Pośladki" },
  { name: "Mięsień pośladkowy średni", part: "Pośladki" },
  { name: "Mięsień pośladkowy mały", part: "Pośladki" },

  // Łydki
  { name: "Mięsień brzuchaty łydki - głowa przyśrodkowa", part: "Łydki" },
  { name: "Mięsień brzuchaty łydki - głowa boczna", part: "Łydki" },
  { name: "Mięsień płaszczkowaty", part: "Łydki" },
];

const partMap: { [key: string]: string[] } = {
  Nogi: ["Czworogłowy uda", "Tył uda", "Pośladki", "Łydki"],
  Plecy: ["Plecy"],
  Barki: ["Barki"],
  "Klatka piersiowa": ["Klatka piersiowa"],
  Biceps: ["Biceps"],
  Triceps: ["Triceps"],
  Brzuch: ["Brzuch"],
  Łydki: ["Łydki"],
  Przedramiona: ["Przedramiona"],
};

const marks = [
  { value: 0, label: "E" },
  { value: 1, label: "D" },
  { value: 2, label: "C" },
  { value: 3, label: "B" },
  { value: 4, label: "A" },
  { value: 5, label: "S" },
];

export default function Exercises() {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [classification, setClassification] = useState<number>(0);
  const [part, setPart] = useState<string[]>([]);
  const [subpart, setSubpart] = useState<ISubpart[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(
    null,
  );
  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });

  const fetchExercises = async () => {
    const response = await getExercises();
    if (response?.success) {
      setExercises(response.exercises);
    } else {
      toast.error(response?.message);
    }
  };

  const filteredSubpartOptions = useMemo(() => {
    if (part.length === 0) {
      return subpartOptions;
    }

    const allowedSubpartParts = part.flatMap((p) => partMap[p] || []);
    return subpartOptions.filter((option) =>
      allowedSubpartParts.includes(option.part),
    );
  }, [part]);

  const groupedExercises = useMemo(() => {
    const groups: { [key: string]: IExercise[] } = {};

    exercises.forEach((exercise) => {
      exercise.part.forEach((p) => {
        if (!groups[p.name]) {
          groups[p.name] = [];
        }
        groups[p.name].push(exercise);
      });
    });

    return groups;
  }, [exercises]);

  const toggleGroup = (partName: string) => {
    setExpandedGroups((prev) =>
      prev.includes(partName)
        ? prev.filter((name) => name !== partName)
        : [...prev, partName],
    );
  };

  useEffect(() => {
    setSubpart((prevSubparts) =>
      prevSubparts.filter((s) => filteredSubpartOptions.includes(s)),
    );
  }, [filteredSubpartOptions]);

  useEffect(() => {
    fetchExercises();
  }, []);

  const isButtonDisabled = formState.name.length < 3 || part.length === 0;

  const handleSelectChange = (value: string[], id: string) => {
    if (id === "part") {
      setPart(value);
    }
  };

  const autocompleteSubpartHandler = (value: ISubpart[]) => {
    setSubpart(value);
  };

  const handleRemoveSubpart = (subpartToRemove: string) => {
    setSubpart((prev) => prev.filter((s) => s.name !== subpartToRemove));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sliderHandler = (value: number) => {
    setClassification(value);
  };

  const handleSubmit = async () => {
    const exerciseData = {
      name: formState.name,
      description: formState.description,
      part: part.map((p) => ({ name: p })),
      subpart: subpart,
      classification,
    };

    if (editingExerciseId) {
      const response = await editExercise(editingExerciseId, exerciseData);
      if (response?.success) {
        toast.success(response.message, {
          position: "bottom-center",
          theme: "dark",
          autoClose: 2000,
        });
        setEditingExerciseId(null);
      } else {
        toast.error(response?.message, {
          position: "bottom-center",
          theme: "dark",
          autoClose: 2000,
        });
      }
    } else {
      const response = await addExercise(exerciseData);
      if (response?.success) {
        toast.success(response.message, {
          position: "bottom-center",
          theme: "dark",
          autoClose: 2000,
        });
      } else {
        toast.error(response?.message, {
          position: "bottom-center",
          theme: "dark",
          autoClose: 2000,
        });
      }
    }

    setFormState({ name: "", description: "" });
    setPart([]);
    setSubpart([]);
    setClassification(0);
    fetchExercises();
  };

  const handleExerciseDeleted = () => {
    fetchExercises();
    toast.success("Pomyślnie usunięto ćwiczenie!", {
      position: "bottom-center",
      theme: "dark",
      autoClose: 2000,
    });
  };

  const handleEditExercise = (exercise: IExercise) => {
    const subpartsFromOptions = exercise.subpart.map((s) => {
      return subpartOptions.find((option) => option.name === s.name);
    });

    setEditingExerciseId(exercise._id);
    setFormState({
      name: exercise.name,
      description: exercise.description,
    });
    setPart(exercise.part.map((p) => p.name));
    setSubpart(
      subpartsFromOptions.filter((s): s is ISubpart => s !== undefined),
    );
    setClassification(exercise.classification);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ pt: 2, mt: 3, maxWidth: "1300px", margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          py: 5,
          px: 2,
        }}
      >
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Typography
          variant="h5"
          component="h1"
          sx={{
            mb: 4,
            color: editingExerciseId ? "#00af97" : "rgba(255, 255, 255, 0.9)",
            fontFamily: "Michroma",
            textTransform: "uppercase",
            fontSize: { xs: "24px", sm: "32px" },
            textAlign: "center",
          }}
        >
          {editingExerciseId
            ? "Tryb edycji ćwiczenia"
            : "Dodaj nowe ćwiczenie do biblioteki"}
        </Typography>
        <div className="filters">
          <div className="filterWrapper">
            <p className="filterWrapper_label">Nazwa*</p>
            <TextField
              autoComplete="off"
              name="name"
              value={formState.name}
              onChange={handleTextChange}
              inputProps={{ maxLength: 50 }}
              sx={{
                "& .MuiInputBase-root": {
                  width: "330px",
                  minHeight: "60px",
                  border: "1px solid #555",
                  boxShadow:
                    "inset 8px 8px 16px #101010, inset -0px 0px 5px #424242",
                  borderRadius: "31px",
                  paddingLeft: "13px",
                  fontSize: "13px",
                  color: "#fff",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  display: "none",
                  color: "#fff",
                },
              }}
            />
          </div>
          <div className="filterWrapper">
            <p className="filterWrapper_label">Partia</p>
            <SelectElement
              optionsToSelect={partOptions}
              selectHandler={handleSelectChange}
              selectState={part}
              id="part"
            >
              {/* Opcje zostaną dodane później */}
            </SelectElement>
          </div>
          <div className="filterWrapper">
            <p className="filterWrapper_label">Podpartia</p>
            <CheckboxesTags
              autocompleteTagsHandler={autocompleteSubpartHandler}
              settedValue={subpart}
              tagsArray={filteredSubpartOptions}
            />
          </div>
          <div className="filterWrapper">
            <p className="filterWrapper_label">Opis</p>
            <TextField
              autoComplete="off"
              name="description"
              value={formState.description}
              onChange={handleTextChange}
              inputProps={{ maxLength: 150 }}
              sx={{
                "& .MuiInputBase-root": {
                  width: "330px",
                  minHeight: "60px",
                  border: "1px solid #555",
                  boxShadow:
                    "inset 8px 8px 16px #101010, inset -0px 0px 5px #424242",
                  borderRadius: "31px",
                  paddingLeft: "13px",
                  fontSize: "13px",
                  color: "#fff",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  display: "none",
                  color: "#fff",
                },
              }}
            />
          </div>
          <div className="filterWrapper">
            <p className="filterWrapper_label">Klasyfikacja (E-S)</p>
            <SliderElement
              minRange={0}
              maxRange={5}
              sliderHandler={sliderHandler}
              settedValue={classification}
              id="classification"
              label="Klasyfikacja (E-S)"
              marks={marks}
            />
          </div>
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {subpart.length > 0 && (
            <p className="filterWrapper_label">Wybrane tagi</p>
          )}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              mt: 2,
              width: "100%",
            }}
          >
            {subpart.map((s) => (
              <Chip
                key={s.name}
                label={s.name}
                onDelete={() => handleRemoveSubpart(s.name)}
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid #fdbd32",
                  color: "#fdbd32",
                  fontFamily: "Michroma",
                  p: 1,
                  py: 3,
                  borderRadius: "31px",
                  "& .MuiChip-deleteIcon": {
                    color: "#fdbd32",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      color: "#fdbd32",
                      transform: "scale(1.1)",
                    },
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {!editingExerciseId && (
          <Button
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            sx={{
              backgroundColor: isButtonDisabled ? "#1d1e20" : "#fdbd32",
              border: isButtonDisabled ? "2px solid grey" : "2px solid #fdbd32",
              borderRadius: "31px",
              color: isButtonDisabled ? "grey" : "#1d1e20",
              width: "330px",
              height: "60px",
              mt: 4,
              textTransform: "none",
              fontSize: "16px",
              transition:
                "background-color 0.3s, border-color 0.3s, color 0.3s",
              fontFamily: "Michroma",
              "&:hover": {
                backgroundColor: isButtonDisabled ? "#1d1e20" : "#ffce51",
                borderColor: isButtonDisabled ? "grey" : "#ffce51",
                color: isButtonDisabled ? "grey" : "#1d1e20",
              },
              "&.Mui-disabled": {
                backgroundColor: "#1d1e20",
                borderColor: "grey",
                color: "grey",
              },
            }}
          >
            Dodaj ćwiczenie
          </Button>
        )}

        {editingExerciseId && (
          <>
            <Button
              onClick={handleSubmit}
              disabled={isButtonDisabled}
              sx={{
                backgroundColor: isButtonDisabled ? "#1d1e20" : "#008371",
                border: isButtonDisabled
                  ? "2px solid grey"
                  : "2px solid #008371",
                borderRadius: "31px",
                color: isButtonDisabled ? "grey" : "#FFF",
                width: "330px",
                height: "60px",
                mt: 4,
                textTransform: "none",
                fontSize: "16px",
                transition:
                  "background-color 0.3s, border-color 0.3s, color 0.3s",
                fontFamily: "Michroma",
                "&:hover": {
                  backgroundColor: isButtonDisabled ? "#1d1e20" : "#00af97",
                  borderColor: isButtonDisabled ? "grey" : "#00af97",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#1d1e20",
                  borderColor: "grey",
                  color: "grey",
                },
              }}
            >
              Edytuj ćwiczenie
            </Button>

            <Button
              onClick={() => {
                setEditingExerciseId(null);
                setFormState({ name: "", description: "" });
                setPart([]);
                setSubpart([]);
                setClassification(0);
              }}
              sx={{
                backgroundColor: "transparent",
                border: "2px solid #008371",
                borderRadius: "31px",
                color: "#FFF",
                width: "330px",
                height: "60px",
                mt: 1,
                textTransform: "none",
                fontSize: "16px",
                transition:
                  "background-color 0.3s, border-color 0.3s, color 0.3s",
                fontFamily: "Michroma",
                "&:hover": {
                  backgroundColor: "#00af97",
                  borderColor: "#00af97",
                },
              }}
            >
              Anuluj tryb edycji
            </Button>
          </>
        )}
      </Box>
      <Box>
        {Object.entries(groupedExercises).map(
          ([partName, exercisesInGroup]) => (
            <div key={partName} className="exerciseGroup">
              <h2
                className="exerciseGroup_title"
                onClick={() => toggleGroup(partName)}
              >
                {partName}
              </h2>
              <div
                className={`exercisesList ${
                  expandedGroups.includes(partName)
                    ? "exercisesList--expanded"
                    : ""
                }`}
              >
                {exercisesInGroup.map((exercise) => (
                  <ExerciseItem
                    key={exercise._id}
                    exercise={exercise}
                    onExerciseDeleted={handleExerciseDeleted}
                    onEditExercise={handleEditExercise}
                  />
                ))}
              </div>
            </div>
          ),
        )}
      </Box>
    </Box>
  );
}
