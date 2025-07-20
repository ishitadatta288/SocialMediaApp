//import React from 'react'
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import { LuLoader } from "react-icons/lu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation } from "@/lib/validation"
import { Link, useNavigate } from "react-router-dom";
//import { createUserAccount } from "@/lib/appwrite/api";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
//import Loader from "@/components/shared/Loader"


const SigninForm = () => {
  const { toast } = useToast()
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
 const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    const session = await signInAccount(user);

    if (!session) {
       toast({title: "Sign in failed. Please try again"})
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate('/')
    }else {
      return toast({title: "Sign in failed. please try again"})
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col">

        {/* Flex row for logo and title */}
        <div className="flex items-center space-x-2 justify-center">
          <img src="/assets/images/logo.png" alt="SnapTalk Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold text-center">SnapTalk</span>
        </div>
        <h2 className="font-bold md:font-bold pt-4 md:pt-6 text-2xl text-center">
          Log in to your account
        </h2>
        <p className=" text-gray-500 mt-2 text-lg">Welcome back! Please enter your details</p>
        <form onSubmit={form.handleSubmit(handleSignin)} className="flex flex-col gap-5 w-full mt-4">
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shadow-input text-black" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shadow-input text-black" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className=" bg-blue-900 hover:bg-blue-500">
            {
              isUserLoading ? (
                <div className=" flex items-center gap-2">
                  <LuLoader /> Loading....
                </div>
              ) : "Sign in"
            }
          </Button>
          <div className=" flex justify-center gap-2 text-sm">
            <p className="text-center">Don't have an account?
            </p><Link to="/signup" className=" text-blue-800 hover:underline">Signup</Link>
          </div>
        </form>
      </div>
    </Form>

  )
}

export default SigninForm