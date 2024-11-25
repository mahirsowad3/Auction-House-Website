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
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const response = {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST"
        }
    };

    // Handle both JSON object and string body formats
    let body;
    try {
        // If event.body is an object, use it directly; if it's a string, parse it
        if (typeof event.body === "string") {
            body = JSON.parse(event.body);
        } else if (typeof event.body === "object") {
            body = event.body;
        } else {
            throw new Error("Invalid body format");
        }
    } catch (error) {
        console.error("Error parsing request body:", error);
        response.statusCode = 400;
        response.body = JSON.stringify({ message: "Invalid JSON format" });
        return response;
    }

    const { username, password, userType } = body;

    // Validate required fields
    if (!username || !password || !userType) {
        response.statusCode = 400;
        response.body = JSON.stringify({ message: "Missing required fields: username, password, and/or userType" });
        return response;
    }

    try {
        // Check if the user already exists
        const userExists =

            userType === "Seller"

                ? await query("SELECT * FROM Seller WHERE Username = ?", [username])

                : await query("SELECT * FROM Buyer WHERE Username = ?", [username]);
        if (userExists.length > 0) {
            response.statusCode = 400;
            response.body = JSON.stringify({ message: "Username already exists." });
            return response;
        }

        // Insert a new account
        if (userType === "Seller") {

            await query(

                "INSERT INTO Seller (Username, Password, Funds, UserType, IsClosed) VALUES (?, ?, 0, ?, 0)",

                [username, password, userType]

            );

        } else if (userType === "Buyer") {

            await query(

                "INSERT INTO Buyer (Username, Password, AccountFunds, UserType, IsClosed) VALUES (?, ?, 0, ?, 0)",

                [username, password, userType]

            );

        }
        response.statusCode = 200;
        response.body = JSON.stringify({ message: "Account created successfully." });
    } catch (error) {
        console.error("Create Account Error:", error);
        response.statusCode = 500;
        response.body = JSON.stringify({ message: "Failed to create account." });
    }

    return response;
};
