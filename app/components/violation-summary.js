import { Box, Button, Paper, Typography, CircularProgress, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import { GetViolationSummary } from "../services/ai-services"
import { useEffect, useState } from "react"
import { ExpandMore } from '@mui/icons-material';

export default function ViolationSummary({ violations, violationRefs, handleExpand }){
    const [summary, setSummary] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetSummary();
    },[]);

    const GetSummary = async () => {
        const results = await GetViolationSummary(violations);
        console.log("Summary results:", results.data);
        const parsedResults = JSON.parse(results.data);
        setSummary(parsedResults);
        setLoading(false);
    }

    const getScoreColor = (score) => {
        if (score < 50) return '#DC2626';
        if (score < 80) return '#FACC15'; 
        return '#22C55E';  
    }

    const GoToViolation = (violation_id) => {
        console.log("Scrolling to: ", violation_id);
        handleExpand(violation_id)(null, true);
        setTimeout(() => {
            violationRefs.current[violation_id]?.current?.scrollIntoView({ behavior: "smooth" });
        }, "300")
    }

    return (
        <Box sx={{ width: "100%", }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box sx={{ backgroundColor: '#F9FAFB', padding: 2, borderRadius: 2, height: "100%", overflow: "auto", overflowX: "hidden"}}>
                    <Box sx={{ flexDirection: "row", display: "flex", alignItems: "flex-start"}}>
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
                            backgroundColor: getScoreColor(summary.score),
                        }} >{summary.score}</Box>
                        <Typography variant="body1" gutterBottom sx={{color: "black", fontFamily: "inter", fontSize: 17}}>
                            {summary.summary}
                        </Typography>
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{color: '#374151', fontWeight: 600, textAlign: 'center'}}>
                        Key Fixes
                    </Typography>
                    {Object.entries(summary.priorities).map(([key, priority], index) => (
                        <Accordion 
                            key={index} 
                            sx={{ 
                                mb: 2,
                                borderRadius: 2,
                                border: '1px solid rgba(0, 0, 0, 0.05)',
                                boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
                                '&:before': {
                                    display: 'none',
                                },
                                '&.Mui-expanded': {
                                    margin: '0 0 16px 0',
                                }
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMore sx={{ color: '#0891b2' }} />}
                                sx={{
                                    '& .MuiAccordionSummary-content': {
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    },
                                    backgroundColor: '#E5E7EB',
                                    borderRadius: '8px 8px 0 0',
                                    minHeight: 64,
                                    '&.Mui-expanded': {
                                        minHeight: 64,
                                        borderRadius: '8px 8px 0 0',
                                    }
                                }}
                            >
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#374151', fontFamily: "inter"}}>
                                    {priority.name}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails >
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: "400", color: '#374151', fontFamily: "inter", fontSize: 16, pb: 2}}>
                                        {priority.fix}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button 
                                            onClick={() => GoToViolation(priority.violation_id)} 
                                            variant="contained"
                                            size="medium"
                                            sx={{
                                            backgroundColor: '#0891b2',
                                            '&:hover': {
                                                backgroundColor: '#0e7490',
                                            },
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            fontFamily: "inter"
                                            }}
                                            >View Violation Info</Button> 
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            )}
        </Box>
    )
}