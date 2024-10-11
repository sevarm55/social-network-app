import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { handleAddComment, handleGetPostById } from "../../../lib/api";
import { IComment, IPost } from "../../../lib/types";
import { BASE_URL } from "../../../lib/constant";
import { Link } from "react-router-dom";
import { VscSend } from "react-icons/vsc";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 900,
	height: 600,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	// p: 4,
};

interface IPops {
	postId: number;
	handleClose: () => void;
}

export function Post({ postId, handleClose }: IPops) {
	const [currentPostData, setCurrentPostData] = useState<IPost | null>(null);
	const [text, setText] = useState<string>("");

	useEffect(() => {
		handleGetPostById(postId).then((res) => {
			setCurrentPostData(res.payload as IPost);
		});
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleAddComment(text, postId).then((res) => {
			if (currentPostData) {
				setCurrentPostData({
					...currentPostData,
					comments: [
						...currentPostData.comments,
						res.payload as IComment,
					],
				});
                setText('')
			}
		});
	};

	return (
		<Modal
			open={true}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				{currentPostData && (
					<div className='post-cont'>
						<div className='image-section'>
							<img
								src={BASE_URL + currentPostData.picture}
								alt='Пост'
								className='large-image'
							/>
						</div>
						<div className='under'>
							<div className='likes-section'>
								<Typography
									variant='h6'
									component='h2'
									className='header-likes'
								>
									Likes
								</Typography>
								<ul className='list-likes'>
									{currentPostData.likes.map((like) => (
										<li key={like.id} className='list-item'>
											<img
												src={BASE_URL + like.picture}
												alt='User-profile'
												className='user-avatar'
											/>
											<Link
												to={"/profile/" + like.id}
												className='user-name'
												onClick={handleClose}
											>
												{like.name} {like.surname}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className='comments-section'>
								<Typography
									variant='h6'
									component='h2'
									className='header-comments'
								>
									Comments
								</Typography>
								<div className='send-input'>
									<form onSubmit={handleSubmit}>
										<input
											type='text'
											placeholder='Write a comment...'
											value={text}
											onChange={(e) =>
												setText(e.target.value)
											}
											id='comment-input12'
										/>
										<VscSend className='sendIcon' />
									</form>
								</div>
								<ul className='list-comments'>
									{currentPostData.comments.map((comment) => (
										<li
											key={comment.id}
											className='comment-item'
										>
											<img
												src={
													BASE_URL +
													comment.user.picture
												}
												alt='User Avatar'
												className='comment-avatar'
											/>
											<div className='comment-content'>
												<strong className='comment-author'>
													{comment.user.name}
												</strong>
												<span className='comment-text'>
													{comment.content}
												</span>
											</div>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				)}
			</Box>
		</Modal>
	);
}
