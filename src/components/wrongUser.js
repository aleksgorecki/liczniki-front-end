import { Typography, Paper, Container } from "@mui/material"

export const WrongUser = () => {
    return (
        <>
        <Container maxWidth='sm'>
            <Paper sx={{p: 2}}>
                <Typography variant="h5" align="center">
                    Użytkownik nie posiada wymaganych uprawnień do przeglądania tej strony
                </Typography>
            </Paper>
        </Container>
        </>
    )
}