import mysql from 'mysql';

const pool = mysql.createPool({
    host: 'auctionhousedb.c1ya0ysewwd6.us-east-2.rds.amazonaws.com',
    user: 'AHadmin',
    password: 'Az339667',
    database: 'CS509DB',
    connectionLimit: 10 // Limit the number of connections in the pool
});

function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, rows) => {
            if (err) {
                console.error("Database query error:", err); // Log detailed error message
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    // Handle OPTIONS method for CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            body: JSON.stringify({ message: "CORS preflight check successful" })
        };
    }

    let response = {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST"
        }
    };

    let body;
    try {
        body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        response.statusCode = 400;
        response.body = JSON.stringify({ message: "Invalid JSON format" });
        return response;
    }

    if (!body || !body.username || !body.password) {
        response.statusCode = 400;
        response.body = JSON.stringify({ message: "Username and password are required" });
        return response;
    }

    const { username, password } = body;

    try {
        // Retrieve user details based on username and password
        const user = await query("SELECT * FROM Seller WHERE Username = ? AND Password = ?", [username, password]);
        if (user.length === 0) {
            response.statusCode = 401; // Unauthorized
            response.body = JSON.stringify({ message: "Invalid username or password" });
            return response;
        }

        // Check if the account is closed
        if (user[0].IsClosed === 1) {
            response.statusCode = 403; // Forbidden
            response.body = JSON.stringify({ message: "Account is closed and cannot be logged in" });
            return response;
        }

        // If account is active, login is successful
        response.statusCode = 200;
        response.body = JSON.stringify({ message: "Login successful" });
    } catch (error) {
        console.error("Login Error:", error);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to login",
            error: error.message
        });
    }

    return response;
};
