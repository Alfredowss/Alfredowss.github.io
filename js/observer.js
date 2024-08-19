// Select the element to observe
const targetElement = document.querySelector('.container__fadeIn');
const targets = document.querySelectorAll('.screens');

const viewportsClasses = {
    1080: 'fadeIn',
    992 : "fadeIn-md", 
    768 : "fadeIn-sm"
}


function classChecker(e, name, mode){

  let subst = "";
  let inClass = "fadeIn";
  let outClass = "fadeOut";

  if(name.includes('-')){
    subst = name.substring(name.indexOf('-'))
  }

  outClass = outClass.concat(subst);
  inClass = inClass.concat(subst);

   if(e.classList.contains(outClass)){
        e.classList.remove(outClass)            
     }

   if(e.classList.contains(inClass)){
        e.classList.remove(inClass)            
    }

  if(mode == 'in'){  
    return inClass
  } 

  return outClass;

}


function checkViewportSize(){
  const viewportWidth = window.innerWidth;

  if(viewportWidth < 992){
    return viewportsClasses[992];
  }
  
  if(viewportWidth < 768){
    return viewportsClasses[768];
  }

  else{
    return viewportsClasses[1080];
  }

}



const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        targets.forEach((node)=>{
          node.classList.add(classChecker(node, checkViewportSize(), 'in'))
        })

    } else {
        targets.forEach((node)=>{
          node.classList.add(classChecker(node, checkViewportSize(), 'out'))
        })
    }
  });
};

// Create an intersection observer with the callback
const observer = new IntersectionObserver(callback, {
  root: null, // use the viewport as the root
  threshold: 0.5 // trigger when 10% of the element is in view
});

// Observe the target element
observer.observe(targetElement);
