/* Einheitliche UI Funktionen ohne Plugins */
document.addEventListener('DOMContentLoaded',()=>{
  const items=[...document.querySelectorAll('#tf-product-grid .tf-product')];
  const filters=[...document.querySelectorAll('.tf-shop-filters button[data-filter]')];
  const input=document.querySelector('#tf-product-search');
  const count=document.querySelector('#tf-shop-count');
  const empty=document.querySelector('#tf-shop-empty');
  if(items.length){
    let category='Alle';
    const update=()=>{
      const term=(input?.value||'').trim().toLocaleLowerCase('de');let shown=0;
      for(const item of items){
        const hit=(category==='Alle'||item.dataset.category===category)&&(((item.dataset.name||'')+' '+item.textContent).toLocaleLowerCase('de').includes(term));
        item.hidden=!hit;if(hit)shown++;
      }
      if(count)count.textContent=shown+' '+(document.documentElement.lang==='en'?(shown===1?'product':'products'):document.documentElement.lang==='da'?(shown===1?'produkt':'produkter'):(shown===1?'Produkt':'Produkte'));
      if(empty)empty.hidden=shown!==0;
    };
    filters.forEach(btn=>btn.addEventListener('click',()=>{category=btn.dataset.filter||'Alle';filters.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));update()}));
    input?.addEventListener('input',update);update();
  }
});
