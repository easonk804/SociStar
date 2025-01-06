import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#C6C6C8',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 16,
  },
  slogan: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C6C6C8',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#C6C6C8',
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#1C1C1E',
    marginLeft: 16,
  },
  socialSection: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 24,
  },
  socialTitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#C6C6C8',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
  },
  footerLink: {
    fontSize: 14,
    color: '#3498db',
    textDecorationLine: 'underline',
  },
});
