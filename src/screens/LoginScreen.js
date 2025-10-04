const styles = StyleSheet.create({
  // Fundo e layout geral
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a', // slate-900
  },
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 20,
  },

  // Títulos
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#e5e7eb', // zinc-200
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#94a3b8', // slate-400
    marginTop: -4,
  },

  // Form
  formGroup: {
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#cbd5e1', // slate-300
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1f2937', // slate-800
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: 'rgba(2, 6, 23, 0.6)', // glass escuro
    fontSize: 16,
    color: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 3,
  },

  // Botão
  buttonContainer: {
    marginTop: 8,
    backgroundColor: '#2563eb', // blue-600
    borderRadius: 12,
    paddingVertical: 14,
    shadowColor: '#60a5fa', // leve glow
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 3,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  buttonDisabled: {
    backgroundColor: '#3b82f6', // blue-500
    opacity: 0.7,
  },

  // Loading
  loadingContainer: {
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 14,
  },
});
