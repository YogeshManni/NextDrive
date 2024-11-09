"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const authFormSchema = (authType: FormType) =>
  z.object({
    email: z.string().email(),
    fullName:
      authType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });

type FormType = "sign-in" | "sign-up";

export const getFormType = (type: FormType) => {
  return type === "sign-in" ? "Sign In" : "Sign Up";
};

function AuthForm({ type }: { type: FormType }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">{getFormType(type)}</h1>
          {type === "sign-up" ? (
            <>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="shad-form-item">
                      <FormLabel className="shad-form-label">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="shad-input"
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormMessage className="shad-form-message" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="shad-form-item">
                      <FormLabel className="shad-form-label">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          className="shad-input"
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormMessage className="shad-form-message" />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {getFormType(type)}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loading"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>
          {/* Display error message */}
          {errorMessage && <p className="form-error">{errorMessage}</p>}
          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {getFormType(type === "sign-in" ? "sign-up" : "sign-in")}
            </Link>
          </div>
        </form>
      </Form>
      {/* Otp verification */}
    </>
  );
}

export default AuthForm;
