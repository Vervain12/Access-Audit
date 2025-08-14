'use client'
import { useEffect, useRef, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { GetAudit } from "../services/axe-core";
import { Card, CardMedia, Box, Typography, Paper, ToggleButtonGroup, ToggleButton, CircularProgress, Tooltip } from "@mui/material";
import ViolationList from "../components/violation-list";
import ViolationSummary from "../components/violation-summary";
import LinearProgress from '@mui/material/LinearProgress';
import { GetUIReview } from "../services/ai-services";
import UISummary from "../components/ui-summary";
import UiElements from "../components/ui-elements-list";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function AuditorContent() {
    const searchParams = useSearchParams();
    const url = searchParams.get("url");
    const [image, setImage] = useState("");
    const [violations, setViolations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayToggle, setDisplayToggle] = useState(true);
    const violationRefs = useRef({});
    const [expanded, setExpanded] = useState(null);
    const [uiLoading, setUiLoading] = useState(true);
    const [uiSummary, setUiSummary] = useState({});
    const [uiElements, setUiElements] = useState({});

    const handleExpand = (violation_id) => (event, isExpanded) => {
        setExpanded(isExpanded ? violation_id : null);
    }

    //Fetch ui review here as well
    const DoReview = async () => {
        setUiLoading(true);
        const review = await GetUIReview(image);   
        setUiSummary(review.summary);
        setUiElements(review.elements);
        setUiLoading(false);
        console.log("UI Review Results:", review);
    }

    useEffect(() => {
        console.log("Test summary:", uiSummary)
        console.log("Test elements: ", uiElements)
    },[uiSummary, uiElements])

    // Change url to a usestate if able to retest from this page
    useEffect(() => {
        const DoAudit = async () => {
            const audit = await GetAudit(url);
            setImage(audit.image);
            setViolations(audit.results.violations);
            setLoading(false);
        }
        DoAudit();
    },[url])

    const handleSwap = async (event, alignment) => {
        //If true, axe core Audit page
        if (alignment !== null) {
            setDisplayToggle(alignment);   
            
            if (image && Object.keys(uiSummary).length === 0) {
                console.log("Beginning UI review.");
                await DoReview();
            }
        }
    }

    return (
        <div className="w-full h-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 items-center justify-start flex flex-col pt-10">
            {loading ?
            (
                <div className="text-gray-600 text-xl font-outfit space-y-2 items-center justify-center flex flex-col">
                    <p>Scanning Webpage...</p>
                    <LinearProgress color="primary" sx={{ width: "200%"}}/>
                </div>
            )
            :
            (
                <Paper
                    className="space-y-5 pt-5 pl-2 w-9/10 pb-5"
                    sx={{ paddingX: 4 }}>
                    <Box className="flex flex-row space-x-5">
                        <Card sx={{ maxWidth: 345, maxHeight: 480, width: "fit-content", height: "fit-content", overflowY: "auto" }}>
                            <CardMedia
                                component="img"
                                image={`data:image/png;base64,${image}`}
                                alt="Audit Page Screenshot"
                                sx={{ objectFit: "contain",  overflowX: "hidden", overflowY: "auto"}} />
                        </Card>
                        <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
                            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                                <Typography variant="h5" gutterBottom sx={{color: '#374151', fontWeight: 600,}}>
                                    {displayToggle ? "Audit Summary & Key Fixes" : 
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                            AI-Powered UI Critique 
                                            <Tooltip 
                                                title="This automated user interface feedback is intended only as a basic recommendation; It may exclude contextual information or provide suggestions that are unnecessary or unrealistic."
                                                placement="right">
                                                <HelpOutlineIcon sx={{
                                                    color: '#9E9E9E', 
                                                    fontSize: '1rem', 
                                                    position: 'absolute', 
                                                    top: 2,
                                                    right: -18
                                                }}/>
                                            </Tooltip>
                                        </div>
                                    }
                                </Typography>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={displayToggle}
                                    exclusive
                                    onChange={handleSwap}
                                    aria-label="Switch Menu"
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '12px',
                                        border: '1px solid #e5e7eb',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                        marginBottom: 1,
                                        marginTop: 1,
                                        '& .MuiToggleButton-root': {
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '8px 16px',
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                            color: '#6b7280',
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: '#f3f4f6',
                                                color: '#374151'
                                            },
                                            '&.Mui-selected': {
                                                backgroundColor: '#0891b2',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#0e7490'
                                                }
                                            }
                                        }
                                    }}
                                >
                                    <ToggleButton value={true}>Audit</ToggleButton>
                                    <ToggleButton value={false}>UI Critique</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                            {displayToggle ? <ViolationSummary violations={violations} violationRefs={violationRefs} handleExpand={handleExpand}/> : 
                                (uiLoading ? <CircularProgress /> : 
                                    (uiSummary && Object.keys(uiSummary).length > 0 ? <UISummary ui_summary={uiSummary}/> : <div>No UI summary available</div>)
                                )
                            }
                        </Box>
                    </Box>
                    {displayToggle ? <ViolationList violations={violations} violationRefs={violationRefs} expanded={expanded} handleExpand={handleExpand}/> : 
                        (uiLoading ? <></> : 
                            (uiElements && Object.keys(uiElements).length > 0 ? <UiElements elements={uiElements}/> : <></>)
                        )
                    }
                </Paper>
            )}
        </div>
    )
}

function AuditorLoading() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 items-center justify-start flex flex-col pt-10">
            <div className="text-gray-600 text-xl font-outfit space-y-2 items-center justify-center flex flex-col">
                <p>Loading...</p>
                <LinearProgress color="primary" sx={{ width: "200%"}}/>
            </div>
        </div>
    )
}

export default function Auditor() {
    return (
        <Suspense fallback={<AuditorLoading />}>
            <AuditorContent />
        </Suspense>
    )
}