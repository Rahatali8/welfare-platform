const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "welfare_platform",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Mock database implementation - replace with real MySQL connection when ready
export const db = {
  execute: async (query: string, params?: any[]) => {
    // Mock implementation - replace with real database
    console.log("Mock DB Query:", query, params)

    // Return mock data structure
    if (query.includes("SELECT") && query.includes("users") && query.includes("cnic")) {
      // Mock user login/profile
      return [
        [
          {
            id: 1,
            cnic: params?.[0] || "1234567890123",
            full_name: "Test User",
            address: "Test Address",
            password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq9w5KS", // hashed 'admin123'
            role: params?.[0] === "1234567890123" ? "admin" : params?.[0] === "9876543210987" ? "donor" : "user",
          },
        ],
      ]
    }

    if (query.includes("INSERT INTO users")) {
      // Mock user registration
      return [{ insertId: Math.floor(Math.random() * 1000) }]
    }

    if (query.includes("SELECT") && query.includes("requests")) {
      // Mock requests data
      return [
        [
          {
            id: 1,
            user_id: 1,
            type: "loan",
            reason: "Need loan for small business",
            amount: 150000,
            status: "pending",
            submitted_at: new Date().toISOString(),
            current_address: "Test Address",
            cnic_image: null,
            additional_data: '{"loanAmount": "150000", "loanPurpose": "business"}',
            full_name: "Ahmed Ali",
            cnic: "1111111111111",
            address: "House 123, Street 5, Lahore",
          },
          {
            id: 2,
            user_id: 2,
            type: "microfinance",
            reason: "Need help for groceries",
            amount: 15000,
            status: "approved",
            submitted_at: new Date().toISOString(),
            current_address: "Test Address 2",
            cnic_image: null,
            additional_data: '{"helpType": "groceries", "urgencyLevel": "urgent"}',
            full_name: "Fatima Khan",
            cnic: "2222222222222",
            address: "Flat 45, Block B, Karachi",
          },
        ],
      ]
    }

    if (query.includes("INSERT INTO requests")) {
      // Mock request submission
      return [{ insertId: Math.floor(Math.random() * 1000) }]
    }

    if (query.includes("COUNT")) {
      // Mock analytics counts
      return [[{ total: 10, pending: 3, approved: 5, rejected: 2, total_amount: 500000 }]]
    }

    if (query.includes("UPDATE requests")) {
      // Mock status update
      return [{ affectedRows: 1 }]
    }

    if (query.includes("INSERT INTO donations")) {
      // Mock donation
      return [{ insertId: Math.floor(Math.random() * 1000) }]
    }

    // Default empty result
    return [[]]
  },
}

// Mock database initialization
export async function initializeDatabase() {
  console.log("Mock database initialized - replace with real MySQL connection")
  return Promise.resolve()
}
