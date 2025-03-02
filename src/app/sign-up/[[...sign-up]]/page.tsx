import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
        <div className="mt-8">
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "rounded-lg shadow-md bg-white p-6",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
} 