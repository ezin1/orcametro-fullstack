import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { CheckIcon } from "lucide-react";
// import AcquirePlanButton from "./acquire-plan-button";

interface CardPlanProps {
  plans: {
    name: string;
    description: string;
    price: number;
    features: string[];
  }[];
  userPlan: string;
}

const CardPlan = ({ plans, userPlan }: CardPlanProps) => {
  return (
    <ScrollArea className="h-[700px]">
      <div className="mb-36 flex w-full flex-col items-center justify-between gap-6 sm:flex-row md:flex-row lg:flex-row xl:flex-row">
        {plans.map((plans) => (
          <Card key={plans.name} className="w-[300px]">
            <CardHeader className="relative items-center justify-center">
              {userPlan === plans.name ? (
                <Badge className="absolute right-4 top-4 bg-primary text-white">
                  Seu plano
                </Badge>
              ) : null}
              <CardTitle className="text-3xl font-bold">{plans.name}</CardTitle>
              <CardDescription>{plans.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center pb-5">
                <div className="flex flex-col pr-2">
                  <span className="text-xl">POR</span>
                  <span className="text-4xl">R$</span>
                </div>
                <span className="mb-1 pr-1 text-7xl font-bold">
                  {Math.floor(plans.price)}
                </span>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold">
                    ,{plans.price.toString().split(".")[1]}
                  </span>
                  <div className="text-2xl text-muted-foreground">/mês</div>
                </div>
              </div>
              <ul className="border-t pt-3">
                {plans.features.map((feature) => (
                  <li
                    className="flex flex-row items-center justify-start gap-2"
                    key={feature}
                  >
                    {feature}
                    <CheckIcon className="text-primary" />
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex w-full items-center p-4">
              <Button
                variant={userPlan === plans.name ? "outline" : "default"}
                className="w-full rounded-full font-bold text-white"
              >
                {userPlan === plans.name ? "Gerenciar plano" : "Contratar"}
              </Button>
              {/* <AcquirePlanButton userPlan={userPlan} planName={plans.name}/> */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CardPlan;
