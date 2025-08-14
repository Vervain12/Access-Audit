import { Modal, Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ErrorModal({open, errorMsg}) {
    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    }

    return (
        <Modal open={open} onClose={() => handleClick()}>
            <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                bgcolor: "white",
                p: 4,
                borderRadius: 2,
                ".dark &": {
                bgcolor: "var(--background)",
                borderColor: "white",
                borderWidth: 2
                },
            }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{ mb: 2, fontWeight: "", color: "black" }}
                >{errorMsg}</Typography>
                <Button
                    variant="contained"
                    size="medium"
                    onClick={() => handleClick()}
                    sx={{
                    backgroundColor: '#0891b2',
                    '&:hover': {
                        backgroundColor: '#0e7490',
                    },
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    padding: '12px 32px',
                    }}
                >
                    Okay
                </Button>
            </Box>
        </Modal>
    )
}