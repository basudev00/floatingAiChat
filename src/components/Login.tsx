import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { verifyOtp, type VerifyLoginPayload } from "../api/auth";

const schema = z.object({
  email: z.string().email("Enter valid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: VerifyLoginPayload) => verifyOtp(values),

    onSuccess: (data) => {
      toast.success(data.detail || "Logged in successfully!");

      // ✅ Save token for same-domain usage
      if (data.access) {
        Cookies.set("access_token", data.access, {
          sameSite: "None",
          secure: true,
        });

        // ✅ Send token to parent website (iframe-safe login)
        window.parent.postMessage(
          {
            type: "AUTH_SUCCESS",
            token: data.access,
          },
          "*"
        );
      }

      navigate("/");
    },

    onError: (err) => {
      const error = err as AxiosError;

      const message =
        (error.response?.data as any)?.detail ||
        "Login failed! Please check email or password.";

      toast.error(message);
    },
  });

  const onSubmit = (values: FormData) => {
    mutate(values as VerifyLoginPayload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <div className="space-y-0">
        <div className="space-y-1">
          <label>Email*:</label>
          <input
            {...register("email")}
            placeholder="Enter email"
            className="w-full border p-2 rounded"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm m-0">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-0">
        <div className="space-y-1">
          <label>Password*:</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter password"
            className="w-full border p-2 rounded"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm m-0">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
