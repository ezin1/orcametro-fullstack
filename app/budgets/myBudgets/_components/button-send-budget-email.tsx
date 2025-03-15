"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { Mail } from "lucide-react";

const ButtonSendBudgetMail = () => {
  const sendEmail = async () => {
    try {
      const data = await fetch("/api/webhooks/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "Ezio",
          userImage: "https://avatars.githubusercontent.com/u/47269261",
        }),
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button className="text-white" variant="outline" onClick={sendEmail}>
            <Mail className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Enviar PDF para email</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ButtonSendBudgetMail;
