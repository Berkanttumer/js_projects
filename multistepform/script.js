const prevBtns = document.querySelectorAll('.prev')
const nextBtns = document.querySelectorAll('.btn-next')
const progress = document.getElementById('progress')
const progressSteps = document.querySelectorAll('.progress-step')
const formSteps = document.querySelectorAll('.form-step')
const form = document.getElementById('form')
const submitBtn = document.getElementById('btn-submit')

let formStepsNum = 0;

nextBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        formStepsNum++;
        updateFormSteps();
        updateProgressBar();

    })
})

prevBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        formStepsNum--;
        updateFormSteps();
        updateProgressBar();
    })
})

function updateFormSteps() {
    formSteps.forEach((formStep) => {
        formStep.classList.contains('form-step-active') && formStep.classList.remove('form-step-active')
    })

    formSteps[formStepsNum].classList.add('form-step-active')
}

function updateProgressBar() {
    progressSteps.forEach((progressStep, idx) => {
        if (idx < formStepsNum + 1) {
            progressStep.classList.add('progress-step-active')

        } else {
            progressStep.classList.remove('progress-step-active')
        }
    })

    const progressActive = document.querySelectorAll('.progress-step-active')

    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1) * 100 + '%')
}

submitBtn.addEventListener("click", function () {
    form.innerHTML = '<div class="center"><i class="fa-solid fa-circle-check fa-beat" style="color: #2d9a0e;"></i></div><div class="success">Successfully Completed</div>'
});






