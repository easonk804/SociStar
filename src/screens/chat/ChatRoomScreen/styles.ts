import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E4E8',
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 8,
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  participantsCount: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  messageList: {
    flex: 1,
    padding: 16,
  },
  messageItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  messageItemRight: {
    flexDirection: 'row-reverse',
  },
  avatarContainer: {
    marginRight: 8,
  },
  avatarContainerRight: {
    marginLeft: 8,
    marginRight: 0,
  },
  messageContent: {
    flex: 1,
    maxWidth: '75%',
  },
  messageBubble: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 16,
    borderTopLeftRadius: 4,
  },
  messageBubbleRight: {
    backgroundColor: '#007AFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  messageTextRight: {
    color: '#FFF',
  },
  messageTime: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  messageTimeRight: {
    alignSelf: 'flex-end',
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E4E8',
    padding: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F3F4',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 8,
    minHeight: 36,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  systemMessage: {
    alignSelf: 'center',
    backgroundColor: 'rgba(142, 142, 147, 0.12)',
    borderRadius: 16,
    padding: 8,
    marginVertical: 8,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});
