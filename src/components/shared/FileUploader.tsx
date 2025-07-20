import { useCallback, useState } from 'react'
import { useDropzone, type FileWithPath } from 'react-dropzone'
import { Button } from '../ui/button'


type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
}


const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setfileUrl] = useState(mediaUrl)


  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setfileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])


  const { getRootProps, getInputProps } = useDropzone({
    onDrop, accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg']
    }
  })


  return (
    <div {...getRootProps()} className='  flex flex-center flex-col items-center rounded-xl cursor-pointer'>
      <input {...getInputProps()} className=' cursor-pointer' />
      {
        fileUrl ? (
          <div className=' flex flex-1 justify-center w- p-3 lg:p-10 bg-slate-800'>
            <img src={fileUrl} alt="image"
              className=' h-40 rounded-[24px] object-cover object-top' />
            <p className=' file_uploader-label mt-12'>Click or drag photo to replace</p>
          </div>
        ) : (
          <div className=' file_uploader-box'>
            <img src="/assets/icons/file-upload.svg" alt=""
              width={96}
              height={77}
            />

            <h3 className=' base-medium text-gray-300 mb-2 mt-6'>Drag Photo here</h3>
            <p className=' text-gray-400 small-regular mb-2'>
              SVG, PNG, JPG
            </p>

            <Button className=''>Select from computer</Button>
          </div>


        )

      }
    </div>
  )
}

export default FileUploader