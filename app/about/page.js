'use client'
import { Box, Typography } from "@mui/material"
import Image from "next/image"

export default function AboutPage() {
    return (
        <main className="w-full h-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 items-center justify-start flex flex-col pt-10 space-y-5">
            <Box
                className="w-full max-w-7xl"
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 4,
                    padding: 6,
                    boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Typography variant="h3" gutterBottom sx={{color: '#374151', fontWeight: 700, textAlign: 'center', fontFamily: "inter"}}>
                    Making <span className="text-cyan-700">Accessibility</span> Easy
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{color: '#374151', fontWeight: 700, fontSize: 20, textAlign: 'center', fontFamily: "inter", marginBottom: 5}}>
                    With <span className="text-cyan-700">Access</span>Audit, you can receive an AI-powered accessibility audit in seconds!
                </Typography>
                
                {/* Features Section */}
                <Box sx={{ 
                    display: "flex", 
                    flexDirection: { xs: "column", md: "row" },
                    gap: 4,
                    marginTop: 4
                }}>
                    {/* Left Section - Audit Summaries */}
                    <Box sx={{
                        flex: 1,
                        display: "flex", 
                        flexDirection: "column",
                        alignItems: "flex-start",
                        paddingRight: { md: 3 }
                    }}>
                        <Typography 
                            variant="h5" 
                            sx={{
                                color: '#374151', 
                                fontWeight: 700, 
                                textAlign: 'left', 
                                fontFamily: "inter",
                                marginBottom: 3
                            }}
                        >
                            Audit Summaries and Key Fixes
                        </Typography>
                        
                        <Box sx={{
                            width: '100%',
                            height: 230,
                            backgroundColor: '#f8fafc',
                            border: '2px dashed #cbd5e1',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 3
                        }}>
                            <Image 
                                src="/images/AuditImage.JPG"
                                width={600}
                                height={800}
                                alt="Picture of the accessibility audit" 
                                style={{ objectFit: "cover", borderRadius: "8px" }}/>
                        </Box>
                        
                        <Typography 
                            variant="body1" 
                            sx={{
                                color: '#374151', 
                                fontWeight: 500, 
                                textAlign: 'left', 
                                fontFamily: "inter",
                                lineHeight: 1.6
                            }}
                        >
                            Helping you make the right changes quickly using prioritized suggestions.
                        </Typography>
                    </Box>

                    <Box sx={{
                        flex: 1,
                        display: "flex", 
                        flexDirection: "column",
                        alignItems: "flex-start",
                        paddingLeft: { md: 3 }
                    }}>
                        <Typography 
                            variant="h5" 
                            sx={{
                                color: '#374151', 
                                fontWeight: 700, 
                                textAlign: 'left', 
                                fontFamily: "inter",
                                marginBottom: 3
                            }}
                        >
                            AI-Powered UI Critique
                        </Typography>
                        
                        <Box sx={{
                            width: '100%',
                            height: 290,
                            backgroundColor: '#f8fafc',
                            border: '2px dashed #cbd5e1',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 3
                        }}>
                            <Image 
                                src="/images/UIImage.JPG"
                                width={600}
                                height={800}
                                alt="Picture of the UI critique" 
                                style={{ objectFit: "cover", borderRadius: "8px" }}/>
                        </Box>
                        
                        <Typography 
                            variant="body1" 
                            sx={{
                                color: '#374151', 
                                fontWeight: 500, 
                                textAlign: 'left', 
                                fontFamily: "inter",
                                lineHeight: 1.6
                            }}
                        >
                            Critiquing what our eyes can see, outlining accessibility issues that the audit cannot!
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </main>
    )
}