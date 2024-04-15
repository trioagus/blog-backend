export function validateCommentInput(content: string, userId: string, articleId: string): void {
    if (!content.trim() || !userId.trim() || !articleId.trim()) {
      throw new Error("Content, user ID, and article ID are required.");
    }
  }
  