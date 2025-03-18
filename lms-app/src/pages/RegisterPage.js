import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().oneOf(["student", "teacher"], "Invalid role").required("Role is required"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", data);
      alert("🎉 User registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create an Account</h2>
        <div className="form-group">
          <label>Name</label>
          <input {...register("name")} placeholder="Enter your name" />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input {...register("email")} placeholder="Enter your email" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register("password")} placeholder="Enter a secure password" />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label>Role</label>
          <select {...register("role")}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.role && <p className="error">{errors.role.message}</p>}
        </div>
        <button type="submit" className="cute-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterPage;
