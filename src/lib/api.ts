import axios from "axios";
import { INewPass, IPartialUser, IResponse } from "./types";

export const Axios = axios.create({
	baseURL: "http://localhost:4002",
	withCredentials: true,
});

export const handleSignUp = async (user: IPartialUser): Promise<IResponse> => {
	const response = await Axios.post("/signup", user);
	return response.data;
};

export const handleLogin = async (user: IPartialUser): Promise<IResponse> => {
	const response = await Axios.post("/login", user);
	return response.data;
};

export const handleVerify = async (): Promise<IResponse> => {
	const response = await Axios.get("/verify");
	return response.data;
};

export const handleLogout = async (): Promise<IResponse> => {
	const response = await Axios.post("/logout");
	return response.data;
};

export const handleChangePassword = async (
	data: INewPass
): Promise<IResponse> => {
	const response = await Axios.patch("/update/password", data);
	return response.data;
};

export const handleChangeLogin = async (
	data: IPartialUser
): Promise<IResponse> => {
	const response = await Axios.patch("/update/login", data);
	return response.data;
};

export const handleUploadPicture = async (
	data: FormData
): Promise<IResponse> => {
	const response = await Axios.patch("/profile/upload", data);
	return response.data;
};

export const handleUploadCover = async (data: FormData): Promise<IResponse> => {
	const response = await Axios.patch("/cover/upload", data);
	return response.data;
};

export const handleGetPosts = async (): Promise<IResponse> => {
	const response = await Axios.get("posts");
	return response.data;
};

export const handleAddPost = async (data: FormData): Promise<IResponse> => {
	const response = await Axios.post("/posts", data);
	return response.data;
};

export const handleSearchUser = async (text: string): Promise<IResponse> => {
	const response = await Axios.get("/search/" + text);
	return response.data;
};

export const handlePrivacySwitch = async (): Promise<IResponse> => {
	const response = await Axios.patch("/account/set");
	return response.data;
};

export const handleGetUserAccountById = async (
	id: string
): Promise<IResponse> => {
	const response = await Axios.get("/account/" + id);
	return response.data;
};

export const handleSendFollow = async (id: number): Promise<IResponse> => {
	const response = await Axios.post("/account/follow/" + id);
	return response.data;
};

export const handleSendUnFollow = async (id: number): Promise<IResponse> => {
	const response = await Axios.post("/account/unfollow/" + id);
	return response.data;
};

export const handleCancelRequest = async (id: number): Promise<IResponse> => {
	const response = await Axios.delete("/request/cancel/" + id);
	return response.data;
};

export const handleGetALlRequests = async (): Promise<IResponse> => {
	const response = await Axios.get("/requests");
	return response.data;
};

export const handleRequestsAccept = async (id: number): Promise<IResponse> => {
	const response = await Axios.patch("/requests/accept/" + id);
	return response.data;
};

export const handleRequestsDecline = async (id: number): Promise<IResponse> => {
	const response = await Axios.patch("/requests/decline/" + id);
	return response.data;
};

export const handleToggleLike = async (id: number): Promise<IResponse> => {
	const response = await Axios.post("/posts/react/" + id);
	return response.data;
};

export const handleGetPostById = async (id: number): Promise<IResponse> => {
	const response = await Axios.get("/posts/" + id);
	return response.data;
};

export const handleBlockUser = async (id: number): Promise<IResponse> => {
	const response = await Axios.post("/block/" + id);
	return response.data;
};

export const handleAddComment = async (
	text: string,
	id: number
): Promise<IResponse> => {
	const response = await Axios.post("/posts/comment/" + id, {text});
	return response.data;
};
