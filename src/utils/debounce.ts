export default function debounce(func: any, wait: any) {
  let timeout: any;
  return (...args: any) => {
      clearTimeout(timeout);  // Limpa o temporizador anterior
      timeout = setTimeout(() => func(...args), wait);  // Reinicia o temporizador
  };
}