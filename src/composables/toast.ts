export function showToast(message: string) {
  const toast = document.getElementById('my-toast')
  if (!toast)
    return
  toast.textContent = message
  toast.classList.add('opacity-100')
  setTimeout(() => {
    toast.classList.remove('opacity-100')
  }, 1500)
}
