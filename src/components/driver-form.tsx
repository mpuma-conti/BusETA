"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { busRoutes } from "@/lib/routes";
import type { DriverInfo } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  routeId: z.string({ required_error: "Please select a route." }),
});

type DriverFormProps = {
  onStartTracking: (info: DriverInfo) => void;
};

export function DriverForm({ onStartTracking }: DriverFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onStartTracking(values);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Driver Details</CardTitle>
        <CardDescription>Set your information for today's trip.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="routeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bus Route</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your route" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {busRoutes.map((route) => (
                        <SelectItem key={route.id} value={route.id}>
                          {route.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Start Trip & Share Location
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
