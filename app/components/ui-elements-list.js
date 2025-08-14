import { Box, Button, Paper, Typography, CircularProgress, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import { ExpandMore } from "@mui/icons-material"
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function UiElements({elements}) {
    const getIssueIcon = (issue) => {
        if (issue) {
            return (
                <Box 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'red',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        mr: 2
                    }}
                >
                    <CloseRoundedIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
            );
        }
        if (!issue) {
            return (
                <Box 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'green',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        mr: 2
                    }}
                >
                    <CheckRoundedIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
            );
        }
    }

    return (
        Object.entries(elements).map(([elementName, elementData], index) => (
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
                    expandIcon={<ExpandMore sx={{ color: 'black' }} />}
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {getIssueIcon(elementData.issue)}
                    <Typography variant="h6">
                        {elementName}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        {elementData.issue ? (
                            <Box>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="subtitle1" sx={{ 
                                        fontWeight: 600, 
                                        color: '#dc2626',
                                        fontFamily: "inter", 
                                        fontSize: 14,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        mb: 1
                                    }}>
                                        Issue Description
                                    </Typography>
                                    <Typography variant="body1" sx={{ 
                                        fontWeight: 400, 
                                        color: '#374151', 
                                        fontFamily: "inter", 
                                        fontSize: 16,
                                        lineHeight: 1.6,
                                        pl: 2,
                                        borderLeft: '3px solid #dc2626',
                                        backgroundColor: '#fef2f2',
                                        padding: '12px 16px',
                                        borderRadius: '0 6px 6px 0'
                                    }}>
                                        {elementData.description}
                                    </Typography>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle1" sx={{ 
                                        fontWeight: 600, 
                                        color: '#059669',
                                        fontFamily: "inter", 
                                        fontSize: 14,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        mb: 1
                                    }}>
                                        Recommendation
                                    </Typography>
                                    <Typography variant="body1" sx={{ 
                                        fontWeight: 400, 
                                        color: '#374151', 
                                        fontFamily: "inter", 
                                        fontSize: 16,
                                        lineHeight: 1.6,
                                        pl: 2,
                                        borderLeft: '3px solid #059669',
                                        backgroundColor: '#f0fdf4',
                                        padding: '12px 16px',
                                        borderRadius: '0 6px 6px 0'
                                    }}>
                                        {elementData.recommendation}
                                    </Typography>
                                </Box>
                            </Box>
                        ) : (
                            <Box>
                                <Typography variant="body1" sx={{ fontWeight: "400", color: '#374151', fontFamily: "inter", fontSize: 16, pb: 2}}>
                                    We have found no issue with the UI for this element, meaning our AI has determined it to be accessible. Nice work!
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </AccordionDetails>
            </Accordion>
        ))
    )
}