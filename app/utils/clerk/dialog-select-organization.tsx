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
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/app/_components/ui/alert-dialog";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
// import { useToast } from "@/app/_hooks/use-toast"

interface MyMembershipsProps {
  isOpenDialog: boolean;
}

export const MyMemberships = ({ isOpenDialog }: MyMembershipsProps) => {
  // const { toast } = useToast();
  const { setActive, userMemberships } =
    useOrganizationList(UserMembershipParams);
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
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
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
                              setActive &&
                              setActive({ organization: mem.organization.id })
                            }
                          >
                            {mem.organization.name}
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
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
