import RequestUtils from '..';

describe('RequestUtils.extractMentionedStudents', () => {
  it('should return [""] when the notification is an empty string', () => {
    const result = RequestUtils.extractMentionedStudents('');
    expect(result).toEqual(['']);
  });

  it('should return [""] when the notification is only whitespace', () => {
    const result = RequestUtils.extractMentionedStudents('   ');
    expect(result).toEqual(['']);
  });

  it('should return [""] when there are no email mentions', () => {
    const result = RequestUtils.extractMentionedStudents('Hello world!');
    expect(result).toEqual(['']);
  });

  it('should extract a single email from the notification', () => {
    const notification = 'Hello @student@example.com, welcome!';
    const result = RequestUtils.extractMentionedStudents(notification);
    expect(result).toEqual(['student@example.com']);
  });

  it('should extract multiple emails from the notification', () => {
    const notification =
      'Hello @student1@example.com and @student2@example.com!';
    const result = RequestUtils.extractMentionedStudents(notification);
    expect(result).toEqual(['student1@example.com', 'student2@example.com']);
  });

  it('should handle punctuation correctly around email mentions', () => {
    const notification =
      'Emails: @student1@example.com, @student2@example.com.';
    const result = RequestUtils.extractMentionedStudents(notification);
    expect(result).toEqual(['student1@example.com', 'student2@example.com']);
  });
});
