(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var burger=$('#burger'),nav=$('#nav');
if(burger&&nav){
 burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
 nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');burger.setAttribute('aria-expanded','false')}});
}
// Waitlist: DEMO ONLY. Saves to this browser's localStorage and nothing else. No network calls.
var KEY='tabletop_site_waitlist_demo',f=$('#wl');
if(f){
 var thanks=$('#thanks');
 function store(v){try{if(v===null)localStorage.removeItem(KEY);else localStorage.setItem(KEY,JSON.stringify(v));return true}catch(e){return false}}
 f.addEventListener('submit',function(e){
  e.preventDefault();var ok=true;
  ['wn','we'].forEach(function(id){var el=document.getElementById(id);var bad=!el.value.trim()||(el.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim()));el.classList.toggle('invalid',bad);if(bad)ok=false});
  if(!ok){var first=f.querySelector('.invalid');if(first)first.focus();return}
  var d={savedAt:new Date().toISOString(),demo:true};
  new FormData(f).forEach(function(v,k){d[k]=String(v).slice(0,500)});
  store(d);
  $('#tname').textContent=d.name?', '+d.name.split(' ')[0]:'';
  f.style.display='none';thanks.style.display='block';thanks.scrollIntoView({block:'center'});
 });
 f.addEventListener('input',function(e){e.target.classList.remove('invalid')});
 $('#clearwl').addEventListener('click',function(){store(null);f.reset();$('#tname').textContent='';f.style.display='';thanks.style.display='none'});
 $('#againwl').addEventListener('click',function(){f.style.display='';thanks.style.display='none'});
}
// Demo page: desktop/phone preview toggle
var dev=$('#dev');
if(dev){
 var bd=$('#bdesk'),bp=$('#bphone');
 function set(p){dev.classList.toggle('phone-w',p);bp.setAttribute('aria-pressed',p);bd.setAttribute('aria-pressed',!p)}
 bd.addEventListener('click',function(){set(false)});bp.addEventListener('click',function(){set(true)});
}
})();
