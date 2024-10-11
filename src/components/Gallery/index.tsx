import { useOutletContext } from "react-router-dom";
import { IContext, IPost, IUserAccount } from "../../lib/types";
import { BASE_URL, DEF_PIC } from "../../lib/constant";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { handleToggleLike } from "../../lib/api";
import { Post } from "./Post";
import { useState } from "react";
import { BiComment } from "react-icons/bi";

interface IProps {
	posts?: IPost[];
	userPosts?: IUserAccount;
	onUpdatePost?: (id: number) => void;
}

export const Gallery = ({ posts, userPosts, onUpdatePost }: IProps) => {
	const [currentPost, setCurrentPost] = useState<number>(-1);
	const { account } = useOutletContext<IContext>();

	const reactPost = (id: number) => {
		handleToggleLike(id).then(() => {
			if (onUpdatePost) {
				onUpdatePost(id);
			}
		});
	};

	const handleClose = () => {
		setCurrentPost(-1);
	};

	return (
		<>
			<div className='gallery-wrapper'>
				{posts?.map((post) => (
					<div
						key={post.id}
						onClick={() => setCurrentPost(post.id)}
						className='post-container'
					>
						<div className='post-header-section'>
							<div className='p-left'>
								<img
									src={
										userPosts
											? BASE_URL + userPosts?.picture
											: account
											? BASE_URL + account.picture
											: DEF_PIC
									}
									alt='Profile'
									className='profile-avatar'
								/>
							</div>
							<div className='post-user-details'>
								<p className='user-full-name'>
									{account.name} {account.surname}
								</p>
							</div>
						</div>
						<img
							src={
								post.picture
									? `${BASE_URL}${post.picture}`
									: DEF_PIC
							}
							alt='Post'
							className='post-media'
						/>
						<div
							onClick={(e) => e.stopPropagation()}
							className='post-description-section'
						>
							{post.title}
						</div>
						<div className='post-interaction-buttons'>
							<button
								className='like-button'
								onClick={(e) => {
									e.stopPropagation();
									reactPost(post.id);
								}}
							>
								{post.isLiked ? (
									<FaHeart color='red' size={18} />
								) : (
									<FaRegHeart size={18} />
								)}
								<span
									className='like-length'
									onClick={(e) => {
										e.stopPropagation();
									}}
								>
									{post.likes.length}
								</span>
							</button>
							<button className='comment-button1'>
								<BiComment size={18} />
								<p className='add-com-people '>
									{post.comments.length}
								</p>
							</button>
						</div>
						<div className='comment-item1'>
							{post.comments.length != 0 && (
								<>
									<hr style={{ margin: 0 }} />
									<img
										src={
											BASE_URL +
											post?.comments[0].user.picture
										}
										alt='User Avatar'
										className='comment-avatar1'
									/>
									<div className='comment-content1'>
										<strong className='comment-author1'>
											{post?.comments[0]?.user.name}
										</strong>
										<span className='comment-text1'>
											{post?.comments[0]?.content}
										</span>
									</div>
								</>
							)}
						</div>
					</div>
				))}
			</div>
			{currentPost != -1 && (
				<Post postId={currentPost} handleClose={handleClose} />
			)}
		</>
	);
};
