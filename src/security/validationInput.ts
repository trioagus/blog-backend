export function validateInput(title: string, content: string, image: string | null): boolean {
  if (!title.trim() || !content.trim()) {
    throw new Error("Title and content are required.");
  }

  const MAX_TITLE_LENGTH = 255;
  if (title.length > MAX_TITLE_LENGTH) {
    throw new Error(`Title must be less than ${MAX_TITLE_LENGTH} characters.`);
  }

  const MAX_CONTENT_LENGTH = 65535;
  if (content.length > MAX_CONTENT_LENGTH) {
    throw new Error(`Content must be less than ${MAX_CONTENT_LENGTH} characters.`);
  }

  if (image) {
      const fileExtension = image.split(".").pop()?.toLowerCase();
      if (
        fileExtension !== "jpg" &&
        fileExtension !== "jpeg" &&
        fileExtension !== "png" &&
        fileExtension !== "webp" &&
        fileExtension !== "gif"
      ) {
        throw new Error("Only JPG, JPEG, WEBP, GIF, and PNG images are allowed.");
      }
  }

  return true;
}
