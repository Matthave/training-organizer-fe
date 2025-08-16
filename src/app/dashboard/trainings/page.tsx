"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTrainings } from "@/actions";
import { Box, Typography } from "@mui/material";

export default function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTrainings = async () => {
      const res = await getTrainings();
      if (res.success) {
        setTrainings(res.trainings);
      }
    };

    fetchTrainings();
  }, []);

  const handleTrainingClick = (id: string) => {
    router.push(`/dashboard/trainings/${id}`);
  };

  return (
    <Box
      sx={{ pt: 2, mt: 3, maxWidth: "1300px", margin: "0 auto", px: "25px" }}
    >
      <Box>
        <Typography
          sx={{
            color: "#fff",
            fontFamily: "Michroma",
            textTransform: "uppercase",
            fontSize: "24px",
            textAlign: "center",
          }}
          variant="h5"
          component="h1"
        >
          Twoje treningi
        </Typography>
      </Box>
      {trainings.map((training: any) => (
        <Box
          sx={{
            width: "300px",
            height: "400px",
            backgroundColor: "rgba(0, 185, 160, 0.25)",
            border: "2px solid #00af97",
            borderRadius: "31px",
            p: 2,
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(0, 185, 160, 0.5)",
            },
          }}
          key={training._id}
          onClick={() => handleTrainingClick(training._id)}
        >
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "Michroma",
              textTransform: "uppercase",
              fontSize: "32px",
              textAlign: "center",
            }}
          >
            {training.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
