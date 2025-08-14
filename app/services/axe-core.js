export async function GetAudit(url) {
    try {
        const response = await fetch('/api/axe-audit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();
        
        if (!response.ok) {
            return { error: 'Failed to audit page. This page may be protected.' };
        }
        
        console.log('Audit results:', data.results);
        return { 
            results: data.results,
            image: data.image   
        };
    } catch (err) {
        console.error('Audit error:', err);
        return { error: 'Failed to audit page. This page may be protected.' };
    }
} 