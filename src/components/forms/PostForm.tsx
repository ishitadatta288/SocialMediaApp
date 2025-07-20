//import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { Input } from "../ui/input"
import { PostValidation } from "@/lib/validation"
import type { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"



type PostFormProps = {
    post?: Models.Document;
    action: 'Create' | 'Update';
}

const PostForm = ({ post, action }: PostFormProps) => {
    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();


    const { user } = useUserContext();
    const { toast } = useToast();
    const navigate = useNavigate();


    // 1. Define your form.
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post?.location : "",
            tags: post ? post.tags.join(',') : ''
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidation>) {
        if (post && action === 'Update') {
            const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imageId: post?.imageId,
                imgUrl: post?.imageUrl,
            })

            if (!updatedPost) {
                toast({title: 'Please try again'})
            }

            return navigate(`/posts/${post.$id}`)
        }

        const newPost = await createPost({
            ...values,
            userId: user.id,
        })

        if (!newPost) {
            toast({
                title: "Please try again"
            })
        }

        navigate('/');
    }

console.log(post?.imageUrl);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-9 w-full max-w-5xl ">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" text-white">Caption</FormLabel>
                            <FormControl>
                                <Textarea className=" text-black" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" text-white">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader fieldChange={field.onChange}
                                    mediaUrl={post?.imageUrl} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" text-white">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" text-white">Add tags (separated by comma " , ")</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input"
                                    placeholder="Art, Expression, Learn"
                                    {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <div className=" flex gap-5 items-center justify-end">
                    <Button type="button" className=" bg-slate-700 hover:bg-gray-500">Cancel</Button>
                    <Button type="submit" className=" bg-purple-700 hover:bg-purple-500 whitespace-nowrap"
                    disabled={isLoadingCreate ||  isLoadingUpdate}>
                        {isLoadingCreate || isLoadingUpdate && 'Loading...'}
                        {action} Post
                        </Button>
                </div>

            </form>
        </Form>
    )
}

export default PostForm