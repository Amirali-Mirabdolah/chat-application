"use client"

import UnauthenticatedUI from '@/components/auth/UnauthenticatedUI'
import LoadingLogo from '@/components/shared/LoadingLogo'
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || ""

const convex = new ConvexReactClient(CONVEX_URL)

const ConvexClientProvider = ({ children }: Props) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <Authenticated> {children}</Authenticated>
                <Unauthenticated>
                    <UnauthenticatedUI />
                </Unauthenticated>
                <AuthLoading>
                    <LoadingLogo />
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>

        // <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        //     {children}
        // </ConvexProviderWithClerk>

    )
}

export default ConvexClientProvider