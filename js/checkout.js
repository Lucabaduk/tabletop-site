// TEST MODE checkout. No network calls, no payment provider. Only the published test card 4242 4242 4242 4242 is accepted.
(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
// Plans and prices exactly as listed in the Pricing section of index.html
var PLANS={tabletop:{name:'TableTop (everything included)',price:'$25–30 / month',note:'Planned launch pricing. Free 30-day trial planned at launch.'}};
var q=(location.search.match(/[?&]plan=([^&]*)/)||[])[1]||'tabletop';
var key=PLANS[q]?q:'tabletop',plan=PLANS[key];
$('#planname').textContent=plan.name;$('#planprice').textContent=plan.price;$('#plannote').textContent=plan.note;$('#btnprice').textContent=plan.price.split(' / ')[0];
var f=$('#co'),box=$('#cberr');
var digits=function(v){return String(v).replace(/\D/g,'')};
function luhn(n){var s=0,alt=false;for(var i=n.length-1;i>=0;i--){var d=+n[i];if(alt){d*=2;if(d>9)d-=9}s+=d;alt=!alt}return n.length>0&&s%10===0}
function expiryOk(v){var m=/^(\d{2})\/(\d{2})$/.exec(v.trim());if(!m)return false;var mo=+m[1],yr=2000+ +m[2];if(mo<1||mo>12)return false;return new Date(yr,mo,1).getTime()>Date.now()}
var cc=$('#cc'),cx=$('#cx'),cv=$('#cv');
cc.addEventListener('input',function(){var d=digits(cc.value).slice(0,19);cc.value=d.replace(/(.{4})/g,'$1 ').trim()});
cx.addEventListener('input',function(){var d=digits(cx.value).slice(0,4);cx.value=d.length>2?d.slice(0,2)+'/'+d.slice(2):d});
cv.addEventListener('input',function(){cv.value=digits(cv.value).slice(0,3)});
$('#fillcard').addEventListener('click',function(){cc.value='4242 4242 4242 4242';cx.value='12/34';cv.value='123';[cc,cx,cv].forEach(function(e){e.classList.remove('invalid')});box.hidden=true});
f.addEventListener('input',function(e){e.target.classList.remove('invalid')});
function mark(el,bad){el.classList.toggle('invalid',bad);return !bad}
f.addEventListener('submit',function(e){
 e.preventDefault();box.hidden=true;
 var name=$('#cn'),em=$('#ce'),ok=true;
 ok=mark(name,!name.value.trim())&&ok;
 ok=mark(em,!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value.trim()))&&ok;
 var num=digits(cc.value),cardBad=false;
 if(num!=='4242424242424242'||!luhn(num)){
  // anything but the test card: friendly message, clear the field, never process it
  cc.value='';cc.classList.remove('invalid');cardBad=true;
  box.textContent='Test mode: please use the test card 4242 4242 4242 4242';box.hidden=false;ok=false;
 }
 ok=mark(cx,!expiryOk(cx.value))&&ok;
 ok=mark(cv,!/^\d{3}$/.test(cv.value))&&ok;
 if(!ok){var first=cardBad?cc:f.querySelector('.invalid');if(first)first.focus();return}
 var id='TT-TEST-'+Math.random().toString(36).slice(2,7).toUpperCase();
 var rec={plan:plan.name,price:plan.price,name:name.value.trim().slice(0,80),email:em.value.trim().slice(0,120),last4:'4242',timestamp:new Date().toISOString(),orderId:id};
 try{localStorage.setItem('tabletop_test_order',JSON.stringify(rec))}catch(err){}
 cc.value='';cx.value='';cv.value='';
 $('#dplan').textContent=rec.plan;$('#dprice').textContent=rec.price;$('#did').textContent=id;$('#dname').textContent=rec.name;$('#dcard').textContent='Visa ending 4242 (test card)';
 document.querySelector('.cogrid').hidden=true;$('.cotitle').hidden=true;
 var done=$('#done');done.hidden=false;done.style.cssText='opacity:1;transform:none;transition:none';done.focus({preventScroll:true});window.scrollTo(0,0);
});
})();
