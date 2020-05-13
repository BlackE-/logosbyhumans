	const modal = document.getElementById("modal");
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

    const signinUrl = 'script/sendMail.php';
    const $formBody = document.getElementById('mailing');
    const $formModal = document.getElementById('mailingModal');

    const $enviarModal = document.getElementById('enviarModal');
    const $enviarBody = document.getElementById('enviarBody');

    const emailBody = document.querySelector('input[name="emailBody"]');
    const emailModal = document.querySelector('input[name="emailModal"]');

    const $postResultBody = document.getElementById('messageBody')
    const $postResultModal = document.getElementById('messageModal')
    const hasError = {}
    const rules = {
        email: /[\w_+.]+@[\w_]+\.\w{2,}(?:\.\w{2})?$/
    }

    function simpleValidade(input, rule) {
      const test = rule.test(input.value);
      if(!input.value) return;
      test ? input.classList.add('success') : input.classList.add('error')
    }

    function startLoading(type) {
      (type) ?  $enviarBody.innerHTML = 'ENVIANDO' :  $enviarModal.innerHTML = 'ENVIANDO';
    }
    function stopLoading(type) {
      setTimeout(() => {
        (type) ? $enviarBody.innerHTML = 'ENVIAR': $enviarModal.innerHTML = 'ENVIAR'
      }, 1000);
    }

    function showMessage(type,res) {
        if(type){
          //TYPE BODY
          $postResultBody.innerText = res.message;
          if(!res.return){
            emailBody.value ='';
            emailBody.classList.remove('error');
          }
          setTimeout(() => $postResultBody.innerText = '', 3000);
          
        }else{
          //TYPE MODAL
          $postResultModal.innerText = res.message;
          if(!res.return){
            emailModal.value ='';
            emailModal.classList.remove('error');
          }
          setTimeout(() => $postResultModal.innerText = '', 3000);
        }
    }

    // function post(type,url, data, cb) {
    //   const payload = {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //      body:JSON.stringify(data)
    //   }
    //   startLoading(type)
    //   fetch(url,payload).then(dt =>dt.json())
    //     .then(dt => {
    //       cb(dt)
    //       stopLoading(type)
    //       showMessage(dt)
    //     })
    // }

    function ajax(type,url,data){
      startLoading(type);
      var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              // console.log(this.response);
                myObj = JSON.parse(this.response);
                if(!myObj.return){
                    stopLoading(type)
                    showMessage(type,myObj)
                }
            }
        };
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);
    }

    const submitBody = ev => {
      ev.preventDefault();
      // post(1, signinUrl, {email: $emailBody.value,type:'A desktop body'}, function(res) {console.log(res)});
      ajax(1, signinUrl, `email=${emailBody.value}&type='A desktop body'`);
    }
    const submitModal = ev => {
      ev.preventDefault();
      // post(0,signinUrl, {email: $emailModal.value,type:'A desktop modal'}, function(res) {console.log(res)});
      ajax(0,signinUrl, `email=${emailModal.value}&type='A desktop modal'`);
    }

    document.addEventListener('DOMContentLoaded', () => {
      emailBody.addEventListener('input', ev => simpleValidade(ev.target, rules.email))
      emailModal.addEventListener('input', ev => simpleValidade(ev.target, rules.email))
      $formBody.addEventListener('submit', submitBody)
      $formModal.addEventListener('submit', submitModal)
    });

