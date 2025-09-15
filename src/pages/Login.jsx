import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

//internal import
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import InputArea from "@/components/form/input/InputArea";
import useLoginSubmit from "@/hooks/useLoginSubmit";
import CMButton from "@/components/form/button/CMButton";
import logo from "@/assets/img/logo/logo-color.png";

const Login = () => {
	const { t } = useTranslation();
	const { onSubmit, register, handleSubmit, errors, loading } =
		useLoginSubmit();

	return (
		<>
			<div className="flex items-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
				<div className="flex-1 max-w-md mx-auto bg-white rounded-2xl shadow-2xl dark:bg-gray-800">
					<div className="flex flex-col md:flex-row">
						<main className="flex items-center justify-center w-full p-6 sm:p-10">
							<div className="w-full">
								{/* Logo */}
								<div className="flex justify-center mb-4">
									<img src={logo} alt="Company Logo" className="h-14 w-auto" />
								</div>

								{/* Heading */}
								<h1 className="mb-2 text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
									Welcome Back
								</h1>
								<p className="mb-6 text-center text-gray-500 dark:text-gray-400 text-sm">
									Please sign in to continue
								</p>

								{/* Form */}
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
									{/* Email */}
									<div>
										<LabelArea label="Email" />
										<InputArea
											required={true}
											register={register}
											defaultValue="superadmin@gmail.com"
											label="Email"
											name="email"
											type="email"
											autoComplete="username"
											placeholder="you@example.com"
										/>
										<Error errorName={errors.email} />
									</div>

									{/* Password */}
									<div>
										<LabelArea label="Password" />
										<InputArea
											required={true}
											register={register}
											defaultValue="1234567890"
											label="Password"
											name="password"
											type="password"
											autoComplete="current-password"
											placeholder="********"
										/>
										<Error errorName={errors.password} />
									</div>

									{/* Submit */}
									{loading ? (
										<CMButton
											disabled={loading}
											type="submit"
											className="bg-blue-600 rounded-lg h-12 w-full shadow-md hover:opacity-90 transition"
											to="/dashboard"
										/>
									) : (
										<Button
											disabled={loading}
											type="submit"
											className="h-12 w-full rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 text-white transition"
											to="/dashboard"
										>
											{t("LoginTitle")}
										</Button>
									)}
								</form>

								{/* Forgot Password */}
								<p className="mt-6 text-center">
									<Link
										className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
										to="/forgot-password"
									>
										{t("ForgotPassword")}
									</Link>
								</p>
							</div>
						</main>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
