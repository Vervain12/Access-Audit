'use client'
import { Box, Button, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const router = useRouter();
 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (websiteUrl) {
      console.log('Auditing URL:', websiteUrl);
      router.push(`/auditor?url=${encodeURIComponent(websiteUrl)}`);
    }
  };
 
  return (
    <main className="w-full h-full bg-gradient-to-br bg-gray-50 via-blue-50 to-indigo-50 items-center justify-start flex flex-col pt-25 space-y-5">
      <Box 
        className="w-full max-w-4xl"
        sx={{
          backgroundColor: 'white',
          borderRadius: 4,
          padding: 6,
          boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="items-center justify-center text-center mb-10">
          <h1 className="text-5xl text-gray-700 font-display mb-4">
            <span className="text-cyan-700">AI-Powered</span> Accessibility Auditing
          </h1>
          <h2 className="text-3xl text-gray-700">
            Recieve an AI review of your webpage in seconds
          </h2>
        </div>
       
        <Box className="w-full max-w-2xl mx-auto px-4 flex flex-col items-center justify-center space-y-6">
          <TextField
            fullWidth
            variant="outlined"
            label="Enter your website URL"
            placeholder="https://example.com"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#0891b2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0891b2',
                },
              },
              marginBottom: 2
            }}
          />
         
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={!websiteUrl.trim()}
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
            Begin Accessibility Audit
          </Button>
        </Box>
      </Box>
      <Box sx={{
          backgroundColor: 'white',
          borderRadius: 4,
          padding: 2,
          boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <Typography variant="h6" gutterBottom sx={{color: '#374151', fontWeight: 600, textAlign: 'center'}}>
            Learn about our service <a href={"/about"} className="text-cyan-700 hover:text-cyan-800">here!</a>
          </Typography>
      </Box>
    </main>
  );
}