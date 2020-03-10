$(function () {
    /* SPONGEBOB PLS */
    var fontSize = "18";
    var fontColor = "#ffffff";
    var impactFont = new FontFace('Impact', 'url(font/impact.ttf)');
    impactFont.load().then((font) => {
        document.fonts.add(font);
    })
    var canvas = document.getElementById('sponge-img');
    var ctx = canvas.getContext('2d');
    var imageObj = new Image(640, 320);
    imageObj.src = "img/sponge.jpg";
    imageObj.onload = function() {
        drawSponge();
    }

    function clearSponge() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function drawSponge() {
        ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height,
            0, 0, canvas.width, canvas.height);
        ctx.font = `${fontSize}pt Impact`;
        ctx.textAlign = 'center';
        ctx.fillStyle = fontColor;
        ctx.fillText(document.getElementById('sponge-out').value, canvas.width / 2, canvas.height - 5, 640);
    }

    /* Dark mode stuff */
    if (localStorage.getItem('darkmode') == 'true') {
        document.styleSheets[4].disabled = true;
        var isDarkMode = true;
    } else {
        var isDarkMode = false;
    }

    /* Clipboard JS stuff */
    var clip = new ClipboardJS('.btn-copy');
    clip.on('success', function (e) {
        console.info('Action:', e.action);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });

    clip.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

    $('#btn-darkmode').click(function () {
        if (isDarkMode) {
            document.styleSheets[4].disabled = false;
            this.innerHTML = "Dark Mode"
            localStorage.setItem('darkmode', 'false')
            isDarkMode = false
        } else {
            this.innerHTML = "Light Mode"
            document.styleSheets[4].disabled = true;
            localStorage.setItem('darkmode', 'true')
            isDarkMode = true
        }
    })

    /* Clapback stuff */
    $('#user-in').keyup(function () {
        $('#user-out').val(this.value.split(' ').join(' 👏 '));
    })

    $('#btn-clear').click(function () {
        $('#user-in').val('');
        $('#user-out').val('');
    })

    function jumble() {
        $('#sponge-out').val(document.getElementById('sponge-in').value.split('').map((v) =>
            Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
        ).join(''))
    }
    /* Sponge stuff */
    $('#sponge-in').keyup(delay(function (e) {
        // $('#sponge-out').val(this.value.split('').map((v) =>
        //     Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
        // ).join(''))
        jumble();
        drawSponge();
    }, 350));

    $('#sponge-jumble').click(function () {
        jumble();
        clearSponge();
        drawSponge();
    })

    $('.btn-copy').click(function () {
        $(this).notify("Copied!", {
            className: "success",
            showAnimation: "fadeIn",
            hideAnimation: "fadeOut",
            gap: 5,
            position: "top-center"
        })
    })

    $('#sponge-clear').click(function () {
        $('#sponge-in').val('');
        $('#sponge-out').val('');
        drawSponge();
    })

    $('#sponge-font-size-box').on('input', function() {
        document.getElementById('sponge-font-size-slider').value = this.value;
        fontSize = this.value;
        clearSponge();
        drawSponge();
    });
    $('#sponge-font-size-slider').on('input', function() {
        document.getElementById('sponge-font-size-box').value = this.value;
        fontSize = this.value;
        clearSponge();
        drawSponge();
    })

    $('#sponge-color').on('input', function() {
        fontColor = this.value;
        clearSponge();
        drawSponge();
    })
})