	const modal = document.getElementById("modal");
  const modalMensaje = document.getElementById("modalMensaje");
  const span = document.getElementsByClassName("close")[0];

  document.getElementById("openModalHeader").onclick = function(e){openModal();};
  document.getElementById("openModalBody").onclick = function(e){openModal();};

    span.onclick = function() {   closeModal();}
    window.onclick = function(event) {
      if (event.target == modal) {closeModal();}
    }   
    openModal = ()=>{
        modal.classList.remove('closeModal');
        modal.classList.add('openModal');
    }
    closeModal = () =>{
      modal.classList.remove('openModal');
      modal.classList.add('closeModal');
    }
    openModalMensaje = ()=>{
        modalMensaje.classList.remove('closeModal');
        modalMensaje.classList.add('openModal');
    }
    closeModalMensaje = () =>{
      modalMensaje.classList.remove('openModal');
      modalMensaje.classList.add('closeModal');
    }

  function openCity(cityName) {
    var i;
    var x = document.getElementsByClassName("box");
    for(i of x){i.classList.remove('active');}
    document.getElementById(cityName).classList.add('active');
  }

  const buttonsOption = document.querySelectorAll('input[name="buttonOption"]');
  for(buttonOption of buttonsOption){
    buttonOption.addEventListener('click',function(){
      let id = this.getAttribute('id').split('_');
      console.log(id[1]);
      openCity(id[1]);
    });
  }

  document.getElementById('whatsappBody').addEventListener('click',()=>{
    openModalMensaje();
    setTimeout(()=> {
      closeModalMensaje();
      window.open('https://wa.me/5215572279060?text=Me%20interesa%20cotizar%20mi%20logo%20');
    },3000);
  });

  document.getElementById('whatsappModal').addEventListener('click',()=>{
    openModalMensaje();
    setTimeout(()=> {
      closeModalMensaje();
      window.open('https://wa.me/5215572279060?text=Me%20interesa%20cotizar%20mi%20logo%20');
    },3000);
  });