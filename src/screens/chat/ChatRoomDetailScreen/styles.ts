import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E4E8',
    alignItems: 'center',
  },
  roomName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 12,
  },
  roomDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#FFF',
    marginTop: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFF',
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E4E8',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  seeAllButton: {
    color: '#007AFF',
    fontSize: 14,
  },
  membersList: {
    paddingHorizontal: 16,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  memberInfo: {
    flex: 1,
    marginLeft: 12,
  },
  memberName: {
    fontSize: 16,
    color: '#1C1C1E',
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 14,
    color: '#8E8E93',
  },
  actionButtons: {
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionButtonDanger: {
    backgroundColor: '#FFE5E5',
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  actionTextDanger: {
    color: '#FF3B30',
  },
  joinButton: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
