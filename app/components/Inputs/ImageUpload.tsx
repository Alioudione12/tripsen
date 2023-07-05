'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global{
  var cloudinary:any;
}

interface ImageUploadProps{
  onChange: (value:string) => void;
  value:string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {

  const handleUpload = useCallback((result: any)=>{
    onChange(result.info.secure_url)
  },[onChange])
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="wwxvpu6u"
      options={{
        maxFiles: 1
      }}
    >
      {({open})=>{
        return(
          <div 
            onClick={()=> open?.()}
            className="relative cursor-pointer hover:opacity-50 transition border-dashed 
            border-2 p-20 border-neutral-300 flex flex-col justify-center items-center 
            gap-4 text-secondary"
            >
            <TbPhotoPlus size={50}/>
            <div className="font-semibold text-lg">
              Click to upload 
            </div>
            {
              value &&(
                <div className="w-full absolute inset-0 h-full">
                  <Image 
                    alt="Upload"
                    fill
                    style={{objectFit:'cover' }}
                    src={value}
                    />
                </div>
              )
            }
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload