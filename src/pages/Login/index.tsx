import {
	MDBContainer,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBRow,
	MDBCol,
	MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IPartialUser } from "../../lib/types";
import { Error } from "../../components/Error";
import { useState } from "react";
import { handleLogin } from "../../lib/api";

export function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IPartialUser>();
	const [errorRes, setErrorRes] = useState<string>("");
	const navigate = useNavigate();

	const handleFormSubmit = (data: IPartialUser) => {
		handleLogin(data).then((res) => {
			if (res.status == "error" && res.message) {
				setErrorRes(res.message);
			} else {
				navigate("/profile");
			}
		});
	};

	return (
		<MDBContainer fluid>
			<MDBRow className='d-flex justify-content-center align-items-center'>
				<MDBCol lg='8'>
					<MDBCard
						className='my-5 rounded-3'
						style={{ maxWidth: "600px" }}
					>
						<MDBCardImage
							src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp'
							className='w-100 rounded-top'
							alt='Sample photo'
						/>

						<MDBCardBody className='px-5'>
							<h3 className='mb-4 pb-2 pb-md-0 mb-md-5 px-md-2'>
								Login Info
							</h3>
							<p>
								Don't you have an account?{" "}
								<Link to={"/"}>Signup Now</Link>
							</p>
							<form onSubmit={handleSubmit(handleFormSubmit)}>
								<Error children={errorRes} />
								<MDBInput
									className={
										errors.login ? "errorInput" : "input"
									}
									wrapperClass='mb-1'
									placeholder='Login'
									type='text'
									{...register("login", {
										required: "Please fill your login",
									})}
								/>
								<Error children={errors.login?.message} />
								<MDBInput
									className={
										errors.password ? "errorInput" : "input"
									}
									wrapperClass='mb-1'
									placeholder='Password'
									type='password'
									{...register("password", {
										required: "Please fill your password",
										minLength: {
											value: 6,
											message:
												"Password must be a 6 characters",
										},
									})}
								/>
								<Error children={errors.password?.message} />
								<button
									type='submit'
									className='btn btn-outline-info'
								>
									Submit
								</button>
							</form>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
}
