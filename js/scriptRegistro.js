// FUNCTION PARA O TAB - (muda entre achados e perdidos)
function changeTab(tab) {
  const line = document.querySelector('.line');
  const tabs = document.querySelectorAll('.tab');

  if (tab === 'achado') {
    line.style.left = '0';
    line.style.width = '50%';
  } else if (tab === 'perdido') {
    line.style.left = '50%';
    line.style.width = '50%';
  }

  const formulario = document.getElementById('formulario');
  formulario.classList.remove('achado', 'perdido');
  formulario.classList.add(tab);

  console.log("A aba selecionada é: " + tab);
}
