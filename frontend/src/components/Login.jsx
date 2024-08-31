import React, { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
const Login = () => {
    const[input,setInput]=useState({
        email:"",
        password:""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials:true,
            });

            if (res.data.success) {
              dispatch(setAuthUser(res.data.user));
              navigate("/");

                toast.success(res.data.message);
                setInput({  email: "", password: "" });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form onSubmit={signupHandler} className=" shadow-lg flex flex-col gap-5 p-8">
        <div className="my-4">
          <h1 className=" text-center font-bold text-xl">
            LOGO hello</h1>
          <p className="text-sm text-center">Login to see phtos and videos</p>
        </div>
        
        <div>
          <Label className="py-2 font-medium">Email</Label>
          <Input type="email" name="email" value={input.email} onChange={changeEventHandler} className="focus-visible:ring-transparent my-2"></Input>
        </div>
        <div>
          <Label className="py-2 font-medium">Password</Label>
          <Input type="password" name="password" value={input.password} onChange={changeEventHandler} className="focus-visible:ring-transparent my-2"></Input>
        </div>
        {
            loading ?(
                <Button>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Please wait
                </Button>
             ) : (
                <Button type="submit" >Login</Button>
             )
        }
       
        <span className="text-center">Doesnot have a account? <Link to="/signup" className="text-blue-600">Signup</Link> </span>
      </form>
    </div>
  );
};

export default Login;
