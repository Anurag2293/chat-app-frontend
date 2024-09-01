import { useCallback, type Dispatch, type SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { motion } from "framer-motion"
import { ImagePlus } from 'lucide-react';

import { useUploadThing } from "@/lib/uploadthing";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

type ProfileImageProps = {
  profileImageURL: string;
  setProfileImageURL: Dispatch<SetStateAction<string>>;
};

export function ProfileImageUploader(props: ProfileImageProps) {
  const { toast } = useToast();

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (res) => {
        console.log("uploaded successfully!");
        console.log({ res });
        props.setProfileImageURL(res[0].url);
        toast({
          title: "Image Uploaded Successfully!",
        });
      },
      onUploadError: () => {
        console.log("error occurred while uploading");
        props.setProfileImageURL('');
        toast({
          title: "Error uploading image!",
          variant: "destructive",
        });
      },
      onUploadBegin: () => {
        console.log("Upload has begun!");
      },
    },
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    props.setProfileImageURL('');
    startUpload(acceptedFiles);
  }, [startUpload, props.setProfileImageURL]);

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div className="space-y-2">
      <Label htmlFor="group-image" className="sr-only">Group Image</Label>
      <div className="flex items-center justify-center w-full" {...getRootProps()}>
        <div
          className={`relative flex flex-col items-center justify-center w-32 h-32 border-dashed border-red-600 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 overflow-hidden`}
        >
          {props.profileImageURL.length === 0 && isUploading &&
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          }
          {props.profileImageURL.length === 0 && isUploading &&
            <div className="absolute inset-2 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold">Upoading...</span>
            </div>
          }
          {props.profileImageURL.length > 0 && (
            <img src={props.profileImageURL} alt="Group" className="w-full h-full object-cover rounded-full" />
          )}
          {props.profileImageURL.length === 0 && !isUploading && (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImagePlus className="w-8 h-8 mb-2 text-gray-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Upload image</p>
            </div>
          )}
          <Input id="group-image" type="file" accept="image/*" className="hidden" {...getInputProps()} />
        </div>
      </div>
    </div>
  );
}
