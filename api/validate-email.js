export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // IPQS API Key - stored securely server-side
    const IPQS_API_KEY = process.env.IPQS_API_KEY || 'LuSbgSYFv9nxOoMSFIx0OJCLYEWpc3RC';

    try {
        const response = await fetch(
            `https://www.ipqualityscore.com/api/json/email/${IPQS_API_KEY}/${encodeURIComponent(email)}?timeout=7`
        );
        const data = await response.json();

        if (!data.success) {
            return res.status(200).json({ valid: true, message: null });
        }

        // Check validation criteria
        if (!data.valid) {
            return res.status(200).json({ valid: false, message: 'Please enter a valid email address.' });
        }

        if (data.disposable) {
            return res.status(200).json({ valid: false, message: 'Disposable email addresses are not allowed.' });
        }

        if (data.fraud_score >= 50) {
            return res.status(200).json({ valid: false, message: 'This email address cannot be used. Please try another.' });
        }

        return res.status(200).json({ valid: true, message: null });
    } catch (error) {
        console.error('IPQS validation error:', error);
        // Fail open - allow submission if IPQS fails
        return res.status(200).json({ valid: true, message: null });
    }
}
