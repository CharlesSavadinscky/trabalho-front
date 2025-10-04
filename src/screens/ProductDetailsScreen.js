const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
    backgroundColor: '#0f172a', // fundo dark (slate-900)
  },

  centered: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },

  image: {
    width: '100%',
    height: 320,
    borderRadius: 16,
    backgroundColor: 'rgba(2,6,23,0.6)', // glass
    borderWidth: 1,
    borderColor: '#1e293b', // slate-800
  },

  section: {
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(2,6,23,0.55)', // card glass
    borderWidth: 1,
    borderColor: '#1e293b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 3,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#e5e7eb', // texto claro
    letterSpacing: 0.2,
  },

  category: {
    fontSize: 16,
    color: '#60a5fa', // blue-400
    textTransform: 'capitalize',
    fontWeight: '700',
  },

  price: {
    fontSize: 22,
    fontWeight: '800',
    color: '#34d399', // emerald-400
    letterSpacing: 0.3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#e5e7eb',
  },

  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#cbd5e1', // slate-300
  },

  errorText: {
    color: '#fecaca', // red-200 (legível no dark)
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },

  retryButton: {
    backgroundColor: '#2563eb', // blue-600
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 3,
  },

  retryText: {
    color: '#ffffff',
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
