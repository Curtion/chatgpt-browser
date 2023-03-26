export function showToast(message: string) {
  const toast = document.getElementById('my-toast')
  if (!toast)
    return
  toast.textContent = message
  toast.classList.remove('opacity-0')
  toast.classList.add('opacity-100')
  setTimeout(() => {
    toast.classList.remove('opacity-100')
    toast.classList.add('opacity-0')
  }, 1500)
}
