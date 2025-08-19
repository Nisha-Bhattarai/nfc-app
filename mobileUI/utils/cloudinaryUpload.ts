// utils/cloudinaryUpload.ts
export interface UploadResult {
  success: boolean;
  url?: string;
  data?: any;
  error?: any;
}

// export const uploadToCloudinary = async (imageUri: string): Promise<UploadResult> => {
//   try {
//     // unique name: current date/time
//     const fileName = "img_" + new Date().toISOString().replace(/[:.]/g, "-");

//     const data = new FormData();
//     data.append("file", {
//       uri: imageUri,
//       type: "image/jpeg", // or "image/png"
//       name: `${fileName}.jpg`,
//     } as any); // 👈 TS needs `as any` for FormData file

//     // ⚠️ Replace these with your actual Cloudinary settings
//     data.append("upload_preset", "unsigned_preset"); // your preset name
//     data.append("public_id", fileName);

//     const cloudName = "dacayiktf"; // your Cloudinary cloud name

//     const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//       method: "POST",
//       body: data,
//     });

//     const json = await res.json();

//     if (json.secure_url) {
//       return { success: true, url: json.secure_url, data: json };
//     } else {
//       return { success: false, error: json };
//     }
//   } catch (err) {
//     console.error("Upload error:", err);
//     return { success: false, error: err };
//   }
// };

// utils/cloudinaryUpload.ts
export const uploadImageToCloudinary = async (
  imageUri: string
): Promise<string | null> => {
  try {
    const data = new FormData();
    const fileName = `nfc_${new Date()
      .toISOString()
      .replace(/[:.]/g, "-")}.jpg`;

    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: fileName,
    } as any);

    data.append("upload_preset", "nfc_preset"); 
    data.append("folder", "nfc"); 

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dacayiktf/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();

    if (result.secure_url) {
      return result.secure_url; 
    }
    return null;
  } catch (error) {
    console.error("Upload failed", error);
    return null;
  }
};

export const uploadMultipleImagesToCloudinary = async (
  imageUris: string[]
): Promise<string[]> => {
  try {
    // Run all uploads in parallel
    const uploadPromises = imageUris.map(async (uri) => {
      const data = new FormData();
      const fileName = `nfc_${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}.jpg`;

      data.append("file", {
        uri,
        type: "image/jpeg",
        name: fileName,
      } as any);

      data.append("upload_preset", "nfc_preset");
      data.append("folder", "nfc");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dacayiktf/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();
      return result.secure_url ?? null;
    });

    // Wait until all are finished
    const uploadedUrls = await Promise.all(uploadPromises);

    // Filter out any failed uploads (nulls)
    return uploadedUrls.filter((url): url is string => !!url);
  } catch (error) {
    console.error("Multiple upload failed", error);
    return [];
  }
};


