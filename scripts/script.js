document.addEventListener("click", e => {
  let handle
  if (e.target.matches(".class-btn")) {
    handle = e.target
  } else {
    handle = e.target.closest(".class-btn")
  }
  if (handle != null) onHandleClick(handle)
})
  
const throttleProgressBar = throttle(() => {
  document.querySelectorAll(".class-progress-bar").forEach(calculateProgressBar)
}, 250)
window.addEventListener("resize", throttleProgressBar)
  
document.querySelectorAll(".class-progress-bar").forEach(calculateProgressBar)

  
function calculateProgressBar(progressBar) {
  progressBar.innerHTML = ""
  const slider = progressBar.closest(".div-section-all").querySelector(".div-posts-carrousel")
  const itemCount = slider.children.length
  const itemsPerScreen = parseInt(
    getComputedStyle(slider).getPropertyValue("--items-per-screen")
  )
  let sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  )
  const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen)
  
  if (sliderIndex >= progressBarItemCount) {
    slider.style.setProperty("--slider-index", progressBarItemCount - 1)
    sliderIndex = progressBarItemCount - 1
  }
  
  for (let i = 0; i < progressBarItemCount; i++) {
    const barItem = document.createElement("div")
    barItem.classList.add("progress-item")
    if (i === sliderIndex) {
      barItem.classList.add("active")
    }
    progressBar.append(barItem)
  }
}
  
function onHandleClick(handle) {
  const progressBar = handle.closest(".div-section-all").querySelector(".class-progress-bar")
  const slider = handle.closest(".div-section-container").querySelector(".div-posts-carrousel")
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  )
  const progressBarItemCount = progressBar.children.length
  if (handle.classList.contains("left-btn")) {
    if (sliderIndex - 1 < 0) {
      slider.style.setProperty("--slider-index", progressBarItemCount - 1)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[progressBarItemCount - 1].classList.add("active")
    } else {
      slider.style.setProperty("--slider-index", sliderIndex - 1)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[sliderIndex - 1].classList.add("active")
    }
  }
  
  if (handle.classList.contains("right-btn")) {
    if (sliderIndex + 1 >= progressBarItemCount) {
      slider.style.setProperty("--slider-index", 0)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[0].classList.add("active")
    } else {
      slider.style.setProperty("--slider-index", sliderIndex + 1)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[sliderIndex + 1].classList.add("active")
    }
  }
}
  
function throttle(cb, delay = 1000) {
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }
  
  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }
  
    cb(...args)
    shouldWait = true
    setTimeout(timeoutFunc, delay)
  }
}

const menu = document.querySelector('nav');

function activeScroll(){
    menu.classList.toggle('ativo', scrollY > 0);
}
window.addEventListener('scroll', activeScroll);

// function loadVideos(){
//   var videos = document.querySelectorAll('video');
//   for(const video of videos){
//       // ive tried changing the click function to scroll but didn't work
//       video.addEventListener('scrollY', function(){
//         if(video.paused){
//           video.play();
//         }else{
//           video.pause()
//         }
//       });
//   }
// }

// loadVideos()

//   (function () {
//     var menu = document.getElementById('menu'); // colocar em cache
//     window.addEventListener('scroll', function () {
//         if (window.scrollY > 0) menu.classList.add('nav'); // > 0 ou outro valor desejado
//         else menu.classList.remove('nav');
//     });
// })();



// const nav = document.getElementById('nav');
// window.addEventListener('scroll', ()=>{
//   if(window.scrollY >= 100){
//     nav.classList.add('nav');
//   }else{
//     nav.classList.remove('nav')
//   }
// })