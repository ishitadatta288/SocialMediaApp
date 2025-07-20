import PostForm from '@/components/forms/PostForm'
//import React from 'react'

const CreatePost = () => {
  return (
    <div className=' flex flex-1 min-h-screen'>
      <div className=' common-container'>
        <div className=' max-w-4xl flex-start gap-3 justify-start w-full'>
          <img src="/assets/icons/add-post.svg" alt="add"
            width={36}
            height={36} />
          <h2 className=' text-2xl font-bold md:h2-bold text-left md:text-left w-full'>Create Post</h2>
        </div>


        <div className="w-full min-h-screen bg-dark-3 flex justify-center px-4 sm:bg-slate-900 sm:py-10">
          <div className=' w-full max-w-4xl'>
            <PostForm action='Create' />
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePost