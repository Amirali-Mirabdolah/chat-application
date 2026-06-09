import { SignInButton, SignUpButton } from '@clerk/nextjs'


const UnauthenticatedUI = () => {
    return (
        <>
            <div className='flex gap-2 m-2'>
                <SignUpButton />
                <SignInButton />
            </div>
        </>
    )
}

export default UnauthenticatedUI