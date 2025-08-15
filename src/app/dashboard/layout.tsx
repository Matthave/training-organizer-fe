"use client";

import { getLogoutUser } from "@/actions";
import { AppBar, Avatar, Box, Menu, MenuItem, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    handleClose();
  };

  const handleLogout = async () => {
    const res = await getLogoutUser();

    if (res.status === 200) {
      handleClose();
      router.push("/");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(29, 30, 32, 0.9)",
        minHeight: "100vh",
        color: "#FFFFFF",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#161A1D",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "flex-end",
            height: "64px",
          }}
        >
          <Box
            component="img"
            src="/images/log.png"
            alt="logo"
            onClick={() => router.push("/dashboard")}
            sx={{
              width: 41,
              height: 41,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
            }}
          />
          <Box
            onClick={handleClick}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 41,
              height: 41,
              border: "2px solid #fdbd32",
              borderRadius: "50%",
              padding: "2px",
              cursor: "pointer",
            }}
          >
            <Avatar
              alt="User Avatar"
              src="/images/avatar.svg"
              sx={{ width: 26, height: 26 }}
            />
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{
              "& .MuiPaper-root": {
                mt: 1,
                backgroundColor: "transparent",
                borderRadius: "31px",
              },
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
              sx: {
                minWidth: 250,
                backgroundColor: "rgba(85, 85, 85, 0.85)",
                borderRadius: "31px",
                padding: "16px",
                color: "#FFFFFF",
              },
            }}
          >
            <MenuItem
              onClick={() => handleNavigate("/dashboard/profile")}
              sx={{
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#fdbd32",
                },
              }}
            >
              Mój profil
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigate("/dashboard/create-training")}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#fdbd32",
                },
              }}
            >
              Stwórz trening
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigate("/dashboard/exercises")}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#fdbd32",
                },
              }}
            >
              Biblioteka ćwiczeń
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigate("/dashboard/trainings")}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#fdbd32",
                },
              }}
            >
              Gotowe treningi
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#fdbd32",
                },
              }}
            >
              Wyloguj
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          padding: "2rem",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
