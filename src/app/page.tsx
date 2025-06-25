import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, User, Bus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold text-primary">
          BusETA
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Your reliable employee bus tracking app.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <User className="w-10 h-10 text-primary" />
              <div>
                <CardTitle className="text-2xl font-headline">I'm a Passenger</CardTitle>
                <CardDescription>Track your bus and get real-time ETAs.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Select your route and see the bus location live on the map. Know exactly when to head for the bus stop.
            </p>
            <Button asChild className="w-full">
              <Link href="/passenger">
                Go to Passenger View <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Bus className="w-10 h-10 text-primary" />
              <div>
                <CardTitle className="text-2xl font-headline">I'm a Driver</CardTitle>
                <CardDescription>Share your location with passengers.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Set your daily route and start your trip. Help your colleagues plan their commute better.
            </p>
            <Button asChild className="w-full">
              <Link href="/driver">
                Go to Driver View <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
