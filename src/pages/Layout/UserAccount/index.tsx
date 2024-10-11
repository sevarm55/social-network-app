import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
	handleBlockUser,
	handleCancelRequest,
	handleGetUserAccountById,
	handleSendFollow,
	handleSendUnFollow,
} from "../../../lib/api";
import { IContext, IUserAccount } from "../../../lib/types";
import { BASE_URL, BLOCK } from "../../../lib/constant";
import { Gallery } from "../../../components/Gallery";

export const UserAccount = () => {
	const { id } = useParams();
	const [userAccount, setUserAccount] = useState<IUserAccount | null>(null);
	const { account } = useOutletContext<IContext>();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			handleGetUserAccountById(id).then((res) => {
				if (!res.payload) {
					navigate("/profile");
				} else {
					console.log(res);
					setUserAccount(res.payload as IUserAccount);
				}
			});
		}
	}, [id]);

	const handleRequest = () => {
		if (userAccount) {
			if (userAccount?.connection.following) {
				unFollowUser();
			} else if (userAccount?.connection.requested) {
				cancalRequest();
			} else {
				followUser();
			}
		}
	};

	const followUser = () => {
		if (userAccount) {
			handleSendFollow(userAccount.id).then((res) => {
				if (res.status == "following") {
					setUserAccount({
						...userAccount,
						followers: [...(userAccount.followers || []), account],
						connection: {
							...userAccount.connection,
							following: true,
						},
					});
				} else if ((res.status = "requested")) {
					setUserAccount({
						...userAccount,
						connection: {
							...userAccount.connection,
							requested: true,
						},
					});
				}
			});
		}
	};

	const unFollowUser = () => {
		if (userAccount) {
			handleSendUnFollow(userAccount.id).then((res) => {
				if (res.status == "unfollowed") {
					setUserAccount({
						...userAccount,
						followers: userAccount.followers
							? userAccount.followers.filter(
									(follower) => follower.id !== account.id
							  )
							: [],
						connection: {
							...userAccount.connection,
							following: false,
						},
					});
				}
			});
		}
	};

	const cancalRequest = () => {
		if (userAccount) {
			handleCancelRequest(userAccount.id).then((res) => {
				if (res.status == "cancelled") {
					setUserAccount({
						...userAccount,
						connection: {
							...userAccount.connection,
							requested: false,
						},
					});
				}
			});
		}
	};

	const changePostStatus = (id: number) => {
		if (userAccount) {
			setUserAccount({
				...userAccount,
				posts: userAccount?.posts?.map((post) => {
					if (post.id !== id) {
						return post;
					}

					const isLiked = !post.isLiked;
					const updatedLikes = isLiked
						? [...post.likes, account]
						: post.likes.filter((a) => a.id !== account.id);

					return { ...post, isLiked, likes: updatedLikes };
				}),
			});
		}
	};

	const handleBlock = (id: number) => {
		if (userAccount) {
			handleBlockUser(id).then((res) => {
				console.log(res);
				if (res.message == "blocked") {
					setUserAccount({
						...userAccount,
						cover: "",
						picture: "",
						posts: [],
						followers: [],
						following: [],
						connection: {
							...userAccount?.connection,
							didIBlock: true,
						},
					});
				} else if (res.message == "unblocked") {
					setUserAccount(res.payload as IUserAccount);
				} else if (
					res.status == "error" &&
					res.message == "you are blocked"
				) {
					setUserAccount({
						...userAccount,
						connection: {
							...userAccount.connection,
							didIBlock: false,
							blockedMe: true,
						},
					});
				}
			});
		}
	};

	return (
		userAccount && (
			<>
				<div className='account-page-container'>
					<div className='account-header'>
						<div className='image-wrapper'>
							<img
								src={
									userAccount.connection.didIBlock ||
									userAccount.connection.blockedMe
										? BLOCK
										: BASE_URL + userAccount?.picture
								}
								alt='Profile'
								className='account-profile-pic'
							/>
						</div>
						<div className='account-info'>
							<h2 className='account-name'>
								{userAccount?.name} {userAccount?.surname}
							</h2>
							<p className='account-bio'>
								Photographer | Traveler | Dreamer <br />
								Living the dream one click at a time 🌍📸
							</p>
							<div className='account-stats'>
								<span>
									{userAccount?.posts?.length || 0} posts
								</span>
								<span>
									{userAccount?.followers?.length} followers
								</span>
								<span>
									{userAccount?.following?.length} following
								</span>
							</div>
							<div className='account-actions'>
								{!userAccount.connection.didIBlock &&
									!userAccount.connection.blockedMe && (
										<button
											className='follow-button'
											onClick={handleRequest}
										>
											{userAccount?.connection.following
												? "Unfollow"
												: userAccount?.connection
														.followsMe
												? "Follow Back"
												: userAccount.connection
														.requested
												? "Cancel Request"
												: "follow"}
										</button>
									)}
								<button
									className='block-button'
									onClick={() => handleBlock(userAccount.id)}
								>
									{userAccount.connection.didIBlock
										? "unblock user"
										: userAccount.connection.blockedMe
										? "block user back"
										: "block user"}
								</button>
							</div>
						</div>
					</div>
					<br />
					<hr />
					{userAccount.connection.didIBlock ? (
						<p className='blocked-message'>
							THIS USER IS NOT AVAILABLE
						</p>
					) : userAccount.connection.blockedMe ? (
						<p className='blocked-message'>You are blocked</p>
					) : userAccount?.isPrivate &&
					  !userAccount.connection.following ? (
						<p className='private-account-message'>
							This account is private. Follow to see their posts.
							<span
								className='account-status locked'
								title='Private Account'
							>
								🔒
							</span>
						</p>
					) : (
						userAccount.posts && (
							<Gallery
								userPosts={userAccount}
								posts={userAccount.posts}
								onUpdatePost={changePostStatus}
							/>
						)
					)}
				</div>
			</>
		)
	);
};
