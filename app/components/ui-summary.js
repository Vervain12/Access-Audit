import { Box, Typography } from "@mui/material";
export default function UISummary({ui_summary}) {

    const getScoreColor = (score) => {
        if (score < 50) return '#DC2626';
        if (score < 80) return '#FACC15';
        return '#22C55E';  
    }

    return (
        <Box sx={{ backgroundColor: '#F9FAFB', padding: 2, borderRadius: 2, height: "100%", overflow: "auto", overflowX: "hidden"}}>
            <Box sx={{ flexDirection: "column", display: "flex", alignItems: "flex-start"}}>
                <Box sx={{ flexDirection: "row", display: "flex"}}>
                    <Box sx={{
                        width: 60,
                        minWidth: 60,
                        height: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#374151",
                        mr: 2,
                        borderRadius: '50%',
                        display: 'flex',
                        fontFamily: "inter",
                        backgroundColor: getScoreColor(ui_summary.rating),
                    }} >{ui_summary.rating}</Box>
                    <Typography variant="body1" gutterBottom sx={{color: "black", fontFamily: "inter", fontSize: 17}}>
                        {ui_summary.summary}
                    </Typography>
                </Box>

                <Box sx={{ width: '100%', display: 'flex', flexDirection: "column", alignItems: 'center', my: 3,  }}>
                    <Typography variant="h6" sx={{color: '#374151', fontWeight: 600, textAlign: 'center', paddingBottom: 1}}>
                        General Recommendation
                    </Typography>
                    <Box sx={{justifyContent: "center", justifySelf: "center", display: 'flex'}}>
                        <Typography variant="body1" gutterBottom sx={{color: "black", fontFamily: "inter", fontSize: 17, whiteSpace: "pre-line", lineHeight: 2}}>
                            {ui_summary.recommendation}
                        </Typography>                        
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}