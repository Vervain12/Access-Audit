import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert,
  Link,
  Divider,
  Chip
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import ErrorIcon from '@mui/icons-material/Error';
import React, { useState } from 'react';

export default function ViolationList({ violations, violationRefs, expanded, handleExpand }){

    return (
        <Box sx={{ width: "100%", justifyContent: "center", }}>
            <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                    mb: 3,
                    color: '#374151',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                Accessibility Violations
                <Chip 
                    label={`${violations.length} found`} 
                    color={violations.length > 0 ? "error" : "success"}
                    size="small"
                    sx={{ ml: 1 }}
                />
            </Typography>

            {violations.length === 0 ? (
                <Alert 
                    severity="success" 
                    sx={{ 
                        borderRadius: 2,
                        border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        No accessibility violations found.
                    </Typography>
                    <Typography variant="body2">
                        Your website appears to meet the accessibility standards we tested for.
                    </Typography>
                </Alert>
            ) : (
                violations.map((violation, index) => {
                    if (!violationRefs.current[violation.id]) {
                        violationRefs.current[violation.id] = React.createRef();
                    }

                    return (
                        <div key={index} ref={violationRefs.current[violation.id]}>
                            <Accordion 
                                expanded={expanded === violation.id}
                                onChange={handleExpand(violation.id)}
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
                                        backgroundColor: '#fef2f2',
                                        borderRadius: '8px 8px 0 0',
                                        minHeight: 64,
                                        '&.Mui-expanded': {
                                            minHeight: 64,
                                            borderRadius: '8px 8px 0 0',
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <ErrorIcon sx={{ color: '#dc2626' }} />
                                        <Typography 
                                            variant="h6" 
                                            component="div"
                                            sx={{ 
                                                color: '#374151',
                                                fontWeight: 500
                                            }}
                                        >
                                            {violation.description}
                                        </Typography>
                                    </Box>
                                    <Chip 
                                        label={`${violation.nodes?.length || 0} element(s)`}
                                        size="small"
                                        color="error"
                                        variant="outlined"
                                        sx={{ 
                                            backgroundColor: 'white',
                                            fontWeight: 500
                                        }}
                                    />
                                </AccordionSummary>

                                <AccordionDetails sx={{ backgroundColor: '#fafafa' }}>
                                    <Box>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography 
                                                variant="subtitle2" 
                                                gutterBottom
                                                sx={{ color: '#374151', fontWeight: 600 }}
                                            >
                                                Rule ID: <code style={{ 
                                                    backgroundColor: '#e5e7eb', 
                                                    padding: '2px 6px', 
                                                    borderRadius: '4px',
                                                    fontSize: '0.875rem'
                                                }}>{violation.id}</code>
                                            </Typography>

                                            {violation.helpUrl && (
                                                <Box sx={{ mt: 2 }}>
                                                    <Link 
                                                        href={violation.helpUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        variant="body2"
                                                        sx={{
                                                            color: '#0891b2',
                                                            textDecoration: 'none',
                                                            fontWeight: 500,
                                                            '&:hover': {
                                                                textDecoration: 'underline'
                                                            }
                                                        }}
                                                    >
                                                        Learn more about this rule →
                                                    </Link>
                                                </Box>
                                            )}
                                        </Box>

                                        <Divider sx={{ my: 3 }} />

                                        <Typography 
                                            variant="h6" 
                                            gutterBottom
                                            sx={{ 
                                                color: '#374151',
                                                fontWeight: 600,
                                                mb: 2
                                            }}
                                        >
                                            Affected Elements
                                        </Typography>

                                        {violation.nodes && violation.nodes.length > 0 ? (
                                            <List sx={{ p: 0 }}>
                                                {violation.nodes.map((node, nodeIndex) => (
                                                    <ListItem key={nodeIndex} sx={{ px: 0, py: 2, display: 'block' }}>
                                                        <Paper 
                                                            variant="outlined" 
                                                            sx={{ 
                                                                p: 3,
                                                                borderRadius: 2,
                                                                backgroundColor: 'white',
                                                                border: '1px solid #e5e7eb'
                                                            }}
                                                        >  
                                                            {node.target && (
                                                                <Box sx={{ mb: 2 }}>
                                                                    <Typography 
                                                                        variant="body2" 
                                                                        gutterBottom
                                                                        sx={{ 
                                                                            color: '#374151',
                                                                            fontWeight: 600
                                                                        }}
                                                                    >
                                                                        CSS Selector:
                                                                    </Typography>
                                                                    <Paper 
                                                                        sx={{ 
                                                                            p: 2, 
                                                                            bgcolor: '#f8fafc',
                                                                            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                                                                            fontSize: '0.875rem',
                                                                            border: '1px solid #e2e8f0',
                                                                            borderRadius: 1
                                                                        }}
                                                                    >
                                                                        {node.target}
                                                                    </Paper>
                                                                </Box>
                                                            )}
                                                        
                                                            {node.html && (
                                                                <Box sx={{ mb: 2 }}>
                                                                    <Typography 
                                                                        variant="body2" 
                                                                        gutterBottom
                                                                        sx={{ 
                                                                            color: '#374151',
                                                                            fontWeight: 600
                                                                        }}
                                                                    >
                                                                        HTML Element:
                                                                    </Typography>                                                             
                                                                    <Paper 
                                                                        variant="outlined" 
                                                                        sx={{ 
                                                                            p: 2, 
                                                                            bgcolor: '#f8fafc',
                                                                            border: '1px solid #e2e8f0',
                                                                            borderRadius: 1,
                                                                            overflow: 'auto',
                                                                            maxHeight: '300px'
                                                                        }}
                                                                    >                                                               
                                                                        <pre style={{ 
                                                                            margin: 0, 
                                                                            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                                                                            fontSize: '13px',
                                                                            lineHeight: '1.5',
                                                                            whiteSpace: 'pre-wrap',
                                                                            wordBreak: 'break-word',
                                                                            color: '#374151'
                                                                        }}>
                                                                            {node.html}
                                                                        </pre>
                                                                    </Paper>
                                                                </Box>
                                                            )}
                                                        </Paper>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        ) : (
                                            <Alert 
                                                severity="info"
                                                sx={{ 
                                                    borderRadius: 2,
                                                    border: '1px solid rgba(59, 130, 246, 0.2)'
                                                }}
                                            >
                                                No specific elements identified for this violation
                                            </Alert>
                                        )}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    )
                })
            )}
        </Box>
    )
}
