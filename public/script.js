
const bar=document.getElementById('bar');
const close=document.getElementById('close');
const nav = document.getElementById('navbar');
if(bar){
    bar.addEventListener('click', ()=> {
        nav.classList.add('active')
    })
}
if(close){
    close.addEventListener('click', ()=> {
        nav.classList.remove('active')
    })
}

// slides
document.addEventListener('DOMContentLoaded', function() {
    var slides = document.querySelectorAll('.slideshow__slide');
    var indicators = document.querySelectorAll('.indicator');
    var currentIndex = 0;
    var interval;
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }
    function startSlideShow() {
        interval = setInterval(nextSlide, 2000); 
    }
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            clearInterval(interval);
            showSlide(parseInt(this.getAttribute('data-index')));
            startSlideShow();
        });
    });
    
    startSlideShow();
    showSlide(currentIndex);
});


// delivery
document.getElementById('checkAvailability').addEventListener('click', function() {
    var pincode = document.getElementById('pincode').value;
    var deliveryMessage = document.getElementById('deliveryMessage');
    if (/^\d{6}$/.test(pincode)) {
        var deliveryStartDate = new Date();
        deliveryStartDate.setDate(deliveryStartDate.getDate() + 3); 
        var deliveryEndDate = new Date(deliveryStartDate);
        deliveryEndDate.setDate(deliveryEndDate.getDate() + 2); 
        
        var formattedStartDate = deliveryStartDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        var formattedEndDate = deliveryEndDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        
        deliveryMessage.innerText = '🚚 Estimated delivery between ' + formattedStartDate + ' to ' + formattedEndDate + '.';
    } else {
        deliveryMessage.innerText = 'Please enter a valid input.';
    }
});

var MainImg = document.getElementById("MainImg");
        var smallimg = document.getElementsByClassName("small-img");
        smallimg[0].onclick = function(){
            MainImg.src = smallimg[0].src;
        }
        smallimg[1].onclick = function(){
            MainImg.src = smallimg[1].src;
        }
        smallimg[2].onclick = function(){
            MainImg.src = smallimg[2].src;
        }
        smallimg[3].onclick = function(){
            MainImg.src = smallimg[3].src;
        }

        
// size selection
        document.querySelectorAll('.size-option input[type="radio"]').forEach(input => {
            input.addEventListener('change', function() {
                document.querySelectorAll('.size-option').forEach(label => {
                    label.classList.remove('selected');
                });
                this.parentElement.classList.add('selected');
            });
        });
        
        function validateSize() {
            const selectedSize = document.querySelector('input[name="size"]:checked');
            if (!selectedSize) {
                document.getElementById('sizeError').style.display = 'block';
                return false;
            }
            document.getElementById('sizeError').style.display = 'none';
            return true;
        }
        
        
        
