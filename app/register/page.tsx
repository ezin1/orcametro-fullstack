import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import { FormRegister } from "./_components/form-register";

const RegisterPage = async () => {
  return (
    <div className="absolute grid h-full w-full items-center justify-center p-2">
      <Card>
        <CardHeader className="flex items-center">
          <CardTitle>Cadastro</CardTitle>
          <CardDescription>
            Por favor, finalize seu cadastro para que possamos prosseguir:
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 text-center lg:grid-cols-2">
          <FormRegister />
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
