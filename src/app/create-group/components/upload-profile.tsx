import { useState, useCallback } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import type { Dispatch, SetStateAction } from "react";

import { useUploadThing } from "@/lib/uploadthing";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

import UploadIcon from "@/components/icons/upload";

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
          description: res[0].url,
        });
      },
      onUploadError: () => {
        console.log("error occurred while uploading");
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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      startUpload(acceptedFiles);
    },
    [startUpload],
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div className="grid gap-2">
      <Label htmlFor="profile-picture">Profile Picture</Label>
      <div className="flex items-center gap-2">
        <div
          className="button py-[9px] px-4 border rounded-md flex items-center justify-center flex-1 cursor-pointer hover:bg-secondary"
          {...getRootProps()}
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          <p className="text-sm font-normal">
            {isUploading ? "Uploading..." : "Upload Image"}
          </p>
          <Input id="picture" type="file" {...getInputProps()} />
        </div>

        {props.profileImageURL.length > 0 && (
          <Avatar>
            <AvatarImage src={props.profileImageURL} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        )}

        {props.profileImageURL.length === 0 && (
          <div className="flex-1 text-sm text-muted-foreground">
            JPG, PNG or GIF up to 1MB
          </div>
        )}
      </div>
    </div>
  );
}
