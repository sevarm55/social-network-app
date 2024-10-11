import { useEffect, useRef, useState } from 'react'
import { ImCheckboxChecked } from 'react-icons/im'
import { FaRegImage } from 'react-icons/fa'

import { handleAddPost, handleGetPosts } from '../../../lib/api'
import { IPost } from '../../../lib/types'
import { Gallery } from '../../../components/Gallery'

export const Posts = () => {
    const [postsData, setPostsData] = useState<IPost[]>([])
    const [text, setText] = useState<string>('')
    const [fileSelect, setFileSelect] = useState<boolean>(false)
    const photo = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        handleGetPosts().then((res) => {
            setPostsData(res.payload as IPost[])
            console.log(res.payload);
        })
    }, [])

    const handleUpload = () => {
        if (photo.current) {
            const file = photo.current.files?.[0]
            if (file) {
                const form = new FormData()
                form.append('photo', file)
                form.append('content', text)

                handleAddPost(form).then((res) => {
                    setPostsData([...postsData, res.payload as IPost])
                    setText('')
                    setFileSelect(false)
                    if (photo.current) {
                        photo.current.value = ''
                    }
                })
            }
        }
    }

    const handleFileChange = () => {
        if (photo.current?.files?.[0]) {
            setFileSelect(true)
        }
    }

    return (
        <>
            <div className="posts-container">
                <section className="add-post-section">
                    <h2>Add New Post</h2>

                    <div className="form-group">
                        <button
                            onClick={() => photo.current?.click()}
                            className="uploadbtn"
                        >
                            {fileSelect ? (
                                <>
                                    <ImCheckboxChecked />
                                    File Selected
                                </>
                            ) : (
                                <>
                                    <FaRegImage size={22} />
                                    Select a File
                                </>
                            )}
                        </button>
                        <input
                            hidden
                            ref={photo}
                            type="file"
                            id="image"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Write a description..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleUpload}
                        type="submit"
                        className="submit-btn"
                    >
                        Add Post
                    </button>
                </section>

                <section className="gallery-section">
                    <Gallery posts={postsData} />
                </section>
            </div>
        </>
    )
}
