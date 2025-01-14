import React, { useState } from 'react'
import { useAuth } from '../common/store/auth';
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Notification from '@/Modules/Notification';

export default function Register() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://doc-mgmt-server-coytre25g-arihant-jains-projects-6d88f2d0.vercel.app/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const res_data = await response.json();

            if (response.ok) {
                storeTokenInLS(res_data.token);
                Notification(res_data.message, res_data.type)
                setUser({
                    email: "",
                    password: ""
                })
                navigate('/login')
            }
            else {
                Notification(res_data.message, res_data.type)
            }
        } catch (error) {
            Notification("Error in Register fetch ❌", "error")
        }
    }
    const inputChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        setUser((preValues) => {
            return {
                ...preValues,
                [name]: value
            }
        })
    }

    return (
        <div className="flex items-center justify-center" style={{ height: "85vh" }}>
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>New User.&nbsp;<NavLink to="/login" className="text-primary" >User already exists?</NavLink></CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Email" onChange={inputChange} name="email" value={user.email} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Password" onChange={inputChange} name="password" value={user.password} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={handleSubmit} className='mx-auto'>Register</Button>
            </CardFooter>
        </Card>
        </div>
    )
}
