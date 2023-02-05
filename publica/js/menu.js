const nav = document.querySelector('.nav');

   window.addEventListener('scroll',function(){
      nav.clssList.toggle('active',window.scrollY >0)
   })