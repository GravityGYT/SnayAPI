export default async function handler(req, res) {
    const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
    const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;

    if (req.method === "GET") {
        // Extract the 'code' from the query parameters
        const code = req.query.code;

        if (!code) {
            return res.status(400).json({ error: "Authorization code is required" });
        }

        try {
            // Exchange code for an access token
            const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    client_id: DISCORD_CLIENT_ID,
                    client_secret: DISCORD_CLIENT_SECRET,
                    grant_type: "authorization_code",
                    code,
                    redirect_uri: REDIRECT_URI,
                }),
            });

            if (!tokenResponse.ok) {
                throw new Error("Failed to exchange token");
            }

            const tokenData = await tokenResponse.json();

            // Fetch user info
            const userResponse = await fetch("https://discord.com/api/users/@me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
            });

            if (!userResponse.ok) {
                throw new Error("Failed to fetch user info");
            }

            const userData = await userResponse.json();

            // Redirect back to the main page with user info in query parameters
            return res.redirect(`https://snay.io/?username=${encodeURIComponent(userData.username)}`);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
