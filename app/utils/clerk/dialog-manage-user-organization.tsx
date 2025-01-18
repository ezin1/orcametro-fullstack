"use client";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import {
  OrgInvitationsParams,
  OrgMembersParams,
  UserMembershipParams,
} from "./organizations";
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
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
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

  const { invitations, memberships } = useOrganization({
    ...OrgInvitationsParams,
    ...OrgMembersParams,
  });

  // const userMembershipsDataExample = {
  //   data: [
  //     {
  //       id: 1,
  //       organization: {
  //         id: 1,
  //         name: "Organization 1",
  //       },
  //     },
  //     {
  //       id: 2,
  //       organization: {
  //         id: 2,
  //         name: "Organization 2",
  //       },
  //     },
  //     {
  //       id: 3,
  //       organization: {
  //         id: 3,
  //         name: "Organization 3",
  //       },
  //     },
  //     {
  //       id: 4,
  //       organization: {
  //         id: 4,
  //         name: "Organization 4",
  //       },
  //     },
  //     {
  //       id: 5,
  //       organization: {
  //         id: 5,
  //         name: "Organization 5",
  //       },
  //     },
  //   ],
  // }

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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="invites">Convites</TabsTrigger>
              <TabsTrigger value="organizations">Organizações</TabsTrigger>
            </TabsList>
            <TabsContent value="invites">
              <Card>
                <CardHeader>
                  <CardDescription>
                    Você foi convidado para participar das seguintes
                    organizações.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ScrollArea className="h-[150px] w-full rounded-md border">
                    <div>
                      {invitations?.data?.map((inv) => (
                        <div
                          key={inv.id}
                          className="flex w-full justify-between"
                        >
                          <Button
                            variant="outline"
                            className="w-full border-none"
                            onClick={async () => {
                              await inv.revoke();
                              await Promise.all([
                                memberships?.revalidate,
                                invitations?.revalidate,
                              ]);
                            }}
                          >
                            teste
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
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
          <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
            <AlertDialogAction className="text-white">
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
