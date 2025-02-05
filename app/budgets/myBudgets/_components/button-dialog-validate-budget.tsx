import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { FileCheck2 } from "lucide-react";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

const ButtonDialogValidatePDF = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState("No result");
  console.log(data);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="text-white">
                <FileCheck2 />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Escanear QR Code</DialogTitle>
                <DialogDescription>
                  <QrReader
                    onResult={(result, error) => {
                      if (!!result) {
                        setData(result?.getText() as string);
                      }

                      if (!!error) {
                        console.info(error);
                      }
                    }}
                    constraints={{ facingMode: "user" }}
                    className="w-60"
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>
          <p>Validar PDF</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ButtonDialogValidatePDF;
