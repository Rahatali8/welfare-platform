import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { cnic, fullName, address, password } = await request.json()

    // Validate input
    if (!cnic || !fullName || !address || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Validate CNIC format (13 digits)
    if (!/^\d{13}$/.test(cnic)) {
      return NextResponse.json({ message: "Invalid CNIC format. Must be 13 digits." }, { status: 400 })
    }

    // Check if user already exists
    const [existingUsers] = await db.execute("SELECT id FROM users WHERE cnic = ?", [cnic])

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json({ message: "User with this CNIC already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Insert new user
    await db.execute("INSERT INTO users (cnic, full_name, address, password, role) VALUES (?, ?, ?, ?, ?)", [
      cnic,
      fullName,
      address,
      hashedPassword,
      "user",
    ])

    return NextResponse.json({ message: "User created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
