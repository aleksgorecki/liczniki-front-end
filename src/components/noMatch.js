import { Typography, Paper, Container } from "@mui/material"

export const NoMatch = () => {
    return (
        <>
        <Container maxWidth='sm'>
            <Paper sx={{p: 2}}>
                <Typography variant="h5" align="center">
                    Nie znaleziono strony
                </Typography>
            </Paper>
        </Container>
        </>
    )
}