"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTraining } from "@/actions";
import { Box, Typography } from "@mui/material";

export default function TrainingDetails() {
  const params = useParams();
  const id = params.id as string;
  const [training, setTraining] = useState<any>(null);

  useEffect(() => {
    const fetchTraining = async () => {
      const res = await getTraining(id);
      if (res.success) {
        setTraining(res.training);
      }
    };

    if (id) {
      fetchTraining();
    }
  }, [id]);

  if (!training) {
    return (
      <Box sx={{ color: "#fff", textAlign: "center", mt: 4 }}>
        <Typography>Ładowanie...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 2, mt: 3, maxWidth: "1300px", margin: "0 auto", px: 2 }}>
      <Typography
        sx={{
          backgroundColor: "rgba(47, 72, 88, 0.25)",
          border: "2px solid #2f4858",
          borderRadius: "31px",
          padding: { xs: "10px 20px", md: "20px 30px" },
          color: "#fff",
          fontFamily: "Michroma",
          textTransform: "uppercase",
          fontSize: "24px",
          textAlign: "center",
          mb: 4,
        }}
        variant="h5"
        component="h1"
      >
        {training.name}
      </Typography>
      {training.days.map((day: any) => (
        <Box
          key={day.id}
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
              Dzień {day.dayNumber}
            </Typography>
          </Box>
          {day.savedParties.length > 0 && (
            <Box
              sx={{
                backgroundColor: "#161A1D",
                borderRadius: "31px",
                padding: "1rem 2rem",
                color: "#fff",
                fontFamily: "Michroma",
              }}
            >
              <Typography sx={{ fontFamily: "Michroma" }}>
                {day.savedParties.join(" + ")}
              </Typography>
            </Box>
          )}

          {day.savedParties.map((party: string) => (
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
                <Typography sx={{ fontFamily: "Michroma" }}>{party}</Typography>
              </Box>

              {day.selectedExercises[party]?.length > 0 && (
                <Box sx={{ pb: 2 }}>
                  {day.selectedExercises[party]?.map((exerciseName: string) => (
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
                      <Typography sx={staticInfoSx}>
                        {day.exerciseDetails[exerciseName]?.series
                          ? `${day.exerciseDetails[exerciseName].series} series`
                          : "Brak serii"}
                      </Typography>
                      <Typography sx={staticInfoSx}>
                        {day.exerciseDetails[exerciseName]?.reps
                          ? `${day.exerciseDetails[exerciseName].reps} reps`
                          : "Brak powtórzeń"}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

const staticInfoSx = {
  backgroundColor: "rgba(0, 185, 160, 0.25)",
  border: "2px solid #00af97",
  borderRadius: "31px",
  color: "#FFF",
  fontFamily: "Michroma",
  textTransform: "none",
  fontSize: "12px",
  p: "0.5rem 1rem",
  textAlign: "center",
  minWidth: "124px",
  padding: "11px 16px",
};
