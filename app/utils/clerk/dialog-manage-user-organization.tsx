"use client";

import { useOrganizationList } from "@clerk/nextjs";

import { UserMembershipParams } from "./organizations";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
} from "@/app/_components/ui/alert-dialog";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

import { useToast } from "@/app/_hooks/use-toast";

import { CheckIcon } from "lucide-react";

interface MyMembershipsProps {
  isOpenDialog: boolean;
  orgId: string | undefined;
}

export const MyMemberships = ({ isOpenDialog, orgId }: MyMembershipsProps) => {
  const { toast } = useToast();
  const { setActive, userMemberships } =
    useOrganizationList(UserMembershipParams);

  const handleSetActiveOrganization = async (organizationId: string) => {
    try {
      if (orgId === organizationId) {
        toast({
          title: "Erro",
          description: "Você já está na organização selecionada.",
          variant: "destructive",
        });
        return;
      }

      if (setActive) {
        await setActive({ organization: organizationId });
      } else {
        throw new Error("setActive is not defined");
      }

      toast({
        title: "Organização ativada",
        description: "Você mudou para a organização selecionada com sucesso.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro",
        description: "Não foi possível mudar para a organização selecionada.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <AlertDialog open={isOpenDialog}>
        <AlertDialogContent>
          <Tabs defaultValue="organizations" className="w-full">
            <TabsList className="grid w-full grid-cols-1 justify-center">
              <TabsTrigger value="organizations" className="font-bold">
                Organizações
              </TabsTrigger>
            </TabsList>
            <TabsContent value="organizations">
              <Card>
                <CardHeader>
                  <CardDescription>
                    Selecione abaixo a organização que deseja acessar.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ScrollArea className="h-[150px] w-full rounded-md border">
                    <div>
                      {!userMemberships.data?.length && (
                        <div className="justify-center text-center">
                          <h1>
                            Você não possui nenhuma organização, solicite a
                            criação do seu perfil ao administrador.
                          </h1>
                        </div>
                      )}
                      {userMemberships.data?.map((mem) => (
                        <div
                          key={mem.id}
                          className="flex w-full justify-between"
                        >
                          <Button
                            variant="outline"
                            className="w-full border-none"
                            onClick={() =>
                              handleSetActiveOrganization(mem.organization.id)
                            }
                          >
                            {mem.organization.name}
                            {mem.organization.id === orgId && <CheckIcon />}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
