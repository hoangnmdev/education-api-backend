class RequestUtils {
  static EMAIL_EXTRACT_REGEX =
    /@([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/g;
  static extractMentionedStudents(notification: string): string[] {
    if (!notification || notification.trim().length === 0) {
      return [''];
    }
    return Array.from(
      notification.match(RequestUtils.EMAIL_EXTRACT_REGEX) ?? [''],
    ).map((i) => i.slice(1));
  }
}

export default RequestUtils;
