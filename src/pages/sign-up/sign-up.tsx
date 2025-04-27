import React from "react";
import { Modal, Input, Button } from "../../components/shared";
import { useForm } from "react-hook-form";
import { getDB } from "../../db/db";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../libs/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schemas/sign-up-schema";

type FormValues = {
  username: string;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
    },
    shouldFocusError: false,
  });

  const handleSave = async (data: FormValues) => {
    try {
      const db = await getDB();
      const existingUser = await db.get("users", data.username);
      if (existingUser) {
        Toast.error("Username already exists!");
        return;
      }

      await db.put("users", { username: data.username });
      Toast.success("Username saved successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error saving username:", error);
      Toast.error("Failed to save username.");
    }
  };

  return (
    <Modal opacity={"opacity-0"} className="md:w-[500px] md:h-[215px]">
      <form
        onSubmit={handleSubmit(handleSave)}
        className="w-full flex flex-col gap-10 md:gap-5 pt-60 md:pt-0"
      >
        <h1 className="font-[700] text-[1.37rem]">
          Welcome to CodeLeap network!
        </h1>
        <div>
          <Input
            placeholder="John doe"
            id="username"
            label="Please enter your username"
            {...register("username")}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p className="text-red-500 text-[0.8rem]">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="w-full flex justify-center md:justify-end">
          <Button
            disabled={!username}
            type="submit"
            className="bg-primary w-full md:w-[111px] h-[37px] md:h-[32px] rounded-[8px] text-white"
          >
            ENTER
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SignUp;
