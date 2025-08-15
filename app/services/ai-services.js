
export async function GetViolationSummary(violations) {
    try {

        let formattedViolations = "List of violations: \n";
        for (const violation of violations) {
            const shortenedViolation = 
            `
            id: ${violation.id}
            impact: ${violation.impact}
            description: ${violation.description}
            node count: ${violation.nodes.length}
            `;
            formattedViolations += shortenedViolation;
        }
        console.log(formattedViolations);

        const storedUI = localStorage.getItem('violation-summary');
        if (storedUI) {
            const cached = JSON.parse(storedUI);

            if (JSON.stringify(cached.violations) === JSON.stringify(formattedViolations)){
                return cached.summary;
            }
        }

        const response = await fetch('/api/ai-audit-summary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formattedViolations })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch ai summary.');
        }
        
        localStorage.setItem('violation-summary', JSON.stringify({
            violations: formattedViolations,
            summary: data
        }));

        return data;
    } catch (err) {
        console.error('Audit error:', err);
        return err;
    }
}

export async function GetUIReview(image) {
    try {

        const response = await fetch('/api/ai-ui-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image })
        });

        const data = await response.json();
        
        if (!response.ok) {
            const text = await response.text();
            console.error('API Error Response:', text);
            throw new Error(`HTTP ${response.status}: ${text}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('Non-JSON response:', text);
            throw new Error('Expected JSON response');
        }

        return data;

    } catch (err) {
        console.error('UI Review error:', err);
        return err;
    }
}