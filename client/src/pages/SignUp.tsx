import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Dummy users data (shared in-memory for demo)
const dummyUsers = [
  { email: "test@gmail.com", password: "test", name: "test" },
  { email: "raghavchawla.128@gmail.com", password: "test", name: "raghav" },
];

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const exists = dummyUsers.some((u) => u.email === formData.email);
    if (exists) {
      setError("Email already registered. Please sign in or use another email.");
    } else {
      dummyUsers.push({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setSuccess("Account created! You can now sign in.");
      setFormData({ name: "", email: "", password: "" });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1680608979589-e9349ed066d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHJvYm90fGVufDB8fDB8fHww')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <Card
        className="relative w-full max-w-md border-border shadow-xl rounded-2xl"
        style={{ backgroundColor: "rgba(245, 245, 245, 0.7)" }}
      >
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="mb-1">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="mb-1">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-1">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <a href="/signin" className="underline">
                Sign in
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
