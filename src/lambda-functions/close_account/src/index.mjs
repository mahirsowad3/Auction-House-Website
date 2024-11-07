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

    let response = {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST"
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

    if (!body || !body.username) {
        response.statusCode = 400;
        response.body = JSON.stringify({ message: "Username is required" });
        return response;
    }

    const { username } = body;

    try {
        // Check if the user exists
        const userExists = await query("SELECT * FROM Seller WHERE Username = ?", [username]);
        if (userExists.length === 0) {
            response.statusCode = 404;
            response.body = JSON.stringify({ message: "User not found" });
            return response;
        }

        // Check for active auctions by the user in the Item table using ActivityStatus column
        const activeItems = await query("SELECT * FROM Item WHERE Creator = ? AND ActivityStatus = 'Active'", [username]);
        if (activeItems.length > 0) {
            response.statusCode = 400;
            response.body = JSON.stringify({ message: "Cannot close account with active auctions" });
            return response;
        }

        // Close the account by setting IsClosed to 1
        await query("UPDATE Seller SET IsClosed = 1 WHERE Username = ?", [username]);
        response.statusCode = 200;
        response.body = JSON.stringify({ message: "Account closed successfully" });
    } catch (error) {
        console.error("Close Account Error:", error);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "Failed to close account",
            error: error.message
        });
    }

    return response;
};
