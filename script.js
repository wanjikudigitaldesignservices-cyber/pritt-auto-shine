document.addEventListener('DOMContentLoaded',()=>{
    const nb=document.getElementById('navbar');window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50));
    const h=document.getElementById('hamburger'),l=document.getElementById('navLinks');
    h.addEventListener('click',()=>{h.classList.toggle('active');l.classList.toggle('active')});
    l.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click',()=>{h.classList.remove('active');l.classList.remove('active')}));
    
    const svcSel=document.getElementById('svcSelect');
    const addrGrp=document.getElementById('addressGrp');
    svcSel.addEventListener('change',(e)=>{
        if(e.target.value==='Mobile Valeting'){addrGrp.style.display='block';addrGrp.querySelector('input').required=true}
        else{addrGrp.style.display='none';addrGrp.querySelector('input').required=false}
    });

    document.getElementById('bookingForm').addEventListener('submit',e=>{
        e.preventDefault();const d=Object.fromEntries(new FormData(e.target));d.id=Date.now();d.submittedAt=new Date().toISOString();d.status='New';
        const all=JSON.parse(localStorage.getItem('pritt_bookings')||'[]');all.push(d);localStorage.setItem('pritt_bookings',JSON.stringify(all));
        e.target.reset();showToast('Booking Confirmed! We will be in touch shortly.');
    });
});
function bookSvc(s){
    const sel=document.getElementById('svcSelect');sel.value=s;
    const evt=new Event('change');sel.dispatchEvent(evt);
    document.getElementById('booking').scrollIntoView({behavior:'smooth'})
}
function showToast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),4000)}
window.bookSvc=bookSvc;
