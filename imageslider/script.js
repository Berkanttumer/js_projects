const imgs = document.querySelectorAll('img')
const prevBtn = document.getElementById('btn-left')
const nextBtn = document.getElementById('btn-next')
const images = document.getElementById('images')

let i = 1
let timeout;

prevBtn.addEventListener('click', () => {
    i--
    clearTimeout(timeout)
    updateImg()
})

nextBtn.addEventListener('click', () => {
    i++
    clearTimeout(timeout)
    updateImg()
})

function updateImg() {
    if (i > imgs.length) {
        i = 1
    } else if (i < 1) {
        i = imgs.length
    }
    images.style.transform = `translateX(-${(i - 1) * 700}px)`
    timeout = setTimeout(() => {
        i++
        updateImg()
    }, 4000)
}

updateImg()

