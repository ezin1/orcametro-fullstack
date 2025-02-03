"use client";

import { MultiSelect } from "@/app/_components/multi-select";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { useToast } from "@/app/_hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const frameworksList = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const FormSchema = z.object({
  frameworks: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one framework."),
});

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      frameworks: ["next.js", "nuxt.js"],
    },
  });
  const { toast } = useToast();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Success",
      description: "Form submitted successfully.",
    });
    console.log(data);
  }

  return (
    <main className="min-h-screen:calc(100vh - 3rem) flex flex-col items-center justify-start space-y-3 p-3">
      <Card className="w-full max-w-xl p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="frameworks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frameworks</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={frameworksList}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select options"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose the frameworks you are interested in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="default" type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </main>
  );
}
