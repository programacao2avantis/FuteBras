/* Único comportamento: alternar telas para demonstração visual. */
document.addEventListener('click', function (event) {
  const target = event.target.closest('[data-go]');
  if (!target) return;
  event.preventDefault();
  const id = target.getAttribute('data-go');
  document.querySelectorAll('.tela').forEach(function (tela) {
    tela.classList.remove('ativa');
  });
  const tela = document.getElementById(id);
  if (tela) tela.classList.add('ativa');
  window.scrollTo(0, 0);
});