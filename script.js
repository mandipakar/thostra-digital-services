document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
const form=document.querySelector('#contact-form');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Thostra Digital Services. My name is ${d.get('name')}. Reply to me at: ${d.get('reply')}. Service: ${d.get('service')}. Project details: ${d.get('message')}`;window.open('https://wa.me/263773035037?text='+encodeURIComponent(msg),'_blank','noopener');});}
