import { useState, useCallback } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "@/lib/uploadthing";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

import UploadIcon from "@/components/icons/upload";

export function ProfileImageUploader() {
    const [profileImage, setProfileImage] = useState<File>();
    const { toast } = useToast();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles);
        startUpload(acceptedFiles);
        setProfileImage(acceptedFiles[0]);
    }, []);

    const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
        "imageUploader",
        {
            onClientUploadComplete: () => {
                console.log("uploaded successfully!");
                toast({
                    title: "Image Uploaded Successfully!"
                });
            },
            onUploadError: () => {
                console.log("error occurred while uploading");
                toast({
                    title: "Error uploading image!",
                    variant: "destructive"
                });
            },
            onUploadBegin: () => {
                console.log("Upload has begun!");
            },
        },
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
                    <p className="text-sm font-normal">{isUploading ? "Uploading..." : "Upload Image"}</p>
                    <Input id="picture" type="file" {...getInputProps()} />
                </div>

                {profileImage &&
                    <Avatar>
                        <AvatarImage src={URL.createObjectURL(profileImage)} />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                }

                {!profileImage &&
                    <div className="flex-1 text-sm text-muted-foreground">
                        JPG, PNG or GIF up to 1MB
                    </div>
                }
            </div>
        </div>
    );
}