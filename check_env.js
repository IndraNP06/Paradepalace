const fs = require('fs');
const path = require('path');

try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        console.log("File read successfully.");
        const lines = content.split('\n');
        const apiKeyLine = lines.find(l => l.startsWith('NEXT_PUBLIC_FIREBASE_API_KEY'));
        if (apiKeyLine) {
            const [key, val] = apiKeyLine.split('=');
            const value = val ? val.trim() : '';
            console.log(`Key found. Length: ${value.length}`);
            console.log(`First 4 chars: ${value.substring(0, 4)}`);
            console.log(`Last 4 chars: ${value.substring(value.length - 4)}`);
            console.log(`Visible content: [${value}]`);

            // Check for quotes
            if (value.startsWith('"') || value.startsWith("'")) {
                console.log("WARNING: Value is quoted. Dotenv might handle it, but check if doubles.");
            }
        } else {
            console.log("NEXT_PUBLIC_FIREBASE_API_KEY not found in file.");
        }
    } else {
        console.log(".env.local not found.");
    }
} catch (e) {
    console.error("Error reading .env.local:", e);
}
