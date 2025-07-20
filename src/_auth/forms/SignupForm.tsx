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
import { SignupValidation } from "@/lib/validation"
import { Link, useNavigate } from "react-router-dom";
//import { createUserAccount } from "@/lib/appwrite/api";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
//import Loader from "@/components/shared/Loader"


const SignupForm = () => {
  const { toast } = useToast()
  const {checkAuthUser} = useUserContext();
  const navigate = useNavigate();


  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();

  const { mutateAsync: signInAccount} = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })

  //const {mutateAsync: createUserAccount, isLoading: isCreatingAccount} = useCreateUserAccountMutation()

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: "Sign up failed. Please try again",
      })
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if (!session) {
      return toast({title: "Sign in failed. Please try again"})
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate('/')
    }else {
      return toast({title: "Sign up failed. please try again"})
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
          Create a new account
        </h2>
        <p className=" text-gray-500 mt-2 text-lg">To use SnapTalk, please enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shadow-input text-black" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shadow-input text-black" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
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
              isCreatingAccount ? (
                <div className=" flex items-center gap-2">
                  <LuLoader /> Loading....
                </div>
              ) : "Sign up"
            }
          </Button>
          <div className=" flex justify-center gap-2 text-sm">
            <p className="text-center">Already have an account?
            </p><Link to="/signin" className=" text-blue-800 hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </Form>

  )
}

export default SignupForm