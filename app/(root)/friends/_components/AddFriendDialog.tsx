"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { api } from '@/convex/_generated/api';
import { useMutationState } from '@/hooks/useMutationState';
import { zodResolver } from '@hookform/resolvers/zod';
import { ConvexError } from 'convex/values';
import { UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from "zod";

const addFriendFormSchema = z.object({
    email: z.string().min(1, { message: "this field cant be empty" }).email("please enter a valid email")
})

function AddFriendDialog() {

    const { mutate: createRequest, pending } = useMutationState(api.request.create)
    const form = useForm<z.infer<typeof addFriendFormSchema>>({
        resolver: zodResolver(addFriendFormSchema),
        defaultValues: {
            email: ""
        }
    })

    const handleSubmit = async (values: z.infer<typeof addFriendFormSchema>) => {
        await createRequest({ email: values.email }).then(() => {
            form.reset()
            toast.success("friend request send")
        }).catch(err => {
            toast.error(err instanceof ConvexError ? err.data : "unexpected error")
        })
    }

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger>
                    <Button size="icon" value="outline">
                        <DialogTrigger>
                            <UserPlus />
                        </DialogTrigger>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add Friend</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Friend
                    </DialogTitle>
                    <DialogDescription>
                        send a request to connect with your friends
                    </DialogDescription>
                </DialogHeader>
                <form className='space-y-2' onSubmit={form.handleSubmit(handleSubmit)}>
                    <Field>
                        <FieldLabel>email</FieldLabel>
                        <input
                            className='p-2'
                            {...form.register("email")}
                            placeholder='Enter email'
                        />
                        {form.formState.errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </Field>
                    <DialogFooter>
                        <Button disabled={false} type='submit'>Add Friend</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )

}

export default AddFriendDialog