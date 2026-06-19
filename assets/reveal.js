(function(){
  if(!window.IntersectionObserver)return;
  var pref=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  document.documentElement.classList.add('sr');

  if(!pref){
    ['acess__grid','plans__track','mv__grid','canais-bento','farm-bento'].forEach(function(c){
      var p=document.querySelector('.'+c);
      if(!p)return;
      p.querySelectorAll('.gs').forEach(function(el,i){
        if(!el.dataset.delay)el.dataset.delay=String(i*80);
      });
    });
  }

  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting)return;
      var d=pref?0:+(e.target.dataset.delay||0);
      if(d){setTimeout(function(){e.target.classList.add('vis')},d)}
      else{e.target.classList.add('vis')}
      io.unobserve(e.target);
    });
  },{threshold:.08,rootMargin:'0px 0px -48px 0px'});

  document.querySelectorAll('.gs,[data-reveal]').forEach(function(el){

    var r=el.getBoundingClientRect();
    if(r.bottom<=window.innerHeight+10){el.classList.add('vis');return}
    io.observe(el);
  });
})();
