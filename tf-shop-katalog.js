// Progressive enhancement: products are already present in the HTML.
// Even if this file is blocked, the shop catalog is fully visible.
document.addEventListener('DOMContentLoaded',()=>{
 const products=Array.from(document.querySelectorAll('#tf-product-grid .tf-product'));
 const filters=Array.from(document.querySelectorAll('.tf-shop-filters [data-filter]'));
 const search=document.getElementById('tf-product-search');
 const count=document.getElementById('tf-shop-count');
 const empty=document.getElementById('tf-shop-empty');
 let active='Alle';
 function update(){
   const query=(search?.value||'').trim().toLocaleLowerCase('de');
   let visible=0;
   for(const card of products){
     const match=(active==='Alle'||card.dataset.category===active)&&(!query||(card.dataset.name||'').toLocaleLowerCase('de').includes(query));
     card.hidden=!match; if(match) visible++;
   }
   if(count)count.textContent=visible+' '+(visible===1?'Produkt':'Produkte');
   if(empty)empty.hidden=visible!==0;
   filters.forEach(button=>{const on=button.dataset.filter===active; button.setAttribute('aria-pressed',String(on));button.classList.toggle('selected',on)});
 }
 filters.forEach(button=>button.addEventListener('click',()=>{active=button.dataset.filter;update()}));
 if(search)search.addEventListener('input',update);
 update();
});
